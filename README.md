# Music Playlist

## How to run
- cd to Project via Powershell (Windows) or Terminal (Mac) and run.

```bash 
docker pull node:18-alpine; docker pull mongo:4.2;
docker-compose up -d; docker-compose logs -f -t;

```
- Wait 1-2 minutes depend on internet connection and process.

![](https://i.ibb.co/nRGVJGr/dockerlog.png)

- After 1-2 Minutes, if everything right, you will see log show `Music PlayList is running at http://localhost:8000`

## If you got error exit code 1, try below command.

```bash 
docker-compose down; docker-compose up -d; docker-compose logs -f -t;
```

## How to play
- Open http://localhost:8000

## Tech Stack
- Frontend: React 18
- Backend: NodeJS 18 / ExpressJS 4 / Typescript 4
- Database: MongoDB 4.2
- Container: Docker
