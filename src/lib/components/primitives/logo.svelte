<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';
	import { cn } from '../utilities';

	let {
		id,
		'data-mono': dataMono,
		height = '1em',
		class: className,
		delay = 0,
		...svgProps
	}: {
		id: string;
		delay?: number;
		'data-mono'?: boolean;
	} & Omit<SVGAttributes<SVGElement>, 'viewBox' | 'fill' | 'xmlns'> = $props();

	const syncbaseId = id.replaceAll('-', '_');
	let viewBox = $derived(dataMono ? '0 50 100 100' : '0 0 520 200');
</script>

<svg
	{id}
	data-logo="true"
	data-mono={dataMono}
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	{viewBox}
	{height}
	{...svgProps}
	class={cn('logo relative', className)}
>
	<path
		id="{syncbaseId}_n"
		d="M0 100C0 72.3858 22.3858 50 50 50C77.6142 50 100 72.3858 100 100V150H0V100Z"
		fill="currentColor"
		opacity="0"
		data-mono="true"
	>
		<animate
			id="{syncbaseId}_n_opacity"
			attributeName="opacity"
			dur="750ms"
			fill="freeze"
			calcMode="spline"
			keySplines="0.16, 1, 0.3, 1"
			values="0;1"
			begin="{delay}ms"
		/>
		<animateTransform
			id="{syncbaseId}_n_translate"
			attributeName="transform"
			attributeType="XML"
			type="translate"
			dur="750ms"
			calcMode="spline"
			keySplines="0, 1, 0.2, 1"
			values="75;0"
			begin="{syncbaseId}_n_opacity.begin"
		/>
	</path>
	<g id="{syncbaseId}_p">
		<circle id="{syncbaseId}_p_eye" cx="170" cy="100" r="50" fill="currentColor" opacity="0">
			<animate
				id="{syncbaseId}_p_eye_opacity"
				attributeName="opacity"
				dur="750ms"
				begin="{syncbaseId}_n_translate.begin+100ms"
				fill="freeze"
				calcMode="spline"
				keySplines="0, 1, 0.2, 1"
				values="0;1"
			/>
			<animateTransform
				id="{syncbaseId}_p_eye_translate"
				attributeName="transform"
				attributeType="XML"
				type="translate"
				dur="750ms"
				calcMode="spline"
				keySplines="0, 1, 0.2, 1"
				values="-75;0"
				begin="{syncbaseId}_p_eye_opacity.begin"
			/>
		</circle>
		<rect
			id="{syncbaseId}_p_descendant"
			x="120"
			y="150"
			fill="currentColor"
			width="50"
			height="50"
			opacity="0"
		>
			<animate
				id="{syncbaseId}_p_descendant_opacity"
				attributeName="opacity"
				dur="1000ms"
				begin="{syncbaseId}_p_eye_translate.end-350ms"
				fill="freeze"
				calcMode="spline"
				keySplines="0, 1, 0.2, 1"
				values="0;1"
			/>
			<animateTransform
				id="{syncbaseId}_p_descendant_translate"
				attributeName="transform"
				attributeType="XML"
				type="translate"
				dur="1000ms"
				calcMode="spline"
				keySplines="0, 1, 0.2, 1; 0, 0.25, 0.25, 1"
				values="50 -50;50 0;0 0"
				begin="{syncbaseId}_p_descendant_opacity.begin"
			/>
		</rect>
	</g>
	<rect
		id="{syncbaseId}_l"
		fill="currentColor"
		x="240"
		y="0"
		width="50"
		height="150"
		opacity="0"
		transform-origin="265 75"
	>
		<animate
			id="{syncbaseId}_l_opacity"
			attributeName="opacity"
			dur="750ms"
			begin="{syncbaseId}_p_eye_translate.end-500ms"
			fill="freeze"
			calcMode="spline"
			keySplines="0, 1, 0.2, 1"
			values="0;1"
		/>
		<animateTransform
			id="{syncbaseId}_l_translate"
			attributeName="transform"
			attributeType="XML"
			type="scale"
			dur="750ms"
			calcMode="spline"
			keySplines="0, 1, 0.2, 1"
			values="1 0;1 1"
			begin="{syncbaseId}_l_opacity.begin"
		/>
	</rect>
	<path
		id="{syncbaseId}_e"
		d="M405 100C405 72.3858 382.614 50 355 50C327.386 50 305 72.3858 305 100C305 127.614 327.386 150 355 150V100H405Z"
		fill="currentColor"
		transform-origin="350 100"
		opacity="0"
	>
		<animate
			id="{syncbaseId}_e_opacity"
			attributeName="opacity"
			dur="1000ms"
			begin="{syncbaseId}_l_translate.end-500ms"
			fill="freeze"
			calcMode="spline"
			keySplines="0, 1, 0.2, 1"
			values="0;1"
		/>
		<animateTransform
			id="{syncbaseId}_e_translate"
			attributeName="transform"
			attributeType="XML"
			type="rotate"
			dur="1000ms"
			calcMode="spline"
			keySplines="0, 0.75, 0.15, 1"
			values="-180;0"
			begin="{syncbaseId}_e_opacity.begin"
		/>
	</path>
	<g id="{syncbaseId}_x">
		<rect
			id="{syncbaseId}_x_bottom"
			x="420"
			y="100"
			width="50"
			height="50"
			fill="currentColor"
			opacity="0"
		>
			<animate
				id="{syncbaseId}_x_bottom_opacity"
				attributeName="opacity"
				dur="1000ms"
				begin="{syncbaseId}_e_translate.begin+150ms"
				fill="freeze"
				calcMode="spline"
				keySplines="0, 1, 0.2, 1"
				values="0;1"
			/>
			<animateTransform
				id="{syncbaseId}_x_bottom_translate"
				attributeName="transform"
				attributeType="XML"
				type="translate"
				dur="1000ms"
				calcMode="spline"
				keySplines="0, 1, 0.2, 1"
				values="0 -50;0 0"
				begin="{syncbaseId}_x_bottom_opacity.begin"
			/>
		</rect>
		<rect
			id="{syncbaseId}_x_top"
			x="470"
			y="50"
			width="50"
			height="50"
			fill="currentColor"
			opacity="0"
			transform-origin="470 100"
		>
			<animate
				id="{syncbaseId}_x_top_opacity"
				attributeName="opacity"
				dur="1000ms"
				begin="{syncbaseId}_x_bottom_translate.begin+350ms"
				fill="freeze"
				calcMode="spline"
				keySplines="0, 1, 0.2, 1"
				values="0;1"
			/>
			<animateTransform
				id="{syncbaseId}_x_top_translate"
				attributeName="transform"
				attributeType="XML"
				type="rotate"
				dur="750ms"
				calcMode="spline"
				keySplines="0, 0.75, 0.15, 1"
				values="-180;0"
				begin="{syncbaseId}_x_top_opacity.begin"
			/>
		</rect>
	</g>
</svg>

<style>
	svg[data-mono='true'] > :not([data-mono='true']) {
		visibility: hidden;
	}
</style>
