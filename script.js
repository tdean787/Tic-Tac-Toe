
const gameboard = {
    //getting the status of boxes
    verticalBoxes: [],
    checkGameStatus: () => {
        console.log('test');
    }
};

const renderGameboard = (() => {
    var boxcheck = true;
    var gameboard = document.querySelector('#gameboard');
    for(let i=0; i<9; i++){
        var box = document.createElement("div");
        // if(boxcheck == true){
        //     box.innerText = "X"
        // } else {
        //     box.innerText = "O"
        // }
        box.textContent = '[  ]'
        gameboard.append(box)
        box.className = (i + " box")
        box.id = i
        // boxcheck = !boxcheck
    }
})();

boxes = document.querySelectorAll(".box")
console.log(boxes)

const displayController = ((event) => {
    var boxes = document.querySelectorAll(".box");
    var turnSwitching = true;
    boxes.forEach(function(el) {
        el.addEventListener("click", function() {
            if(turnSwitching == true){
                el.textContent = playerOne.symbol;
            } else {
                el.textContent = playerTwo.symbol;
            }
            console.log('click ' + el.id + el.innerHTML)
            turnSwitching = !turnSwitching
            gameboard.checkGameStatus();
        })
    })
})();

const Player = (symbol, username) => {
    return {symbol, username}
}

const playerOne = Player('X', 'Taylor')
const playerTwo = Player('O', 'other')