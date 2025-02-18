# NextJS Client

The website hosting the Haggle card game. Creates the graphical
interface for interacting with the games database and game websocket
server.

## How to use

1. Download and install both the MySQL Community Server and MySQL Shell.

2. Start the server and create a user (most likely root).

3. Create a database for the project and add the corresponding `.env.local` variables:

```
MYSQL_BASE="databaseName"
MYSQL_USER="username"
MYSQL_PASS="password"
MYSQL_URL="localhost"
```

4. Then, simply install the necessary packages and run the dev command:
```
pnpm i
pnpm dev
```

> [!WARNING]
> Make sure you're also running the game websocket server
> found in `/game_server` directory of the overall project.