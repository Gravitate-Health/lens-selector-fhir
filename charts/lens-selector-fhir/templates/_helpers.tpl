{{/*
Expand the name of the chart.
*/}}
{{- define "lens-selector-fhir.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "lens-selector-fhir.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "lens-selector-fhir.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels to be applied to all resources.
These labels follow Kubernetes recommended label scheme:
https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/
*/}}
{{- define "lens-selector-fhir.labels" -}}
helm.sh/chart: {{ include "lens-selector-fhir.chart" . }}
{{ include "lens-selector-fhir.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- with .Values.labels }}
{{ toYaml . }}
{{- end }}
{{- end }}

{{/*
Selector labels for pod/service selection.
*/}}
{{- define "lens-selector-fhir.selectorLabels" -}}
app.kubernetes.io/name: {{ include "lens-selector-fhir.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Return the appropriate image tag
*/}}
{{- define "lens-selector-fhir.image.tag" -}}
{{- .Values.image.tag | default .Chart.AppVersion }}
{{- end }}

{{/*
Gravitate Health specific labels
*/}}
{{- define "lens-selector-fhir.gravitateLabels" -}}
eu.gravitate-health.fosps.focusing: "true"
{{- end }}
