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

let target;
let attacker;
let playerTurn = true;

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

function determineTargetSwap() {
    if (playerTurn) {
        attacker = player;
        target = cpu;
    } else if (!playerTurn) {
        attacker = cpu;
        target = player;

}
}

function endTurn() {
    (playerTurn) ? playerTurn = false : playerTurn = true;
}

Array.prototype.swap = function (x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
  }

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



function scratch() {
    determineTarget();
    damage = attacker.attackVal/2;
    defense = target.defenseVal/2;
    target.currentHealth =- damage;
    console.log(attacker.name + " hit " + target.name + " for " + damage + " damage!");
    endTurn();
    }


const squirtleData = ["Squirtle", 100, "water", 14, 20, [scratch]];
const rocklerData = ["Rockler", 100, "rock", 12, 22, [scratch]];


let squirtle = new Monster (...squirtleData);
let rockler = new Monster (...rocklerData);
let rocklerCPU = new Monster (...rocklerData);

const player = new Player ("aaron", [squirtle, rockler]);
const cpu = new Cpu ("bob", [rockler]);


swap('Rockler')



    // attack(target) { //basic attack function
        // damageValue = (this.attackValue/2);
        // target.currentHealth = target.currentHealth - damageValue;
        // console.log(this.name + " attacked " + target.name + " for " + damageValue + " damage!");

