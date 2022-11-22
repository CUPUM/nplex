<script lang="ts">
	import { reveal, slipMask } from '$actions/reveal';
	import { debounce } from '$utils/debounce';
	import { Ctx } from '$utils/enums';
	import { getContext, onMount } from 'svelte';
	import { expoInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { ProjectEditorContext } from './+page.svelte';

	export let isNew: boolean;

	const { formProject } = getContext<ProjectEditorContext>(Ctx.ProjectEditor);

	let renderTitle = $formProject.title;
	const updateTitle = debounce((newTitle: string) => {
		renderTitle = newTitle;
	}, 500);

	$: if ($formProject.title !== renderTitle) updateTitle($formProject.title);

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<header class:mounted>
	<hgroup>
		<section class="title">
			{#key renderTitle}
				<h1
					use:reveal={{ ...slipMask, delimiter: ' ', stagger: 75, rootMargin: '0px 0px' }}
				>
					{isNew && !renderTitle
						? 'Nouvelle fiche de projet'
						: 'Fiche de projet : ' + renderTitle}
				</h1>
			{/key}
		</section>
		<section class="dates">
			{#if !isNew}
				<div transition:fly={{ y: 15, easing: expoInOut, duration: 250 }}>
					Fiche créée le&nbsp;:
					<span class="digits">
						{new Date(+$formProject.created_at).toLocaleString()}
					</span>
				</div>
			{/if}
			{#if $formProject._updated_at}
				<div transition:fly={{ y: 10, easing: expoInOut, duration: 250, delay: 150 }}>
					{isNew ? 'Brouillon modifié' : 'Fiche modifiée'} le&nbsp;:
					<span class="digits">
						{new Date(+$formProject._updated_at).toLocaleString()}
					</span>
				</div>
			{/if}
		</section>
	</hgroup>
</header>

<style lang="scss">
	// header {
	// 	position: relative;
	// 	color: var(--color-dark-700);
	// 	grid-column: full;
	// 	background: var(--color-light-500);
	// 	margin-top: calc(-1 * var(--navbar-height));
	// 	min-height: 95vh;
	// 	padding: 6rem 0;
	// 	display: flex;
	// 	flex-direction: column;
	// 	align-items: center;
	// 	justify-content: center;
	// 	z-index: -20;

	// 	&::after {
	// 		content: '';
	// 		position: absolute;
	// 		width: 120%;
	// 		height: 300px;
	// 		bottom: 0;
	// 		left: -10%;
	// 		filter: blur(16px);
	// 		opacity: 0.1;
	// 		background: linear-gradient(0deg, var(--color-dark-100), transparent);
	// 	}
	// }

	// hgroup {
	// 	transform-origin: center bottom;
	// 	width: 100%;
	// 	@include mixins.core-grid;
	// 	transform: scale(max(0.95, calc(1 - 0.0001 * var(--scroll, 0px))));
	// }

	// .title {
	// 	display: inline-block;
	// 	grid-column: col1 / col2;
	// }

	// h1 {
	// 	margin: 0;
	// 	word-wrap: break-word;
	// 	word-break: break-all;
	// 	overflow-wrap: break-word;
	// }

	// .dates {
	// 	color: var(--color-dark-100);
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: flex-end;
	// 	align-items: flex-end;
	// 	grid-column: col3;
	// 	gap: 1em;
	// 	font-size: 0.8em;
	// 	font-weight: 400;
	// 	letter-spacing: 0.25px;
	// 	line-height: 1.5;
	// 	margin-bottom: 1.25em;
	// 	font-weight: 300;
	// }

	// .digits {
	// 	display: block;
	// 	font-family: var(--ui-font-misc);
	// }

	// div {
	// 	opacity: 0;
	// 	transform: translateY(0.5em);
	// 	transition: all 1.5s cubic-bezier(0.1, 0, 0, 1);
	// 	transition-delay: 0.25s;

	// 	&:nth-child(2) {
	// 		transition-delay: 0.5s;
	// 	}
	// }

	// .mounted div {
	// 	opacity: 1;
	// 	transform: translateY(0);
	// }
</style>
