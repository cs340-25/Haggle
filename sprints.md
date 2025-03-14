# Sprints Outline

## Sprint 1
- Create basic layout for rules and landing page
- Create basic layout for play page
- Create API routes for lobbies and users
- Inject Phazor into NextJS with basic assets

## Sprint 2
- Create bare functionality prototype of offline game
- Make `/rules` and `/` landing page mobile friendly
    - Make buttons change color when clicking or hovering
- Create modal component that asks for necessary hosting preferences
    - clicking submit should console.log the object w/ random lobby code
    - add object to db
- Have offline button link to offline page AND have join button send user to `/play/online/{code}`
    - you will need to create a client side NextJS component with useState() to track text-based input

## Sprint 3
# Sprints Outline

## Sprint 1
- Create basic layout for rules and landing page
- Create basic layout for play page
- Create API routes for lobbies and users
- Begin prototype of offline game

## Sprint 2
- Continue prototype of offline game
- Properly stylize rules and landing page (with haggle assets, too!)
- Properly stylize play page (with haggle assets, too!)
- Create developer page for crude creating, reading, updating and deleting (CRUD) of user and session models

## Sprint 3
- Finish prototype of offline game
- Visiting `/online/{code}` should automatically add you to the lobby
    - leaving should remove you from the lobby
    - if you're the last to leave, delete the lobby
    - if the lobby is full, redirect to home page
- Create stylized placeholder for `/online/{code}`
- Clicking the random button should redirect you to a random, non-full public lobby
    - Hosting using the host modal should direct you to the proper `/online/{code}`