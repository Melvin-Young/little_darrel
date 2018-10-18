const Tamagotchi = require('./Tamagotchi');
const { games, ages } = require('./TamagotchiConfig');

const Darrel = new Tamagotchi('Little Darrel', games, ages);
console.log(Darrel.feedMeal());
console.log(`${Darrel.name}`);
