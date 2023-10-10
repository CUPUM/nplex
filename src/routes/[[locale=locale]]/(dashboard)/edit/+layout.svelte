<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import Loading from '$lib/components/Loading.svelte';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { composeMeshgradient, type MeshGradientParams } from '$lib/utils/mesh-gradient';
	import { Paintbrush, Users } from 'lucide-svelte';

	const t = createTranslations({
		fr: {
			editables: {
				projects: 'Mes projets',
				organizations: 'Mes organisations',
				noname: 'Sans nom',
			},
		},
		en: {
			editables: {
				projects: 'My projects',
				organizations: 'My organizations',
				noname: 'No name',
			},
		},
	});

	const preset: MeshGradientParams = {
		colors: ['var(--color-neutral-500)', 'var(--color-neutral-700)', 'var(--color-primary-700)'],
		opacity: [0.1, 0.3],
		spread: [70, 200],
	};

	export let data;
</script>

<slot />
<aside>
	<section>
		<h2 class="heading md">{$t.editables.projects}</h2>
		<ul>
			{#await data.streamed.editableProjects}
				<Loading />
			{:then ep}
				{#each ep as p}
					<li>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a
							{...$link(`/edit/projects/${p.id}`)}
							class="card"
							style:background={composeMeshgradient(preset)}
							use:ripple
						>
							<Paintbrush class="card-icon" />
							{#if p.title}
								{p.title}
							{:else}
								<span class="dimmer">{$t.editables.noname}</span>
							{/if}
						</a>
					</li>
				{/each}
			{/await}
		</ul>
	</section>
	<section>
		<h2 class="heading md">{$t.editables.organizations}</h2>
		<ul>
			{#await data.streamed.editableOrganizations}
				<Loading />
			{:then eo}
				{#each eo as o}
					<!-- svelte-ignore a11y-missing-attribute -->
					<a
						{...$link(`/edit/organizations/${o.id}`)}
						class="card"
						style:background={composeMeshgradient(preset)}
						use:ripple
					>
						<Users class="card-icon" />
						{#if o.name}
							{o.name}
						{:else}
							<span class="dimmer">{$t.editables.noname}</span>
						{/if}
					</a>
				{/each}
			{/await}
		</ul>
	</section>
	<!-- <menu>
		<button class="button square"><ChevronUp class="button-icon" /></button>
	</menu> -->
</aside>

<style lang="postcss">
	aside {
		border-top: var(--base-border);
		padding: 0;
		align-self: stretch;
		display: flex;
		flex-direction: column;
	}

	h2 {
		padding: 0rem 2rem;
	}

	ul {
		position: relative;
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		overflow-x: auto;
		gap: 1em;
		padding: 2rem;
	}

	li {
		overflow: visible;
	}

	.card {
		position: relative;
		font-size: var(--size-xl);
		font-weight: 450;
		letter-spacing: 0.01em;
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
		flex: none;
		padding: 2rem;
		height: 350px;
		border-radius: var(--radius-sm);
		color: var(--color-neutral-200);
		background-color: var(--color-neutral-800) !important;
		aspect-ratio: 3 / 4;
		transition: all var(--duration-fast) ease-out;

		&:hover {
			transform: scale(1.02);
			box-shadow: var(--shadow-xl);
		}

		:global(.card-icon) {
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			position: absolute;
			opacity: 0.5;
		}
	}
</style>
