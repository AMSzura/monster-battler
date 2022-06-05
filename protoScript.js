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
    constructor(name, totalHealth, element, attackVal, defenseVal) {
        this.name = name;
        this.totalHealth = totalHealth;
        this.element = element;
        this.attackVal = attackVal;
        this.defenseVal = defenseVal;
    }
}

const squirtle = ["Squirtle", 100, "water", 14, 20];


let Squirtle = new Monster (...squirtle);

console.log(Squirtle);



    // attack(target) { //basic attack function
        // damageValue = (this.attackValue/2);
        // target.currentHealth = target.currentHealth - damageValue;
        // console.log(this.name + " attacked " + target.name + " for " + damageValue + " damage!");

