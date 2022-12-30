<script lang="ts" context="module">
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$components/Field.svelte';
	import FieldIcon from '$components/FieldIcon.svelte';
	import FieldReset from '$components/FieldReset.svelte';
	import Icon, { ICON_CLASSES } from '$components/Icon.svelte';

	export let href: string;
	export let action: `?/${string}`;
	export let placeholder: string;
</script>

<header>
	<a class="heading {ICON_CLASSES.HOVER}" {href}>
		<h2><slot /></h2>
		<div class="icon">
			<Icon name="arrow-right" strokeWidth="4" />
		</div>
	</a>
	<form method="POST" use:enhance {action}>
		<Field type="search" {placeholder} variant="outlined">
			<FieldIcon name="search" slot="leading" />
			<FieldReset slot="trailing" />
		</Field>
	</form>
</header>

<style lang="scss">
	header {
		width: 100%;
		max-width: var(--ui-width-main);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--ui-gutter);
		padding-inline: var(--ui-gutter);
		margin-top: var(--ui-gutter);
	}

	form {
		width: 400px;
		max-width: 100%;
	}

	.heading {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 0.5em;
		position: relative;
		width: 100%;
		max-width: --ui-block;
		font-size: var(--ui-text-xl);
		font-weight: 500;
		transition: color 0.15s ease-out;

		.icon {
			opacity: 0;
			font-size: 0.5em;
			transform: translateX(-0.25em);
			transition: transform 0.2s var(--ui-ease-out);
		}

		&:hover {
			color: col(primary, 500);
			.icon {
				transform: translateX(0);
				opacity: 1;
			}
		}
	}
</style>
