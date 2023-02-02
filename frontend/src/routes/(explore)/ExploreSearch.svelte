<script lang="ts">
	import { enhance } from '$app/forms';
	import ExploreSearchToken from './ExploreSearchToken.svelte';
</script>

<form action="?/search" id="search" use:enhance method="POST">
	<fieldset class="field">
		<input type="search" name="" id="" />
	</fieldset>
	<ul class="tokens">
		<li>
			<ExploreSearchToken>Test</ExploreSearchToken>
		</li>
	</ul>
</form>

<style lang="scss">
	form {
		z-index: 1;
		position: absolute;
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		margin: 0 auto;
		width: 100%;
		max-width: var(--ui-width-main);
		padding: 1.5rem;
		padding-bottom: 0;
	}
</style>
