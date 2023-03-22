<script lang="ts">
	import Icon from '$components/Icon.svelte';

	export let href: string;
	export let action: `?/${string}`;
	export let placeholder: string;
	export let title: string;
</script>

<header>
	<a class="heading" {href}>
		<!-- <span>Explorer les</span> -->
		<hgroup>
			<h2 class="heading-lg">
				{title}
				<span class="icon">
					<Icon name="search" strokeLinecap="round" />
				</span>
			</h2>
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
		gap: 1.5rem;
		padding-inline: 3rem;
		margin-top: 1.5rem;

		@include tablet {
			padding-inline: 2rem;
		}
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
				transform: scale(1) translateY(0);
				opacity: 0.5;
			}
		}
	}

	hgroup {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.icon {
		display: inline-block;
		position: relative;
		opacity: 0;
		top: -0.1em;
		margin-left: 0.25em;
		transform-origin: bottom center;
		transform: scale(0.95) translateY(0.1em);
		transition: transform 0.15s var(--ui-ease-out), opacity 0.1s ease-out;

		@include mobile {
			display: none;
		}
	}
</style>
