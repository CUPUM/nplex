<script lang="ts" context="module">
</script>

<script lang="ts">
	import Icon from '$components/Icon.svelte';

	export let href: string;
	export let action: `?/${string}`;
	export let placeholder: string;
	export let title: string;
</script>

<header>
	<a class="heading" {href}>
		<span>Explorer les</span>
		<hgroup>
			<h2>{title}</h2>
			<div class="icon">
				<Icon name="arrow-right" strokeWidth={4.5} />
			</div>
		</hgroup>
	</a>
	<!-- <form method="POST" use:enhance {action}>
		<Field type="search" {placeholder} variant="outlined">
			<FieldIcon name="search" slot="leading" />
			<FieldReset slot="trailing" />
		</Field>
	</form> -->
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

	a {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		position: relative;
		width: 100%;
		transition: color 0.1s ease-out;
		line-height: 1;

		&:hover {
			color: col(primary, 500);

			.icon {
				transform: translateX(0);
				opacity: 1;
				transition: transform 0.15s var(--ui-ease-out), opacity 0.25s ease-out;
			}
		}
	}

	span {
		font-size: var(--ui-text-md);
		text-indent: 0.4em;
	}

	hgroup {
		display: flex;
		flex-direction: row;
		gap: 1em;
		font-size: var(--ui-text-3xl);
		font-weight: 600;
	}

	h2 {
		line-height: 1;
	}

	.icon {
		position: relative;
		top: 0.25em;
		opacity: 0;
		font-size: 0.5em;
		transform: translateX(-0.1em);
		transition: transform 0s 0.2s, opacity 0.2s ease-in;
	}
</style>
