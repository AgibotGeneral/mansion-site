---
title: Multi-floor world model
---

MANSION represents a building as a set of floors connected by transitions:

- **Stairs**: deterministic transition between adjacent floors (with navigation subgoals)
- **Elevators**: transition via calling/opening/entering/exiting, with door state constraints

### Persistence
Object state persists across floors:

- The agent can carry objects between floors
- Receptacle contents persist
- Door/elevator state persists (depending on your backend)

### What counts as “the same object”?
Use stable **object IDs** that remain consistent across:
- viewpoint changes
- floor transitions
- reloads (when possible)

See **Environment → Object state** for recommended fields.
