<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$components/Field/Field.svelte';
	import ExploreSearchToken from './ExploreSearchToken.svelte';
</script>

<form action="?/search" id="search" use:enhance method="POST">
	<Field variant="opaque" />
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
		padding-inline: 1.5rem;
	}
</style>
