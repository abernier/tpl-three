# Base image (any generic, debian-based image, see: https://github.com/devcontainers/features#usage)
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:16

# Additional packages (see: https://code.visualstudio.com/docs/devcontainers/create-dev-container#_dockerfile)
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive && apt-get -y install \
  glslang-tools