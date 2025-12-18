---
title: Task format
---

A task is typically defined by:

- **Scene ID** (building)
- **Start floor / start pose**
- **Goal specification** (language instruction, symbolic goal, or both)
- **Episode constraints** (max steps, allowed skills, success criteria)

### Recommended JSON format (example)
```json
{
  "scene_id": "mansion_000123",
  "seed": 0,
  "start": { "floor": 1, "pose": [0, 0, 0, 0] },
  "instruction": "Bring the mug from the kitchen to the bedroom upstairs.",
  "success": {
    "type": "object_in_receptacle",
    "object_type": "Mug",
    "receptacle_type": "Bed"
  },
  "budget": { "max_steps": 500 }
}
```

:::tip
Keep task specs backend-agnostic. Your evaluation harness can translate this into simulator calls.
:::
