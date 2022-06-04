class playerObject {
    constructor(name, lineUp) {
        this.name = name;
        this.lineUp = lineUp;
    }
}

class cpuObject {
    constructor(name, lineUp) {
        this.name = name;
        this.lineUp = lineUp;
    }
}







const monster = {
    totalHealth: 100,
    currentHealth: 100,
    attackValue: 20,
    defenseValue: 8,
    attack(target) { //basic attack function
        damageValue = (this.attackValue/2);
        target.currentHealth = target.currentHealth - damageValue;
        console.log(this.name + " attacked " + target.name + " for " + damageValue + " damage!");
    }
}
