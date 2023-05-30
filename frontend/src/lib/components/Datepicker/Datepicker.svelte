<!--
	@component
	# Datepicker
	
-->
<script lang="ts" context="module">
	type DatepickerValue = Date | [Date, Date];
</script>

<script lang="ts">
	import { locale } from '$components/Language/Translation.svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type V = $$Generic;

	type $$Props = HTMLInputAttributes & {
		value?: V extends DatepickerValue ? V : never;
		min?: Date;
		max?: Date;
		formatter: Intl.DateTimeFormat;
		placeholder: string | undefined;
		opened: boolean;
	};

	export let value: $$Props['value'] = undefined;
	export let min: $$Props['min'] = undefined;
	export let max: $$Props['max'] = undefined;
	export let formatter: $$Props['formatter'] = new Intl.DateTimeFormat($locale);
	export let placeholder: $$Props['placeholder'] = undefined;
	export let opened: $$Props['opened'] = false;
</script>

<div role="date-picker">
	<div class="datepicker-nav" />
	<div class="datepicker-calendar" />
</div>

<style lang="scss">
	@use './Datepicker.scss';
</style>
