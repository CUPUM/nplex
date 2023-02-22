<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let current: boolean | undefined = undefined;

	$: current = $page.url.pathname === new URL(href, $page.url.origin).pathname || undefined;
	$: console.log(current);
</script>

<a {href} data-sveltekit-preload-code data-sveltekit-preload-data data-current={current}>
	<span class="inner">
		<slot />
	</span>
</a>

<style lang="scss">
	:global(.ui-breadcrumbs) {
		a {
			display: flex;
			flex: none;
			align-items: center;
			padding-inline: 1em;
			align-self: stretch;
			border-radius: calc(var(--radius) - var(--inset));
			transition: all 0.1s;

			&:first-of-type {
				padding-inline-start: 1.5em;
			}

			&:last-of-type {
				padding-inline-end: 1.5em;
			}

			.inner {
				position: relative;
				top: -0.1em;
			}
		}
	}

	:global(.ui-breadcrumbs.default) {
		a {
			color: col(fg, 100);
			&:hover {
				color: col(primary, 700);
				background: col(primary, 300, 0.2);
			}
			&[data-current] {
				background: col(fg, 100, 0.1);
			}
		}
	}

	:global(.ui-breadcrumbs.outlined) {
		a {
			&:hover {
			}
		}
	}
</style>
