<script lang="ts">
	import * as m from '$i18n/messages';
	import { link } from '$lib/i18n/link.svelte';
	import { circInOut, expoOut } from 'svelte/easing';
	import { crossfade, scale } from 'svelte/transition';
	import NavbarButton from '../patterns/navbar-button.svelte';

	const [sendThumb, receiveThumb] = crossfade({
		duration: 175,
		easing: circInOut,
		fallback(node, params, intro) {
			return scale(node, { start: 0.5, duration: 150, easing: expoOut, opacity: 0 });
		},
	});
</script>

<nav class="col-[explore]">
	<NavbarButton {...link('/projects')}>
		<div class="" />
		{m.projects()}
	</NavbarButton>
	<NavbarButton {...link('/organizations')}>
		<div class="" />
		{m.organizations()}
	</NavbarButton>
</nav>
