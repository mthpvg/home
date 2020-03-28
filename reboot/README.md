# Reboot

## Quickstart

Build images before starting containers.
```
docker-compose up --build
```

Visit: http://192.168.1.17:3000


## Docker

Stop all containers: `docker stop $(docker ps -q)`

## TODO
- [api] generate data after x minutes (sensors warmup): temp, humidity, pressure, air quality
- [api] webscoket
- [app] websocket
- [app] realtime chart
