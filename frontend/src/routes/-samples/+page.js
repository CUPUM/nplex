eflyRotate const load: Load = async ({ session, stuff, fetch }) => {
	const res = await fetch('/api/projects/params-lists.json', {
		method: 'GET',
	});
	console.log(res.body);
	console.log(await res.json());
	return {};
};
