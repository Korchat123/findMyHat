const prompt= require('prompt-sync')();

class boardElement{
    constructor(posX=null,posY=null,role="hole")
    {
        this.posX=posX;
        this.posY=posY;
        this.role=role;
    }
    setPos(toX,toY){
            if(toX<=-1||toY<=-1){
                console.log("Out of Map")
            }
            else{
              this.posX=toX;
              this.posY=toY;
        }
    }
}




class field{
   arrField=[];

    constructor(sizeX,sizeY,player,holes,goal){
        this.sizeX=sizeX;
        this.sizeY=sizeY;
        this.player=player;
        this.holes=holes;
        this.goal=goal;
    }

    checkOccupie(targetX,targetY){
        
        if(targetX===this.player.posX&&targetY===this.player.posY){
            return "player";
        }else if(targetX===this.goal.posX&&targetY===this.goal.posY){
             return "goal";
        }else{
            let findHole=false;
                this.holes.forEach(element =>{
                (element.posX===targetX&&element.posY===targetY)?findHole= true:false;
            });

            return (findHole)? "hole":false;
        }
    }

    randomPos(boardEle){
        const newX=Math.round(Math.random()*(this.sizeX-1))
        const newY=Math.round(Math.random()*(this.sizeY-1))
        //console.log(newX);
        //console.log(newY);
        if( this.checkOccupie(newX,newY)){
         //   console.log(this.checkOccupie(newX,newY));
            this.randomPos(boardEle);
        }else{
            boardEle.setPos(newX,newY);
        }


    }
    createTable(){
        
            //    console.log("playerposition"+this.player.posX);
      for(let i=0;i<this.sizeX;i++){
        this.arrField[i]=[];
        for(let j=0;j<this.sizeY;j++){
           // console.log((this.checkOccupie(i,j)));
            switch(this.checkOccupie(i,j)){
            case("player"):this.arrField[i][j]=" P ";break;
            case("hole"):this.arrField[i][j]=" H ";break;
            case("goal"):this.arrField[i][j]=" G ";break;
            default:this.arrField[i][j]=" X ";
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
    checkPlayerMove(newX,newY){
                let oldX=this.player.posX;
                let oldY=this.player.posY;
                if(newX>=this.sizeX||newY>=this.sizeY)
               { console.log("Out of Map");
               }
                else{
                let result=this.checkOccupie(newX,newY)
                if(result===false){
                    this.player.setPos(newX,newY);
                    return "";
                }else if(result==="hole"){
                      this.player.setPos(newX,newY);
                      this.createTable();
                      this.showTable();
                    console.log("There is a hole");
                      this.player.setPos(oldX,oldY);


                    return "";
                }else{
                    console.log("Your find a hat");
                   this.player.setPos(newX,newY);
                   return "goal";
                }
            }
    }

    movePlayer(){
        let move=prompt("Move player by aswd :");
        let x=this.player.posX;
        let y=this.player.posY;
        let result="";

        switch(move){
            case("a"):{result=this.checkPlayerMove(x-1,y);}break;
            case("d"):{result=this.checkPlayerMove(x+1,y);}break;
            case("w"):{result=this.checkPlayerMove(x,y-1);}break;
            case("s"):{result=this.checkPlayerMove(x,y+1);}break;
            case(null):return;break;
            default:console.log("wrong input");
                }
         
                if(result==="goal"){
                    return;
                }
                else{
                    this.createTable();
                    this.showTable();
                    this.movePlayer();
                    return;
                }

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
const numOfHoles=inputNumber("input num of hole: ");

console.log(`sizeOfField ${sizeOfFieldX}x${sizeOfFieldY}`);
const player= new boardElement("Player");
const holes=[];
for(let i=0;i<numOfHoles;i++) {
    const hole= new boardElement("Hole");
    holes.push(hole);
}



const goal= new boardElement("Goal");
const tableField =new field(sizeOfFieldX,sizeOfFieldY,player,holes,goal);

tableField.randomPos(player);
for(let i=0;i<numOfHoles;i++){
    tableField.randomPos(holes[i]);
}
tableField.randomPos(goal);

tableField.createTable();
tableField.showTable();
tableField.movePlayer();
