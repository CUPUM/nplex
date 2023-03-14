<script lang="ts">
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
</script>

<div class="new-entry {ICON_CLASS.hover}">
	<div class="fill-icon">
		<Icon name="pen-plus" strokeWidth={2.5} strokeLinecap="round" animationSpeed={0.3} />
	</div>
	<span><slot>Créer une nouvelle fiche</slot></span>
	<i>
		<Icon name="file-add" animate={false} />
	</i>
</div>

<style lang="scss">
	.new-entry {
		position: relative;
		flex: 1;
		border-radius: inherit;
		display: flex;
		flex-direction: column;
		padding: 2rem;
		overflow: hidden;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		color: col(fg, 500);
		border: 1px dashed col(fg, 100, 0.1);
		font-size: var(--ui-text-md);
		font-weight: 450;
		transition: all 0.15s ease-out;

		&:hover {
			color: col(primary, 700);
			background: col(primary, 300, 0.1);
			border: 1px dashed col(primary, 300, 0);

			.fill-icon {
				color: col(primary, 300);
				opacity: 0.2;
			}

			span,
			i {
				opacity: 1;
			}
		}
	}

	.fill-icon {
		position: absolute;
		font-size: 400px;
		line-height: 1em;
		height: 1.25em;
		opacity: 0.1;
		// left: 0;
	}

	span,
	i {
		text-align: center;
		opacity: 0.5;
		transition: opacity 0.15s;
	}

	i {
		font-size: var(--ui-text-lg);
	}
</style>
