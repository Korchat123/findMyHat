const prompt= require('prompt-sync')();

class boardElement{
    constructor(posX=0,posY=0,role="hole")
    {
        this.posX=posX;
        this.posY=posY;
        this.role=role;
    }


}




class field{
   arrField=[];

    constructor(sizeX,sizeY,player,holePos=0,goalPos=0){
        this.sizeX=sizeX;
        this.sizeY=sizeY;
        this.player=player;
        this.holePos=holePos;
        this.goalPos=goalPos;
    }
    createTable(){
      for(let i=0;i<this.sizeX;i++){
        this.arrField[i]=[];
        for(let j=0;j<this.sizeY;j++){
            if(i===this.player.posX&&j===this.player.posY){
            this.arrField[i][j]="P";}
            else{
            this.arrField[i][j]="X";
            } 
        }
    }
    }


    showTable(){
        let writer="";

    for(let j=0;j<this.sizeY;j++){
        for(let i=0;i<this.sizeX;i++){
         //   console.log(this.arrField[i][j]);
            writer=writer+this.arrField[i][j];
        }
        console.log(writer);
        writer="";
    }

    }

    setplayer(player){
        this.player.posX=player.posX;
        this.player.posY=player.posY;
    }

}



function inputNumber(askMessage){
    let answer=parseInt(prompt(askMessage));
    console.log(answer);

    if(answer){
        return answer;
    }
    else{ 
        console.log("Not Integer");
         answer=inputNumber(askMessage);
         return answer;
    }
}


const sizeOfFieldX=inputNumber("input width of field: ");
const sizeOfFieldY=inputNumber("input hight of field: ");

console.log(`sizeOfField ${sizeOfFieldX}x${sizeOfFieldY}`);

const player= new boardElement("Player");


const tableField =new field(sizeOfFieldX,sizeOfFieldY,player);


tableField.createTable();
tableField.showTable();
