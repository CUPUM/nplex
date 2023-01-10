<!--
	@component
	# Select
	
-->
<script lang="ts" context="module">
	const CTX_KEY = 'select-context';
	interface SelectContext {}
	export function getSelectContext() {
		return getContext<SelectContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, type ComponentProps } from 'svelte';
	import Field from './Field.svelte';
	import Icon from './Icon.svelte';
	import Popover from './Popover.svelte';

	type OptionObject = { value: any; text: string | number; disabled?: boolean; selected?: boolean };
	type Option = $$Generic<OptionObject | string | number>;

	export let variant: ComponentProps<Field>['variant'] = 'default';
	export let id: ComponentProps<Field>['id'] = undefined;
	export let name: ComponentProps<Field>['name'] = undefined;
	export let sample: ComponentProps<Field>['sample'] = undefined;
	export let value: ComponentProps<Field>['value'] = null;
	export let options: Option[] | undefined = undefined;
	export let placeholder: ComponentProps<Field>['placeholder'] = undefined;
	export let prefix: ComponentProps<Field>['prefix'] = '';
	export let suffix: ComponentProps<Field>['suffix'] = '';
	export let required: ComponentProps<Field>['required'] = undefined;
	export let compact: ComponentProps<Field>['compact'] = undefined;
	export let disabled: ComponentProps<Field>['disabled'] = undefined;
	export let warning: ComponentProps<Field>['warning'] = undefined;
	export let success: ComponentProps<Field>['success'] = undefined;
	export let loading: ComponentProps<Field>['loading'] = undefined;
	export let tabindex: ComponentProps<Field>['tabindex'] = undefined;
	export let dirty: ComponentProps<Field>['dirty'] = undefined;
	export let multiple: boolean | undefined = undefined;
	export let style: ComponentProps<Field>['style'] = undefined;
	let className: ComponentProps<Field>['class'] = undefined;
	export { className as class };
	export let text: string | null = null;

	function setText(e: Event) {
		if (e.target instanceof HTMLSelectElement && 'options' in e.target) {
			text = e.target.options[e.target.options.selectedIndex].text;
		} else {
			text = null;
		}
	}

	function getoption(o: Option, key: keyof OptionObject) {
		if (typeof o === 'number' || typeof o === 'string') {
			return o;
		}
		return (o as OptionObject)[key];
	}
</script>

{#if $$slots.default}
	<!-- If a custom options-list is provided, use Popover -->
	<Popover let:open>
		<Field
			style="cursor: pointer; {style}"
			bind:value
			bind:sample
			bind:prefix
			bind:suffix
			bind:id
			bind:variant
			bind:placeholder
			bind:compact
			bind:disabled
			bind:warning
			bind:success
			bind:loading
			bind:tabindex
			bind:name
			bind:dirty
			bind:required
			class={className}
			nolabel={!$$slots.label}
		>
			<slot name="leading" slot="leading" />
			<svelte:fragment slot="label">
				{#if $$slots.label}
					<slot name="label" />
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="input" let:check let:bindInputRef>
				<input type="text" value={text} {placeholder} readonly data-field-input />
				<select
					class="input"
					bind:value
					{id}
					{name}
					{disabled}
					{required}
					{tabindex}
					use:bindInputRef
					on:input={setText}
				>
					<option hidden={required} />
					{#each options || [] as o}
						{@const value = getoption(o, 'value')}
						{@const text = getoption(o, 'text')}
						{@const disabled = getoption(o, 'disabled')}
						{@const selected = getoption(o, 'selected')}
						<option {value} {disabled} selected={o === value}>{text}</option>
					{/each}
				</select>
			</svelte:fragment>
			<svelte:fragment slot="trailing">
				<button>
					<Icon class="arrow" name="chevron-down" />
				</button>
				<slot name="trailing" />
			</svelte:fragment>
		</Field>
		<menu>
			<slot />
		</menu>
	</Popover>
{:else}
	<!-- Else use native select -->
	<Field
		style="cursor: pointer; {style}"
		bind:value
		bind:sample
		bind:prefix
		bind:suffix
		bind:id
		bind:variant
		bind:placeholder
		bind:compact
		bind:disabled
		bind:warning
		bind:success
		bind:loading
		bind:tabindex
		bind:name
		bind:dirty
		bind:required
		class={className}
		nolabel={!$$slots.label}
	>
		<slot name="leading" slot="leading" />
		<svelte:fragment slot="label">
			{#if $$slots.label}
				<slot name="label" />
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="input" let:check let:bindInputRef>
			<input type="text" value={text} {placeholder} readonly data-field-input />
			<select
				class="input"
				bind:value
				{id}
				{name}
				{disabled}
				{required}
				{tabindex}
				use:bindInputRef
				on:input={setText}
			>
				<option hidden={required} />
				{#each options || [] as o}
					{@const value = getoption(o, 'value')}
					{@const text = getoption(o, 'text')}
					{@const disabled = getoption(o, 'disabled')}
					{@const selected = getoption(o, 'selected')}
					<option {value} {disabled} selected={o === value}>{text}</option>
				{/each}
			</select>
		</svelte:fragment>
		<svelte:fragment slot="trailing">
			<button>
				<Icon class="arrow" name="chevron-down" />
			</button>
			<slot name="trailing" />
		</svelte:fragment>
	</Field>
{/if}

<style lang="scss">
	ul {
		background: black;
	}

	menu {
		display: flex;
		flex-direction: column;
		gap: 0;
		min-width: 100%;
	}

	li {
		cursor: pointer;
	}

	.disabled {
		pointer-events: none;
	}

	select {
		appearance: none;
	}

	.input {
		cursor: pointer;
		position: absolute;
		border-radius: inherit;
		opacity: 0;
		// background: red;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;

		&:focus:active {
			top: calc(100%);
		}
	}

	button {
		position: relative;
		display: flex;
		align-self: stretch;
		flex-direction: row;
		align-items: center;
		padding-inline: calc(var(--ui-pad-x) / 2) var(--ui-pad-x);
		height: 100%;
		top: -0.15em;
		transition: top 0.25s var(--ui-ease-out);
	}
</style>
