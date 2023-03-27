import type Map from '$components/Map/Map.svelte';
import type MapDraw from '$components/Map/MapDraw.svelte';
import type { ComponentProps } from 'svelte';
import { writable } from 'svelte/store';

/**
 * Maplibre instance.
 */
export const editorMap = writable<ComponentProps<Map>['map']>();

/**
 * Mapbox-gl draw instance, augmented with circle-mode.
 */
export const editorMapDraw = writable<ComponentProps<MapDraw>['draw']>();
