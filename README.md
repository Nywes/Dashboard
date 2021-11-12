# Developer Guide


## Commit terminology

"**Folders/files changed** - **Modification code**: *commit description beginning  with a verb*"

---

### Modification codes
C -> Create
U -> Update
D -> Delete

### Example:
```
git commit -m "server/ - U: Created user schema"
```

## Developer environment
---

production server port: 3000 (**3000 is also the default port**)

production client port: 3001

development server port: 4000

development client port: 4001


Run development server:
```
cd ./server

DASHBOARD_SERVER_PORT=4000 node_modules/.bin/nodemon index.js
```

Run development client:

```
cd ./client
npm run dev
```

Run production environment (mongodb + server + client + mongo-express)

At repository root:
```
docker-compose up -d
```

**The development environment still needs the production environment to be running, because mongodb runs in the production container**
