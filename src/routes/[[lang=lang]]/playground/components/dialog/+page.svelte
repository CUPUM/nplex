<script lang="ts">
	import { Dialog } from '$lib/builders/dialog.svelte';
	import Variants from '$lib/components/patterns/variants.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { X } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

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

	let dialog: HTMLDialogElement;
</script>

<Variants title="Dialog" {data}>
	{#snippet children(datum)}
		{@const instance = new Dialog(datum.options)}
		<button class="button" {...instance.triggerAttributes} use:ripple>
			{datum.name}
		</button>
		{#if instance.open}
			<dialog
				class="dialog"
				{...instance.dialogAttributes}
				use:instance.dialogAction
				data-meta-modal={datum.meta || undefined}
				transition:scale={{ start: 0.95, duration: 350, easing: expoOut }}
			>
				<h1 class="dialog-title">Dialog title</h1>
				<section class="dialog-section">
					<p class="dialog-text">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptates accusantium
						distinctio maiores doloremque dignissimos reprehenderit, culpa provident modi possimus.
					</p>
					<p class="dialog-text">
						Maiores perferendis in harum, id corrupti obcaecati illum velit explicabo, fuga, ipsam
						cumque sint vero recusandae totam?
					</p>
				</section>
				<section class="dialog-section">
					<p class="dialog-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
				</section>
				<menu class="dialog-menu">
					<button class="button" data-danger {...instance.closeAttributes}>
						Close <X />
					</button>
				</menu>
			</dialog>
		{/if}
	{/snippet}
</Variants>

<style>
</style>
