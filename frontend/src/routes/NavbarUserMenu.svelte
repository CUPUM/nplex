<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { USER_ROUTES } from './(user)/u/common';

	const SIGNOUT_FORM_ID = 'signout-form';

	let loading = {
		signout: false,
	};

	$: publicUserHref = $page.data.session ? `/u/${$page.data.session.user.id}` : undefined;
</script>

<div>
	{#each Object.values(USER_ROUTES) as r}
		<Button
			variant="ghost"
			contentAlign="start"
			href={r.pathname}
			active={$page.url.pathname.startsWith(r.pathname)}
		>
			<svelte:fragment slot="leading">
				<Icon name={r.icon} />
			</svelte:fragment>
			{r.title}
		</Button>
	{/each}
	<hr />
	<form
		id={SIGNOUT_FORM_ID}
		action="/api/auth?/signout"
		method="POST"
		use:enhance={({ form, data, action, cancel }) => {
			loading.signout = true;
			loading = loading;
			return async ({ update, result }) => {
				update();
				loading.signout = false;
				loading = loading;
			};
		}}
	/>
	<Button variant="ghost" type="submit" form={SIGNOUT_FORM_ID} contentAlign="start">
		<svelte:fragment slot="leading">
			<Icon name="logout" />
		</svelte:fragment>
		Déconnecter
	</Button>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		gap: var(--ui-inset);
	}

	form {
		display: none;
	}
</style>
