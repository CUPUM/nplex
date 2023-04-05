<script lang="ts">
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
</script>

<div class="new-entry {ICON_CLASS.hover}">
	<div class="fill-icon">
		<Icon name="pen-plus" strokeWidth={2.5} strokeLinecap="round" animationSpeed={0.3} />
	</div>
	<i>
		<Icon name="file-add" strokeWidth={1.2} animate={false} />
	</i>
	<span><slot>Créer une nouvelle fiche</slot></span>
</div>

<style lang="scss">
	.new-entry {
		position: relative;
		top: 0;
		border-radius: inherit;
		display: flex;
		height: 100%;
		flex-direction: column;
		padding: 2rem;
		overflow: hidden;
		gap: 0.5rem;
		align-items: center;
		justify-content: center;
		color: col(fg, 500);
		border: 1px dashed col(fg, 100, 0.1);
		font-size: var(--ui-text-md);
		font-weight: 350;
		transition: all 0.15s ease-out;

		&:hover {
			color: col(primary, 700);
			background: col(primary, 300, 0.1);
			border: var(--ui-border-size) dashed col(primary, 300, 0);

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
		font-size: 420px;
		opacity: 0.05;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	span,
	i {
		position: relative;
		text-align: center;
		opacity: 0.5;
		transition: opacity 0.15s;
	}

	i {
		font-size: 2em;
	}
</style>
