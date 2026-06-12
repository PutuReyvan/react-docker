# Workflow Merge Guide

Use this guide when the final repository should keep only one workflow file:

```text
.github/workflows/devsecops.yml
```

The file `.github/workflows/backend-devsecops.yml` is a reference file for the backend pipeline. It covers the Express CRUD invoice API, MongoDB integration tests, image build, scans, and GHCR image publish. Do not commit it as a second workflow if the final repo must have one pipeline file.

If you receive the ZIP handoff package, there is also a ready reference file:

```text
workflow-reference/devsecops-combined.yml
```

That file is an example of the final single workflow after frontend and backend jobs are merged.

## How to Merge

1. Open the existing `.github/workflows/devsecops.yml`.
2. Keep the existing top-level `name`, `on`, and `permissions`.
3. Under the existing top-level `env`, add:

```yaml
  BACKEND_APP_DIR: backend
  BACKEND_IMAGE_NAME: ghcr.io/putureyvan/invoice-api
  BACKEND_LOCAL_IMAGE: invoice-api:${{ github.sha }}
```

4. From `.github/workflows/backend-devsecops.yml`, copy only the backend jobs under `jobs:`.
5. Paste those jobs under the existing `jobs:` section in `.github/workflows/devsecops.yml`.
6. Do not duplicate another top-level `jobs:` key.
7. After the merge, remove `.github/workflows/backend-devsecops.yml` from the final commit if the repo should only show one workflow.

The backend job IDs are already prefixed with `backend-`, so they should not conflict with the existing frontend jobs. Keep the MongoDB integration job when merging because it is the workflow evidence that add/update/delete invoice operations persist against a real database service.

## Backend Jobs To Copy

Copy these job blocks:

- `backend-validation`
- `backend-mongodb-integration-tests`
- `backend-sast-codeql`
- `backend-dependency-vulnerability-scanning`
- `backend-secret-scanning-trufflehog`
- `backend-docker-build`
- `backend-container-scan`
- `backend-sbom`
- `backend-publish-image`

## Deployment Note

The backend workflow only builds, scans, and publishes the backend image:

```text
ghcr.io/putureyvan/invoice-api
```

Cloud deployment is intentionally not included yet. Add a deploy job later after `backend-publish-image` when the target runtime is finalized.

## Handoff ZIP Note

If a ZIP handoff is required, rebuild it after the backend, frontend, Compose, docs, and workflow files have all landed. The archive should include the final CRUD source/config/docs and `workflow-reference/` files, not an earlier snapshot from before parallel agent integration.
