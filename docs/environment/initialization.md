---
title: Initialization
---

Initialize the environment with:

- A **scene id** (building)
- A **floor** (starting floor)
- Optional episode seed, render settings, etc.

```python
from mansion_gym import MansionEnv

env = MansionEnv(scene_id="mansion_000123", floor=1, render=True)
obs = env.reset(seed=0)
```

### Determinism
For reproducibility, set:
- environment seed
- physics seed (if supported)
- procedural generation seed (if applicable)
