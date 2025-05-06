# Haggle: An Offline Web Game
Group Name: ADHD

Team: Hezekiah Mcdonald, Christian Niehaus, Alex Pacheco, Evan Abbott

### Introduction

Haggle is a card game where you read the mind of your opponent. You take turns placing down cards in your hand, hoping to have the higher value. To do this, you must predict when your opponent will play a high or low card. In this project, we adapt the game to a website where you can play against one bot. The bot randomly plays its hand, meaning you must pay careful attention to the cards that have been played!

To start, both players are given five cards face down. You can view your own cards, but not your opponent’s. If your cards are rather low, you have the option to haggle: remove and replace all but the lowest card in your hand with cards from the deck. Your old cards should be placed in the discard pile, not the deck! You may only haggle before you play your first card.

Once you have picked a card to play, place it in the center face down. Once the other player has haggled (or not haggled) and placed a card down, both players will reveal their own card. The player with the highest card value wins a point for that round. The ace is valued at 1, unless the opponent plays a face card at which point it is treated as 14 (during Haggling, aces are treated as a 1). Face cards are valued as follows: jacks are 11, queens are 12, and kings are 13. If two cards have the same value, the greater suit will win. (club > diamond > spade > heart). The cards in the center are thrown into a discard pile.

After the cards in the center are discarded, each player picks another card to play (haggling is not an option, now that both players have played a card). Players can continue playing rounds until one player reaches three points and wins.

Haggle could follow the trend of card games; they are rarely openly available to play on a web browser. Instead, you must install some form of game management application like Steam or Epic Games. This reduces the accessibility of the games, and what would normally be a simple card game then takes an annoying amount of time to set up and play. With our simple website, we intend to break this pattern.

Our site uses Phaser 5, an HTML-based game engine with great support for modern JavaScript frameworks such as NextJS. We use Phaser, NextJS, and TailwindCSS to create a simple but effective implementation of Haggle.

While we originally intended for online gameplay, the time frame allotted for this project was too small and limited us to only offer an offline version. We also hoped to offer a mobile friendly display, create multiple robots for anyone to play against in a tournament, , and use set-based scoring for determining wins, but these features were also cut out due to time constraints. After these cuts, the site is now a front-end, minimal implementation of Haggle.

In programming this card game, we learned the importance of creating realistic expectations for game development. Still, our baseline version of Haggle succeeds in matching our original motivation for pursuing this project. With our site hosted by Vercel, random visitors can play Haggle and experience what we find so enjoyable about our game.

### Customer Value

There were two main features we removed from the project proposal:

On March 28, the team agreed to remove the backbone for online gameplay and abandon online gameplay overall. The backbone included a Sequelize-based MySQL API for a lobby database. The lobby database included a unique, 4-character ID for each lobby, similar to PointSolutions or Kahoot. While we had the backend, writing all the game logic for the SocketIO websocket servers would have taken far too long under our time frame for the project.

The same day, we also agreed to ignore page responsiveness for mobile development. Instead, we would only focus on laptops and desktop monitors. This was around the time we grew concerned for how long it was taking to finish the basic prototype of Haggle; the team agreed to focus less on responsive design and more on game development.

On April 21, we also dropped the idea of having multiple different bots to play against. Because we would no longer have multiple bots, this also removes the possibility of adding a tournament to compete against them. The pattern continues—we decided to focus on the minimal game implementation due to time constraints.

We also decided to shorten the length of the game at the same time. Originally, winning Haggle required winning three sets as opposed to winning three rounds. Each set would, in itself, be the best of five rounds. Because time limited us to a baseline implementation of Haggle, we decided only to stick with winning three rounds.

### Technology

Since our implementation of Haggle is web-based to maximize availability, a web framework was necessary: NextJS was chosen because of its popularity and extensive documentation. Our team is also most familiar with NextJS, so this framework would lead to the path of least resistance. NextJS’s popularity also encourages JavaScript libraries to offer support for the framework; Phaser is no exception, making it a good game development toolkit for our needs.

The current architecture for the project is entirely on the frontend. Originally, there was a MySQL lobby database which kept track of the currently running games. By hosting or joining an existing game, visitors to the site could interact with the database by playing in games. Besides the database, there was also a SocketIO server the users would connect to on the client side. The websocket server was necessary to create real-time event handling between what was happening in a visitor’s game and the lobby database. However, as described in the previous section, this was dropped due to time constraints.

The site has three main pages. The first page, the landing page, serves as a pretty invitation to visitors to play our card game. The page has a navigation bar which leads to the rules page and the actual game page. The former includes rules and instructions on how to play Haggle, while the latter (visualized above) has the actual Phaser game component the visitor can interact with.

The Haggle game logic can be divided into two groups: the Phaser component’s scene object and our custom game logic classes. Their interactions are driven by the Phaser scene through three different functions within the Phaser scene: first the “load” function loads the game assets (card images, haggle button image, etc.), then the “create” function instantiates our game classes, and our “update” function is called repeatedly to map player inputs to game class functions to change the game state. The update function also changes the size of the screen for responsiveness, as well.

As our Phaser component is HTML-based and based in NextJS, all game logic is written in TypeScript. There are eleven different classes in the game logic:
1. The InActCard class represents cards currently hidden in the game’s deck.
2. The ActCard class represents cards that are currently visualized in someone’s hand.
3. The CardZoneP class is the area in the center of the screen where the player can play their cards.
4. The CardZoneA class is the area where the AI will play their cards.
5. The PlayHand class represents the player’s hand, seen at the bottom of the screen.
6. The AiHand class represents the AI’s hand, where only the cards’ backs are visible at the top of the screen.
7. The Deck class represents the deck of cards, and keeps track of what is left.
8. The HaggleButton class displays a button which allows the user to haggle.
9. The EndMenu class represents both the overlay that appears after a game, and the overlay when the page is first visited.
10. The PointDisplay class renders three poker chips on the top and bottom of the screen to communicate the scores of the player and AI.
11. The Tip class offers instructions on how to play the game in the top left corner of the screen.

Testing was done manually via playing the game. Some bugs that we encountered during this, and have since resolved, include:
- Dragging cards quickly causes them to be dropped;
- Dragging a card over the other cards in your hand would pick up those new cards, so you could pick up every card in your hand at once, but only the most recently picked up card counted;
- Cards appear in top left corner for 1 frame before being moved to your hand;
- Buttons are hard (Hezekiah broke the haggle button for a bit on his branch, idk the specifics);
- Audio doesn’t play before player has interacted with the page, causing every sound that has been queued to play at once;
- Cards were not discarded before new hand is drawn;
- The haggle button activated when the player clicked far outside its bounds.

### Team

All members of the team contributed equally to the project, yet the roles of each member changed to focus on game development towards the end.

- __Hezekiah:__
	As the team's game designer, my responsibilities consisted of creating most of the game, which consisted of Card structures, Structures for the player hand and AI hand, the AI, the card play areas, and the core of all game based functions.

- __Christian:__
	I mostly worked on the frontend with Alex. Together, we created each page except for the game itself, following the designs that Alex had put together. I also added the sound effects to the game.

- __Alex:__
	I did some of the front-end development and design for the game. I made most of the website assets, such as the logo, buttons, and general color scheme. I worked with Christian to make my designs into responsive and usable pages. 

- __Evan:__
	I wrote the database API routes and function wrappers and SocketIO servers when we were planning to do online gameplay. After this, I improved the responsiveness of the landing page. I also added the score display, haggle button, and endgame menu to the Phaser game.

### Project Management

As mentioned earlier, the project dropped online gameplay, mobile friendliness, having multiple bots, and set-based wins due to time constraints. However, there were also a couple programming tasks which—while still completed—took longer than expected: (1) We did not complete any of the pages within the sprint that we wanted to, with each of them having styling issues that we continued to work on throughout most of the project; and (2) the game prototype took several sprints, even when we thought it would only take one.

The page styling took longer than expected due to the custom assets and responsivity required. Also, since aesthetics tend to be an iterative process, it took many commits to satisfy the entire team.

Meanwhile, the game prototype required way more logic than first conceived. We had no idea it would take over eleven classes’ worth of code to implement Haggle. Having the Phaser canvas component change sizes to fit the shape of the screen also bloated the codebase, since any class which displayed something to the screen needed a reload function to shift its assets around.

Despite this, we still managed to create a minimal, one-bot, offline implementation of Haggle.

### Reflection

Now the project has been completed, we can say some things went particularly well:
1. The division of work felt pretty fair throughout the entire project;
2. The game was enjoyable to play with the visual feedback, audio feedback and game assets;
3. And communication on changes to the goal of the project was always made before it was too late.

However, there were a few things which did not go as smoothly:
1. We *greatly* limited the scope of our project, removing multiplayer and multi-bot support. This suggests we were too generous when determining our project.
2. The entire Phaser library is imported dynamically on the play page, meaning NextJS support for Phaser is limited and slow. For future work, we could focus on finding a more optimal tech stack.
3. Work progressed a lot slower than expected because of other responsibilities (COSC360, for example). As a result, cramming towards the end of the project after the four sprints was inevitable.

Rather than having a backlog, four issues were created per sprint. Developers could then assign themselves whichever issue sounds most interesting to them. Once the project was finally finished, playtesting was used to work out any bugs in the game logic.

Despite the limitation in scope, we still created an implementation of Haggle others can enjoy. As such, we consider this project a success. We hope that people can visit this game site and play offline to appreciate the game as we do.