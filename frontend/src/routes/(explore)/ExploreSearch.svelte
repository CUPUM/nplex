<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$components/Field/Field.svelte';
	import FieldIcon from '$components/Field/FieldIcon.svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import ExploreSearchToken from './ExploreSearchToken.svelte';
</script>

<form
	action="?/search"
	id="search"
	use:enhance
	method="POST"
	in:fly|local={{ y: 6, easing: expoOut, duration: 500, delay: 500, opacity: 0 }}
>
	<Field variant="opaque" type="search" placeholder="Chercher des projets..." style="width: 400px;">
		<svelte:fragment slot="leading">
			<FieldIcon name="search" />
		</svelte:fragment>
	</Field>
	<ul class="tokens">
		<li>
			<ExploreSearchToken>Test</ExploreSearchToken>
		</li>
	</ul>
</form>

<style lang="scss">
	form {
		z-index: 1;
		justify-self: flex-start;
		position: absolute;
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		margin: 0 auto;
		padding-inline: 1.5rem;
	}
</style>
