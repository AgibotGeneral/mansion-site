---
title: Scenes and assets
---

## Scene JSON
Scenes are defined in JSON to make building composition transparent and editable. See **API → Scene JSON**.

## Assets
If you use an external simulator backend, assets may live in the backend’s format.
We recommend storing **asset manifests** so scene JSON files can reference assets by stable IDs.

## Reproducibility tips
- Keep a strict mapping: `scene_id -> json -> assets`
- Do not silently overwrite assets; version them
- Save generation seeds and generator version hashes
