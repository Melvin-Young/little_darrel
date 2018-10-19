const { Lifespan, Ages } = require('./TamagotchiConfig');
const { interactionPrompts } = require('./UserInterface');
const Inquirer = require('inquirer');

const CONST_LIFESPAN = Lifespan;
const CONST_SLEEP_DURATION = CONST_LIFESPAN / 4;
const CONST_SLEEP_INTERVAL = CONST_LIFESPAN / 8;
const CONST_DAY_DURATION = CONST_LIFESPAN / 20;
const CONST_BIRTHDAY_INTERVAL = CONST_LIFESPAN / Ages.length;

class Tamagotchi {
	constructor({ name, foods, games, ages }) {
		this.name = name;
		this.awake = true;
		this.health = 5;
		this.hunger = 5;
		this.poo = 5;

		this.foods = foods;
		this.games = games;
		this.ages = ages;
		this.ageIndex = 0;
		this.moods = ['angry', 'unhappy', 'meh', 'happy', 'overjoyed'];
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
		this._setUI(`${this.name} is born`);
	}

	/* User Interactions */
	feed() {
		if (!this.isAwake()) return;
		const food = this._selectRandomIndex(this.foods);
		if (this.hunger > 0) {
			this._lowerHunger();
			this._boostMood();
			this._increasePoo();
			console.log(`That was some good ${food}`);
		} else if (this.hungerWarning) {
			this._lowerHealth();
			this._lowerMood();
			console.log(`:-S I'm starting to feel pretty sick`);
		} else {
			console.log(`No thanks I'm not really hungry for ${food} right now`);
			this.hungerWarning = true;
		}
		this._handleHealth();
	}

	playGames() {
		if (!this.isAwake()) return;
		this._boostMood();
		this._raiseHealth();
		const game = this._selectRandomIndex(this.games);
		console.log(`\n\nThat was a fun game of ${game} right there!!\n\n`);
		this._handleHealth();
	}

	isAwake() {
		if (this.awake) return true;
		console.log('\n\nzzzzzZZZZZZZzzzzzZzz\n\n');
		return false;
	}

	goToSleep() {
		if (!this.isAwake()) return;
		this._sleep();
		this._raiseHealth();
		console.log('\n\nGoodnight...\n\n');
	}

	wakeUp() {
		if (this.awake) return;
		this._wake();
		console.log(`\n\nYAAaawwwnn....., Let's do something\n\n`);
	}

	takeAPoo() {
		if (!this.isAwake()) return;
		if (this.poo > 2) {
			this._poo();
			console.log('\n\nBetter out than in I always say...\n\n');
			return;
		}
		console.log(`I don't need to poo right now.`);
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
		console.log(
			`\n\nGone but not forgotten ${this.name} lived for ${
				this.ageIndex
			} birthdays\n`
		);
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
	_boostMood() {
		this.moodIndex < this.moods.length - 1 && this.moodIndex++;
	}

	_lowerMood() {
		this.moodIndex > 0 && this.moodIndex--;
	}

	// Handle Eating
	_lowerHunger() {
		this.hunger = this.hunger > 2 ? this.hunger - 3 : 0;
		this.hungerWarning = false;
	}

	_increaseHunger() {
		this.hunger++;
		if (this.hunger > 8) {
			this.hungerWarning = true;
		} else {
			this.hungerWarning = false;
		}
	}

	_increasePoo() {
		this.poo++;
		if (this.poo > 8) {
			this.pooWarning = true;
		}
	}

	// Handle poo
	_poo() {
		this.poo = 0;
		this.cleanWarning = true;
		this.pooWarning = false;
		console.log(`
		   ~~~~~
		  ()
		 ()()
		()()()`);
	}

	_cleanPoo() {
		this.cleanWarning = false;
	}

	// Handle Sickness
	_lowerHealth() {
		this.health > 0 && this.health--;
		this.health < 2 && (this.healthWarning = true);
	}

	_raiseHealth() {
		this.health = this.health < 9 ? this.health + 2 : 10;
		if (this.health > 3) {
			this.healthWarning = false;
		}
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
		if (this.poo == 10) {
			this._poo();
		}

		this.needsAttention =
			this.cleanWarning ||
			this.hungerWarning ||
			this.healthWarning ||
			this.pooWarning;

		if (this.needsAttention) {
			console.log('\n\nCan you please take better care of me\n');
		}
	}

	_handleDailyAttrition() {
		this._increaseHunger();
		this._increasePoo();
		this._lowerMood();
		this._lowerHealth();
	}

	/* Utils */
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
						console.log(this.getStats());
						break;
					case 'Needs Attention':
						console.log(this.getWarnings());
						break;
					default:
						console.log(`\n\nSorry I don't understand\n`);
				}
				this.interactions.ui.close();
				this._setUI();
			})
			.catch((error) => console.log(error.message));
	}

	// Timers
	_setTimers() {
		this.lifespanTimer = setTimeout(() => {
			this._die();
		}, CONST_LIFESPAN);

		this.dayTimer = setInterval(() => {
			this._handleDailyAttrition();
			this._handleHealth();
		}, CONST_DAY_DURATION);

		this.sleepTimer = setInterval(() => {
			this.goToSleep();
			setTimeout(() => {
				this.wakeUp();
			}, CONST_SLEEP_DURATION);
		}, CONST_SLEEP_INTERVAL);

		this.birthdayTimer = setInterval(() => {
			this._birthday();
			console.log(
				`\n${this.name} has just become another year older and wiser\n`
			);
		}, CONST_BIRTHDAY_INTERVAL);
	}

	_setSleepCycle() {
		return setInterval(() => {
			this.goToSleep();
			setTimeout(() => {
				this.wakeUp();
			}, CONST_SLEEP_DURATION);
		}, CONST_SLEEP_INTERVAL);
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
}
module.exports = Tamagotchi;
