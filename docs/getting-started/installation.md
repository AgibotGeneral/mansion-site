---
title: Installation
---

## Python package
Install the core package (and simulator dependencies) via:

```bash
pip install mansion
# or, if you keep a monorepo:
pip install -e .
```

## Simulator backend
MANSION can be used with a simulator backend (e.g., AI2-THOR / custom Unity build).

- If you rely on a local Unity executable, set the path in your environment config.
- If you use headless rendering on a cluster, enable headless mode and verify GPU drivers.

:::note
This page is intentionally **backend-agnostic**. Replace placeholders with your actual setup
(e.g., AI2-THOR local build path, docker image, etc.).
:::

## Verify the installation
```bash
python -c "import mansion; print(mansion.__version__)"
```

If this fails, ensure your Python environment matches the repo’s requirements.
