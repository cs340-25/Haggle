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
const chipSize = 64;

class Mouse{

    scene:Phaser.Scene;

    constructor(scene:Phaser.Scene){
        this.scene = scene;
    }

    //returns true if mouse just clicked
    justClicked() {
        return this.scene.input.activePointer.wasTouch ? 
               this.scene.input.activePointer.getDuration() === 0 : 
               this.scene.input.activePointer.isDown;
    }


    getY(){
        console.log(""+this.scene.input.activePointer.y);
        return this.scene.input.activePointer.y;
    }

    getX(){
        console.log(""+this.scene.input.activePointer.x);
        return this.scene.input.activePointer.x;
    }



}

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
}

//Active Card (Cards seen and Around)
class ActCard extends InActCard {
    //cardVals: InActCard;
    frntText: string; //Front Texture Name
    bckText: string; //Back Texture Name
    sprite: Phaser.GameObjects.Image;
    selected: boolean;

    //Active Card Constructor (if show back = 0: show face, if show back = 1 cardB[0], else cardB[1])
    constructor(cardInfo: InActCard, xPos: number, yPos: number, scene: Phaser.Scene, showBack: integer) {
        super(cardInfo.suit, cardInfo.val);
        this.selected = false;
        this.frntText = 'cardF';
        this.bckText = 'cardB';
        this.selected = false;

        //Used to determine Back Sprite for cards
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
    onClicked(mouse: Mouse) {

        //let clicked: boolean = false;

        if(mouse.justClicked()) {

            if(this.selected == true){
                this.selected = false;
                return true;
            }

            if(mouse.getX() >= this.sprite.x - (cardWid / 2) && mouse.getX() <= this.sprite.x + (cardWid / 2)) {
                
                if(mouse.getY() >= this.sprite.y - (cardHigh / 2) && mouse.getY() <= this.sprite.y + (cardHigh / 2)) {
                    //this.sprite.setPosition(mouse.getX(), mouse.getY());
                    this.selected = true;
                }
            }
        }


        return this.selected;
    }

    update(mouse:Mouse){

        if(this.selected){
            this.sprite.x = mouse.getX();
            this.sprite.y = mouse.getY();
        }

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
        if(curCard.selected == true) return false;

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


    Update(mouse: Mouse, cardPlace: CardZoneP) {

        let cardSelected = false;

        for(let i = 0; i < this.Cards.length; i++) {
            this.Cards[i].onClicked(mouse);
            this.Cards[i].update(mouse);
        }
    }

    PosUpdate(mouse: Phaser.Input.Pointer){

        for(let i = 0; i < this.Cards.length; i++){
            this.Cards[i].posUpdate(mouse);
        }
    }

    //resets non-clicked cards positions
    ResetPos() {
        const hndSpc = runningWidth / 4 - (runningWidth * .1);    //Space Between Cards' centers in hand (X)
        const hndStrt = runningWidth / 2 - 2 * hndSpc;    //Hand Starting Position
        const handY = runningHeight * .83;

        for(let i = 0; i < this.Cards.length; i++) {

            if(this.Cards[i].selected == true) continue;

            if(this.Cards[i].selected == false) {
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

            if(this.Cards[i].selected == true) continue;

            if(this.Cards[i].selected == false) {
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


class HaggleButton {
    constructor(scene: Phaser.Scene) {
        scene.add.rectangle(runningWidth * .1, runningHeight / 2, cardWid, cardHigh, 0xff0000, roundStarted ? .5 : 1);
    }

    reloadButton(scene: Phaser.Scene) {
        // draw background BEFORE drawing translucent button
        scene.add.rectangle(runningWidth * .1, runningHeight / 2, cardWid, cardHigh, 0x204424, 1);
        scene.add.rectangle(runningWidth * .1, runningHeight / 2, cardWid, cardHigh, 0xff0000, roundStarted ? .5 : 1);
    }

    mouseCheck(mouse: Mouse): boolean {
        const topLeft = [runningWidth * .1 - cardWid / 2, runningHeight / 2 - cardHigh / 2];
        const botRight = [runningWidth * .1 + cardWid / 2, runningHeight / 2 + cardHigh / 2];

        if(topLeft[0] <= mouse.getX() && botRight[0] >= mouse.getY()) {
            if(topLeft[1] <= mouse.getX() && botRight[1] >= mouse.getY()) {
                return true;
            } 
        }
        return false;
    }
}


//User Input
let mouse: Mouse;
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

// Responsivity
let runningWidth = 0;
let runningHeight = 0;


export default class GameScene extends Phaser.Scene {

    constructor() {
        super({key: 'GameScene'});
    };

//Haggles A Card
    /*Haggle(retCard: ActCard) {
        let newCard: ActCard;

        let drawnCard: InActCard = this.Draw();

        newCard = new ActCard(drawnCard, retCard.sprite.x, retCard.sprite.y, this);

        if(newCard.suit == -1) {
            console.log("something went wrong");
            return newCard;
        }
        deck.push(retCard.toInAct());

        return newCard;
    }*/

    preload() {
        // this.load.image('sky', './assets/sky.png');
        this.load.spritesheet('cardF', './assets/CardF_Sheet.png', {frameWidth: cardWid, frameHeight: cardHigh});
        this.load.spritesheet('cardB', './assets/CardB_Sheet.png', {frameWidth: cardWid, frameHeight: cardHigh});

        mouse = new Mouse(this);
        space = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    create() {
        runningWidth = this.sys.game.scale.gameSize.width;
        runningHeight = this.sys.game.scale.gameSize.height;

        // add background
        this.add.rectangle(runningWidth / 2, runningHeight / 2, runningWidth + 2, runningHeight + 2, 0x204424, 1);
        // const background = this.add.image(runningWidth * .5, runningHeight * .93 * .5, 'sky');
        // background.setScale(runningWidth / 800, runningHeight / 400);


        haggleBtn = new HaggleButton(this);
        playZone = new CardZoneP(this);
        aiZone = new CardZoneA(this);
        
        aiHand.DealHand(deck, this);
        playerHand.DealHand(deck, this);
    }

    update() {
        let { width, height } = this.sys.game.scale.gameSize;
        
        if (width != runningWidth || height != runningHeight) {
            // const background = this.add.image(width * .5, height * .93 * .5, 'sky');
            // background.setScale(width / 800, height / 400);
            runningWidth = width;
            runningHeight = height;
            
            this.add.rectangle(runningWidth / 2, runningHeight / 2, runningWidth + 2, runningHeight + 2, 0x204424, 1);
            aiHand.ResetPos();
            aiZone.ResetPos();
            playZone.ResetPos();
            haggleBtn.reloadButton(this);
            endMenu.reloadEndMenu(false);
            playChips.reload(playBWin);
            aiChips.reload(aiBWin);
            tip.reload();
        }

        // if set has ended, display the end game screen if necessary
        if (setEnded) {
            if (endMenu.backdrop.alpha == 0) {
                endMenu.reloadEndMenu(false);
            }

            if (mouse.justClicked()) {
                setEnded = false;
                endMenu.reloadEndMenu(false);
                aiChips.reload(aiBWin);
                playChips.reload(playBWin);
                await aiHand.DealHand(deck, this);
                await playerHand.DealHand(deck, this);
                playerHand.haggled = false;
                tip.reload("Drag a card\nto the center!", true);
            }
        }
        
        // if set is running, do normal stuff
        if (!setEnded) {
            // background
            
            if(space?.isDown == false) spJustPressed = false;
            
            //updates position of clicked card
            playerHand.Update(mouse, playZone);
            
            //Sets Card if card is over played zone (doesnt work if current round has ended)
            if(aiZone.cardPlaced == false) {
                let res = playZone.ActiveCheck(playerHand);
                if (res) {
                    roundStarted = true;
                    haggleBtn.reloadButton(this);
                }
    
                //if haggle button is clicked at the start of round
                if (!roundStarted && mouse.justClicked()) {
                    let result = haggleBtn.mouseCheck(mouse);
                    if (result) {
                        //console.log("haggle activated!");
                        await playerHand.Haggle(deck, this);
                    }
                }
            }
            
            //if Player Played a card and Ai Has not
            if(playZone.cardPlaced == true && aiZone.cardPlaced == false) {
                this.sound.play("cardPutDown");
                aiZone.PlayCard(aiHand.PlayRand());
    
                //Adding played cards to log
                cardLog.add(playZone);
                cardLog.add(aiZone);
            }
            
            if(playZone.cardPlaced == true && aiZone.cardPlaced == true) {
                if (tip.curText != "Press space to\ncontinue.") {
                    tip.reload("Press space to\ncontinue.", true);
                }

                if(space?.isDown && spJustPressed == false) {
                    
                    if(playZone.compare(aiZone)) {
                        console.log('Player Won');
                        playBWin++;
                        playChips.reload(playBWin);
                        this.sound.play("win", {detune: 500});
                        tip.reload("Drag a card\nto the center!", true);
                    } else{
                        console.log('AI Won');
                        aiBWin++;
                        aiChips.reload(aiBWin);
                        this.sound.play("win", {detune: -200});
                        tip.reload("Drag a card\nto the center!", true);
                    }
                    
                    playZone.Reset();
                    aiZone.Reset();
                    
                    spJustPressed = true;
                }
            }
            
            if(((playerHand.handEmpty == true && aiHand.handEmpty == true) && (playZone.cardPlaced == false && aiZone.cardPlaced == false)) || (playBWin == 3 || aiBWin == 3)) {
                tip.reload("Tip Display", false);
                
                //updating set score
                if(playBWin > aiBWin){
                    console.log("Player Won the set!");
                    playSWin++;
                    setEnded = true;
                    endMenu.reloadEndMenu(true);
                }else{
                    console.log("Ai Won the set!");
                    aiSWin++;
                    setEnded = true;
                    endMenu.reloadEndMenu(false);
                }

                playBWin = 0;
                aiBWin = 0;

                deck.ResetDeck();
                roundStarted = false;
                haggleBtn.reloadButton(this);
            }
            
            //move cards back to center if not being dragged
            playerHand.ResetPos();
        }
    }
}