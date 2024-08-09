<script lang="ts">
	import { Dialog } from '$lib/builders/dialog.svelte';
	import Variants from '$lib/components/patterns/variants.svelte';
	import DialogBox from '$lib/components/primitives/dialog-box.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { X } from 'lucide-svelte';

	const data = [
		{ name: 'Default', options: undefined },
		{ name: 'Meta', options: undefined, meta: true },
		{
			name: 'With confirm',
			options: { beforeClose: () => confirm('You sure bout that?') },
			meta: true,
		},
		{ name: 'Non-modal', options: { modal: false } },
	];
</script>

<Variants title="Dialog component" {data}>
	{#snippet children(datum)}
		{@const dialog = new Dialog(datum.options)}
		<button class="button" {...dialog.triggerAttributes} use:ripple>{datum.name}</button>
		<DialogBox {dialog} data-meta-modal={datum.meta || undefined}>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto incidunt sint, porro cumque
				ab ratione minus? Obcaecati quia soluta non.
			</p>
			{#snippet title(dialog)}
				A title
			{/snippet}
			{#snippet description(dialog)}
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptates accusantium
					distinctio maiores doloremque dignissimos reprehenderit, culpa provident modi possimus.
				</p>
				<p>
					Maiores perferendis in harum, id corrupti obcaecati illum velit explicabo, fuga, ipsam
					cumque sint vero recusandae totam?
				</p>
			{/snippet}
			{#snippet actions(dialog)}
				<button class="button" data-danger {...dialog.closeAttributes}>
					Close <X />
				</button>
			{/snippet}
		</DialogBox>
	{/snippet}
</Variants>
