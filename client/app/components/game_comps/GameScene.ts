import { Console } from "console";
import { Collision, Vector, World } from "matter";
import * as Phaser from "phaser";


enum SUITS{
    CLUB = 0,
    DIMA = 1,
    SPADE = 2,
    HEART = 3
};

//Inactive Card (Cards not seen but Around)
class InActCard{
    suit:integer;
    val:integer;
    frame:integer;

    constructor(Suit:integer, Val:integer, Frame:integer){
        this.suit = Suit;
        this.val = Val;
        this.frame = Frame;
    }
}

//Active Card (Cards seen and Around)
class ActCard extends InActCard{
    //cardVals:InActCard;
    frntTex:string; //Front Texture Name
    bckText:string; //Back Texture Name
    sprite:Phaser.GameObjects.Image;
    clicked:boolean;

    //Active Card Constructor
    constructor(cardInfo:InActCard, xPos:number, yPos:number, scene:Phaser.Scene){
        super(cardInfo.suit, cardInfo.val, cardInfo.frame);
        this.clicked = false;
        this.frntTex = 'cardF';
        this.bckText = 'cardB';
        this.sprite = scene.add.sprite(xPos,yPos,this.frntTex,cardInfo.frame);
        this.clicked = false;
    }

    //Returns an InActCard Obj based on ActCard Info
    toInAct(){
        return new InActCard(this.suit, this.val, this.frame);
    }

    onClicked(mouse:Phaser.Input.Pointer){

        let clicked:boolean = false;

        if(mouse.isDown){
            if(mouse.x >= this.sprite.x - (cardWid/2) && mouse.x <= this.sprite.x + (cardWid/2)){
                
                if(mouse.y >= this.sprite.y - (cardHigh/2) && mouse.y <= this.sprite.y + (cardHigh/2)){
                    this.sprite.setPosition(mouse.x,mouse.y);
                    
                    this.clicked = true;
                }else{
                    this.clicked = false;
                }

            }else{
                this.clicked = false;
            }

        }else{
            this.clicked = false;
        }

    }
}

//For TopLeft & BotRight X is first then y is 2nd
class CardPlace extends InActCard{
    //CardData:InActCard;
    Sprite:Phaser.GameObjects.Image;
    BackText:[string,number];    //TextureName, Frame
    CardPlaced:boolean;
    TopLeft:[number,number];    //x,y
    BotRight:[number,number];    //x,y

    constructor(xPos:number, yPos:number, scene:Phaser.Scene){
        super(0,0,0);

        this.Sprite = scene.add.sprite(xPos,yPos,'cardB',0);
        this.BackText = ['cardB',0];
        this.CardPlaced = false;
        this.TopLeft = [xPos-cardWid/2,yPos-cardHigh/2];
        this.BotRight = [xPos+cardWid/2,yPos+cardHigh/2];

    }
}

//Variables
let cursours: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
let mouse:Phaser.Input.Pointer;
let right = true;
let justClicked = false;

//
let cardPad:CardPlace | undefined; //This is where played cards are placed

//let showCard:Phaser.GameObjects.Image;
//Important Arrays
    let playerHand:ActCard[] = [];
    let aiHand:InActCard[] = [];
    let deck:InActCard[] = [];
//Card Dimensions
    const cardWid = 68;
    const cardHigh = 100;

export default class GameScene extends Phaser.Scene{

    constructor(){
        super({key:'GameScene'});
    };

    //returns true if the given card overlaps with the CardPad & has been not clicked otherwise returns false
    CardPlaceCheck(curCard:ActCard){

        //returns false if pad hasnt been initalized (should never occur)
        if(cardPad == undefined) return false;

        //Hover Over cardPad check
        if(curCard.clicked == true) return false;

        //This is the collision check
        if(cardPad.TopLeft[0] <= curCard.sprite.x && cardPad.BotRight[0] >= curCard.sprite.x){

            if(cardPad.TopLeft[1] <= curCard.sprite.y && cardPad.BotRight[1] >= curCard.sprite.y){
                console.log("Condition met");
                return true;
            } 
        }

        return false;
    }


//Card object | Suits: 0=club, 1=dia, 2=spade, 3=heart
//Creates an array of InActive cards for each card within a traditional deck
    CreateDeck(){
        let deck:InActCard[] = [];
        for (let su = 0; su < 4 /*should be 4*/; su++) {
            for(let va = 0; va < 13; va++){

                //Creates a card to be added to the deck
                let tempCard:InActCard = {
                    suit:su,
                    val:va,
                    frame:(su*13)+va
                }
                deck.push(tempCard);
            }
        }
        return deck;
    }

//returns a random InActive Card from deck array
    Draw(){
        let card:InActCard;
        let index:integer;

        if(deck.length == 0){

            return {
                suit: -1,
                val: -1,
                frame: 0
            }
        }

        index = Math.floor(Math.random() * deck.length);
        card = deck[index];

        deck[index] = deck[deck.length-1];
        deck.pop();

        return card;
    }


//Haggles A Card
    Haggle(retCard:ActCard){
        let newCard:ActCard;

        let drawnCard:InActCard = this.Draw();

        newCard = new ActCard(drawnCard,retCard.sprite.x,retCard.sprite.y,this);

        if(newCard.suit == -1){
            console.log("something went wrong");
            return newCard;
        }
        deck.push(retCard.toInAct());

        return newCard;
    }


//Allows Cards to be Clicked & Dragged
    OnCardClick(inptCard:ActCard){

        if(mouse.isDown){

            if(mouse.x >= inptCard.sprite.x - (cardWid/2) && mouse.x <= inptCard.sprite.x + (cardWid/2)){
                
                if(mouse.y >= inptCard.sprite.y - (cardHigh/2) && mouse.y <= inptCard.sprite.y + (cardHigh/2)){
                    inptCard.sprite.setPosition(mouse.x,mouse.y);
                    inptCard.clicked = true;
                }else{
                    inptCard.clicked = false;
                }

            }else{
                inptCard.clicked = false;
            }

        }else{
            inptCard.clicked = false;
        }


        //This is a selected Card position check
        if(inptCard.clicked == true){
            console.log("CurCard x: " + inptCard.sprite.x + " CurCard y: " +inptCard.sprite.y);
        }

    }


//Deals the Player's Hand
    DealPlayerHand(){

        for(let i = 0; i < 5; i++){
            let tempInact = this.Draw();
            let xPos = 95 + (100 * (1+i));
            playerHand[i] = new ActCard(tempInact,xPos,350,this);
        }

    }

//Deals AI's Hand
    DealAiHand(){

        for(let i = 0; i < 5; i++){
            let tempInact = this.Draw();
            aiHand.push(tempInact);
        }

    }


//Removes the Card at the selected index from the hand
    ResizingPHand(indx:integer,Hand:ActCard[]){

        Hand[indx].sprite.destroy();

        for(let i = indx + 1 ; i < Hand.length; i++){
            Hand[i-1] = Hand[i];
        }

        Hand.pop();
    }


//Render Player Hand
    UpdatePlayHand(){
        //Player Hand Updates
        //Updates Cards in Player Hand
        for(let i = 0; i < playerHand.length; i++){
            this.OnCardClick(playerHand[i]);

            //Checks if current card has been Played
            if(this.CardPlaceCheck(playerHand[i])){

                console.log("Did the Thing");

                cardPad?.Sprite.setTexture('cardF',playerHand[i].frame);

                this.ResizingPHand(i,playerHand);
                continue;
            }

            if(playerHand[i].clicked == false){
                playerHand[i].sprite.x = 95 + ((1+i)*100);
                playerHand[i].sprite.y = 350;
            }

        }
    }

    preload(){
        this.load.image('sky','./assets/sky.png');
        this.load.spritesheet('cardF','./assets/CardF_Sheet.png',{frameWidth:cardWid, frameHeight:cardHigh});
        this.load.spritesheet('cardB','./assets/CardB_Sheet.png',{frameWidth:cardWid, frameHeight:cardHigh});

        mouse = this.input.activePointer;
        cursours = this.input.keyboard?.createCursorKeys();
    }

    create(){
        const background = this.add.image(400,200,'sky');

        cardPad = new CardPlace(450,200,this);  //this.CardPlacement(450,200);

        deck = this.CreateDeck();
        this.DealPlayerHand();
    }

    update(){

//Player Hand Updates
       this.UpdatePlayHand();

    }

}