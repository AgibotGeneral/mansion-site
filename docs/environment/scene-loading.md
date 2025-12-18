---
title: Scene loading
---

Loading a multi-floor building often requires:

1. Selecting a building scene id
2. Loading the base scene
3. Selecting a target floor
4. Applying floor-specific object placements

## Recommended API behavior
- `reset(scene_id=..., floor=...)` should be idempotent
- Floor transitions should not destroy object identity
- Held objects and receptacle contents should persist

See **Skills → Take stairs** and **Skills → Use elevator**.
