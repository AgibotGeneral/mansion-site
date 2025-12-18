---
title: MansionWorld dataset
---

MansionWorld is the dataset backing MANSION. It contains **multi-floor buildings** and metadata
needed to run long-horizon tasks.

## What’s in the dataset?
Typical components:

- Building-level scene JSON (floors, rooms, connectivity)
- Object placements and receptacle relationships
- Asset references (meshes, materials, textures)
- Optional annotations (room labels, affordances, navigation graphs)

## Directory layout (example)
```text
MansionWorld/
  scenes/
    mansion_000123.json
    mansion_000124.json
  assets/
    ...
  splits/
    train.txt
    val.txt
    test.txt
```

## Splits and evaluation
Provide fixed splits and version them with the code release. If you update assets or scene generation,
bump the dataset version and keep old versions available.

:::note
Replace the contents of this page with your exact dataset stats and download instructions.
:::
