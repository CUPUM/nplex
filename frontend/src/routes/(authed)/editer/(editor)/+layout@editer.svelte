<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Breadcrumbs from '$components/Breadcrumbs/Breadcrumbs.svelte';
	import BreadcrumbsItem from '$components/Breadcrumbs/BreadcrumbsItem.svelte';
	import BreadcrumbsSeparator from '$components/Breadcrumbs/BreadcrumbsSeparator.svelte';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import ModalConfirmNavigation from '$components/Modal/ModalConfirmNavigation.svelte';
	import { NAVBAR_WIDTH, overlapNavbar } from '$routes/Navbar.svelte';
	import { setRootBackground } from '$routes/RootBackground.svelte';
	import { col } from '$utils/css';
	import { THEMES, THEME_PALETTES } from '$utils/themes';
	import { cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { editorDirty, editorUpdating, EDITOR_FORM_ACTION, EDITOR_FORM_ID } from './common';

	const theme = 'dark';
	const shade = 500;
</script>

<article
	data-theme={THEMES.dark}
	use:overlapNavbar={{
		theme: THEMES[theme],
		background: col('bg', shade),
		width: NAVBAR_WIDTH.Full,
	}}
	use:setRootBackground={{ overscroll: THEME_PALETTES[theme].bg[shade] }}
	style:--editor-bg={col('bg', shade)}
>
	<!-- Breadcrumbs -->
	{#if $page.data.editorBreadcrumbs}
		<div id="editor-crumbs" in:fly={{ y: 6, duration: 350, easing: cubicOut, delay: 150 }}>
			<Breadcrumbs>
				{#each $page.data.editorBreadcrumbs as crumb, i (crumb.href)}
					<BreadcrumbsItem href={crumb.href} matcher={crumb.matcher}>{crumb.title}</BreadcrumbsItem>
					{#if i < $page.data.editorBreadcrumbs.length - 1}
						<BreadcrumbsSeparator><Icon name="chevron-right" /></BreadcrumbsSeparator>
					{/if}
				{/each}
			</Breadcrumbs>
		</div>
	{/if}
	<!-- Top header -->
	{#if $page.data.editorHeader}
		<svelte:component this={$page.data.editorHeader} />
	{/if}
	<div id="editor-columns">
		<!-- Sidebar navigation -->
		{#if $page.data.editorSidebar}
			<svelte:component this={$page.data.editorSidebar} />
		{/if}
		<!-- Main editor form -->
		<form
			class="editor-form"
			use:enhance={({ form, data, action, cancel }) => {
				editorUpdating.set(true);
				return async ({ update, result }) => {
					update({ reset: false });
					if (result.type !== 'success' && result.type !== 'redirect') {
						editorUpdating.set(false);
					}
				};
			}}
			method="POST"
			action="?/{EDITOR_FORM_ACTION}"
			id={EDITOR_FORM_ID}
		>
			<slot />
		</form>
	</div>
	<!-- Floating toolbar -->
	<menu>
		{#if $editorDirty}
			<div
				in:fly={{ y: 6, duration: 150, easing: cubicOut }}
				out:scale|local={{ start: 0.98, duration: 150, easing: cubicOut }}
			>
				<Button
					form={EDITOR_FORM_ID}
					formaction="?/{EDITOR_FORM_ACTION}"
					variant="cta"
					type="submit"
				>
					Sauvegarder
					<Icon name="save" slot="trailing" />
				</Button>
			</div>
		{/if}
	</menu>
	<!-- Navigation intercepting modal to prevent accidental data loss -->
	<ModalConfirmNavigation intercept={$editorDirty} let:confirm let:cancel>
		Vous avez des données non enregistrées. Celles-ci seront perdues si vous changez de page sans
		sauvegarder vos modifications.
		<svelte:fragment slot="footer">
			<Button variant="ghost" on:click={confirm}>Continuer sans sauvegarder</Button>
			<Button variant="ghost" on:click={cancel}>Annuler</Button>
			<Button variant="cta" type="submit" form={EDITOR_FORM_ID} loading={$editorUpdating}>
				Sauvegarder et continuer
			</Button>
		</svelte:fragment>
	</ModalConfirmNavigation>
</article>

<style lang="scss">
	article {
		--article-radius: min(var(--ui-radius-2xl), calc(0.1 * var(--ui-scroll-px)));
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 0 0 var(--article-radius) var(--article-radius);
		color: col(fg, 100);
		background: var(--editor-bg);
		margin-top: calc(-1 * var(--ui-nav-h));
		min-height: 100vh;
		padding: var(--ui-gutter-md);
		padding-top: 0;

		@include mobile {
			padding: 0.75rem;
			padding-top: 0;
			font-size: var(--ui-text-sm);
		}

		#editor-crumbs {
			--inset: var(--ui-inset);
			font-size: var(--ui-text-sm);
			position: sticky;
			top: 0;
			width: 100%;
			height: var(--ui-nav-h);
			padding-top: 1rem;
			padding-bottom: 1.5rem;
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: center;
			z-index: 5;
			font-weight: 500;
			max-width: var(--ui-nav-center-w);
		}

		#editor-columns {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			gap: var(--ui-gap-sm);
		}

		menu {
			position: sticky;
			bottom: 1.5rem;
			align-self: center;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			flex-direction: row;
			height: var(--ui-unit-lg);
			margin-top: var(--ui-gutter-md);
			z-index: 99;
		}

		:global(.editor-form) {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: stretch;
			gap: var(--ui-gap-sm);
			min-height: 100vh;
			min-height: 100svh;
			scroll-margin-block-start: var(--ui-nav-h);
		}

		:global(.editor-form-header) {
			position: relative;
			align-self: stretch;
			padding: var(--ui-gutter-md);
			border-radius: var(--ui-radius-xl);
			background-color: col(secondary, 100);

			:global(p:last-child) {
				margin-bottom: 0.5em;
			}
		}

		:global(.editor-form-group) {
			position: relative;
			padding: var(--ui-gutter-md);
			border-radius: var(--ui-radius-xl);
			background-color: col(bg, 700);
			// max-width: calc(100% - var(--ui-sidebar-w));
			// min-width: min(var(--ui-width-md), 100%);
		}

		:global(.editor-form-fields-center) {
			max-width: calc(100% - var(--ui-sidebar-w));
			min-width: min(var(--ui-width-md), 100%);
		}

		:global(.editor-form-group.editor-form-group-nomin) {
			min-width: unset;
			flex: 1;
		}

		:global(.editor-form-group-title) {
			@include typography(heading, md);
			margin-top: -0.25em;
			margin-bottom: 2rem;
		}
	}
</style>
