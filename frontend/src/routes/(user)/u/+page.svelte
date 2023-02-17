<script lang="ts">
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { USER_ROUTES } from './common';

	const repeat = Array(30);
	function saliant() {
		const r = Math.round(Math.random() * 5);
		return Math.round(Math.random() * 3) + 2;
	}
	const routes = Object.values(USER_ROUTES);
</script>

<article>
	<ul>
		{#each routes as r, i}
			{@const s = saliant()}
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
					{#each repeat as clone, i}
						{#if i === s && 'icon' in r}
							<i>
								<Icon
									name={r.icon}
									style="top: -.1em; display: inline"
									strokeWidth={2.5}
									strokeLinecap="round"
								/>
							</i>
						{/if}
						<span
							style:padding-left="{(Math.random() * 1).toFixed(2)}em"
							role={i === s ? 'presentation' : undefined}
							class:saliant={i === s}
						>
							{r.title}
						</span>
					{/each}
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
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 1.5rem;

		@include tablet {
			display: flex;
			flex-direction: column;
		}
	}

	li {
		display: inline-block;
		position: relative;
		width: 100%;
	}

	a {
		display: block;
		word-break: break-all;
		white-space: normal;
		overflow: hidden;
		line-height: 1;
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: var(--ui-radius-xl);
		color: col(bg, 100);
		background: col(bg, 300);
		font-size: clamp(var(--ui-text-lg), 3vw, var(--ui-text-2xl));
		font-weight: 500;
		transition: all 0.2s var(--ui-ease-out);

		@include tablet {
			aspect-ratio: 2 / 1;
			font-size: var(--ui-text-2xl);
		}

		&:hover {
			// border-radius: var(--ui-radius-lg);
			background: col(primary, 300);
			color: col(primary, 500);

			.saliant,
			i {
				color: col(fg, 700);
			}
		}
	}

	.saliant,
	i {
		padding-inline: 1em !important;
		word-break: keep-all;
		display: inline-block;
		color: col(fg, 100);
		-webkit-text-stroke: 0px !important;
	}
</style>
