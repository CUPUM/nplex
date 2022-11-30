<script lang="ts" context="module">
</script>

<script lang="ts">
	import { enhance } from '$app/forms';

	import { formid } from '../common';
	import type { PageData } from './$types';
	import { MIME_TYPES } from './common';

	export let data: PageData;
</script>

<form
	id={formid}
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<h2>Galerie</h2>
	<ul>
		<li>
			<label>
				<input type="file" accept={MIME_TYPES.join(',')} multiple name="images" id="" />
			</label>
		</li>
		<li>Image 1</li>
		<li>Image 2</li>
		<li>Image 3</li>
		<li>Image 4</li>
		<li>Image 5</li>
	</ul>
</form>

<style lang="scss">
	form {
		padding: 2rem;
	}

	ul {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1rem;
	}

	li {
		display: inline-block;
		aspect-ratio: 3 / 2;
		grid-column: span 1;
		background: col(bg, 900);
	}
</style>
