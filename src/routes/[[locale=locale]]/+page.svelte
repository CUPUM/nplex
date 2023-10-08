<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	export let data;

	const t = createTranslations({
		fr: {
			heading: 'Bientôt disponible',
			subheading: 'Nous dévoilerons bientôt la plateforme Nplex et ses projets. Restez à l’affut!',
		},
		en: {
			heading: 'Coming soon',
			subheading: 'We will soon publish the Nplex app and its projects. Stay tuned!',
		},
	});

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<article>
	{#if mounted}
		<div class="anim" in:fade={{ duration: 1500, easing: expoOut }}>
			<Loading
				thickness="1"
				speed={0.025}
				trail={false}
				outro={false}
				intro={false}
				offset="-{Math.random() * 50}s"
			/>
		</div>
	{/if}
	<header>
		<h1 class="heading xl center" in:fly={{ y: 4, duration: 750, easing: expoOut }}>
			{$t.heading}
		</h1>
		<p class="prose sm center" in:fly={{ y: -4, duration: 750, delay: 100, easing: expoOut }}>
			{$t.subheading}
		</p>
	</header>
</article>

<!-- <header></header>
<article>
	<h2>Projects</h2>
	<section>
		<h3>Featured</h3>
		<ul></ul>
	</section>
	{#await data.editable.projects}
		...
	{:then editableProjects}
		<section>
			<h3>Mine</h3>
			<ul></ul>
		</section>
	{/await}
</article>
<article>
	<h2>Organizations</h2>
	<section>
		<h3>Featured</h3>
		<ul></ul>
	</section>
	{#await data.editable.organizations}
		...
	{:then editableOrganizations}
		<section>
			<h3>Mine</h3>
			<ul></ul>
		</section>
	{/await}
</article> -->

<style lang="postcss">
	article {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	header {
		position: relative;
		max-width: var(--width-sm);
		padding: 2rem;
		&::after {
			z-index: -1;
			content: '';
			position: absolute;
			width: 100%;
			aspect-ratio: 1;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 50%;
			filter: blur(40px);
			opacity: 0.8;
			background-color: var(--base-bg);
			transition: all var(--duration-fast) ease-out;
		}

		h1 {
			margin: 0;
		}

		p {
			color: var(--color-neutral-500);
		}
	}

	.anim {
		/* opacity: 0.5; */
		position: absolute;
		inset: 0;
		font-size: 24em;
		color: var(--color-primary-500);
		z-index: -2;
	}
</style>
