---
title: MansionEnv
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# MansionEnv

`MansionEnv` refers to the main Gymnasium-compatible environment class used to run episodes in MANSION.

In code, the environment is implemented as:

```python
from mansion_gym.mansion_env import MansionGym
````

`MansionGym` subclasses `gymnasium.Env` and exposes the standard Gymnasium API (`reset`, `step`, `close`) while supporting both:

1. **raw AI2-THOR actions** (passthrough to `controller.step`), and
2. **registered high-level skills** (dispatched via `skill_registry`). 

---

## Class

```python
class MansionGym(gymnasium.Env):
    def __init__(self, building_dir: str, initial_floor: int = 1, max_steps: int = 1000, save_dir: str = "assets", capture_panoramas: bool = False): ...
    def reset(self, *, seed=None, options=None, skip_reset: bool = False): ...
    def step(self, action=None, **kwargs): ...
    def close(self): ...
```

---

## Parameters

### `__init__(building_dir, initial_floor=1, max_steps=1000, save_dir="assets", capture_panoramas=False)`

* **building_dir** (`str`): Path to a building directory containing per-floor scene JSON files. Files should be named `floor_1.json`, `floor_2.json`, etc. If that naming is not found, falls back to sorting all `*.json` files in the directory.
* **initial_floor** (`int`, default `1`): The floor the agent starts on.
* **max_steps** (`int`, default `1000`): Maximum steps per episode.
* **save_dir** (`str`, default `"assets"`): Subdirectory under `building_dir` used to store debug artifacts (e.g., object state dumps, graphs). Full path is `building_dir/save_dir/`.
* **capture_panoramas** (`bool`, default `False`): If `True`, captures per-room landmark views on initialization. Disabled by default because rendering all floors on first load is slow.

**Side effects on initialization**

* Loads all floor JSONs under `building_dir`.
* Creates and configures an AI2-THOR `Controller` via `setup_scene(self, change_floor=False)`.
* Calls `reset()` once during initialization.
* Registers the skill registry after `reset()` completes.

---

## Action interface

### Supported input format (AI2-THOR style only)

`step()` accepts **only** AI2-THOR-style inputs:

#### Form A: dict

```python
obs, reward, terminated, truncated, info = env.step({
    "action": "MoveAhead",
    "moveMagnitude": 0.25,
})
```

#### Form B: string + kwargs

```python
obs, reward, terminated, truncated, info = env.step(
    action="MoveAhead",
    moveMagnitude=0.25,
)
```

> Legacy formats like `{"MoveAhead": {...}}` are intentionally **not supported**. 

### Dispatch rules

* If `action` matches a key in `env.skill_registry`, the corresponding skill handler is invoked.
* Otherwise, the action is passed through to `ai2thor.controller.Controller.step(action=..., **params)`.

:::caution Infrastructure guard
Raw `PickupObject` actions are blocked if `objectId` contains `"stair"` or `"elevator"` (case-insensitive). The step returns `lastActionSuccess: False` with an error message. Use the `TakeStairs` or `UseElevator` skills instead.
:::

---

## Registered skills

The environment registers the following skill action names (these are invoked through `env.step(action=...)`):

* `MoveTo`
* `GoNearObject`
* `OpenDoor`
* `CloseDoor`
* `PickupObject`
* `GoToLandmark`
* `CallElevator`
* `TakeStairs`
* `UseElevator`
* `PutObject`

Each skill is called as:

```python
success, msg = env.skill_registry[act_name](env, skill_name=act_name, **params)
```

The environment then reports the result through `info`. 

---

## Observation

### Type

The observation returned by `reset()` and `step()` is the raw **AI2-THOR `Event`** object:

```python
obs = env.get_observation()  
```

:::caution 
This actually returns `controller.last_event`.
:::

> Because the observation is an AI2-THOR `Event`, this environment does not currently expose a Gymnasium `observation_space`. 

---

## Rewards

* `reward` is currently always `0.0`.

---

## Episode termination

* `terminated` becomes `True` when `self.steps >= self.max_steps`.
* `truncated` is currently always `False`.

> Note: by Gymnasium convention, reaching a time limit is usually treated as **truncation**, but the current implementation uses the `terminated` field for the step limit. 

---

## Info dictionary

`info` always includes:

* `lastActionSuccess` (`bool`): Whether the last dispatched action succeeded (skill result or AI2-THOR metadata).
* `errorMessage` (`str`): Error message from the skill or AI2-THOR.

---

## Reset

```python
obs, info = env.reset(seed=None, options=None, skip_reset=False)
```

Reset does the following:

* Resets step counter.
* Initializes per-floor object-state storage.
* Clears held object tracking.
* Resets the scene via `reset_scene(self, skip_reset=skip_reset)`.
* Updates door/edge states via `update_edge_states(self)`.
* Returns the current `Event` and an empty info dict `{}`. 

---

## Additional helpers

The environment also exposes convenience methods that wrap internal utilities:

* `update_floor(target_floor)`
* `update_edge_states()`
* `get_visible_objects()`
* `get_current_floor()`
* `get_current_room()`
* `visualize_landmarks(filename="landmarks.png")`
* `visualize_room_graph(filename="room_graph.png")`
* `get_room_polygons()`

---

## Object state recording

After each step, the environment records object metadata for the current floor and writes it to:

* `"{building_dir}/{save_dir}/floor_{current_floor}_object_states.json"`

This is done automatically by `record_object_states()`. 

---

## Minimal usage example

```python
from mansion_gym.mansion_env import MansionGym

env = MansionGym(building_dir="path/to/building", initial_floor=1, max_steps=1000)

obs, info = env.reset()

# Raw AI2-THOR action
obs, reward, terminated, truncated, info = env.step(
    action="MoveAhead",
    moveMagnitude=0.25,
)

# Skill action (parameters depend on the skill)
obs, reward, terminated, truncated, info = env.step(
    action="GoToLandmark",
    landmark="Kitchen",
)

env.close()
```
