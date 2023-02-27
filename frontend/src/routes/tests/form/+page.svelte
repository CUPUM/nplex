<script lang="ts">
	import dirty from '$actions/dirty';
	import { enhance } from '$app/forms';

	const options = [
		{ name: 'test-1', id: 'prout', some: 87654 },
		{ name: 'test-2', id: 'pro1231ut', some: 7647353 },
		{ name: 'test-3', id: 'pr123123out', some: 123123 },
		{ name: 'test-4', id: 'pro12313ut', some: 141 },
	] as const;

	let checkbox: number[] = [];
	let radio: number = 1;
</script>

<form use:enhance method="POST">
	<fieldset>
		<legend>Test 1: text</legend>
		<input type="text" name="test_1" id="" use:dirty />
	</fieldset>
	<fieldset>
		<legend>Test 2: checkbox</legend>
		{#each options as option}
			<input
				type="checkbox"
				name="checkbox-{option.name}"
				value={option.some}
				bind:group={checkbox}
				id=""
				use:dirty
			/>
		{/each}
	</fieldset>
	<!-- <fieldset>
		<legend>Test 3: radio</legend>
		{#each options as option}
			<input type="radio" name="radio" id="" bind:group={radio} value={option.some} />
		{/each}
	</fieldset> -->
	<fieldset>
		<legend>Test 4: object options</legend>
		<select name="test_4" id="" use:dirty>
			{#each options as option}
				<option value={option}>{option.name}</option>
			{/each}
		</select>
	</fieldset>
	<fieldset>
		<legend>Test 5: primitive options</legend>
		<select name="test_4" id="" use:dirty>
			{#each options as option}
				<option value={option.some}>{option.name}</option>
			{/each}
		</select>
	</fieldset>
</form>

<style lang="scss">
	form {
		display: flex;
		padding: 3rem;
		flex-direction: column;
		gap: 0.5rem;
		align-items: stretch;
		width: 100%;
	}
	fieldset {
		width: 100%;
		padding: 3rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		border: 1px solid col(fg, 100, 0.1);
		border-radius: var(--ui-radius-lg);
	}

	legend {
		float: left;
		font-size: var(--ui-text-lg);
		font-weight: 500;
	}
</style>
