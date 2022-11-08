<script lang="ts" context="module">
</script>

<script lang="ts">
	import Icon from '$components/Icon.svelte';
</script>

<label class="token">
	<input type="checkbox" hidden />
	<span>Token</span>
	<span>
		<Icon name="cross" />
	</span>
</label>

<style lang="scss">
	.token {
		flex: 0;
		height: 2.5em;
		padding: 0;
		border-radius: 100px;
		display: flex;
		flex-direction: row;
		align-items: center;
		background: var(--color-base-000);
	}

	button {
		all: unset;
		cursor: pointer;
		height: 100%;
		aspect-ratio: 1 / 1;
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: var(--color-base-900);
	}

	span {
		display: block;
		padding: 0 0.5em 0 1.5em;
		margin-bottom: calc(0.5em - 0.5ex);
	}
</style>
