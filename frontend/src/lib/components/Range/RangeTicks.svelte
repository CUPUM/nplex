<!--
	@component
	# Range Labels
	Add range ruling labels.
 -->
<script lang="ts" context="module">
</script>

<script lang="ts">
	export let ticks: (number | [number, string])[];
	export let minor: boolean = false;
</script>

<ol class:minor>
	{#each ticks as tick}
		{@const value = Array.isArray(tick) ? tick[0] : tick}
		{@const label = Array.isArray(tick) ? tick[1] : undefined}
		<li style:--value={value}>
			<span>
				<slot {value} {label}>
					{label ?? ''}
				</slot>
			</span>
		</li>
	{/each}
</ol>

<style lang="scss">
	ol {
		position: relative;
		height: 2em;
		grid-area: ticks;
		display: flex;
		user-select: none;

		:global(.row .inner) > & {
			top: 50%;
			flex-direction: row;
			width: 100%;
		}

		:global(.column .inner) > & {
			left: 50%;
			flex-direction: column;
			height: 100%;
		}
	}

	li {
		--pc: calc((var(--value) - var(--min)) / var(--domain) * 100%);
		position: absolute;
		flex: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		span {
			max-width: 120px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		&::before {
			content: '';
		}

		:global(.row .inner) > ol & {
			top: 50%;
			transform: translateX(-50%);
			left: var(--pc);

			&::before {
				width: 1px;
				height: 1em;
				background: black;
			}
		}

		:global(.column .inner) > ol & {
			left: 50%;
			flex-direction: row;
			transform: translateY(-50%);
			top: var(--pc);

			&::before {
				width: 1em;
				height: 1px;
				background: black;
			}
		}
	}
</style>
