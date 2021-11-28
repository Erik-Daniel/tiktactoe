let turn = 1;
let results = [[],[],[]];
let play;
let menu = document.getElementById("menu");
let twoP = document.getElementById("twoPlayer");
let oneP = document.getElementById("onePlayer");
let table = document.querySelector("table");
const body = document.querySelector("body");
twoP.onclick = function() {
    table.style.visibility = "visible";
    body.removeChild(menu);
    play = 1;
}

oneP.onclick = function() {
    play = 0;

    menu.innerHTML = "";

    let buttonX = document.createElement("button");
    buttonX.innerHTML = "X";

    let buttonO = document.createElement("button");
    buttonO.innerHTML = "O";
    buttonX.onclick = function() {
        body.removeChild(menu);

        table.style.visibility = "visible";
        turn = 1;

    }
    buttonO.onclick = function() {
        body.removeChild(menu);
        table.style.visibility = "visible";
        turn = 1;
        setTimeout(function(){computerTurn()},200);

    }
    menu.appendChild(buttonX);
    menu.appendChild(buttonO);


    
    

}



for(let i = 1; i < 4; i++){
    for(let z = 1; z < 4; z++){
        let id = i.toString() + "-" + z.toString();
        let grid = document.getElementById(id);
        grid.addEventListener("click", function(e){
            clicked(id)});
    }
}


function clicked(id) {
    let grid = document.getElementById(id);
    if(grid.innerHTML === ""){
        let row = parseInt(id.slice(0,1)) - 1;
        let column = parseInt(id.slice(2,3)) - 1;
        console.log("row = " + row);
        console.log("column = " + column);
        
        if(turn === 0){
            
            if(grid.innerHTML === ""){
                grid.innerHTML = "O";
                turn = 1;
                results[row][column] = "o";
            }

        }
        else if(turn === 1){
            if(grid.innerHTML === ""){
                grid.innerHTML = "X";
                turn = 0;
                results[row][column] = "x";
                
            }
        }
        calculate(results)

        if(play === 0){
            setTimeout(function(){computerTurn()},200);
        }
    }
    
    console.log(results);
}

function computerTurn() {
    
    let symbol;
    if(turn === 0){
        symbol = "O";
    }
    else {
        symbol = "X";
    }
    //get random number
    //check if its not available
    //if it is
    // redo();
    //else put it in there
    let randomRow = Math.floor(Math.random() * 3);
    let randomColumn = Math.floor(Math.random() * 3);
    let id = (randomRow + 1).toString() + "-" + (randomColumn + 1).toString();
    console.log("id = " + id);
    if(document.getElementById(id).innerHTML === ""){
        document.getElementById(id).innerHTML = symbol ;
        results[randomRow][randomColumn] = symbol;
        if(turn === 0){
            turn = 1;
        }
        else {
            turn = 0;
        }
        calculate(results);
       
    }
    else {
        computerTurn();
    }
}


function calculate(results) {
    if(results[0][0] != null && results[0][0] === results[0][1] && results[0][1] === results[0][2]){ // 1 x x x 
        console.log(1);
        let cordinates = [0,0,0,1,0,2];
        win(cordinates);


    }
    else if(results[1][0] != null && results[1][0] === results[1][1] && results[1][1] === results[1][2]){// 2 x x x 
        let cordinates = [1,0,1,1,1,2];
        
        win(cordinates);
        
        console.log(2);

    }
    else if((results[2][0] != null && results[2][0] === results[2][1] && results[2][1] === results[2][2])){//3 xxx
        let cordinates = [2,0,2,1,2,2];
        
        win(cordinates);
        console.log(3);
    }
    else if((results[0][0] != null && results[0][0] === results[1][0] && results[1][0] === results[2][0])){ // 1 xxx down
        console.log(4);
        let cordinates = [0,0,1,0,2,0];

        win(cordinates);
    }
    
    else if((results[0][1] != null && results[0][1] === results[1][1] && results[1][1] === results[2][1])){// 2 xxx down
        let cordinates = [0,1,1,1,2,1];
        
        win(cordinates);
        console.log(5);

    }
    
    else if((results[0][2] != null && results[0][2] === results[1][2] && results[1][2] === results[2][2])){ // 3 xxx down
        console.log(6);
        let cordinates = [0,2,1,2,2,2];

        win(cordinates);
    }
    
    else if((results[0][0] != null && results[0][0] === results[1][1] && results[1][1] === results[2][2])){ // 1 xxx left to right diagnol
        console.log(7);
        let cordinates = [0,0,1,1,2,2];

        win(cordinates);
    }
    
    else if((results[0][2] != null && results[0][2] === results[1][1] && results[1][1] === results[2][0])){
        console.log(1);
        let cordinates = [0,2,1,1,2,0];

        win(cordinates);
    }
    else {
        let boxCount = 0;
        for(let i = 1; i < 4; i++){
            for(let z = 1; z < 4; z++){
                let id = i.toString()  + "-" + z.toString();
                if(document.getElementById(id).innerHTML != ""){
                    boxCount++;
                }
            }
        }
        if(boxCount === 9){
            tie();
        }
        console.log(boxCount);
    }
}


function win(cordinates) {
    let message;
    for(let i = 1; i < 4; i++){
        for(let z = 1; z < 4; z++){
            let id = i.toString()  + "-" + z.toString();
            document.getElementById(id).style.color = "rgba(70, 70, 70)";
            document.getElementById(id).style.borderColor = "rgba(70, 70, 70)";

        }   
    }
    let firstBox = (cordinates[0] + 1).toString() + "-" + (cordinates[1] + 1).toString();
    console.log(firstBox)
    let secondBox = (cordinates[2] + 1).toString() + "-" + (cordinates[3] + 1).toString();
    let thirdBox = (cordinates[4] + 1).toString() + "-" + (cordinates[5] + 1).toString();
    document.getElementById(firstBox).style.color = "white";
    document.getElementById(secondBox).style.color = "white";
    document.getElementById(thirdBox).style.color = "white";


    if(turn === 0){
        message = "Player 1 won!";
        
    }
    else {
        message = "Player 2 won!";
    }
    setTimeout(function(){
        alert(message)
        window.location.reload();
    },100);
    

}

function tie() {
    setTimeout(function(){alert("It is a tie!")
    window.location.reload();},100);
}
