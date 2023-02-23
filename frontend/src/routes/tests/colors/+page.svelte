<script lang="ts">
	import { overlapNavbar } from '$routes/Navbar.svelte';
	import { THEME_PALETTES } from '$utils/themes';
</script>

{#each Object.entries(THEME_PALETTES) as [theme, themeColors]}
	<article data-theme={theme} use:overlapNavbar={{ theme }}>
		{#each Object.entries(themeColors) as [color, colors]}
			<h2>{color}</h2>
			<div class="color">
				{#each Object.entries(colors) as [shade, value]}
					<div class="shade" style:--color={value}>
						<span>
							{shade}
						</span>
					</div>
				{/each}
			</div>
		{/each}
	</article>
{/each}

<style lang="scss">
	article {
		width: 100%;
		min-height: 100vh;
		background: col(bg, 000);
		padding: 12rem;
	}

	.color {
		position: relative;
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 1rem;
	}

	.shade {
		position: relative;
		aspect-ratio: 1;
		// height: 2rem;
		border-radius: var(--ui-radius-sm);
		background: var(--color);
		box-shadow: var(--ui-shadow-md);
		padding: 1rem;
		font-size: var(--ui-text-xs);
	}

	span {
		color: white;
		// mix-blend-mode: exclusion;
	}
</style>
