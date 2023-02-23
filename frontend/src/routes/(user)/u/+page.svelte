<script lang="ts">
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { USER_ROUTES } from './common';

	const routes = Object.values(USER_ROUTES);
</script>

<article>
	<ul>
		{#each routes as r, i}
			<li
				in:fly={{
					y: Math.random() * 40 - 20,
					opacity: 0,
					delay: i * 50 + 50,
					easing: expoOut,
					duration: 500,
				}}
				class={ICON_CLASS.hover}
			>
				<a href={r.pathname}>
					<i>
						<Icon name={r.icon} strokeWidth={2.5} animationSpeed={0.3} strokeLinecap="round" />
					</i>
					<span>
						{r.title}
					</span>
				</a>
			</li>
		{/each}
	</ul>
</article>

<style lang="scss">
	article {
		width: 100%;
		min-height: calc(100vh - var(--ui-nav-h));
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-inline: 1.5rem;
		padding-bottom: var(--ui-nav-h);
	}

	ul {
		flex: 0;
		width: 100%;
		max-width: var(--ui-width-main);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	li {
		display: inline-block;
		position: relative;
		width: 100%;
	}

	a {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: var(--ui-radius-xl);
		color: col(fg, 100);
		background: col(bg, 300);
		font-size: var(--ui-text-xl);
		padding: 1.5rem;
		font-weight: 500;
		transition: all 0.15s ease-out;

		span {
			z-index: 1;
		}

		@include tablet {
			aspect-ratio: 2 / 1;
			font-size: var(--ui-text-xl);
		}

		&:hover {
			z-index: 1;
			color: col(fg, 900);
			background: col(primary, 100);
			overflow: visible;
			box-shadow: var(--ui-shadow-md);

			i {
				color: col(primary, 300);
			}
		}
	}

	i {
		pointer-events: none;
		top: 0;
		display: flex;
		height: 100%;
		align-items: center;
		color: col(bg, 100);
		font-size: 500px;
		position: absolute;
		transition: inherit;
	}
</style>
