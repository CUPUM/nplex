<script lang="ts">
	import { intersection } from '$actions/intersection';
	import { page } from '$app/stores';
	import Button from '$components/primitives/Button_old.svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import { getAuthRedirectUrl } from '$utils/routing/guard';
	import { colors } from '$utils/values/colors';
	import { sizes } from '$utils/values/sizes';

	export let project;
	export let imageLoading = true;

	let authHref;
	let entered = false;

	function handleEnter() {
		entered = true;
	}

	function handleImageLoad() {
		imageLoading = false;
	}

	function handleEnterCurrent() {}

	$: authHref = getAuthRedirectUrl($page.url);
</script>

<li use:intersection={{ rootMargin: '0% 0% 0%' }} on:enter on:leave on:enter|once={handleEnter}>
	{#if project}
		<a
			href="/projets/{project.id}"
			use:intersection={{ rootMargin: '-50% 0% -50%' }}
			on:enter={handleEnterCurrent}
			class="button-parent project-card"
		>
			<figure class:loading={imageLoading}>
				{#if imageLoading}
					<Loading color={colors.primary[100]} />
				{/if}
				{#if entered}
					<img src={project.showcase_image.url} alt="" on:load={handleImageLoad} />
				{/if}
			</figure>
			<h3>{project.name}</h3>
			<Button size={sizes.small} style="grid-area: button;" icon="arrow-right" iconPosition="trailing">
				Consulter
			</Button>
		</a>
	{:else if $page.data.user}
		<!-- Placeholder project card -->
		<a href="">Soumettre un nouveau projet</a>
	{:else}
		<a href={authHref} class="button-parent login-card">
			<Button icon="arrow-right">Connectez-vous ou créez un compte</Button>
			<p>pour soumettre un nouveau projet.</p>
		</a>
	{/if}
</li>

<style lang="scss">
	li {
		position: relative;
		display: block;
		padding: 0;
		margin: 0;
		width: 100%;
		/* scroll-snap-align: center; */
	}

	.login-card {
		text-decoration: none;
		display: flex;
		margin: 2rem;
		padding: 2rem;
		flex-direction: column;
		border-radius: 2rem;
		gap: 1rem;
		border: 1px solid rgba(var(--rgb-dark-900), 0.05);
	}

	.project-card {
		text-decoration: none;
		display: grid;
		gap: 12px;
		grid-template-areas:
			'image	title	title	title'
			'image	summary	cost	cost'
			'image	summary	tokens	button';
		grid-auto-flow: dense;
		position: relative;
		width: 100%;
		height: 100%;
		padding: 1rem;
		border-radius: 2rem;
		background-color: var(--color-light-100);
		box-shadow: inset 0 0 0 1px rgba(var(--rgb-dark-900), 0.05), 0 0 0 0 transparent;
		color: var(--color-dark-500);
		transform: scale(0.98);
		transition: all 0.15s ease-out;

		&:hover {
			color: var(--color-dark-900);
			background-color: white;
			box-shadow: inset 0 0 0 0px white, 0 2rem 6rem -2rem rgba(var(--rgb-dark-900), 0.25);
			transform: scale(1);

			& img {
				transform: scale(1);
			}
		}
	}

	figure {
		grid-area: image;
		position: relative;
		padding: 0;
		margin: 0;
		width: 200px;
		height: 200px;
		overflow: hidden;
		border-radius: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.5s cubic-bezier(0.5, 0, 0, 1);

		&.loading {
			transform: scale(0.9);

			& img {
				opacity: 0;
			}
		}
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: all 0.15s;
		transform: scale(1.1);
	}

	h3 {
		font-size: var(--size-large);
		font-weight: 500;
	}
</style>
