<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';
	import { cn } from '../utilities';

	let {
		mono,
		height = '1em',
		class: className,
		...svgProps
	}: {
		mono?: boolean;
	} & Omit<SVGAttributes<SVGElement>, 'viewBox' | 'fill' | 'xmlns'> = $props();

	let viewBox = $derived(mono ? '0 50 100 100' : '0 0 520 200');
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	{viewBox}
	{height}
	{...svgProps}
	class={cn('relative', className)}
>
	<path
		id="n"
		d="M0 100C0 72.3858 22.3858 50 50 50C77.6142 50 100 72.3858 100 100V150H0V100Z"
		fill="currentColor"
		opacity="0"
	>
		<animate
			id="n_animation"
			attributeName="opacity"
			dur="750ms"
			fill="freeze"
			calcMode="spline"
			keySplines="0.16, 1, 0.3, 1"
			values="0;1"
			begin="500ms"
		/>
		<animateTransform
			id="n_translate"
			attributeName="transform"
			attributeType="XML"
			type="translate"
			dur="750ms"
			calcMode="spline"
			keySplines="0, 1, 0.2, 1"
			values="75;0"
			begin="n_animation.begin"
		/>
	</path>
	{#if !mono}
		<g id="p">
			<circle id="p_eye" cx="170" cy="100" r="50" fill="currentColor" opacity="0">
				<animate
					id="p_eye_animation"
					attributeName="opacity"
					dur="750ms"
					begin="n_translate.begin+100ms"
					fill="freeze"
					calcMode="spline"
					keySplines="0, 1, 0.2, 1"
					values="0;1"
				/>
				<animateTransform
					id="p_eye_transform"
					attributeName="transform"
					attributeType="XML"
					type="translate"
					dur="750ms"
					calcMode="spline"
					keySplines="0, 1, 0.2, 1"
					values="-75;0"
					begin="p_eye_animation.begin"
				/>
			</circle>
			<rect
				id="p_descendant"
				x="120"
				y="150"
				width="50"
				height="50"
				fill="currentColor"
				opacity="0"
			>
				<animate
					id="p_descendant_animation"
					attributeName="opacity"
					dur="1000ms"
					begin="p_eye_transform.end-350ms"
					fill="freeze"
					calcMode="spline"
					keySplines="0, 1, 0.2, 1"
					values="0;1"
				/>
				<animate
					id="p_descendant_animation"
					attributeName="rx"
					dur="1000ms"
					begin="p_eye_transform.end-350ms"
					fill="freeze"
					calcMode="spline"
					keySplines="0, 1, 0.2, 1;0, 0.25, 0.25, 1"
					values="25;25;0"
				/>
				<animateTransform
					id="p_descendant_transform"
					attributeName="transform"
					attributeType="XML"
					type="translate"
					dur="1000ms"
					calcMode="spline"
					keySplines="0, 1, 0.2, 1; 0, 0.25, 0.25, 1"
					values="50 -50;50 0;0 0"
					begin="p_descendant_animation.begin"
				/>
			</rect>
		</g>
		<rect
			id="l"
			fill="currentColor"
			x="240"
			y="0"
			width="50"
			height="150"
			opacity="0"
			transform-origin="265 75"
		>
			<animate
				id="l_animation"
				attributeName="opacity"
				dur="750ms"
				begin="p_eye_transform.end-500ms"
				fill="freeze"
				calcMode="spline"
				keySplines="0, 1, 0.2, 1"
				values="0;1"
			/>
			<animateTransform
				id="l_transform"
				attributeName="transform"
				attributeType="XML"
				type="scale"
				dur="750ms"
				calcMode="spline"
				keySplines="0, 1, 0.2, 1"
				values="1 0;1 1"
				begin="l_animation.begin"
			/>
		</rect>
		<path
			id="e"
			d="M405 100C405 72.3858 382.614 50 355 50C327.386 50 305 72.3858 305 100C305 127.614 327.386 150 355 150V100H405Z"
			fill="currentColor"
			transform-origin="350 100"
			opacity="0"
		>
			<animate
				id="e_animation"
				attributeName="opacity"
				dur="1000ms"
				begin="l_transform.end-500ms"
				fill="freeze"
				calcMode="spline"
				keySplines="0, 1, 0.2, 1"
				values="0;1"
			/>
			<animateTransform
				id="e_transform"
				attributeName="transform"
				attributeType="XML"
				type="rotate"
				dur="1000ms"
				calcMode="spline"
				keySplines="0, 1, 0.2, 1"
				values="-180;0"
				begin="e_animation.begin"
			/>
		</path>
		<g id="x">
			<rect id="x_bottom" x="420" y="100" width="50" height="50" fill="currentColor" opacity="0">
				<animate
					id="x_bottom_animation"
					attributeName="opacity"
					dur="1000ms"
					begin="e_transform.begin+150ms"
					fill="freeze"
					calcMode="spline"
					keySplines="0, 1, 0.2, 1"
					values="0;1"
				/>
				<animateTransform
					id="x_bottom_transform"
					attributeName="transform"
					attributeType="XML"
					type="translate"
					dur="1000ms"
					calcMode="spline"
					keySplines="0, 1, 0.2, 1"
					values="0 -50;0 0"
					begin="x_bottom_animation.begin"
				/>
			</rect>
			<rect id="x_top" x="470" y="50" width="50" height="50" fill="currentColor" opacity="0">
				<animate
					id="x_top_animation"
					attributeName="opacity"
					dur="1000ms"
					begin="x_bottom_transform.begin"
					fill="freeze"
					calcMode="spline"
					keySplines="0, 1, 0.2, 1"
					values="0;1"
				/>
				<animateTransform
					id="x_top_transform"
					attributeName="transform"
					attributeType="XML"
					type="translate"
					dur="1000ms"
					calcMode="spline"
					keySplines="0, 1, 0.2, 1;0, 1, 0.2, 1;0, 1, 0.2, 1"
					values="-50 0;-50 50;0 50;0 0"
					begin="x_top_animation.begin"
				/>
			</rect>
		</g>
	{/if}
</svg>
