<script lang="ts">
	import * as m from '$i18n/messages';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<article>
	<header>
		{m.organizations()}
	</header>
	<ul>...</ul>
</article>
