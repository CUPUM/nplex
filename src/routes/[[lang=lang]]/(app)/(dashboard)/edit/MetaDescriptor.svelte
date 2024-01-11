<script lang="ts">
	// type $$Props = HTMLButtonAttributes & {
	// 	deleteButton?: HTMLButtonAttributes;
	// 	variant?: 'new' | 'pending';
	// 	trigger: DialogElements['trigger'];
	// 	submitter: SuperForm['elements']['submitter']['root'];
	// 	label?: string | null;
	// };

	// export let deleteButton: $$Props['deleteButton'] = undefined;
	// export let variant: $$Props['variant'] = undefined;
	// export let label: $$Props['label'] = undefined;
	// export let trigger: $$Props['trigger'];
	// export let submitter: $$Props['submitter'];

	// let deleteRef: HTMLButtonElement;
</script>

<section class="dashboard-subsection">
	<header class="dashboard-subsection-header">
		<h1 class="h4">
			<slot name="title" />
		</h1>
		<p class="dashboard-subsection-description">
			<slot name="description" />
		</p>
	</header>
	<slot />
</section>

<style lang="postcss">
	@import '$styles/scoped/dashboard';
</style>
