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

Player.prototype.attack = function (input) {
    if (player.currentMonster.isDead) {
        console.log("your " + player.currentMonster.name
         + " is dead. Please switch to a living monster")
    } else {
        console.log("attack is being called");
        movesPopUpClose();
        determineTarget();
        input();
        checkDead();
        endTurn();
    }

}

Player.prototype.swap = function (chosen) {
    let deadSwap = false;
    determineTarget();
    if (player.currentMonster.isDead === true) {
        deadSwap = true;
    }
    found = player.lineUp.find(element => element == chosen);
    targetIndex = player.lineUp.indexOf(found);
    console.log("player swapped " + player.lineUp[0].name + " for " + player.lineUp[targetIndex].name);
    player.lineUp.swap(0, targetIndex);
    player.currentMonster = player.lineUp[0];
    switchPopUpClose();
    if (!deadSwap) {
        deadSwap = false;
        endTurn();
    }
}

Cpu.prototype.attack = function () {
    console.log("cpu attack is being called");
    determineTarget();
    random = Math.floor(Math.random() * trainer.currentMonster.moves.length);
    trainer.currentMonster.moves[random]();
    checkDead();
    endTurn();

}

Cpu.prototype.swap = function () {
    determineTarget();
    found = cpu.lineUp.find(element => element.isDead === false && cpu.lineUp.indexOf(element) != 0);
    targetIndex = cpu.lineUp.indexOf(found);
    console.log("cpu swapped " + cpu.lineUp[0].name + " for " + cpu.lineUp[targetIndex].name);
    cpu.lineUp.swap(0, targetIndex);
    cpu.currentMonster = cpu.lineUp[0];
    if (playerTurn != true) {
        endTurn();
    }
}

Cpu.prototype.turn = function () {
    determineTarget();
    console.log("test");
    if (cpu.currentMonster.currentHealth < 20 && cpu.lineUp.some(element => element.isDead === false)) {
        cpu.swap();
    } else {
        cpu.attack();
    }
}

//method to ease monster swap functionality. Swaps two elements by index.
Array.prototype.swap = function (x, y) {
    console.log("swap is being called")
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


//initial declarations/initialisations
let target;
let attacker;
let playerTurn = true;
let playerWon = false;
let battleOn;


//dom element initialisations

// const dom = {
//     switchMenu : document.querySelector(".switch-menu"),

// },

//     monsterBtn1 : document.getElementById("switch1"),
//     monsterBtn2 : document.getElementById("switch2"),
//     monsterBtn3 : document.getElementById("switch3"),
//     monsterBtn4 : document.getElementById("switch4"),
//     monsterBtn5 : document.getElementById("switch5"),

// }

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


const actionMenu = document.querySelector(".action-menu");
const movesMenu = document.querySelector(".moves-menu");
const switchMenu = document.querySelector(".switch-menu"); 

// individual monster info and stats data. To be grabbed when initialising monster object.

const squirtleData = ["Raccoon", 100, "normal", 14, 18, [scratch, growl], images/monsters/raccoonStretch.png, images/monsters/raccoonBack.png];
const rocklerData = ["Rockler", 100, "rock", 12, 22, [scratch, growl], images/monsters/rocklerStretch.png, images/monsters/rocklerBack.png];

//initialisations for testing purposes

// let squirtle = new Monster(...squirtleData);
// let rockler = new Monster(...rocklerData);
// let rocklerCPU = new Monster(...rocklerData);

const player = new Player("aaron", []);
const cpu = new Cpu("bob", []);

player.lineUp[0] = new Monster(...squirtleData);
player.lineUp[1] = new Monster(...rocklerData);
cpu.lineUp[0] = new Monster(...rocklerData);
cpu.lineUp[1] = new Monster(...squirtleData);

//THESE TWO TO BE PUT IN BATTLE INIT FUNC!!!!!!!

player.currentMonster = player.lineUp[0];
cpu.currentMonster = cpu.lineUp[0];

// event listeners, handlers, etc

attackBtn.addEventListener('click', movesPopUp);

switchBtn.addEventListener('click', switchPopUp);

moveBtn1.addEventListener('click', function() {
    player.attack(player.currentMonster.move1);
});
moveBtn2.addEventListener('click', function() {
    player.attack(player.currentMonster.move2);
});
moveBtn3.addEventListener('click', function() {
    player.attack(player.currentMonster.move3);
});
moveBtn4.addEventListener('click', function() {
    player.attack(player.currentMonster.move4);
});

monsterBtn1.addEventListener("click", function() {
    player.swap(player.lineUp[1]);
});
monsterBtn2.addEventListener("click", function() {
    player.swap(player.lineUp[2]);
});

monsterBtn3.addEventListener("click", function() {
    player.swap(player.lineUp[3]);
});
monsterBtn4.addEventListener("click", function() {
    player.swap(player.lineUp[4]);
});
monsterBtn5.addEventListener("click", function() {
    player.swap(player.lineUp[5]);
});

// sets action menu to invisible, moves menu to display.
function movesPopUp() {
    actionMenu.style.display = "none";
    movesMenu.style.display = "flex";

    for (x = 0; x < 4; x++) {
        if (player.lineUp[0].moves[x] === undefined) {
            continue;
        } else {
            moveBtnArray[x].textContent = player.lineUp[0].moves[x].name;            
        }

    }
}

//reverses Pop up function
function movesPopUpClose() {
    actionMenu.style.display = "flex";
    movesMenu.style.display = "none";
}

// sets action menu invisible, switch menu to display
 function switchPopUp() {    
    actionMenu.style.display = "none";
    switchMenu.style.display = "flex";

    for (x = 1; x < 5; x++) {
        if (player.lineUp[x] == undefined) {
            continue;
        } else {
            monsterBtnArray[x-1].textContent = player.lineUp[x].name;
        }

    }
 }

 function switchPopUpClose() {
    actionMenu.style.display = "flex";
    switchMenu.style.display = "none";
 }

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
    } else if (cpu.lineUp[0].currentHealth <= 0) {
        cpu.lineUp[0].isDead = true;
    }
}



//groups functions into battle structure
function combat() {

    if (player.lineUp.every(element => element.isDead === true)) {
        playerWon = false;
        console.log("all your monsters are dead. You lose");
        battlesLost = + 1;
        endBattle();
        return;
    } else if (cpu.lineUp.every(element => element.isDead === true)) {
        playerWon = true;
        console.log("enemies monsters are dead. You win!");
        battlesWon = + 1;
        endBattle();
        return;
    } else if (!playerTurn) {
        console.log("the enemy is taking their turn");
        cpu.turn();
    } else if (playerTurn === true) {
        console.log("your turn. what will you do?")
    }
}

//to be called after each turn ending event. So far just I/Os playerTurn boolean
function endTurn() {

    if (cpu.lineUp[0].isDead == true) {
        cpu.swap();
    }

    (playerTurn) ? playerTurn = false : playerTurn = true;
    (playerTurn) ? console.log("its your turn!") : (console.log("its the enemy's turn"));

    combat();
}

//resets monster stat values to their totals
function endBattle() {
    for (let element of player.lineUp) {
        element.currentHealth = element.totalHealth;
        element.currentAttackVal = element.attackVal;
        element.currentDefenseVal = element.defenseVal;
        element.isDead = false;
        console.log("player monster's stats reset")
    }
    for (let element of cpu.lineUp) {
        element.currentHealth = element.totalHealth;
        element.currentAttackVal = element.attackVal;
        element.currentDefenseVal = element.defenseVal;
        element.isDead = false;
        console.log("cpu monster's stats reset")
    }
    battleOn = false;
}

// below are functions for each move type in the game

function scratch() {
    console.log(trainer.currentMonster.name + " used scratch");
    damage = trainer.currentMonster.currentAttackVal;
    console.log(trainer.currentMonster.name + "'s attack value is " + trainer.currentMonster.currentAttackVal);
    console.log("initial damage is " + damage);
    defense = target.currentDefenseVal / 8;
    damage = damage - defense;
    console.log("damage after reduction is " + damage);
    damage = Math.round(damage);
    target.currentHealth = target.currentHealth - damage;

    console.log(trainer.currentMonster.name + " hit " + target.name + " for " + damage + " damage!");
    console.log(target.name + "'s health is now " + target.currentHealth);
}

function growl() {
    console.log(trainer.currentMonster.name + " used growl!");
    damage = trainer.currentMonster.currentAttackVal / 8;
    damage = Math.round(damage);
    y = target.attackVal;
    if (target.currentAttackVal <= calcPerc(50, y)) {
        console.log("the growl had no effect");
    } else {
        target.currentAttackVal = target.currentAttackVal - damage;
        console.log(target.name + "'s attack was reduced by " + damage);
        console.log(target.name + "'s attack is now " + target.currentAttackVal);
    }
}





