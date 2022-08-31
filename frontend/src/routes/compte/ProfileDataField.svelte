<script lang="ts" context="module">
</script>

<script lang="ts">
	export let value: string;

	function edit(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			(e.target as HTMLDivElement).blur();
		}
		// value = (e.target as HTMLDivElement).textContent;
	}
</script>

<section>
	<div class="label"><slot name="label" />:</div>
	<!-- <div class="field" contenteditable bind:textContent={value} /> -->
	<div class="field" contenteditable on:keydown={edit} bind:textContent={value}>
		{value}
	</div>
</section>

<style lang="scss">
	section {
		position: relative;
		font-size: 1.2rem;
		display: inline-flex;
		flex-direction: row;
		gap: 0em;
		padding: 0 1.5rem;
		padding-right: 1rem;
		border-radius: 1em;

		&:hover {
			background-color: rgba(var(--rgb-dark-100), 0.1);
		}

		> div {
			position: relative;
			top: -0.1em;
			line-height: 1em;
			padding: 1rem 0;
		}

		.label {
			font-weight: 300;
			opacity: 0.5;
		}

		.field {
			font-weight: 500;
			padding-inline: 0.5em;
		}
	}
</style>
