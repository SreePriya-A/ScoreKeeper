
let target =document.querySelector("#points")
const resetbtn = document.querySelector("#Reset")
const playersSelect = document.querySelector("#playersSelect")
const playerContainer = document.querySelector("#playerContainer")

// const p1 = {
//     button : document.querySelector("#Player1btn"),
//     points : document.querySelector("#Player1")
// }

// const p2 = {
//     button : document.querySelector("#Player2btn"),
//     points : document.querySelector("#Player2")
// }

let isGameOver = false;
let playerObjects = [];
//let players = playersSelect.value;

function createPlayers(){
    let players = playersSelect.value;
    for(let i=1;i<=players;i++){
    let div = document.createElement("div")
    let h2 = document.createElement("h2")
    let score = document.createElement("h2")
    let btn = document.createElement("button")

    div.id = `player${i}`
    div.classList.add("column")
    h2.textContent = `Player ${i}`
    score.textContent = '0'
    score.id = "score"
    btn.textContent = '+1'
    btn.classList.add("button","is-info","is-fullwidth")

    div.append(h2,score,btn)
    console.dir(div)
    playerContainer.append(div)
    }
}

createPlayers()

let scoreList = document.querySelectorAll("#playerContainer #score")
let btnList = document.querySelectorAll("#playerContainer button") 

function createPlayerObjects(){
    for(let i=0;i<playerContainer.children.length;i++){
        playerObjects[i] = {}
        playerObjects[i]["points"] = scoreList[i]
        playerObjects[i]["button"] = btnList[i]
        playerObjects[i]["player"] = i + 1
    }
}

createPlayerObjects()

function updateScores(player,opponent){
    if(!isGameOver){
        let point = parseInt(player.points.textContent);
        player.points.textContent = point+1
        if(player.points.textContent === target.value){
            console.log(target.value)
            console.log(player.points)
            isGameOver=true
            player.button.disabled = true
            opponent.button.disabled = true
            player.points.classList.add("has-text-success")
            opponent.points.classList.add("has-text-danger")
        }
    }
}

// p1.button.addEventListener('click', ()=>{
//     updateScores(p1,p2)
// })

// p2.button.addEventListener('click',()=>{
//     updateScores(p2,p1)
// })

function addEvents(){
    for(let player of playerObjects){
        player.button.addEventListener('click', ()=>{
            if(!isGameOver){
                let point = parseInt(player.points.textContent)
                player.points.textContent = point + 1
                if(player.points.textContent === target.value){
                    isGameOver = true;
                    player.points.classList.add("has-text-success")
                    for(player of playerObjects){
                        if((player.points.textContent) !== target.value){
                            player.points.classList.add("has-text-danger")
                        }
                        player.button.disabled =true
                        }
                    }
                }
            
        })
    }
}

addEvents()

target.addEventListener('change',reset)

resetbtn.addEventListener('click',reset)

playersSelect.addEventListener('change',reset)

function reset(){
    isGameOver = false

    while(playerContainer.firstChild){
        playerContainer.removeChild(playerContainer.firstChild)
    }

    while(playerObjects.length){
        playerObjects.pop()
    }
    createPlayers()
    scoreList = document.querySelectorAll("#playerContainer #score")
    //console.log(scoreList)
    btnList = document.querySelectorAll("#playerContainer button") 
    createPlayerObjects()
    addEvents()
    
}

