# Customer stack

## prerequisites

First install the next utilities to make this setup

**Docker** - https://docs.docker.com/engine/install/ubuntu/

**HELM** - https://helm.sh/docs/intro/install/

**MINIKUBE** - https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download

## Setup & Deploy

Deploying this setup requires the next steps - 

```console
foo@bar:~$ minikube start
foo@bar:~$ eval $(minikube -p minikube docker-env)
foo@bar:~$ chmod +x setup.sh
foo@bar:~$ ./setup.sh
```

***Important*** - You must be in the setup.sh location path