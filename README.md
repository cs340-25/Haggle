# Haggle

A NextJS, online card game perfect for ruining friendships.


## 1. How to use

Change directories in two terminals to both `/client` and `/game_server`. Follow
the necessary instructions there to run the corresponding service!


## 2. Planned layout

<p align="center">
    <img alt="Haggle Architecture" src="Haggle_Architecture.png"/>
</p>


### i. Page Routes

Here are the planned functionalities for the different routes:

- `/`
    - nav bar to `/play`, `/rules`, and `/`
    - invite player to sign in
    - about

- `/rules`
    - nav bar to `/play`, `/rules`, and `/`
    - explains the game
        - plenty of visuals?

- `/play`
    - nav bar to `/play`, `/rules`, and `/`
    - can play offline OR online w/o signing in
        - playing online w/o signing in doesn't update leaderboard
        - user can set anonymous username with sessionStorage API
    - public leaderboards
    - if signed in, show where they are in leaderboard
    - show games to play as a vertical list
        - hyperlink elements link to `/play/online/[gameTitle]`
            - display number of users already in game
            - display title of the game room
        - reload button
    - create new game button
        - opens form that takes in gameTitle

- `/play/offline`
    - user can play a game locally
    - game screen should take up most of the area
    - disconnect button in bottom right corner
    - <b>single player should be implemented first</b>

- `/play/online/[gameTitle]`
    - use can play a game online
    - game screen should take up most of the area
    - disconnect button in bottom right corner


### ii. Models

We'll be using Sequelize as the ORM, but here's the models:

> <hr>
> <h3>User</h3>
>
> | Field | Datatype | Constraints | Justification |
> | -------- | ------- | ------- | ----- |
> | `username` | `string` | unique, required | The display name during games |
> | `email` | `string` | unique, required | Needed for Auth0-based lookups |
> | `whitelist_default` | `User[]` | required, can be empty | Allow certain users private games by default |
<br>


> <hr>
> <h3>Game</h3>
>
> | Field | Datatype | Constraints | Justification |
> | -------- | ------- | ------- | ----- |
> | `gameTitle` | `string` | unique, required | Needed for API and page access |
> | `players` | `string` | required, can be empty | Signed in players to update after game |
> | `numPlayers` | `number` | required | Number of players in game |
> | `private` | `bool` | required | If true, only allows signed in, whitelisted players |
> | `whitelist` | `User[]` | can be empty | Allow certain users private games by default |
> | `state` | `string` | required, CANNOT be empty | Current state of game |


### iii. API Routes

- `/users`
    - public leaderboard users

- `/games?allow_full=false`
    - search for existing games online

> [!NOTE]
> More details regarding communication between the websocket server and
> NextJS application will be specified later into development. The same
> goes for interactions between the websocket server and the database.