(async function() {
	const Tamagotchi = require('./Tamagotchi');
	const { Games, Foods, Ages } = require('./TamagotchiConfig');
	const { initializationPrompts } = require('./UserInterface');
	const Inquirer = require('inquirer');

	const config = await Inquirer.prompt(initializationPrompts)
	.then(({ name, games, foods }) => {
		const configGames = games ? games.split(/[ ,]+/) : Games;
		const configFoods = foods ? foods.split(/[ ,]+/) : Foods;
		const configObj = {
			name: name || 'Darrel',
			foods: configFoods,
			games: configGames,
			ages: Ages,
		};
		return configObj;
	});
	
	try {
		const tamagotchi = new Tamagotchi(config);
	} catch (error) {
		console.log(error.message);
	}
})();
