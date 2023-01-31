<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2>Notifications</h2>
<ul>
	{#if data.notifications.length}
		{#each data.notifications as notification}
			<li>{notification.content.title}</li>
		{/each}
	{:else}
		<li>Vous n'avez pas de notifications</li>
	{/if}
</ul>

<style lang="scss">
	ul {
		width: 100%;
	}

	h2 {
		@include h2;
	}
</style>
