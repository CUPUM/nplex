import { expoOut } from 'svelte/easing';
import { crossfade, scale } from 'svelte/transition';

/**
 * Crossfade ref for explore artcile back button.
 */
export const crossfadeExploreArticleBackButton = crossfade({ duration: 550, easing: expoOut, fallback: scale });

/**
 * Crossfade ref for filters pane toggle button.
 */
export const crossfadeExploreFiltersButton = crossfade({ duration: 750, easing: expoOut, fallback: scale });
