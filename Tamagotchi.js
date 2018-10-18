class Tamagotchi {
	constructor(name, games) {
		this.name = name;
		this.awake = true;
		this.clean = true;
		this.needsAttention = false;
		this.ages = [baby, child, teenager, adult, elderly, dead];
		this.ageIndex = 0;
		this.weight = 0;
		this.happiness = 5;
		this.health = 5;
		this.hunger = 5;
		this.games = games;
		this.poo = 5;

		// Warnings
		this.cleanWarning = false;
		this.healthWarning = false;
	}

	handleHealth() {}

	// Interactions
	feedSnack(food) {
		if (this.hunger < 10 && !this.needsAttention) {
			this.eat({ food, mealSize: 1 });
			this.haveFun();
			this.digest();
			this.getSleepy();
			this.gainWeight(1);
			console.log(`That was some good ${food}`);
		} else {
			this.getSick();
			this.getSad();
			this.gainWeight(2);
			console.log(`No thanks I'm not really hungry for ${food} right now`);
		}
	}

	feedMeal(food) {
		if (this.hunger < 10 && !this.needsAttention) {
			this.eat({ food, mealSize: 2 });
			this.haveFun();
			this.digest();
			this.getSleepy();
			this.gainWeight();
			console.log(`That was some good ${food}`);
		} else {
			this.getSick();
			this.getSad();
			this.gainWeight(2);
			console.log(`No thanks I'm not really hungry for ${food} right now`);
		}
	}

	putToBed() {
		if (this.awake) {
			this.sleep();
		}
		return 'ZZzZzzzzZZZZzzzzz...';
	}

	giveMedicine() {
		this.getBetter();
		this.isSatisfied();
	}

	discipline() {
		this.isSatisfied();
	}

	clean() {
		this.getClean();
	}

	getStats() {
		return {
			name: this.name,
			awake: this.awake,
			clean: this.clean,
			needsAttention: this.needsAttention,
			age: this.age,
			weight: this.weight,
			happiness: this.happiness,
			health: this.health,
			hunger: this.hunger,
			games: this.games,
			moods: this.moods,
			poo: this.poo,
		};
	}
	// Actions

	// Sleepiness
	sleep() {
		this.awake = false;
	}

	wakeup() {
		this.awake = true;
	}

	// Weight
	gainWeight(amount = 1) {
		this.weight += amount;
	}

	loseWeight(amount = 1) {
		this.weight -= amount;
	}

	// Happiness
	haveFun() {
		this.happiness++;
	}

	getSad() {
		this.happiness--;
	}

	// Handle Eating
	eat({ food, mealSize }) {
		console.log(`That was some good ${food}`);
		this.hunger -= mealSize;
	}

	poo() {
		this.poo = 0;
		this.clean = false;
	}

	digest() {
		this.poo++;
	}

	getClean() {
		this.clean = true;
	}

	// Handle Sickness
	getSick() {
		this.sick = true;
	}

	getBetter() {
		this.sick = false;
	}

	// Attention
	callForAttention() {
		this.needsAttention = true;
	}

	isSatisfied() {
		this.needsAttention = false;
	}
}
module.exports = Tamagotchi;
