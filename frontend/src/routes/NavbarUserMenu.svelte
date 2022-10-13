<script lang="ts" context="module">
</script>

<script lang="ts">
	import { page } from '$app/stores';

	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import { messages } from '$stores/messages';
	import { dbClient } from '$utils/database/database';

	async function logout() {
		try {
			const { error } = await dbClient.forBrowser.auth.signOut();
			if (error) throw error;
		} catch (error) {
			messages.dispatch({
				type: 'error',
				content: error,
			});
		}
	}

	$: publicUserHref = `/u/${$page.data.session.user.id}`;
</script>

<div>
	<Button variant="ghost" contentAlign="left" href="/compte" active={$page.url.pathname.startsWith('/compte')}>
		<svelte:fragment slot="leading">
			<Icon name="settings" size="1.25em" />
		</svelte:fragment>
		Mon compte
	</Button>
	<Button
		variant="ghost"
		contentAlign="left"
		href={publicUserHref}
		active={$page.url.pathname.startsWith(publicUserHref)}
		disabled
	>
		<svelte:fragment slot="leading">
			<Icon name="user" size="1.25em" />
		</svelte:fragment>
		Profil
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
