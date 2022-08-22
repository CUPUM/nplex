<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
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
	<Button variant="ghost">Autre option</Button>
	<Button variant="ghost" on:click={logout}>Se déconnecter</Button>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
	}
</style>
