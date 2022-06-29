# Music Playlist

## How to run
```bash 
docker pull node:18-alpine; docker pull mongo:4.2;
docker-compose up -d; docker-compose logs -f -t;

```
- Wait 1-2 minutes depend on internet connection and process.
- If got error exit code 1, try below command

```bash 
docker-compose down; docker-compose up -d; docker-compose logs -f -t;
```

## Tech Stack
- Frontend: React 18
- Backend: NodeJS 18 / ExpressJS 4 / Typescript 4
- Database: MongoDB 4.2
- Container: Docker
