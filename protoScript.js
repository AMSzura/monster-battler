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
        this.element = element;
        this.attackVal = attackVal;
        this.defenseVal = defenseVal;
        this.moves = moves;
    }
}

//initial declarations/initialisations
let target;
let attacker;
let playerTurn = true;

//determines the target and source for an attack
function determineTarget() {
    if (playerTurn) {
        attacker = player.lineUp[0];
        target = cpu.lineUp[0];
    } else if (!playerTurn) {
        attacker = cpu.lineUp[0];
        target = player.lineUp[0];
    }
    console.log("attacker is " + attacker + ". target is " + target);
}

//determines the lineUp source for a swap function
function determineTargetSwap() {
    if (playerTurn) {
        attacker = player;
        target = cpu;
    } else if (!playerTurn) {
        attacker = cpu;
        target = player;

}
}

//to be called after each turn ending event
function endTurn() {
    (playerTurn) ? playerTurn = false : playerTurn = true;
}

//method to ease monster swap functionality
Array.prototype.swap = function (x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
  }

  //to swap active monster for another in lineUp
function swap(chosen) {
    determineTargetSwap();
    found = attacker.lineUp.find(element => element.name == chosen);
    targetIndex = attacker.lineUp.indexOf(found);

    console.log(targetIndex);

    attacker.lineUp.swap(0,targetIndex);

    console.log(attacker.lineUp[0]);
    console.log(attacker.lineUp);
    endTurn();
    }


// below are functions for each move type in the game

function scratch() {
    determineTarget();
    damage = attacker.attackVal/2;
    defense = target.defenseVal/2;
    target.currentHealth =- damage;
    console.log(attacker.name + " hit " + target.name + " for " + damage + " damage!");
    endTurn();
    }


    //declarations for testing

const squirtleData = ["Squirtle", 100, "water", 14, 20, [scratch]];
const rocklerData = ["Rockler", 100, "rock", 12, 22, [scratch]];


let squirtle = new Monster (...squirtleData);
let rockler = new Monster (...rocklerData);
let rocklerCPU = new Monster (...rocklerData);

const player = new Player ("aaron", [squirtle, rockler]);
const cpu = new Cpu ("bob", [rockler]);
