---
title: What is MANSION?
---

MANSION is designed around a simple idea: long-horizon tasks become much more realistic (and harder)
when an agent must operate across **multiple floors** with **persistent object state**.

Key goals:

- **Long-horizon**: tasks that require dozens to hundreds of low-level actions
- **Multi-floor**: stair/elevator transitions, floor-specific visibility, and navigation costs
- **Reproducible**: scenes and task definitions are versioned; results are repeatable
- **Composable**: a skills layer so planners can reason at a higher level than primitive actions

If you’re building LLM/VLM planners, hierarchical RL, or program-of-thought agents, MANSION is meant
to be the substrate that makes failures *interesting*.
