<script lang="ts">
	let { data } = $props();
</script>

<header
	class="p-xl min-h-main-full-height flex flex-col items-center justify-center pb-[calc(var(--spacing-xl)+var(--spacing-navbar-height))]"
>
	<hgroup class="prose leading-sm w-full max-w-xl">
		{#key data.lang}
			<h1>
				{#each data.title.split(' ') as word, iword}
					<span class="word" style:--i-word={iword}>
						<span>{word}</span>
					</span>
					{' '}
				{/each}
			</h1>
		{/key}
	</hgroup>
</header>
<article class="prose mx-auto max-w-md">
	<svelte:component this={data.content} />
</article>

<style>
	.word {
		white-space: nowrap;
		overflow-y: hidden;
		display: inline-block;
		padding-block: 0.15em;
		margin-block: -0.15em;

		span {
			display: inline-block;
			animation: reveal var(--transition-duration-xslow) calc(var(--i-word) * 0.05s)
				var(--transition-timing-function-out) both;
		}
	}

	@keyframes reveal {
		from {
			opacity: 0;
			translate: 0 1em;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}
</style>
