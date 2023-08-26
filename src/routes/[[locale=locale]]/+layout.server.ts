export async function load(event) {
	const mode = event.locals.mode;

	return {
		mode,
	};
}
