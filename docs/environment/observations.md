---
title: Observations
---

MANSION environments typically expose a dict-like observation:

```python
obs = {
  "rgb": ...,
  "depth": ...,
  "instance_segmentation": ...,
  "metadata": {...}
}
```

## `metadata` recommended fields
- `agent`: position, rotation, current floor
- `objects`: list of objects with stable IDs and state
- `events`: last action, success flag, error strings
- `scene`: building + floor identifiers, transitions

:::tip
If you already use a backend like AI2-THOR, keep the raw backend metadata accessible.
Your higher-level code should not depend on internal backend details unless necessary.
:::
