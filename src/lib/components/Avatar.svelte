<script lang="ts">
	import { composeMeshgradient } from '$lib/utils/mesh-gradient';
	import type { User } from 'lucia';

	export let id: User['id'];
	export let email: User['email'] = null;
	export let githubUsername: User['githubUsername'] = null;

	$: char = (email ?? githubUsername ?? id).slice(0, 1).toUpperCase();
</script>

<div
	style:background={composeMeshgradient({
		colors: [
			'var(--color-primary-400)',
			'var(--color-primary-200)',
			'var(--color-primary-300)',
			'var(--color-secondary-300)',
			'var(--color-secondary-100)',
		],
	})}
>
	<span class="char">
		{char}
	</span>
</div>

<style lang="postcss">
	div {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.char {
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		font-size: 1em;
		font-weight: 600;
		color: white;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
	}
</style>
