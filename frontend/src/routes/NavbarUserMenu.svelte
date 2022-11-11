<script lang="ts" context="module">
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { messages } from '$routes/MessagesOutlet.svelte';
	import { dbClient } from '$utils/database';

	async function logout() {
		try {
			const { error } = await dbClient.forBrowser.auth.signOut();
			if (error) throw error;
		} catch (error) {
			messages.dispatch({
				type: 'error',
				content: JSON.stringify(error),
			});
		}
	}

	$: publicUserHref = $page.data.session ? `/u/${$page.data.session.user.id}` : undefined;
</script>

<div>
	<Button variant="ghost" contentAlign="start" href="/compte" active={$page.url.pathname.startsWith('/compte')}>
		<svelte:fragment slot="leading">
			<Icon name="settings" />
		</svelte:fragment>
		Mon compte
	</Button>
	<Button
		variant="ghost"
		contentAlign="start"
		href={publicUserHref}
		active={$page.url.pathname.startsWith(publicUserHref ?? '')}
		disabled
	>
		<svelte:fragment slot="leading">
			<Icon name="user" />
		</svelte:fragment>
		Profil
	</Button>
	<Button variant="ghost" contentAlign="start" on:click={logout}>
		<svelte:fragment slot="leading">
			<Icon name="logout" />
		</svelte:fragment>
		Se déconnecter
	</Button>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		gap: var(--ui-inset);
	}
</style>
