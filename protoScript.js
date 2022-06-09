// class for constructing the player object
class Player {
    constructor(name, lineUp) {
        this.name = name;
        this.lineUp = lineUp;
    }
}

// class for constructing the computer opponent object
class Cpu {
    constructor(name, lineUp) {
        this.name = name;
        this.lineUp = lineUp;
    }
}

// class for constructing individual monster objects
class Monster {
    constructor(name, totalHealth, element, attackVal, defenseVal, moves) {
        this.name = name;
        this.totalHealth = totalHealth;
        this.currentHealth = totalHealth;
        this.element = element;
        this.attackVal = attackVal;
        this.currentAttackVal = attackVal;
        this.defenseVal = defenseVal;
        this.currentDefenseVal = defenseVal;
        this.moves = moves;
        if (this.currentHealth > 0) {
            this.currentHealth = 0;
        }
        this.isDead = false;
        if (this.currentHealth == 0) {
            this.isDead = true;
        }
    }
}

//initial declarations/initialisations
let target;
let attacker;
let playerTurn = true;
let playerWon = false;

//determines the target and source for an attack
function determineTarget() {
    if (playerTurn) {
        attacker = player.lineUp[0];
        target = cpu.lineUp[0];
    } else if (!playerTurn) {
        attacker = cpu.lineUp[0];
        target = player.lineUp[0];
    }
}

//determines the lineUp source for a swap function.
function determineTargetSwap() {
    if (playerTurn) {
        attacker = player;
        target = cpu;
    } else if (!playerTurn) {
        attacker = cpu;
        target = player;

    }
}

//to be called after each turn ending event. So far just I/Os playerTurn boolean
function endTurn() {
    (playerTurn) ? playerTurn = false : playerTurn = true;
    (playerTurn) ? console.log("its your turn!") : (console.log("its the enemy's turn"))

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



//swaps active monster for another from lineUp defined by name in function parameter (chosen)
function swap(chosen) {
    determineTargetSwap();
    found = attacker.lineUp.find(element => element.name == chosen);
    targetIndex = attacker.lineUp.indexOf(found);

    console.log(targetIndex);

    attacker.lineUp.swap(0, targetIndex);

    console.log(attacker.lineUp[0]);
    console.log(attacker.lineUp);
    if (playerTurn == true) {
        endTurn();
    }
}

//decides the cpu's action. if current monster health is low: switch, otherwise, use a move.
function cpuTurn() {
    determineTarget();
    if (attacker.currentHealth > 20 && attacker.lineUp.some(element => element.isDead == false)) {
        cpuSwap();
    } else {
        cpuMove();
    }
}

// cpu monster swapping mechanic. swaps to another monster that is not dead and is not the current monster.
function cpuSwap() {
    determineTargetSwap();
    console.log(attacker.lineUp[0]);
    console.log(attacker.lineUp[0].currentHealth);
    found = attacker.lineUp.find(element => element.element.isDead == false && attacker.lineUp.indexOf(element) != 0);
    console.log(found);
    targetIndex = attacker.lineUp.indexOf(found);
    console.log(targetIndex)
    attacker.lineUp.swap(0, targetIndex);
    console.log(attacker.lineUp[0]);
    if (playerTurn != true) {
        endTurn();
    }
}

// picks a random move from current monster moves for the cpu to use
function cpuMove() {
    determineTarget();
    random = Math.floor(Math.random() * attacker.moves.length);
    attacker.moves[random]();
}

//resets monster stat values to their totals
function endBattle() {
    for (let element of player.lineUp) {
        element.currentHealth = element.totalHealth;
        element.currentAttackVal = element.attackVal;
        element.currentDefenseVal = element.defenseVal;
        console.log("player monster's stats reset")
      }
    for (let element of cpu.lineUp) {
        element.currentHealth = element.totalHealth;
        element.currentAttackVal = element.attackVal;
        element.currentDefenseVal = element.defenseVal;
        console.log("cpu monster's stats reset")
    }
}



// below are functions for each move type in the game

function scratch() {
    determineTarget();
    console.log(attacker.name + " used scratch");
    damage = attacker.currentAttackVal;
    console.log(attacker.name + "'s attack value is " + attacker.currentAttackVal);
    console.log("initial damage is " + damage);
    defense = target.currentDefenseVal / 8;
    damage = damage - defense;
    console.log("damage after reduction is " + damage);
    damage = Math.round(damage);
    target.currentHealth = target.currentHealth - damage;

    console.log(attacker.name + " hit " + target.name + " for " + damage + " damage!");
    console.log(target.name + "'s health is now " + target.currentHealth);
    endTurn();
}

function growl() {
    determineTarget();
    console.log(attacker.name + " used growl!");
    damage = attacker.currentAttackVal / 8;
    damage = Math.round(damage);
    y = target.attackVal;
    if (target.currentAttackVal <= calcPerc(50, y)) {
        console.log("the growl had no effect");
    } else {
        target.currentAttackVal = target.currentAttackVal - damage;
        console.log(target.name + "'s attack was reduced by " + damage);
        console.log(target.name + "'s attack is now " + target.currentAttackVal);
    }

    endTurn();

}

//groups functions into battle structure
function battle() {
    if (player.lineUp.every(element => element.isDead == true)) {
        playerWon = false;
        console.log("all your monsters are dead. You lose");
        battlesLost =+ 1;
        endBattle();
        return;
    } else if (cpu.lineUp.every(element => element.isDead == true)){
        playerWon = true;
        console.log("enemies monsters are dead. You win!");
        battlesWon =+ 1;
        endBattle();
        return;
    } else if (!playerTurn) {
        cpuTurn();
    } else {
        console.log("your turn. what will you do?")
    }
}

//declarations for testing

const squirtleData = ["Squirtle", 100, "water", 14, 18, [scratch, growl]];
const rocklerData = ["Rockler", 100, "rock", 12, 22, [scratch, growl]];


let squirtle = new Monster(...squirtleData);
let rockler = new Monster(...rocklerData);
let rocklerCPU = new Monster(...rocklerData);

const player = new Player("aaron", [squirtle, rockler]);
const cpu = new Cpu("bob", [rockler, squirtle]);

playerTurn = true;