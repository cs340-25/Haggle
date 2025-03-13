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
- Have submit button of host modal form send user to `/play/online/{code}` with randomly generated code
- Have two states for `/play/online/{code}`
    - if lobby DNE, show crude "game DNE" display
    - if lobby exists and only has 1 player (you), show a crude "waiting..." display
    - if lobby has both players, show a crude "game starting" display
- 