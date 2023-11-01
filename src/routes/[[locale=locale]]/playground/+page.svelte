<script lang="ts">
	const tests = [
		'POINT(555.12312,1.112)',
		'POINT(123, 21321)',
		'POINTZ(123.12312,237, 75673)',
		'POINTZM(123.12312,123412.112)',
		'POINTZM(123.12312,123412.112)',
	];

	tests.forEach((t) => {
		const matches = t.match(/POINT(?<z>Z?)(?<m>M?)\((?<coordinateString>(\d+(?:\.\d*)?,? *?)*)\)/);
		if (!matches?.groups) {
			console.error(`Point geometry value (${t}) does not match the expected pattern.`);
			return;
		}
		console.log(matches.groups);
		const { z, m, coordinateString } = matches.groups;
		const coordinate = coordinateString.split(',').map((d) => parseFloat(d.trim()));
		console.log(coordinate);
	});
</script>

<article>
	<header>
		<hgroup>
			<h1>Oh hello there!</h1>
			<h2>Looks like you've wandered off your path a bit.</h2>
		</hgroup>
		<p>
			Anyways, you can roam around if you want. This is just a small harmless playground page we use
			during development.
		</p>
	</header>
</article>

<style lang="postcss">
</style>
