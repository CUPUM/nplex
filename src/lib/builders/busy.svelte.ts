export class Busy {
	busy = $state(false);

	constructor() {}

	get attributes() {
		const _this = this;
		return {
			get 'aria-busy'() {
				return _this.busy || undefined;
			},
		};
	}

	get spinner() {
		return;
	}
}
