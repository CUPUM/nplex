<script lang="ts" context="module">
</script>

<script lang="ts">
	export let title: string;
	export let authorsIds: string[];
</script>

<p><slot /></p>

<style lang="scss">
	p {
		// &:nth-child(odd) {
		// 	grid-column: col1 / col2;
		// }
		// &:nth-child(even) {
		// 	grid-column: col2 / col3;
		// }
	}
</style>
