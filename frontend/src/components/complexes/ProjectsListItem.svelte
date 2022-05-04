<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { colors } from '$utils/colors';

	import { Ctx } from '$utils/contexts';
	import { getContext, onMount } from 'svelte';
	import type { ProjectsListContext } from './ProjectsList.svelte';

	/**
	 * Project summary data.
	 */
	export let project: any = undefined;
	/**
	 * For programmatical control of active state. Useful to highlight card from mouse event elsewhere in the ui.
	 */
	export let active: boolean = undefined;
	/**
	 * Is the card accessible to user's visit?
	 */
	export let disabled: boolean = undefined;

	let cardElement: HTMLElement;

	const ctx = getContext<ProjectsListContext>(Ctx.ProjectsList);
	const imageSeed = (Math.random() * 1000).toFixed(0);
	const imageUrl = `https://picsum.photos/seed/${imageSeed}/800/600`;
</script>

<div class={ctx.display} class:disabled class:active bind:this={cardElement}>
	<div id="rippler" use:ripple={{ startColor: colors.dark[100], controlElement: cardElement }} />
	<figure>
		<div id="img-shadow" style:background-image="url({imageUrl})" />
		<img src={imageUrl} alt="" />
		<figcaption>
			<h3>Titre de projet</h3>
		</figcaption>
	</figure>
</div>

<style lang="postcss">
	div {
		position: relative;
		cursor: pointer;
		display: inline-block;
		width: 100%;
		border-radius: 1.5rem;
		padding: 1rem;
		box-shadow: 0 0 0 transparent;
		transition: all 0.15s ease-out;
		margin-bottom: 0;
		overflow: visible;

		&:hover {
			box-shadow: 0 1rem 2rem -1rem rgba(0, 0, 30, 0.2);

			& figcaption {
				opacity: 1;
			}

			& img {
				box-shadow: 0 1rem 3rem -1.5rem black;
			}
		}
	}

	#rippler {
		pointer-events: none;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		user-select: none;
	}

	.row {
		width: 300px;
	}

	figure {
		z-index: 0;
		position: relative;
		width: 100%;
		height: 300px;
		padding: 0;
		margin: 0;
		overflow: visible;
	}

	figcaption {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
		height: 50%;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 1rem;
		margin: 0;
		background: linear-gradient(to top, black, transparent);
		opacity: 0.8;
		border-radius: 0 0 1rem 1rem;
		transition: all 0.5s;
	}

	h3 {
		padding: 0;
		margin: 0;
		font-weight: 400;
		color: var(--color-light-300);
	}

	img {
		position: relative;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 1rem;
		opacity: 0.9;
		transition: all 0.25s;
	}

	#img-shadow {
		z-index: -1;
		pointer-events: none;
		position: absolute;
		top: 0rem;
		width: 100%;
		height: 100%;
		transform: scale(1);
		filter: blur(24px);
		opacity: 0;
		transition: all 0.25s ease-in;
	}

	div:hover:not(.disabled),
	div.active {
		& img {
			opacity: 1;
		}
		& #img-shadow {
			top: 3rem;
			transform: scale(0.85);
			opacity: 0.65;
			transition: all 0.25s ease-out;
		}
	}
</style>
