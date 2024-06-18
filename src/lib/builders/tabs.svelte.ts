export class Tabs<T = any> {
	current = $state<T>();

	constructor({ defaultValue }: { defaultValue: T }) {
		this.current = defaultValue;
		this.triggerAttributes.bind(this);
		this.contentAttributes.bind(this);
	}

	triggerAttributes(value: T) {
		const _this = this;
		return {
			role: 'tab' as const,
			get 'aria-selected'() {
				return value === _this.current;
			},
			onclick(e: MouseEvent) {
				_this.current = value;
			},
		};
	}

	contentAttributes(value: T, hidden: boolean = true) {
		const _this = this;
		return {
			role: 'tabpanel' as const,
			get hidden() {
				return value !== _this.current;
			},
			get 'aria-hidden'() {
				return value !== _this.current;
			},
			get 'aria-expanded'() {
				return value === _this.current;
			},
		};
	}
}
