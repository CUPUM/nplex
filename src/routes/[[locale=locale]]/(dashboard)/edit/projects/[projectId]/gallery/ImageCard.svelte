<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import type { ProjectsGalleryUpdateSchema } from '$lib/db/crud.server';
	import type { SuperForm } from '$lib/forms/super-form';
	import { link } from '$lib/i18n/link';
	import { imageUrl } from '$lib/media/url';
	import { Pen, Presentation, Trash } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { PageData } from './$types';

	export let image: PageData['images'][number];
	export let form: SuperForm<ProjectsGalleryUpdateSchema>['form'];

	let isBanner = image.id === $form.bannerId;
	function syncIsBanner(trigger: any) {
		isBanner = image.id === $form.bannerId;
	}
	$: syncIsBanner($form.bannerId);

	const dispatch = createEventDispatcher();
</script>

<figure class="card">
	<img
		class="card-img"
		src={imageUrl(image.storageName, { resize: { fit: 'inside', height: 250 }, quality: 0.8 })}
		alt="image-{image.id}"
	/>
	<div class="card-footer">
		<menu class="card-menu toolbar round" data-mode="dark">
			<button
				use:ripple
				class="button ghost danger square"
				type="submit"
				name="deleteId"
				formaction="?/delete"
				on:click={(e) => dispatch('delete')}
				value={image.id}
			>
				<Trash class="button-icon" />
			</button>
			<!-- svelte-ignore a11y-missing-attribute -->
			<a
				class="button ghost square"
				use:ripple
				{...$link(`/edit/projects/${image.projectId}/gallery/${image.id}`)}
			>
				<Pen class="button-icon" />
			</a>
			<hr />
			<button
				use:ripple
				class="toggle"
				type="submit"
				formaction="?/{image.id === $form.bannerId ? 'demote' : 'promote'}"
				name="bannerId"
				value={image.id}
				data-state={isBanner ? 'checked' : 'unchecked'}
				on:click={(e) => {
					isBanner = $form.bannerId !== image.id;
					return e;
				}}
			>
				<span class="toggle-thumb">
					<Presentation class="toggle-icon" />
				</span>
			</button>
		</menu>
	</div>
</figure>

<style lang="postcss">
	.card {
		position: relative;
		height: 250px;
		flex: none;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-md);
		box-shadow: 0 0 0 var(--base-border-size)
			color-mix(in srgb, var(--color-neutral-500) 5%, transparent);

		&:hover .card-menu {
			transform: scale(1);
			background-color: color-mix(in srgb, var(--color-neutral-950) 85%, transparent);
		}
	}

	.card-img {
		object-fit: cover;
		height: 100%;
		width: 100%;
		border-radius: inherit;
		cursor: zoom-in;
	}

	.card-footer {
		display: flex;
		flex-direction: row;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0.75rem;
		pointer-events: none;
		align-items: center;
		justify-content: flex-start;
		font-size: var(--size-xs);

		> * {
			pointer-events: initial;
		}
	}

	.card-menu {
		backdrop-filter: blur(6px);
		background-color: color-mix(in srgb, var(--color-neutral-950) 25%, transparent);
		transition: all var(--duration-medium) var(--ease-out-expo);
		overflow-x: auto;
		max-width: 100%;
	}
</style>
