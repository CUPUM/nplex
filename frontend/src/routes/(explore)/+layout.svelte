<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import FieldIcon from '$components/FieldIcon.svelte';
	import Icon from '$components/Icon.svelte';
	import type { LayoutData } from './$types';
	import SearchTokens from './SearchTokens.svelte';

	export let data: LayoutData;
</script>

<div id="explore">
	<nav>
		<form action="" id="search" use:enhance>
			<section>
				<Field type="search" placeholder="Chercher">
					<svelte:fragment slot="leading">
						<Button equi variant="ghost"><Icon name="parameters" /></Button>
						<FieldIcon name="search" />
					</svelte:fragment>
					<svelte:fragment slot="trailing">
						<Button equi><Icon name="arrow-right" /></Button>
					</svelte:fragment>
				</Field>
			</section>
			<fieldset>
				<SearchTokens />
			</fieldset>
		</form>
	</nav>
	<slot />
</div>

<style lang="scss">
	#explore {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: calc(100vh - var(--navbar-height-px));
		align-items: stretch;
	}

	nav {
		padding: 2rem;
		padding-top: 1rem;
		margin: 0;
		position: absolute;
		width: 100%;
		z-index: 100;
	}

	form {
		all: unset;
		position: relative;
		display: flex;
		flex-direction: row;
		margin: 0 auto;
		padding: 0;
		width: 100%;
		max-width: 1200px;
	}

	fieldset {
		all: unset;
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow-x: scroll;
		--scroll-size: 0px;
		padding: 0 1rem;
		gap: 0.5rem;
	}
</style>
