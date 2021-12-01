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


### Environment files

At the root of /server and /client, make two environment files:

.env.production

.env.development

### Client environment

Both files must contain values for the following keys:

<ul>
    <li>PORT=XXXX</li>
    <li>REACT_APP_WEBSOCKET_PORT=XXXX</li>
    <li>REACT_APP_SERVER_PORT=XXXX</li>
    <li>REACT_APP_GOOGLE_CLIENT_ID=X</li>

</ul>

### Server environment

Both files must contain values for the following keys:

<ul>
    <li>DASHBOARD_SERVER_PORT=XXXX</li>
    <li>WEBSOCKET_PORT=XXXX</li>
    <li>JWT_SECRET="XXXX"</li>
    <li>RAPID_API_KEY="XXXX"</li>
    <li>CRYPTO_API_KEY="XXXX"</li>
    <li>UNSPLASH_ACCESS_KEY="XXXX"</li>
    <li>UNSPLASH_SECRET_KEY="XXXX"</li>

</ul>

Run development server:
```
cd ./server

npm run dev
```

Run development client:

```
cd ./client
npm run dev
```

Run production environment (mongodb + server + client + mongo-express)

At repository root:
```
docker-compose up -d --build
```

**The development environment still needs the production environment to be running, because mongodb runs in the production container**
