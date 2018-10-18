module.export.feed = function(food) {
	if (this.hunger < 10) {
		eat(food);
		digest();
	}
};

module.export.putToBed = function() {};

module.export.sleep = function() {
	return {
		awake: false,
	};
};

module.export.wakeup = function() {
	return {
		awake: false,
	};
};

module.export.haveFun = function() {
	return {
		happiness: this.happiness + 1,
	};
};

module.export.getSad = function() {
	return {
		happiness: this.happiness - 1,
	};
};

module.export.poo = function() {
	return {
		poo: 0,
	};
};

module.export.eat = function(food) {
	console.log(`That was some good ${food}`);
	return {
		hunger: this.hunger + 1,
	};
};

module.export.digest = function() {
	return {
		poo: this.poo + 1,
	};
};

module.export.getSick = function() {
	return {
		sick: true,
		health: this.health - 1,
	};
};
