<script lang="ts" context="module">
</script>

<script lang="ts">
	import { reveal, type RevealOptions } from '$actions/reveal';

	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon/Icon.svelte';
	import { slipMask } from '$utils/presets/reveal';

	export let id: string;
	export let header: string;
	export let href: string;
	export let data: any[];

	const revealOptions: RevealOptions = { ...slipMask, splitDelimiter: '' };
</script>

<section {id}>
	<a {href} class="button-parent">
		<h2 use:reveal={revealOptions}>{header}</h2>
		<Button>
			Explorer
			<svelte:fragment slot="trailing">
				<Icon name="arrow-right" />
			</svelte:fragment>
		</Button>
	</a>
	<ul>
		{#each data as datum}
			<slot name="list" {datum} />
		{/each}
	</ul>
</section>

<style lang="scss">
	section {
	}
</style>
