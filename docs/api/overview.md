---
title: Overview
---

# Overview

`MansionGym` is a Gymnasium-style environment backed by AI2-THOR. You interact with the multi-floor building using a single **AI2-THOR-style action API**.

## Quickstart

```python
from mansion_gym.mansion_env import MansionGym

env = MansionGym(building_dir="path/to/building", initial_floor=1, max_steps=1000)
obs, info = env.reset()
````

`building_dir` should contain per-floor scene JSONs named `floor_1.json`, `floor_2.json`, etc.

## Step API (AI2-THOR-style only)

This wrapper accepts only `AI2-THOR`-style inputs:

```python
# dict form
obs, reward, terminated, truncated, info = env.step({
    "action": "MoveAhead",
    "moveMagnitude": 0.25,
})

# kwargs form
obs, reward, terminated, truncated, info = env.step(
    action="MoveAhead",
    moveMagnitude=0.25,
)
```

## Skills

Registered skill names: `MoveTo`, `GoNearObject`, `OpenDoor`, `CloseDoor`, `PickupObject`, `GoToLandmark`, `CallElevator`, `TakeStairs`, `UseElevator`, `PutObject`

See **Skills** for signatures, parameters, and examples.
