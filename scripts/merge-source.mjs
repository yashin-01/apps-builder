#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const [, , sourcePath, entryPath] = process.argv;

if (!sourcePath || !entryPath) {
  console.error("Uso: node merge-source.mjs <source.json> <app-entry.json>");
  process.exit(1);
}

const entry = JSON.parse(readFileSync(entryPath, "utf8"));

if (!entry.bundleIdentifier) {
  console.error("Error: Entrada sin bundleIdentifier.");
  process.exit(1);
}

let source;
if (existsSync(sourcePath)) {
  try {
    source = JSON.parse(readFileSync(sourcePath, "utf8"));
  } catch (err) {
    source = {
      name: "Apps Source",
      identifier: "com.apps.source",
      apps: []
    };
  }
} else {
  source = {
    name: "Apps Source",
    identifier: "com.apps.source",
    apps: []
  };
}

if (!Array.isArray(source.apps)) {
  source.apps = [];
}

const idx = source.apps.findIndex(
  (app) => app.bundleIdentifier === entry.bundleIdentifier
);

if (idx >= 0) {
  source.apps[idx] = entry;
  console.log(`[source.json] Entrada actualizada para: ${entry.bundleIdentifier} (v${entry.version})`);
} else {
  source.apps.push(entry);
  console.log(`[source.json] Nueva entrada agregada para: ${entry.bundleIdentifier} (v${entry.version})`);
}

writeFileSync(sourcePath, JSON.stringify(source, null, 2) + "\n");
