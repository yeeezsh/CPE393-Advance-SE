# CPE393-Advance-SE

## Getting Started
Preparing the server environment

## Server Setup
Install Docker and Docker-compose follow this link 
- [Docker Setup](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)
- [Docker-Compose Setup](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04)

## Prerequisites
- Docker 20.10.5, build 55c4c88 or higher
- MongoDB cli 4.x or higher
- Mongo Restore (For Remote/Server)
- Ubuntu 18 (For server) or higher

## Development Setup
clone project

```sh
git clone https://github.com/yee2542/CPE393-Advance-SE
cd ./CPE393-Advance-SE
```

then use docker-compose to run a project in production environment use **docker-compose.yml** by -d for running in backgroud

```sh
docker-compose up -d
```

## Issues
when db not start cause have no permission to create dir e.g.

`mkdir: cannot create directory`

fix by this command

```sh
chown -R 1001 ./db
#or
sudo chown -R 1001 ./db
```