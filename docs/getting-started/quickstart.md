---
title: Quickstart
---

This quickstart shows a minimal end-to-end loop:

1. Create an environment
2. Reset into a multi-floor scene
3. Call a few skills
4. Read observations + metadata

```python
# Example only — adjust to your codebase.
from mansion_gym import MansionEnv

env = MansionEnv(scene_id="mansion_000123", floor=1)
obs = env.reset(seed=0)

# Navigate + interact
env.step_skill("go_near_object", object_id="Mug|+00.12|+00.88|-01.35")
env.step_skill("pickup_object", object_id="Mug|+00.12|+00.88|-01.35")

# Transition floors
env.step_skill("take_stairs", target_floor=2)

obs = env.observe()
rgb = obs["rgb"]
meta = obs["metadata"]
```

## Next steps
- Read **Environment → Observations** for the observation dictionary layout.
- Read **Skills → Overview** for conventions (inputs/outputs/errors).
- Read **Dataset → MansionWorld** for how scene IDs map to assets and metadata.
