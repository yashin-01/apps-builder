# iOS Capacitor Build Engine

A reusable, automated continuous integration pipeline for building and packaging unsigned iOS application packages (`.ipa`) from Capacitor and web projects.

## Overview

This workflow automates:
- Workspace setup and dependency installation
- Web asset bundling and Capacitor iOS synchronization
- Custom assets and configuration processing
- Unsigned `.app` compilation via `xcodebuild`
- IPA packaging and distribution release generation

## Usage

Triggerable via `repository_dispatch` or `workflow_dispatch` events.
