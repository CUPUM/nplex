<script lang="ts">
	import { withLang } from '$lib/i18n/location';
	import { cn } from '../utilities';

	let {
		id,
		name,
		summary,
		class: className,
	}: {
		id: string;
		name?: string | null;
		summary?: string | null;
		class?: string;
	} = $props();
</script>

<article class={cn('bg-card rounded-card p-card-padding relative', className)}>
	<a href={withLang(`/organizations/${id}`)} class="fill"></a>
	<div>
		{id}
	</div>
</article>
