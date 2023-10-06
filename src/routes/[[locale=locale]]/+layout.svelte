<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import LoadingProgress from '$lib/components/LoadingProgress.svelte';
	import ToastsOutlet from '$lib/components/ToastsOutlet.svelte';
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns';
	import { onMount } from 'svelte';
	import Contexts from './Contexts.svelte';
	import Navbar from './Navbar.svelte';

	let loading = true;

	onMount(() => {
		loading = false;
	});
</script>

<Contexts>
	{#if loading}
		<div
			class={css({
				zIndex: '999',
				position: 'fixed',
				inset: '0',
				pointerEvents: 'none',
				userSelect: 'none',
			})}
		>
			<Loading />
		</div>
	{/if}
	<LoadingProgress />
	<Navbar />
	<main class={flex({ direction: 'column', flex: '1', flexWrap: 'nowrap' })}>
		<slot />
	</main>
	<Footer />
	<ToastsOutlet />
</Contexts>
