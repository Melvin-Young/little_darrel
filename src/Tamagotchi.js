const Config = require('./TamagotchiConfig');
const { interactionPrompts } = require('./UserInterface');
const Inquirer = require('inquirer');

class Tamagotchi {
	constructor({ name, foods, games, ages = Config.Ages}) {
		this.name = name;
		this.awake = true;
		this.health = 5;
		this.hunger = 5;
		this.poo = 5;

		this.foods = foods;
		this.games = games;
		this.ages = ages;
		this.ageIndex = 0;
		this.moods = Config.Moods;
		this.moodIndex = 3;

		// Warnings
		this.needsAttention = false;
		this.cleanWarning = false;
		this.pooWarning = false;
		this.hungerWarning = false;
		this.healthWarning = false;

		// Timers
		this.sleepTimer = undefined;
		this.dayTimer = undefined;
		this.lifespanTimer = undefined;
		this.birthdayTimer = undefined;
		this._setTimers();

		// User Interaction
		this.interactions = undefined;
		this._setUI();
		this_output`${this.name} is born`;
	}

	/* User Interactions */
	feed() {
		if (!this.isAwake())
			return;

		const food = this._selectRandomIndex(this.foods);
		if (this.hunger > Config.MinHunger) {
			this._lowerHunger(3);
			this._boostMood();
			this._raiseHealth(3);
			this._increasePoo(2);
			this._output`That was some good ${food}`;
		} else if (this.hungerWarning) {
			this._lowerHealth();
			this._lowerMood();
			this._output`:-S I'm starting to feel pretty sick`;
		} else {
			this._output`No thanks I'm not really hungry for ${food} right now`;
			this.hungerWarning = true;
		}
		this._handleHealth();
	}

	playGames() {
		if (!this.isAwake())
			return;

		this._boostMood(2);
		this._raiseHealth(2);
		this._increaseHunger(2);
		const game = this._selectRandomIndex(this.games);
		this._output`That was a fun game of ${game} right there!!`;
		this._handleHealth();
	}

	isAwake() {
		if (this.awake)
			return true;

		_output('zzzzzZZZZZZZzzzzzZzz');
		return false;
	}

	goToSleep() {
		if (!this.isAwake())
			return;

		this._sleep();
		this._raiseHealth(4);
		_output('Goodnight...');
	}

	wakeUp() {
		if (this.awake)
			return;

		this._wake();
		this._output`YAAaawwwnn....., Let's do something`;
	}

	takeAPoo() {
		if (!this.isAwake())
			return;

		if (this.poo > Config.PooThreshold) {
			this._poo();
			_output('Better out than in I always say...');
			return;
		}
		this._output`I don't need to poo right now.`;
	}

	getStats() {
		return `
		Health
		********************
		Mood: ${this.moods[this.moodIndex]}
		Health: ${this.health}
		Age: ${this.ages[this.ageIndex]}
		Hunger: ${this.hunger}
		Poo: ${this.poo}
		Awake: ${this.awake}
		`;
	}

	getWarnings() {
		this._needsAttention();
		return `
		Warnings
		********************
		Health Warning: ${this.healthWarning}
		Hunger Warning: ${this.hungerWarning}
		Poo Warning: ${this.pooWarning}
		Clean Warning: ${this.cleanWarning}
		Needs Attention: ${this.needsAttention}
		`;
	}

	/* Private Actions */
	// Birthday
	_birthday() {
		this.ageIndex++;
	}

	// Deathday
	_die() {
		this.interactions.ui.close();
		this._clearTimers();
		this._output`Gone but not forgotten ${this.name} lived for ${this.ageIndex} birthdays`;
		process.exit();
	}

	// Sleeping
	_sleep() {
		this.awake = false;
	}

	_wake() {
		this.awake = true;
	}

	// Happiness
	_boostMood(amount = 1) {
		this.moodIndex += amount;
		this.moodIndex > Config.MaxMood && (this.moodIndex = Config.MaxMood);
	}

	_lowerMood(amount = 1) {
		this.moodIndex -= amount;
		this.moodIndex < Config.MinMood && (this.moodIndex = Config.MinMood)
	}

	// Handle Eating
	_lowerHunger(amount = 1) {
		this.hunger -= amount;
		this.hunger < Config.MinHunger && (this.hunger = Config.MinHunger);
		this.hungerWarning = false;
	}

	_increaseHunger(amount = 1) {
		this.hunger += amount;
		this.hunger > Config.MaxHunger && (this.hunger = Config.MaxHunger);

		if (this.hunger > Config.UnderfedWarningThreshold) {
			this.hungerWarning = true;
		} else {
			this.hungerWarning = false;
		}
	}

	_increasePoo(amount = 1) {
		this.poo += amount;
		this.poo > Config.MaxPoo && (this.poo = Config.MaxPoo);
		this.poo > Config.PooWarningThreshold && (this.pooWarning = true);
	}

	// Handle poo
	_poo() {
		this.poo = Config.MinPoo;
		this.cleanWarning = true;
		this.pooWarning = false;
		this._output`
		   ~~~~~
		  ()
		 ()()
		()()()`
		;
	}

	_cleanPoo() {
		this.cleanWarning = false;
	}

	// Handle Sickness
	_lowerHealth(amount = 1) {
		this.health -= amount;
		this.health < Config.MinHealth && (this.health = Config.MinHealth);
		this.health < Config.HealthWarningThreshold && (this.healthWarning = true);
	}

	_raiseHealth(amount = 1) {
		this.health += amount;
		this.health > Config.MaxHealth && (this.health = Config.MaxHealth);
		this.health > Config.HealthWarningThreshold && (this.healthWarning = false);
	}

	// Tamagotchi Maintenance
	_handleHealth() {
		// If too sick die
		if (!this.health) {
			this._die();
		}

		// If living in a pooey mess or hungry, lose health
		(this.cleanWarning || this.hunger == 10) && this._lowerHealth();

		// If too much poo, have an accident
		if (this.poo == Config.MaxPoo) {
			this._poo();
		}

		if (this._needsAttention()) {
			_output('Can you please take better care of me');
		}
	}

	_needsAttention() {
		this.needsAttention =
			this.cleanWarning ||
			this.hungerWarning ||
			this.healthWarning ||
			this.pooWarning;

		return this.needsAttention;
	}

	_handleDailyAttrition() {
		this._increaseHunger();
		this._increasePoo();
		this._lowerMood();
		this._lowerHealth();
	}

	/* Utils */
	// TODO move these out of class
	// User Interface
	_setUI() {
		this.interactions = Inquirer.prompt(interactionPrompts);
		this.interactions
			.then(({ activity }) => {
				switch (activity) {
					case 'Eat':
						this.feed();
						break;
					case 'Play':
						this.playGames();
						break;
					case 'Sleep':
						this.goToSleep();
						break;
					case 'Wake up':
						this.wakeUp();
						break;
					case 'Poo':
						this.takeAPoo();
						break;
					case 'Clean Up':
						this._cleanPoo();
						break;
					case 'Get Stats':
						this._output(this.getStats());
						break;
					case 'Needs Attention':
						_output(this.getWarnings());
						break;
					default:
						this._output`Sorry I don't understand`;
				}
				this.interactions.ui.close();
				this._setUI();
			})
			.catch((error) => console.log(error.message));
	}

	// Timers
	_setTimers() {
		this.lifespanTimer = setTimeout(() => {
			this_output`
			Awesome job at parenting ${this.name}!
			${this.name} wanted to leave you their collection of Nickelback CDs for gratitude.
			${this.name} said you'd appreciate that do to your love of Nickelback.`
			this._die();
		}, Config.Lifespan);

		this.dayTimer = setInterval(() => {
			this._handleDailyAttrition();
			this._handleHealth();
		}, Config.DayDuration);

		this.sleepTimer = setInterval(() => {
			this.goToSleep();
			setTimeout(() => {
				this.wakeUp();
			}, Config.SleepDuration);
		}, Config.SleepInterval);

		this.birthdayTimer = setInterval(() => {
			this._birthday();
			_output(
				`${this.name} has just become another year older and wiser`
			);
		}, Config.BirthdayInterval);
	}

	_clearTimers() {
		clearTimeout(this.lifespanTimer);
		clearInterval(this.dayTimer);
		clearInterval(this.sleepTimer);
		clearInterval(this.birthdayTimer);
	}

	// Random array index generator
	_selectRandomIndex(array) {
		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	}

	_output(output) {
		console.clear();
		console.log(output.raw[0]);
	}
}
module.exports = Tamagotchi;
