module.exports.initializationPrompts = [
	{
		type: 'input',
		name: 'name',
		message: 'Enter a name for your new friend...I suggest Darrel',
	},
	{
		type: 'input',
		name: 'games',
		message: 'Enter some games you like to play, or just let me choose for you',
	},
	{
		type: 'input',
		name: 'foods',
		message: `What type of foods do you like to eat? I have my favorites but you can pick yours if you'd like`,
	},
];

module.exports.interactionPrompts = [
	{
		type: 'list',
		name: 'activity',
		message: 'What should we do?',
		choices: [
			'Eat',
			'Play',
			'Sleep',
			'Wake up',
			'Poo',
			'Clean Up',
			'Get Stats',
			'Needs Attention',
			'Clear Terminal',
		],
	},
];
