	/* Interactions */
	feed(food) {
		if (!this.isAwake) return;

		if (this.hunger > 0) {
			this.eat();
			this.haveFun();
			this.digest();
			console.log(`That was some good ${food}`);
		} else if (this.hungerWarning) {
			this.getSick();
			this.getSad();
			console.log(`:-S I'm starting to feel pretty sick`);
		} else {
			console.log(`No thanks I'm not really hungry for ${food} right now`);
			this.hungerWarning = true;
		}
	}

	isAwake() {
		if (this.awake) return true;
		console.log('zzzzzZZZZZZZzzzzzZzz');
		return false;
	}

	goToSleep() {
		if (!this.isAwake()) return;
		this.sleep();
		console.log('Goodnight...');
	}

	wakeUp() {
		if (this.isAwake()) return;
		this.wake();
		console.log(`YAAaawwwnn....., Let's do something`);
	}

	goPoo() {
		if (!this.isAwake()) return;
		this.takeAPoo();
	}

	clean() {
		if (!this.isAwake()) return;
		this.getClean();
	}

	hungry() {
		return this.hunger;
	}

	happy() {
		return this.moods[this.moodIndex];
	}

	healthy() {
		return this.health;
	}
