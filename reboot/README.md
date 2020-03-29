# Reboot

## Quickstart

```bash
cd app
npm run build
# Build images before starting containers.
docker-compose up --build
```

Visit: http://192.168.1.17:3000


## Docker

Stop all containers: `docker stop $(docker ps -q)`

## TODO

- refactor websocket in app and api
- refactor app
- refactor api
- generate fake data
- realtime chart
