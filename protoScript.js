class Actor {
    constructor(name, lineUp) {
        this.name = name;
        this.lineUp = lineUp;
        this.currentMonster = lineUp[0];

    }
}

// class for constructing the player object
class Player extends Actor {
    constructor(name, lineUp) {
        super(name, lineUp);

    }
}

// class for constructing the computer opponent object
class Cpu extends Actor {
    constructor(name, lineUp) {
        super(name, lineUp);
    }
}

// class for constructing individual monster objects
class Monster {
    constructor(name, totalHealth, element, attackVal, defenseVal, moves, imgFront, imgBack) {
        this.name = name;
        this.totalHealth = totalHealth;
        this.currentHealth = totalHealth;
        this.element = element;
        this.attackVal = attackVal;
        this.currentAttackVal = attackVal;
        this.defenseVal = defenseVal;
        this.currentDefenseVal = defenseVal;
        this.imgFront = imgFront;
        this.imgBack = imgBack;
        this.moves = moves;
        this.move1 = moves[0];
        this.move2 = moves[1];
        this.move3 = moves[2];
        this.move4 = moves[3];
        this.isDead = false;

    }
}

const dom = {
    announcer: document.querySelector(".announcer"),
    actionBar: document.querySelector(".action-bar"),
}

const anim = {
    player: {
        attack() {
            playerMonsterImg.addEventListener('animationend', () => {
                playerMonsterImg.classList.remove("player-attack");
            });
            playerMonsterImg.classList.add("player-attack");
        },
        takeDamage() {
            playerMonsterImg.addEventListener('animationend', () => {
                playerMonsterImg.classList.remove("take-damage");
            });
            playerMonsterImg.classList.add("take-damage");
        },
        swapIn() {
            playerMonsterImg.addEventListener('animationend', () => {
                playerMonsterImg.classList.remove("swap-in");
            });

            playerMonsterImg.classList.add("swap-in");
            playerMonsterImg.classList.remove("swap-out");
        },
        swapOut() {
            playerMonsterImg.classList.add("swap-out");

        }
    },
    cpu: {
        attack() {
            cpuMonsterImg.addEventListener('animationend', () => {
                cpuMonsterImg.classList.remove("enemy-attack");
            });
            cpuMonsterImg.classList.add("enemy-attack");
        },
        takeDamage() {
            cpuMonsterImg.addEventListener('animationend', () => {
                cpuMonsterImg.classList.remove("take-damage");
            });
            cpuMonsterImg.classList.add("take-damage");
        },
        swapIn() {
            cpuMonsterImg.addEventListener('animationend', () => {
                cpuMonsterImg.classList.remove("swap-in");
            });

            cpuMonsterImg.classList.add("swap-in");
            cpuMonsterImg.classList.remove("swap-out");
        },
        swapOut() {
            cpuMonsterImg.classList.add("swap-out");
        },
    }
}



Player.prototype.attack = function (input) {
    if (player.currentMonster.isDead) {
        print.announcer("your " + player.currentMonster.name
            + " is dead. Please switch to a living monster");
        dom.announcer.onclick = announcer.close;
    } else {
        anim.player.attack();
        anim.cpu.takeDamage();
        print.announcer(player.name + "'s " + player.currentMonster.name + " is using " + input.name + "!");
        dom.announcer.onclick = function () {
            announcer.close();
            moves.close();
            determineTarget();
            input();
            print.announcer("the " + input.name + " hit " + target.name + " for " + damage + " damage!");
            dom.announcer.onclick = function () {
                announcer.close();
                checkDead();
                endTurn();
            }


        }

    }

}

Player.prototype.swap = function (chosen) {
    let deadSwap;
    determineTarget();
    if (player.currentMonster.isDead === true) {
        deadSwap = true;
    } else {
        deadSwap = false;
    }
    found = player.lineUp.find(element => element == chosen);
    targetIndex = player.lineUp.indexOf(found);

    if (!deadSwap) {
        anim.player.swapOut();
    }

    print.announcer("player swapped out" + player.lineUp[0].name);
    dom.announcer.onclick = function () {
        player.lineUp.swap(0, targetIndex);
        player.currentMonster = player.lineUp[0];
        playerMonsterImg.src = player.currentMonster.imgBack;
        playerMonsterName.textContent = player.currentMonster.name;
        print.announcer("player swapping in " + player.currentMonster.name);
        dom.announcer.onclick = () => {
            anim.player.swapIn();
            print.announcer("fight!");
            dom.announcer.onclick = () => {
                announcer.close();

                if (!deadSwap) {
                    swap.close();
                    endTurn();

                } else {
                    swap.close();
                }

            }
        }
    }
}

Cpu.prototype.attack = function () {

    determineTarget();
    anim.cpu.attack();
    anim.player.takeDamage();
    random = Math.floor(Math.random() * trainer.currentMonster.moves.length);
    print.announcer("the enemy's " + trainer.currentMonster.name + " is using  "
        + trainer.currentMonster.moves[random].name + "!");
    dom.announcer.onclick = function () {

        announcer.close();
        trainer.currentMonster.moves[random]()
        print.announcer("the " + trainer.currentMonster.name + "'s " +
            trainer.currentMonster.moves[random].name + " did " + damage + "damage!");
        dom.announcer.onclick = function () {
            announcer.close();
            checkDead();
            endTurn();
        }
    }
}

Cpu.prototype.swap = function () {
    determineTarget();
    found = cpu.lineUp.find(element => element.isDead === false && cpu.lineUp.indexOf(element) != 0);
    targetIndex = cpu.lineUp.indexOf(found);
    anim.cpu.swapOut();
    print.announcer("cpu swapped out" + cpu.lineUp[0].name);
    dom.announcer.onclick = () => {
        cpu.lineUp.swap(0, targetIndex);
        cpu.currentMonster = cpu.lineUp[0];
        cpuMonsterImg.src = cpu.currentMonster.imgFront;
        cpuMonsterName.textContent = cpu.currentMonster.name;
        print.announcer("enemy swapped in " + cpu.currentMonster.name)
        dom.announcer.onclick = () => {
        anim.cpu.swapIn();
        announcer.close();
        if (playerTurn != true) {
            endTurn();
        }            
        }

    }

}

Cpu.prototype.turn = function () {
    determineTarget();
    if (cpu.currentMonster.currentHealth < 20 && cpu.lineUp.some(element => element.isDead === false)) {
        cpu.swap();
    } else {
        cpu.attack();
    }
}


const print = {
    log(text) {
        setTimeout(function () {
            newPara = document.createElement("p");
            newPara.textContent = text;
            log.appendChild(newPara);
            log.scrollTo(0, 9999999999);
        }, 500)

    },
    announcer(text) {
        announcer.popUp();
        announcement = document.createElement("h3");
        announcement.textContent = text;
        dom.announcer.replaceChildren(announcement);
    },
}

const announcer = {
    popUp() {
        dom.actionBar.style.display = "none";
        dom.announcer.style.display = "flex";
    },
    close() {
        dom.actionBar.style.display = "flex";
        dom.announcer.style.display = "none";
    }
}

const moves = {
    popUp() {
        actionMenu.style.display = "none";
        movesMenu.style.display = "flex";

        for (x = 0; x < 4; x++) {
            if (player.lineUp[0].moves[x] === undefined) {
                continue;
            } else {
                moveBtnArray[x].textContent = player.lineUp[0].moves[x].name;
            }
        }
    },
    close() {
        actionMenu.style.display = "flex";
        movesMenu.style.display = "none";
    }
}

const swap = {
    popUp() {
        actionMenu.style.display = "none";
        switchMenu.style.display = "flex";

        for (x = 1; x < 5; x++) {
            if (player.lineUp[x] == undefined) {
                continue;
            } else {
                monsterBtnArray[x - 1].textContent = player.lineUp[x].name;
            }

        }
    },
    close() {
        actionMenu.style.display = "flex";
        switchMenu.style.display = "none";
    }
}




//method to ease monster swap functionality. Swaps two elements by index.
Array.prototype.swap = function (x, y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
}

//function to calculate percentage

function calcPerc(percentage, num) {
    result = num * (percentage / 100);
    return parseFloat(result.toFixed(2));
}

//on start button click initalises chosen data to game objects. Contains inits for test purposes.
function battleInit() {

    player = new Player("aaron", []);
    cpu = new Cpu("bob", []);

    player.lineUp[0] = new Monster(...squirtleData);
    player.lineUp[1] = new Monster(...rocklerData);
    cpu.lineUp[0] = new Monster(...rocklerData);
    cpu.lineUp[1] = new Monster(...squirtleData);


    player.currentMonster = player.lineUp[0];
    cpu.currentMonster = cpu.lineUp[0];

    startDisplay.style.display = "none";
    battleDisplay.style.display = "flex";
    playerMonsterImg.src = player.currentMonster.imgBack;
    cpuMonsterImg.src = cpu.currentMonster.imgFront;
    playerMonsterName.textContent = player.currentMonster.name;
    cpuMonsterName.textContent = cpu.currentMonster.name;
}


//initial declarations/initialisations

let target;
let attacker;
let playerTurn = true;
let playerWon = false;
let battleOn;
let player;
let cpu;

//dom element initialisations


const startBtn = document.getElementById("start-button")

const attackBtn = document.getElementById("attack");

const moveBtn1 = document.getElementById("move1");
const moveBtn2 = document.getElementById("move2");
const moveBtn3 = document.getElementById("move3");
const moveBtn4 = document.getElementById("move4");
const moveBtnArray = [moveBtn1, moveBtn2, moveBtn3, moveBtn4];

const switchBtn = document.getElementById("switch");

const monsterBtn1 = document.getElementById("switch1");
const monsterBtn2 = document.getElementById("switch2");
const monsterBtn3 = document.getElementById("switch3");
const monsterBtn4 = document.getElementById("switch4");
const monsterBtn5 = document.getElementById("switch5");
const monsterBtnArray = [monsterBtn1, monsterBtn2, monsterBtn3, monsterBtn4, monsterBtn5];

const playerMonsterImg = document.getElementById("player-monster-img");
const cpuMonsterImg = document.getElementById("enemy-monster-img");

const playerMonsterName = document.getElementById("player-monster-name");
const cpuMonsterName = document.getElementById("enemy-monster-name");


const actionMenu = document.querySelector(".action-menu");
const movesMenu = document.querySelector(".moves-menu");
const switchMenu = document.querySelector(".switch-menu");

const startDisplay = document.querySelector(".start-display");
const battleDisplay = document.querySelector(".battle-display");

const log = document.querySelector(".log");

// const announcer = document.querySelector(".announcer");

// individual monster info and stats data. To be grabbed when initialising monster object.

const squirtleData = ["Raccoon", 100, "normal", 14, 18, [scratch, growl], "images/monsters/raccoonStretch.png", "images/monsters/raccoonBack.png"];
const rocklerData = ["Rockler", 100, "rock", 12, 22, [scratch, growl], "images/monsters/rocklerStretch.png", "images/monsters/rocklerBack.png"];

//initialisations for testing purposes

// let squirtle = new Monster(...squirtleData);
// let rockler = new Monster(...rocklerData);
// let rocklerCPU = new Monster(...rocklerData);



// event listeners, handlers, etc

startBtn.addEventListener('click', battleInit);

attackBtn.addEventListener('click', moves.popUp);

switchBtn.addEventListener('click', swap.popUp);

moveBtn1.addEventListener('click', function () {
    player.attack(player.currentMonster.move1);
});
moveBtn2.addEventListener('click', function () {
    player.attack(player.currentMonster.move2);
});
moveBtn3.addEventListener('click', function () {
    player.attack(player.currentMonster.move3);
});
moveBtn4.addEventListener('click', function () {
    player.attack(player.currentMonster.move4);
});

monsterBtn1.addEventListener("click", function () {
    player.swap(player.lineUp[1]);
});
monsterBtn2.addEventListener("click", function () {
    player.swap(player.lineUp[2]);
});

monsterBtn3.addEventListener("click", function () {
    player.swap(player.lineUp[3]);
});
monsterBtn4.addEventListener("click", function () {
    player.swap(player.lineUp[4]);
});
monsterBtn5.addEventListener("click", function () {
    player.swap(player.lineUp[5]);
});


// determines the target and source for an attack

function determineTarget() {
    if (playerTurn) {
        trainer = player;
        enemy = cpu;
        target = enemy.currentMonster;
    } else if (!playerTurn) {
        trainer = cpu;
        enemy = player;
        target = enemy.currentMonster;
    }
}

function checkDead() {
    if (player.lineUp[0].currentHealth <= 0) {
        player.lineUp[0].isDead = true;
    }
    if (cpu.lineUp[0].currentHealth <= 0) {
        cpu.lineUp[0].isDead = true;
    }
    if (player.lineUp[0].isDead === true) {
        anim.player.swapOut();
        print.announcer(player.currentMonster.name + " is KO'd. pick who's coming out next!");
        dom.announcer.onclick = () => {
            announcer.close();
            swap.popUp();
        }
    }
    if (cpu.lineUp[0].isDead === true) {
        anim.player.swapOut();
        print.announcer("the enemy's " + cpu.currentMonster.name + "is KO'd. They are swapping out");
        dom.announcer.onclick = () => {
            announcer.close();
            cpu.swap();
        }

    }
}



//groups functions into battle structure
function combat() {

    if (player.lineUp.every(element => element.isDead === true)) {
        playerWon = false;
        print.log("all your monsters are dead. You lose");
        battlesLost = + 1;
        endBattle();
        return;
    } else if (cpu.lineUp.every(element => element.isDead === true)) {
        playerWon = true;
        print.log("enemies monsters are dead. You win!");
        battlesWon = + 1;
        endBattle();
        return;
    } else if (!playerTurn) {
        print.log("It's the enemy's turn!");
        cpu.turn();
    } else if (playerTurn === true) {
        print.log("your turn. what will you do?")
    }
}

//to be called after each turn ending event. So far just I/Os playerTurn boolean
function endTurn() {

    if (cpu.lineUp[0].isDead == true) {
        cpu.swap();
    }
    (playerTurn) ? playerTurn = false : playerTurn = true;
    combat();
}

//resets monster stat values to their totals
function endBattle() {
    for (let element of player.lineUp) {
        element.currentHealth = element.totalHealth;
        element.currentAttackVal = element.attackVal;
        element.currentDefenseVal = element.defenseVal;
        element.isDead = false;
        print.log("player monster's stats reset")
    }
    for (let element of cpu.lineUp) {
        element.currentHealth = element.totalHealth;
        element.currentAttackVal = element.attackVal;
        element.currentDefenseVal = element.defenseVal;
        element.isDead = false;
        print.log("cpu monster's stats reset")
    }
    battleOn = false;
}

// below are functions for each move type in the game

function scratch() {
    damage = trainer.currentMonster.currentAttackVal;
    defense = target.currentDefenseVal / 8;
    damage = damage - defense;
    damage = Math.round(damage);
    target.currentHealth = target.currentHealth - damage;
}

function growl() {
    damage = trainer.currentMonster.currentAttackVal / 8;
    damage = Math.round(damage);
    y = target.attackVal;
    if (target.currentAttackVal <= calcPerc(50, y)) {
        print.log("the growl had no effect");
    } else {
        target.currentAttackVal = target.currentAttackVal - damage;
        print.log(target.name + "'s attack was reduced by " + damage);
        print.log(target.name + "'s attack is now " + target.currentAttackVal);
    }
}





