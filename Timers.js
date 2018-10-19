const { Lifespan, Ages } = require('./TamagotchiConfig');

const sleepDuration = Lifespan / 75;
const sleepInterval = Lifespan / 5;
const dayDuration = Lifespan / 10;
const birthdayInterval = Lifespan / Ages.length;

module.exports.setDayTimer = (timer) => {
	timer && clearInterval(timer);
	return setInterval(() => {
		this._handleDailyAttrition();
		this._handleHealth();
	}, dayDuration);
};

module.exports.setBirthdayTimer = (timer) => {
	timer && clearInterval(timer);
	return setInterval(() => {
		this._birthday();
	}, birthdayInterval);
};

module.exports.setLifespanTimer = (timer) => {
	timer && clearTimeout(timer);
	return setTimeout(() => {
		this._die();
	}, Lifespan);
};

module.exports.setSleepTimer = (timer) => {
	timer && clearInterval(timer);
	return setInterval(() => {
		this.goToSleep();
		setTimeout(() => {
			this.wakeUp();
		}, sleepDuration);
	}, sleepInterval);
};

// clearTimers() {
// 	clearInterval(this.birthdayTimer);
// 	clearInterval(this.dayTimer);
// 	clearInterval(this.sleepTimer);
// 	clearInterval(this.lifeTimer);
// }
