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