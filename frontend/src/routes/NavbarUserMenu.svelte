<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import { messages } from '$stores/messages';
	import { browserDbClient } from '$utils/database/database';

	async function logout() {
		try {
			const { error } = await browserDbClient.auth.signOut();
			if (error) throw error;
		} catch (error) {
			messages.dispatch({
				type: 'error',
				content: error,
			});
		}
	}
</script>

<div>
	<Button variant="ghost" contentAlign="left">
		<svelte:fragment slot="leading">
			<Icon name="settings" size="1.25em" />
		</svelte:fragment>
		Autre option
	</Button>
	<Button variant="ghost" contentAlign="left" on:click={logout}>
		<svelte:fragment slot="leading">
			<Icon name="logout" size="1.25em" />
		</svelte:fragment>
		Se déconnecter
	</Button>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
	}
</style>
