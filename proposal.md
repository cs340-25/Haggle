# Haggle Project Proposal

Project Name: Haggle

Team Name: Awesome Developments with Haggle Developers (ADHD)

Christian Niehaus, Alex Pacheco, Evan Abbott, Hezekiah McDonald

## Introduction

### Objective and Motivation

Haggle is an online multiplayer game based on a card game created by Hezekiah. We
wish to pursue Haggle as a means of learning modern web game development. However,
we also desire to create a fun space for people (including ourselves) to relax and 
play a card game!

### Market Context

While there are already online web card games such as UNO and Balatro, this game in 
particular does not exist. Our focus on being a card game already limits our 
competitors, but our game also puts a focus on player communication and reading your
opponent to further this effect.

### Team Member Background

| Member Name | Previous Experience |
| - | - |
| Evan Abbott | Tech Lead in Hack 4 Impact |
| Christian Niehaus | Has done professional website development |
| Hezekiah McDonald | Has designed and implemented a variety of games, and designed the game we will be implementing here |
| Alex Pacheco | Graphic design experience, made several projects involving design |

## Customer Value 

### Primary Customer

Our mock gambling atmosphere caters to those who wish to relax while playing cards in 
a casino-esc way without actually having to worry about their finances. More 
generally, Haggle's simpler ruleset welcomes both experienced and inexperience gamers 
to enjoy the chaos of our game!

### Market Context

As previously stated, many card-based video game games exist on the internet. 
Although, none of the most popular of these (such as UNO and Balatro) are offered on 
the web browser for maximum accessibility. None of these games match our exact rule 
set, either. Haggle focuses entirely on haggling one's opponent(s), hence the 
simplicity of the game. This emphasis on player communication and reading other's 
motives will help us further stand out.

## Proposed Solution & Technology
### Proposed Solution

Our card game offers a fun and engaging experience on the web, filled with many 
opportunities to ruin your existing friendships (in a good way). Before selecting this 
project, we tested the core game in person with each other to make sure that others 
would enjoy it.

### Measure of Success

We will know that the customer will have benefited from our project if they enjoy 
playing our game. Our customer-centric measures of success will be tied to playtime, 
and average rating of enjoyment.

### Technology
#### What We Deliver

We will be establishing websocket connections with every client that joins a room, and then using those to allow communication between players and game events. We have a main server that will be hosted on a cloud provider (we don’t know which one yet), and then each client will connect to that server. The server will communicate with the database to keep all of our information safe and secure.

A high level block diagram of the architecture:

<p align="center">
    <img alt="Haggle Architecture" src="Haggle_Architecture.png"/>
</p>

#### Minimal System, Enhancements, and Testing

A minimal system would be an offline version of the game, where you can play by yourself with a bot—possibly of varying strengths. However, there are many features we could add to this system:

- The online aspect of the game will add value, and other bots that we add would also add value.
- Keeping the connection and play experience smooth would boost the total customer value.

We will test our system with all 4 of us connecting and playing, as well as individually playing against the bots.

#### Tools

We will be using Next.js for the main website portion, and AUTH0 for user logins and accounts. We will also be using Socket.io to handle the websocket connections, as well as Phaser.js as a game framework on the frontend.

There are several cloud providers that we will be looking through to find the one that we want to use, and we will especially be looking into free hosting services.

## Team

| Name | Skills | Role |
| - | - | - |
| Christian `CS Brain` Niehaus | JavaScript, Relational Databases, Game Development | Back-end Developer |
| Alex `Pistachio` Pacheco | Design experience, Databases, Game Development | Graphic Designer, Front-end Developer |
| Evan `The GOATed SHEEP` Abbott | Relational/non-relational databases, API routes, Next.js, websockets, SWE leadership | Team Lead, Full-stack Developer |
| Hezekiah `Conqueror` Mcdonald | Game Development, Basic JavaScript | Game Designer, Game Lead, Front-end Developer |

## Project Management

### Schedule

The scope of tools required for this project is spanned by our team’s collective skills, meaning the rate of development will be consistent. We’re already meeting every other week on Mondays at 1:00 PM to discuss plans for sprints and the overall progress towards our goal.



| Week Number | Description |
| ------------------- | --------------- |
| 1 | - Create basic landing page <br> - Create basic rules page <br> - Create basic play page <br> - Begin prototype of offline game |
| 2 | - Create prototype of offline game <br> - Stylize landing page <br> - Stylize play page <br> - Create API routes and very basic display for user database |
| 3 | - Finish offline game functionality with very basic styling <br> - Create leaderboard component <br> - Create API routes and basic display for online games in “play”  <br> - Stylize rules page |
| 4 | - Begin prototype for events handling and database read/write in online game <br> - Create stylized template for online game <br> - Allow users to “join” games that aren’t actually games, just pages <br> - Actually stylize the offline game |
| 5 | - Begin creating prototype for online game <br> - With context of stylized offline game, restyle landing, rules, and play page |
| 6 | - Finish creating prototype for online game |
| 7 | - Complete functionality of the online game |
| 8 | - Polish/bug fix/finish everything |

### Constraints

For obvious reasons, no real money should be attributed to our game. Most importatly, secure authentication practices are our top priority to ensure the safety of our playerbase.

### Resources

Auth0 will be used to gain access to Google Account authentication so that we can 
identify users. Using the Auth0 user ID's, we can then create our own user database 
without risking people's security.

### Descoping
In the event that we cannot finish the full functionality that we have planned, we would leave the game as a local, single player game.
