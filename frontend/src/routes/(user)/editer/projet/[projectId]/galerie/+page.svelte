<script lang="ts">
	import type { PageData } from './$types';
	import Gallery from './Gallery.svelte';
	import ImageInput from './ImageInput.svelte';

	export let data: PageData;
</script>

<ImageInput />
<Gallery {data} />

<style lang="scss">
	.update {
		display: flex;
		flex-direction: column;
		max-width: var(--ui-width-main);
		width: 100%;
		margin-inline: auto;
		padding-inline: 2rem;
		h2 {
			width: 100%;
			margin: 4rem auto;
		}
		ol {
			position: relative;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			width: 100%;
			min-height: 100px;
			gap: 0;
			gap: 2rem;
		}
		.dragging {
			li:not(.drag-subject) {
				opacity: 0.8;
				transform: scale(0.98);
			}
		}
		.drag-subject {
			cursor: grab;
			opacity: 1;
			box-shadow: 0 1rem 5rem -4rem black;
			background: col(bg, 000);
		}
		li {
			cursor: move;
			position: relative;
			flex: none;
			border-radius: var(--ui-radius-lg);
			transition: all 0.2s var(--ui-ease-out);
			&:hover {
				border-radius: var(--ui-radius-md);
				menu::before {
					opacity: 1;
				}
			}
		}
		.image {
			display: flex;
			position: relative;
			padding: 0;
			border-radius: inherit;
			:global(.gallery-image) {
				overflow: hidden;
				border-radius: inherit;
				object-fit: cover;
				aspect-ratio: 4/3;
			}
		}
		menu {
			height: 100%;
			width: 100%;
			position: absolute;
			padding: 1rem;
			bottom: 0;
			font-size: var(--ui-text-sm);
			display: flex;
			flex-direction: row;
			align-items: flex-end;
			border-radius: inherit;
			gap: 3px;
			&::before {
				user-select: none;
				pointer-events: none;
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				height: 100%;
				width: 100%;
				background: linear-gradient(0deg, col(bg, 500, 0.75) 0%, transparent 75%);
				opacity: 0;
				overflow: hidden;
				border-radius: inherit;
				transition: opacity 0.2s;
			}
		}
		fieldset {
			margin-top: 1rem;
			gap: 1rem;
			display: flex;
			flex-direction: column;
		}
		.drop {
			position: absolute;
			height: calc(100% + 2rem);
			width: calc(50% + 1rem);
			top: -1rem;
			opacity: 0;
			color: col(fg, 300);
			border: 1px solid transparent;
			border-radius: var(--ui-radius-md);
			transition: all 0.2s ease-out;
			&.target {
				opacity: 0.2;
			}
			&.before {
				left: -1rem;
				border-left: 1px solid currentColor;
			}
			&.after {
				right: -1rem;
				border-right: 1px solid currentColor;
			}
		}
	}
</style>
