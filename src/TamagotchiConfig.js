module.exports.Games = [
	'Fortnite',
	'Football',
	'Read Dead Redemption',
	'Madden',
	'Halo',
];

module.exports.Foods = [
	'Party Fowl',
	'Jim N Nicks',
	'Dukes',
	'Core Life',
	'The Boulevarde',
];

module.exports.Ages = [
	'egg',
	'baby',
	'child',
	'teen',
	'adult',
	'elderly',
	'dead',
];

const lifespanSeconds = 240;
module.exports.Lifespan = lifespanSeconds * 1000;
module.exports.SleepDuration = this.Lifespan / 4;
module.exports.SleepInterval = this.Lifespan / 8;
module.exports.DayDuration = this.Lifespan / 20;
module.exports.BirthdayInterval = this.Lifespan / this.Ages.length;
