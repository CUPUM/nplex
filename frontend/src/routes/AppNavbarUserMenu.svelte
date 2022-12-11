<script lang="ts" context="module">
</script>

<script lang="ts">
	import { enhance } from '$app/forms';

	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';

	let signout = false;

	$: publicUserHref = $page.data.session ? `/u/${$page.data.session.user.id}` : undefined;
</script>

<div>
	<Button
		variant="ghost"
		contentAlign="start"
		href="/compte"
		active={$page.url.pathname.startsWith('/compte')}
	>
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
	<form
		action="/api/auth?/signout"
		method="POST"
		use:enhance={({ form, data, action, cancel }) => {
			signout = true;
			return async ({ update, result }) => {
				update({ reset: false });
				signout = false;
				// invalidateAll();
			};
		}}
	>
		<Button variant="ghost" type="submit" contentAlign="start" loading={signout}>
			<svelte:fragment slot="leading">
				<Icon name="logout" />
			</svelte:fragment>
			Se déconnecter
		</Button>
	</form>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		gap: var(--ui-inset);
	}
</style>
