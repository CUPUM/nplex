<script lang="ts" context="module">
</script>

<script lang="ts">
	import { intersection } from '$actions/intersection';
	import { reveal, slipMask } from '$actions/reveal';
	import Button from '$components/Button.svelte';
	import { onDestroy } from 'svelte';
	import { navbarTheme } from './AppNavbar.svelte';
	import { ThemeClass } from './AppThemes.svelte';

	function headerEnter() {
		navbarTheme.set(ThemeClass.dark);
	}

	function headerLeave() {
		navbarTheme.reset();
	}

	onDestroy(() => {
		headerLeave();
	});
</script>

<header
	class={ThemeClass.dark}
	use:intersection={{ rootMargin: '0px 0px 0px 0px' }}
	on:enter={headerEnter}
	on:leave={headerLeave}
>
	<hgroup>
		<h1
			class="head"
			use:reveal={{
				...slipMask,
				start: {
					opacity: '1',
					transform: 'translateY(1em)',
				},
				delimiter: '',
				stagger: (i) => 75 + i * 10,
				easing: 'cubic-bezier(0, .75, 0, 1)',
				duration: 2000,
			}}
		>
			Nplex
		</h1>
		<!-- <div class="head" aria-hidden="true">Nplex</div>
		<div class="head" aria-hidden="true">Nplex</div> -->
	</hgroup>
</header>
<section class="pres">
	<p>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil itaque maiores perferendis
		autem error. Maxime eos modi impedit quod praesentium, unde numquam delectus architecto
		nostrum possimus aperiam est consectetur cum. Officiis autem corporis similique minus
		debitis cumque, beatae excepturi pariatur ullam odio ea! Voluptate adipisci temporibus
		suscipit, cumque vero, fugit fugiat blanditiis culpa ut placeat repellendus nemo soluta
		similique illum, dolorem vel veniam at quo pariatur quibusdam esse nobis. Fugiat impedit ut
		provident.
	</p>
	<Button>Explorer</Button>
</section>

<style lang="scss">
	header {
		z-index: 1;
		position: relative;
		height: calc(100vh + 2rem);
		padding: 0;
		padding-bottom: 5rem;
		padding-top: calc(var(--navbar-height-px) + 6rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		margin: 0;
		margin-top: var(--n-navbar-height-px);
		background: col(bg, 100);
		border-radius: min(2rem, calc(0.2 * var(--scroll-px)));
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		box-shadow: 0 -100px col(bg, 100);
		transition: border-radius 0.2s ease-out;
	}

	hgroup {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		overflow: visible;
		padding: 0;
		margin: 0;
		line-height: 1;
		align-self: flex-start;
	}

	.head {
		position: relative;
		padding: 0 2rem;
		line-height: 1em;
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: nowrap;
		white-space: nowrap;
		width: 100vw;
		margin: 0;
		font-size: calc(34vw - 1rem);
		letter-spacing: -0.05em;
		left: -0.035em;
		top: 0.135em;
		font-weight: inherit;
		color: col(fg, 100);
		text-transform: uppercase;
		font-weight: 500;

		@for $i from 0 through 4 {
			& :global(span > :nth-child(#{5 - $i})) {
				position: relative;
				bottom: calc(var(--scroll-px) * #{0.1 * $i});
				transition: bottom 0.2s;
			}
		}
	}

	.pres {
		position: sticky;
		bottom: 0;
		padding: var(--ui-size-x4large) var(--ui-size-small);
		margin: 0;
		width: 100%;
		min-height: 50vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: col(bg, 700);
		border-radius: 2rem;
		gap: 2rem;
	}

	p {
		max-width: var(--ui-display-small);
	}
</style>
