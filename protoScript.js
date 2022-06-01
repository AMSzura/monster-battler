

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


const player = Object.create(monster);
player.name = "squirtle";

const enemy = Object.create(monster);
enemy.name = "charmander";


player.attack(enemy);

console.log(enemy);

player.attack(enemy);

console.log(enemy);

enemy.attack(player);
console.log(player);