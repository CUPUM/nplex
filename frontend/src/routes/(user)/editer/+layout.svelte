<script lang="ts">
	import { intersection } from '$actions/intersection';
	import { reveal, slipMask } from '$actions/reveal';
	import Icon from '$components/Icon.svelte';
	import { navbarBackground } from '$routes/Navbar.svelte';
	import { backgroundColor } from '$stores/backgroundColor';
	import { col } from '$utils/themes';
	import { onDestroy, onMount } from 'svelte';

	$: h = 'Créer un nouveau projet';
	const bg = col('bg', '500');

	onMount(() => {
		backgroundColor.set(bg);
	});

	onDestroy(() => {
		backgroundColor.reset();
	});
</script>

<header
	use:intersection={{ rootMargin: '30px 0px' }}
	on:enter={() => navbarBackground.set(bg)}
	on:leave={() => navbarBackground.reset()}
>
	<hgroup>
		<Icon name="pen" style="top: -.1em" thickness="3px" />
		<h1>Éditeur</h1>
		<Icon name="pen" style="top: -.1em" thickness="3px" />
		<h2
			use:reveal={{
				...slipMask,
				delimiter: /[\s\S]{1,3}/g,
				stagger: 50,
				start: { transform: 'translateY(1em) skewY(-6deg)' },
			}}
		>
			{h}
		</h2>
	</hgroup>
</header>
<slot />

<style lang="scss">
	header {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		min-height: 500px;
		margin-top: var(--n-navbar-height-px);
		padding-block: var(--navbar-height-px);
		font-size: var(--size-xlarge);
	}

	hgroup {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 4rem 2rem;
		gap: 2rem;
	}

	h1 {
		width: 100%;
		max-width: var(--ui-medium);
		text-align: center;
		font-size: var(--size-xlarge);
		text-transform: uppercase;
		font-weight: 400;
		letter-spacing: 1px;
		padding: 0;
		margin: 0;
	}

	h2 {
		width: 100%;
		max-width: var(--ui-medium);
		font-size: var(--size-x5large);
		font-weight: 500;
		line-height: 1.15;
		text-align: center;
		padding: 0;
		margin: 0;
	}
</style>
