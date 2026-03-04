# Gravitate Health Lens Selector Example

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

---
## Table of contents

- [Gravitate Health Lens Selector Example](#gravitate-health-lens-selector)
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Deployment](#deployment)
    - [Deploy via Helm (OCI Registry)](#deploy-via-helm-oci-registry)
    - [Helm Chart Configuration](#helm-chart-configuration)
    - [Local Development](#local-development)
    - [Kubernetes Deployment (Legacy)](#kubernetes-deployment-legacy)
  - [Usage](#usage)
  - [Avaible Lenses](#avaible-lenses)
  - [Known issues and limitations](#known-issues-and-limitations)
  - [Getting help](#getting-help)
  - [Contributing](#contributing)
  - [License](#license)
  - [Authors and history](#authors-and-history)
  - [Acknowledgments](#acknowledgments)

---
## Introduction

This repository contains an example of a lens selector. A lens selector provides a list of lens names, and also provides the lenses to the focusing manager.


---
## Deployment

### Deploy via Helm (OCI Registry)

Deploy directly from the GitHub Container Registry without cloning the repository:

```bash
# Login to the registry (required for private registries)
helm registry login ghcr.io

# Deploy the Helm chart from OCI artifact
helm install my-release oci://ghcr.io/gravitate-health/charts/lens-selector-fhir --version 0.1.0

# Optionally, upgrade an existing deployment
helm upgrade my-release oci://ghcr.io/gravitate-health/charts/lens-selector-fhir --version 0.1.0
```

For custom configuration, create a custom `values.yaml` and pass it during installation:

```bash
helm install my-release oci://ghcr.io/gravitate-health/charts/lens-selector-fhir \
  --version 0.1.0 \
  -f custom-values.yaml
```

### Helm Chart Configuration

The chart supports several key configuration options in `values.yaml`:

- **image.tag**: Override the container image tag (defaults to chart appVersion)
- **replicaCount**: Number of pod replicas
- **resources**: CPU and memory requests/limits
- **env**: Environment variables (e.g., `FHIR_URL`, `ENVIRONMENT`)
- **networking.type**: Configure networking strategy (`none`, `ingress`, or `istio`)
- **service.type**: Kubernetes service type (ClusterIP, NodePort, LoadBalancer)

### Local Development

Validate and test the chart locally during development:

```bash
# Lint the chart for syntax and best practice issues
helm lint ./charts/lens-selector-fhir

# Generate the Kubernetes manifests without deploying
helm template my-release ./charts/lens-selector-fhir

# Dry-run to see what would be deployed
helm install my-release ./charts/lens-selector-fhir --dry-run --debug

# Package the chart into a .tgz for distribution
helm package ./charts/lens-selector-fhir
```

### Kubernetes Deployment (Legacy)

The original raw Kubernetes manifests are maintained in the `kubernetes/` directory for reference and backward compatibility:

1. Create the following resources:
```bash
kubectl apply -f kubernetes/base/001_lens-selector-mvp2-service.yaml
kubectl apply -f kubernetes/base/002_lens-selector-mvp2-deployment.yaml
```

In order to be discovered by the focusing manager, the service.yaml needs to include the following selector in the `metadata` field:

```yaml
metadata:
  labels:
    eu.gravitate-health.fosps.focusing: "true"
```

**Note:** It is recommended to use the Helm chart deployment method for production environments as it provides better configuration management, versioning, and OCI registry support.


---
## Usage

Service will be accessible internally from the kubernetes cluster with the url `http://lens-selector-fhir.default.svc.cluster.local:3000/focus`

---
## Avaible Lenses

See the [Documentation page](https://gravitate-health.github.io/docs/tutorial-Lens/Examples) for the updated list of lenses.

## Known issues and limitations


It only recognises ePIs anotated with the \<span class=" "> method and the classes mentioned in the table above.

---
## Getting help

Open an issue if any bug is detected

---
## Contributing

---
## License

This project is distributed under the terms of the [Apache License, Version 2.0 (AL2)](http://www.apache.org/licenses/LICENSE-2.0).  The license applies to this file and other files in the [GitHub repository](https://github.com/Gravitate-Health/Focusing-module) hosting this file.

```
Copyright 2022 Universidad Politécnica de Madrid

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
---
## Authors and history

- Guillermo Mejías ([@gmej](https://github.com/gmej))
- Alejo Esteban ([@10alejospain](https://github.com/10alejospain))
- Alejandro Alonso ([@aalonsolopez](https://github.com/aalonsolopez))


---
## Acknowledgments
