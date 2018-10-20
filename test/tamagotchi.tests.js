const { assert, expect } = require('chai');
const Tamagotchi = require('../src/Tamagotchi');

describe('A Tamagotchi', function() {
	const dummyAges = ['Age1', 'Age2', 'Age3'];
	const dummyFood = ['Food1', 'Food2', 'Food3'];
	const dummyGames = ['Game1', 'Game2', 'Game3'];
	const tamagotchi = new Tamagotchi({
		name: 'Darrel',
		ages: dummyAges,
		foods: dummyFood,
		games: dummyGames,
	});
	tamagotchi._clearTimers();

	const dummyClass = {
		name: 'Darrel',
		awake: true,
		health: 5,
		hunger: 5,
		poo: 5,

		foods: dummyFood,
		games: dummyGames,
		ages: dummyAges,
		ageIndex: 0,
		moodIndex: 3,

		needsAttention: false,
		cleanWarning: false,
		pooWarning: false,
		hungerWarning: false,
		healthWarning: false,
	};

	it('should initialize correctly', function() {
		expect(tamagotchi).to.include(dummyClass);
	});

	it('should get older', function() {
		assert.equal(tamagotchi.ageIndex, 0);
		tamagotchi._birthday();
		assert.equal(tamagotchi.ageIndex, 1);
	});

	it('should sleep', function() {
		tamagotchi._sleep();
		assert.equal(tamagotchi.awake, false);
	});

	it('should wakeup', function() {
		tamagotchi._wake();
		assert.equal(tamagotchi.awake, true);
	});

	it('should have fun', function() {
		const happiness = tamagotchi.moodIndex;
		tamagotchi._boostMood();
		assert.equal(tamagotchi.moodIndex, happiness + 1);
	});

	it('should get sad', function() {
		const happiness = tamagotchi.moodIndex;
		tamagotchi._lowerMood();
		assert.equal(tamagotchi.moodIndex, happiness - 1);
	});

	it('should eat correctly', function() {
		const hunger = tamagotchi.hunger;
		tamagotchi.hungerWarning = true;
		tamagotchi._lowerHunger();
		assert.equal(tamagotchi.hunger, hunger - 1);
		assert.equal(tamagotchi.hungerWarning, false);

		tamagotchi.hunger = 2;
		tamagotchi._lowerHunger(2);
		assert.equal(tamagotchi.hunger, 0);
	});

	it('when hunger passes threshold', function() {
		tamagotchi.hungerWarning = false;
		tamagotchi.hunger = 8;
		tamagotchi._increaseHunger();
		assert.equal(tamagotchi.hungerWarning, true);
		tamagotchi.hungerWarning = false;
	});

	it(`shouldn't update its poo status`, function() {
		tamagotchi.poo = 2;
		tamagotchi.takeAPoo();
		assert.equal(tamagotchi.poo, 2);
	});

	it(`should update its poo status`, function() {
		tamagotchi.poo = 3;
		tamagotchi.takeAPoo();
		assert.equal(tamagotchi.poo, 0);
	});

	it('should make poo during digestion', function() {
		tamagotchi.poo = 8;
		tamagotchi._increasePoo();
		assert.equal(tamagotchi.poo, 9);
		assert.equal(tamagotchi.pooWarning, true);
	});

	it('should respond to cleaning', function() {
		tamagotchi.cleanWarning = true;
		tamagotchi._cleanPoo();
		assert.equal(tamagotchi.cleanWarning, false);
	});

	it('should get sick', function() {
		tamagotchi.health = 2;
		tamagotchi.healthWarning = false;
		tamagotchi._lowerHealth();
		assert.equal(tamagotchi.health, 1);
		assert.equal(tamagotchi.healthWarning, true);
	});

	it('should get better', function() {
		tamagotchi.healthWarning = true;
		tamagotchi.health = 2;
		tamagotchi._raiseHealth();
		assert.equal(tamagotchi.health, 3);
		assert.equal(tamagotchi.healthWarning, false);
	});

	it('should get sick if dirty or hungry', function() {
		tamagotchi.hunger = 10;
		tamagotchi.cleanWarning = true;
		const health = tamagotchi.health;
		tamagotchi._handleHealth();
		assert.equal(tamagotchi.health, health - 1);
	});

	it('should poo eventually', function() {
		tamagotchi.poo = 10;
		tamagotchi.pooWarning = true;
		tamagotchi.cleanWarning = false;
		tamagotchi._handleHealth();
		assert.equal(tamagotchi.pooWarning, false);
		assert.equal(tamagotchi.cleanWarning, true);
	});

	it('should prompt user attention', function() {
		tamagotchi.health = 1;
		tamagotchi.needsAttention = false;
		tamagotchi.cleanWarning = true;
		tamagotchi._handleHealth();
		assert.equal(tamagotchi.needsAttention, true);
	});

	it('should die', function() {
		tamagotchi.health = 0;
		expect(() => tamagotchi._handleHealth()).to.throw(Error);
	});
});

describe('A user', function() {
	const tamagotchi = new Tamagotchi('Dummy');
	tamagotchi._clearTimers();

	it('should be able to feed', function() {
		tamagotchi.feed('Bacon');
		assert.equal(tamagotchi.hunger, 2);
		assert.equal(tamagotchi.moodIndex, 4);
		assert.equal(tamagotchi.poo, 6);
	});

	it('should trigger warning on overeating', function() {
		tamagotchi.hunger = 0;
		tamagotchi.feed();
		assert.equal(tamagotchi.hungerWarning, true);
	});

	it('should cause health problems on subsequent feeding', function() {
		tamagotchi.feed();
		assert.equal(tamagotchi.health, 4);
		assert.equal(tamagotchi.moodIndex, 3);
	});

	it('should be able to put to bed', function() {
		tamagotchi.goToSleep();
		assert.equal(tamagotchi.awake, false);
		tamagotchi.wakeUp();
		assert.equal(tamagotchi.awake, true);
	});
});
