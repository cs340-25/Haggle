import { Console } from "console";
import { Collision, Vector, World } from "matter";
import * as Phaser from "phaser";

//Constants
enum SUITS {
    CLUB = 0, 
    DIMA = 1, 
    SPADE = 2, 
    HEART = 3
};

//Card Dimensions
const cardWid = 68;
const cardHigh = 100;


//Card object | Suits: 0=club, 1=dia, 2=spade, 3=heart
//Inactive Card (Cards not seen but Around)
class InActCard {
    suit: integer;
    val: integer;
    frame: integer;

    constructor(Suit: integer, Val: integer) {
        this.suit = Suit;
        this.val = Val;
        this.frame = (Suit * 13) + Val;
    }

    //Card Comparison function that treats ace as 0
    hagCompare(othCard:InActCard){

        let selfVal = this.val;
        let othVal = othCard.val;

        if(selfVal > othVal){
            return true;
        }else if(selfVal == othVal){
            if(this.suit > othCard.suit){
                return true;
            }else{
                return false;
            }
        }

        return false;
    }

    //Compares Card to Other Given Card, returns true if this card is larger, otherwise returns false
    compare(othCard: InActCard) {
        let selfVal: integer = this.val;
        let othVal: integer = othCard.val;

        //Ace Condition
        if(selfVal == 0 && othVal >= 10) {
            selfVal = 13;
        } else if(othVal == 0 && selfVal >= 10) {
            othVal = 13;
        }

        console.log("Player Value: " + selfVal + " Ai Value: " + othVal);

        if(selfVal > othVal) {
            return true;
        } else if(selfVal == othVal) {
            if(this.suit > othCard.suit) {
                return true;
            } else{
                return false;
            }
        }
        
        return false;
    }

    //Returns a string describing the card
    toString(){

    //vars
        let output:string = "";
        let suit:string = "";
        
        switch(this.suit){
            case SUITS.CLUB:
                suit = "clubs";
                break;
            case SUITS.DIMA:
                suit = "dimonds";
                break;
            case SUITS.HEART:
                suit = "hearts";
                break;
            case SUITS.SPADE:
                suit = "spades";
                break;
            default:
                return "Bad Card";
                break;
        }

        switch(this.val){ 
            case 0:
                output = "Ace of " + suit;
                break;
            case 10:
                output = "Jack of " + suit;
                break;
            case 11:
                output = "Queen of " + suit;
                break;
            case 12:
                output = "King of " + suit;
                break;
            default:
                output = (this.val+1) + " of " + suit;
                break;
        }
        return output;
    }
}

//Active Card (Cards seen and Around)
class ActCard extends InActCard {
    //cardVals: InActCard;
    frntText: string; //Front Texture Name
    bckText: string; //Back Texture Name
    sprite: Phaser.GameObjects.Image;
    clicked: boolean;

    //Active Card Constructor (if show back = 0: show face, if show back = 1 cardB[0], else cardB[1])
    constructor(cardInfo: InActCard, xPos: number, yPos: number, scene: Phaser.Scene, showBack: integer) {
        super(cardInfo.suit, cardInfo.val);
        this.clicked = false;
        this.frntText = 'cardF';
        this.bckText = 'cardB';
        this.clicked = false;

        if(showBack == 0) {
            this.sprite = scene.add.sprite(xPos, yPos, this.frntText, cardInfo.frame);
            this.sprite.depth = 2;
        } else if(showBack == 1) {
            this.sprite = scene.add.sprite(xPos, yPos, this.bckText, 0);
            this.sprite.depth = 2;
        } else{
            this.sprite = scene.add.sprite(xPos, yPos, this.bckText, 1);
            this.sprite.depth = 2;
        }
    }

    //Returns an InActCard Obj based on ActCard Info
    toInAct() {
        return new InActCard(this.suit, this.val);
    }

    //Allows Cards to be Clicked & Dragged
    onClicked(mouse: Phaser.Input.Pointer) {

        let clicked: boolean = false;

        //if(this.clicked == false && cardSelect == true) return false;

        if(mouse.isDown) {
            if(mouse.x >= this.sprite.x - (cardWid / 2) && mouse.x <= this.sprite.x + (cardWid / 2)) {
                
                if(mouse.y >= this.sprite.y - (cardHigh / 2) && mouse.y <= this.sprite.y + (cardHigh / 2)) {
                    this.sprite.setPosition(mouse.x, mouse.y);
                    clicked = true;
                }
            }
        }

        //updates
        this.clicked = clicked;

        return clicked;
    }
}

//For TopLeft & BotRight X is first then y is 2nd (Play Card Zone for Player)
class CardZoneP extends InActCard {
    sprite: Phaser.GameObjects.Image;
    backText: [string, number];    //TextureName, Frame
    cardPlaced: boolean;

    constructor(scene: Phaser.Scene) {
        super(0, 0);

        const xPos = runningWidth / 2 + cardWid / 2;
        const yPos = runningHeight / 2 + 45;

        this.sprite = scene.add.sprite(xPos, yPos, 'cardB', 0);
        this.sprite.depth = 2;
        this.backText = ['cardB', 0];
        this.cardPlaced = false;
    }

    //returns true if the given card overlaps with the CardPad & has been not clicked otherwise returns false
    CardPlaceCheck(curCard: ActCard) {
        const xPos = runningWidth / 2 + cardWid / 2
        const yPos = runningHeight / 2 + 45
        const topLeft = [xPos-cardWid/2, yPos-cardHigh/2];
        const botRight = [xPos+cardWid/2, yPos+cardHigh/2];

        //Hover Over cardPad check
        if(curCard.clicked == true) return false;

        //This is the collision check
        if(topLeft[0] <= curCard.sprite.x && botRight[0] >= curCard.sprite.x) {

            if(topLeft[1] <= curCard.sprite.y && botRight[1] >= curCard.sprite.y) {
                console.log("Condition met");
                return true;
            } 
        }

        return false;
    }
    
    ActiveCheck(playHand: PlayHand): boolean {
        for(let i = 0; i < playHand.Cards.length; i++) {
            if(this.CardPlaceCheck(playHand.Cards[i])) {
                this.sprite.setTexture('cardF', playHand.Cards[i].frame);
                this.suit = playHand.Cards[i].suit;
                this.val = playHand.Cards[i].val;
                playHand.PlayCard(i);
                this.cardPlaced = true;

                roundStarted = true;
                return true;
            }
        }
        return false;
    }

    Reset() {
        this.sprite.setTexture(this.backText[0], this.backText[1]);
        this.cardPlaced = false;
    }

    ResetPos() {
        let xPos = runningWidth / 2 + cardWid / 2;
        let yPos = runningHeight / 2 + 45;
        this.sprite.x = xPos;
        this.sprite.y = yPos;
    }

}

//Card Zone for Ai
class CardZoneA extends InActCard {
    sprite: Phaser.GameObjects.Image;
    backText: [string, number];    //TextureName, Frame
    cardPlaced: boolean;

    constructor(scene: Phaser.Scene) {
        super(0, 0);

        let xPos = runningWidth / 2 - cardWid / 2;
        let yPos = runningHeight / 2 - 45;

        this.backText = ['cardB', 1];
        this.sprite = scene.add.sprite(xPos, yPos, 'cardB', 1);
        this.sprite.depth = 2;
        this.cardPlaced = false;
    }

    ResetPos() {
        let xPos = runningWidth / 2 - cardWid / 2;
        let yPos = runningHeight / 2 - 45;
        this.sprite.x = xPos;
        this.sprite.y = yPos;
    }

    PlayCard(card: InActCard) {
        this.suit = card.suit;
        this.val = card.val;
        this.frame = card.frame;

        this.sprite.setTexture('cardF', card.frame);
        this.cardPlaced = true;

    }

    Reset() {
        this.sprite.setTexture(this.backText[0], this.backText[1]);
        this.cardPlaced = false;
    }

}

class PlayHand {
    Cards: ActCard[];
    cardClicked: boolean;    //if a card in hand has been clicked
    handEmpty: boolean;

    constructor() {
        this.Cards = [];
        this.cardClicked = false;
        this.handEmpty = true;
    }


    Update(mouse: Phaser.Input.Pointer, cardPlace: CardZoneP) {

        let cardSelected = false;

        for(let i = 0; i < this.Cards.length; i++) {
            this.Cards[i].onClicked(mouse);
        }

    }

    //resets non-clicked cards positions
    ResetPos() {
        const hndSpc = runningWidth / 4 - (runningWidth * .1);    //Space Between Cards' centers in hand (X)
        const hndStrt = runningWidth / 2 - 2 * hndSpc;    //Hand Starting Position
        const handY = runningHeight * .83;

        for(let i = 0; i < this.Cards.length; i++) {

            if(this.Cards[i].clicked == true) continue;

            if(this.Cards[i].clicked == false) {
                //this.Cards[i].sprite.x = this.crdStrt + ((1+i)* this.crdSpc);
                this.Cards[i].sprite.x = hndStrt + ((i)* hndSpc);
                this.Cards[i].sprite.y = handY;
            }

        }

    }

    //shuffles everything except the smallest card into the deck & draws 4
    Haggle(deck:Deck, scene:Phaser.Scene){

        if(this.Cards.length == 1 || deck.Cards.length < 4) return;

        //Moving Smallest card to end of list
        let tempCard:ActCard = this.Cards[0];
        for(let i = 1; i < this.Cards.length; i++){

            if(this.Cards[i-1].hagCompare(this.Cards[i]) == false){
                
                tempCard = this.Cards[i-1];

                this.Cards[i-1] = this.Cards[i];
                this.Cards[i] = tempCard;

            }
        }

        //Returning cards to deck
        for(let i = 0; i < 4; i++){
            deck.Cards.push(this.Cards[0]);
            this.PlayCard(0);
        }

        //Adding new cards to hand
        for(let i = 0; i < 4; i++){
            this.Cards.push(new ActCard(deck.Draw(), 0, 0,scene,0));
        }
    }


    PlayCard(indx: integer) {
        this.Cards[indx].sprite.destroy();

        for(let i = indx + 1 ; i < this.Cards.length; i++) {
            this.Cards[i-1] = this.Cards[i];
        }

        this.Cards.pop();

        if(this.Cards.length == 0) {
            console.log("Last Card Played | Player");
            this.handEmpty = true;
        }
    }

    DealHand(deck: Deck, scene: Phaser.Scene) {
        const hndSpc = runningWidth / 4 - (runningWidth * .1);    //Space Between Cards' centers in hand (X)
        const hndStrt = runningWidth / 2 - 2 * hndSpc;    //Hand Starting Position
        const handY = runningHeight * .83;

        for(let i = 0; i < 5; i++) {
            let tempInact = deck.Draw();
            let xPos = hndStrt + (hndSpc * (i));
            this.Cards[i] = new ActCard(tempInact, xPos, handY, scene, 0);
        }
        this.handEmpty = false;
    }
}


class AiHand {
    Cards: ActCard[];
    handEmpty: boolean;

    constructor() {
        this.Cards = [];
        this.handEmpty = true;
    }

    //resets non-clicked cards positions
    ResetPos() {
        const hndSpc = runningWidth / 4 - (runningWidth * .1);    //Space Between Cards' centers in hand (X)
        const hndStrt = runningWidth / 2 + 2 * hndSpc;    //Hand Starting Position
        const handY = runningHeight * .17;

        for(let i = 0; i < this.Cards.length; i++) {

            if(this.Cards[i].clicked == true) continue;

            if(this.Cards[i].clicked == false) {
                //this.Cards[i].sprite.x = this.crdStrt + ((1+i)* this.crdSpc);
                this.Cards[i].sprite.x = hndStrt - ((i)* hndSpc);
                this.Cards[i].sprite.y = handY;
            }

        }

    }

    DealHand(deck: Deck, scene: Phaser.Scene) {
        const hndSpc = runningWidth / 4 - (runningWidth * .1);    //Space Between Cards' centers in hand (X)
        const hndStrt = runningWidth / 2 + 2 * hndSpc;    //Hand Starting Position
        const handY = runningHeight * .17;

        for(let i = 0; i < 5; i++) {
            let tempInact = deck.Draw();
            let xPos = hndStrt - (hndSpc * (i));
            this.Cards[i] = new ActCard(tempInact, xPos, handY, scene, 2);
        }
        this.handEmpty = false;
    }

    //returns a random card from Ai Hand, removes card from hand
    PlayRand() {
        let card: ActCard;
        let index: integer;

        //This should never happen
        if(this.Cards.length == 0) {
            console.log("SOMETHING HORRIBLE HAS HAPPENED!!!!");
            return new InActCard(-1, -1);
        }

        index = Math.floor(Math.random() * this.Cards.length);
        card = this.Cards[index];

        this.Cards[index] = this.Cards[this.Cards.length-1];
        this.Cards[this.Cards.length-1] = card;
        this.Cards[this.Cards.length-1].sprite.destroy();
        this.Cards.pop();

        //set hand empty to false if hand is empty
        if(this.Cards.length == 0) {
            console.log("Last Card Played | AI"); 
            this.handEmpty = true;
        }

        return card.toInAct();
    }
}

class Deck {
    Cards: InActCard[];

    constructor() {
        this.Cards = [];
        this.ResetDeck();
    }

    ResetDeck() {
        let newDeck: InActCard[] = [];
        for (let su = 0; su < 4 /*should be 4*/; su++) {
            for(let va = 0; va < 13; va++) {

                //Creates a card to be added to the deck
                let tempCard: InActCard = new InActCard(su, va);
                newDeck.push(tempCard);
            }
        }
        this.Cards = newDeck;
    }

    Draw() {
        let card: InActCard;
        let index: integer;

        //This should never happen
        if(this.Cards.length == 0) {
            return new InActCard(-1, -1);
        }

        index = Math.floor(Math.random() * this.Cards.length);
        card = this.Cards[index];

        this.Cards[index] = this.Cards[this.Cards.length-1];
        this.Cards.pop();

        return card;
    }
}

//Class for cards played
class PlayedLog {

    Log:InActCard[];

    constructor(scene: Phaser.Scene){
        this.Log = [];
    }

    //Adds card to log
    add(card:InActCard){
        this.Log.push(card);
        console.log("Added " + card.toString());
    }

}


class HaggleButton {
    constructor(scene: Phaser.Scene) {
        scene.add.rectangle(runningWidth * .1, runningHeight / 2, cardWid, cardHigh, 0xff0000, roundStarted ? .5 : 1);
    }

    reloadButton(scene: Phaser.Scene) {
        // draw background BEFORE drawing translucent button
        scene.add.rectangle(runningWidth * .1, runningHeight / 2, cardWid, cardHigh, 0x204424, 1);
        scene.add.rectangle(runningWidth * .1, runningHeight / 2, cardWid, cardHigh, 0xff0000, roundStarted ? .5 : 1);
    }

    mouseCheck(mouse: Phaser.Input.Pointer): boolean {
        const topLeft = [runningWidth * .1 - cardWid / 2, runningHeight / 2 - cardHigh / 2];
        const botRight = [runningWidth * .1 + cardWid / 2, runningHeight / 2 + cardHigh / 2];

        if(topLeft[0] <= mouse.x && botRight[0] >= mouse.x) {
            if(topLeft[1] <= mouse.y && botRight[1] >= mouse.y) {
                return true;
            } 
        }
        return false;
    }
}

//Variables

//User Input
let mouse: Phaser.Input.Pointer;
let space: Phaser.Input.Keyboard.Key | undefined;
let spJustPressed = false;

//Card Zones
let playZone: CardZoneP;
let aiZone: CardZoneA;
let haggleBtn: HaggleButton;
let roundStarted = false;

//Important Objects
let playerHand: PlayHand = new PlayHand();
let aiHand: AiHand = new AiHand();
let deck: Deck = new Deck();
let cardLog: PlayedLog;

// Responsivity
let runningWidth:number = 0;
let runningHeight:number = 0;

//Set Win Variables (keeps track of sets won)
let playSWin:number = 0;
let aiSWin:number = 0;

//Bid Win Variables (keeps track of bids won in a set)
let playBWin:number = 0;
let aiBWin:number = 0;

export default class GameScene extends Phaser.Scene {

    constructor() {
        super({key: 'GameScene'});
    };

    preload() {
        this.load.spritesheet('cardF', './assets/CardF_Sheet.png', {frameWidth: cardWid, frameHeight: cardHigh});
        this.load.spritesheet('cardB', './assets/CardB_Sheet.png', {frameWidth: cardWid, frameHeight: cardHigh});

        mouse = this.input.activePointer;
        space = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    create() {
        runningWidth = this.sys.game.scale.gameSize.width;
        runningHeight = this.sys.game.scale.gameSize.height;

        //Adding Background Rectangle
        this.add.rectangle(runningWidth / 2, runningHeight / 2, runningWidth + 2, runningHeight + 2, 0x204424, 1);

        haggleBtn = new HaggleButton(this);
        playZone = new CardZoneP(this);
        aiZone = new CardZoneA(this);
        cardLog = new PlayedLog(this);
        
        aiHand.DealHand(deck, this);
        playerHand.DealHand(deck, this);
    }

    update() {
        let { width, height } = this.sys.game.scale.gameSize;
        
        if (width != runningWidth || height != runningHeight) {
            runningWidth = width;
            runningHeight = height;
            
            //Background
            this.add.rectangle(runningWidth / 2, runningHeight / 2, runningWidth + 2, runningHeight + 2, 0x204424, 1);
            
            aiHand.ResetPos();
            aiZone.ResetPos();
            playZone.ResetPos();
            haggleBtn.reloadButton(this);
        }
        
        // background
        
        if(space?.isDown == false) spJustPressed = false;
        
        //updates position of clicked card
        playerHand.Update(mouse, playZone);
        
        //Sets Card if card is over played zone (doesnt work if current round has ended)
        if(aiZone.cardPlaced == false) {
            let res = playZone.ActiveCheck(playerHand);
            if (res) {
                haggleBtn.reloadButton(this);
            }

            //if haggle button is clicked at the start of round
            if (!roundStarted && mouse.isDown) {
                let res = haggleBtn.mouseCheck(mouse);
                if (res) {
                    //console.log("haggle activated!");
                    playerHand.Haggle(deck,this);
                }
        
                roundStarted = true;
                haggleBtn.reloadButton(this);
            }
        }
        
        //if Player Played a card and Ai Has not
        if(playZone.cardPlaced == true && aiZone.cardPlaced == false) {
            aiZone.PlayCard(aiHand.PlayRand());

            //Adding played cards to log
            cardLog.add(playZone);
            cardLog.add(aiZone);
        }
        
        if(playZone.cardPlaced == true && aiZone.cardPlaced == true) {
            if(space?.isDown && spJustPressed == false) {
                
                if(playZone.compare(aiZone)) {
                    console.log('Player Won');
                    playBWin++;
                } else{
                    console.log('AI Won');
                    aiBWin++;
                }
                
                playZone.Reset();
                aiZone.Reset();
                
                spJustPressed = true;
            }
        }
        
        if((playerHand.handEmpty == true && aiHand.handEmpty == true) && (playZone.cardPlaced == false && aiZone.cardPlaced == false)) {
            console.log("EVERYTHING IS EMPTY");

            //updating set score
            if(playBWin > aiBWin){
                console.log("Player Won the set!");
                playSWin++;
            }else{
                console.log("Ai Won the set!");
                aiSWin++;
            }

            //resetting bid win score
            playBWin = 0;
            playSWin = 0;

            //Won Game check
            if(playSWin == 3){
                console.log("Player Won the game!");
                deck.ResetDeck();
                playSWin = 0;
                aiSWin = 0;
            }else if(aiSWin == 3){
                console.log("Ai Won the game!");
                deck.ResetDeck();
                playSWin = 0;
                aiSWin = 0;
            }

            aiHand.DealHand(deck, this);
            playerHand.DealHand(deck, this);
            roundStarted = false;
            haggleBtn.reloadButton(this);
        }
        
        //move cards back to center if not being dragged
        playerHand.ResetPos();
    }
    
}