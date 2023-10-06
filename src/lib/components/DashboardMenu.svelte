<script lang="ts">
	import { css } from 'styled-system/css';
</script>

<menu
	class={css({
		'position': 'sticky',
		'bottom': '2rem',
		'display': 'flex',
		'flexDirection': 'row',
		'alignSelf': 'center',
		'padding': 'inset.base',
		'borderRadius': 'calc({radii.base} + {spacing.inset.base})',
		'marginInline': '2rem',
		'alignItems': 'flex-start',
		'justifyContent': 'flex-start',
		'gap': '0.5rem',
		'fontSize': 'small',
		'backgroundColor': 'neutral.50/.5',
		'backdropFilter': 'blur(8px)',
		'_dark': {
			backgroundColor: 'neutral.800/.5',
		},
		'@container (width > 1000px)': {
			justifyContent: 'center',
			marginLeft: '0',
			marginRight: 'dashboard.navbar',
		},
	})}
>
	<slot />
</menu>
