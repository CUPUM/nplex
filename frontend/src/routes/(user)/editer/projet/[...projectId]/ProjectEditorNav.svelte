<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let open = false;
</script>

<menu class="nest">
	<Button equi variant="ghost" as="label" active={open}>
		<Icon name={open ? 'cross' : 'dots-vertical'} />
		<input type="checkbox" name="" hidden id="" bind:checked={open} />
	</Button>
	{#if open}
		<nav transition:slide={{ duration: 250, easing: expoOut }}>
			<Button>Revenir</Button>
			<ol>
				<li>
					<a href="">Général</a>
				</li>
				<li>
					<a href="">Site</a>
				</li>
				<li>
					<a href="">Travaux</a>
				</li>
			</ol>
		</nav>
	{/if}
</menu>

<style lang="scss">
	ol,
	li {
		all: unset;
	}

	menu {
		--inset: var(--ui-inset);
		font-size: var(--ui-size-medium);
		z-index: 1000;
		width: auto;
		margin: 2rem;
		display: flex;
		align-self: flex-start;
		flex: none;
		background-color: col(bg, 000, 0.8);
		padding: var(--inset);
		border-radius: var(--ui-radius);
		bottom: 2rem;
		position: sticky;
		backdrop-filter: blur(8px);
	}

	nav {
		display: flex;
		flex-direction: column;
		position: absolute;
		bottom: 100%;
		left: 0;
		margin-bottom: 6px;
		padding: var(--ui-inset);
		background: col(bg, 000, 0.8);
		border-radius: inherit;
		font-size: var(--ui-size-small);
	}

	ol {
		display: flex;
		flex-direction: column;
	}

	a {
		display: block;
		padding: 1rem;
	}
</style>
