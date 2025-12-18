---
title: Object state
---

Object state should be represented explicitly in metadata. Common fields:

- `objectId`: stable unique ID
- `objectType`: semantic category
- `position`, `rotation`
- `isOpen`, `isPickedUp`, `isBroken`, ...
- `parentReceptacleId` / `receptacleObjectIds`

## State transitions
State can change due to:
- agent actions (open, close, pickup, put)
- physics (falling, collision)
- scripted events (elevator door behavior)

If possible, keep an event log in `metadata["events"]`.
