// Favorites
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

module.exports.Moods = [
	'angry',
	'unhappy',
	'meh',
	'happy',
	'overjoyed'
];

// Lifespan timers
const lifespanSeconds = 30;
module.exports.Lifespan = lifespanSeconds * 1000;
module.exports.SleepDuration = this.Lifespan / 4;
module.exports.SleepInterval = this.Lifespan / 8;
module.exports.DayDuration = this.Lifespan / 20;
module.exports.BirthdayInterval = this.Lifespan / this.Ages.length;

// Thresholds
module.exports.MaxHealth = 10;
module.exports.MaxHunger = 10;
module.exports.MaxPoo = 10;
module.exports.MaxMood = this.Moods.length - 1;

module.exports.MinHealth = 0;
module.exports.MinHunger = 0;
module.exports.MinPoo = 0;
module.exports.MinMood = 0;

module.exports.HealthWarningThreshold = 2;
module.exports.UnderfedWarningThreshold = 8;
module.exports.OverfedWarningThreshold = 2;
module.exports.PooWarningThreshold = 8;
module.exports.PooThreshold = 2;
