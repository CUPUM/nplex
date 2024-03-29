import { PUBLIC_MAPTILER_KEY } from '$env/static/public';
import { THEME_PALETTES } from '$utils/themes';
import { colord } from 'colord';
import type { StyleSpecification } from 'maplibre-gl';
import { FONT, FONT_URL, TRANSPARENT } from './common';

const TEXT_HALO_WIDTH = 1;

const THEME = {
	LANDSCAPE: THEME_PALETTES.dark.bg[900], // 'hsla(0, 0%, 100%, 1)',
	GRASS_PATTERN: colord(THEME_PALETTES.dark.fg[700]).alpha(0.1).toHslString(),
	WATER: THEME_PALETTES.dark.bg[300], // 'hsla(0, 0%, 0%, 1)',
	NATURE: THEME_PALETTES.dark.bg[500], // 'hsla(0, 0%, 0%, 1)',
	ROADS: colord(THEME_PALETTES.dark.bg['500']).alpha(1).toHslString(), // 'hsla(0, 0%, 0%, 1)',
	RAILS: colord(THEME_PALETTES.dark.bg[700]).alpha(1).toHslString(),
	ADMINISTRATIVE: THEME_PALETTES.dark.bg['000'], // 'hsla(0, 0%, 0%, 1)',
	BUILDINGS: THEME_PALETTES.dark.bg[100], // 'hsla(0, 0%, 0%, 1)',
	PLACENAMES: THEME_PALETTES.dark.fg[100], // 'hsla(0, 0%, 0%, 1)',
	ROADNAMES: THEME_PALETTES.dark.fg[100],
	WATERNAMES: THEME_PALETTES.dark.fg[100], // 'hsla(0, 0%, 100%, 1)',
	TEXT_HALO: THEME_PALETTES.dark.bg[900],
} as const;

/**
 * Derived from https://github.com/openmaptiles/maptiler-toner-gl-style.
 */
const dark: StyleSpecification = {
	version: 8,
	name: 'Toner',
	metadata: {
		'mapbox:autocomposite': false,
		'mapbox:type': 'template',
		'openmaptiles:mapbox:owner': 'openmaptiles',
		'openmaptiles:mapbox:source:url': 'mapbox://openmaptiles.4qljc88t',
		'openmaptiles:version': '3.x',
	},
	center: [-122.41877447993727, 37.7977350127602],
	zoom: 10.426085190067841,
	bearing: 0,
	pitch: 0,
	sources: {
		openmaptiles: {
			type: 'vector',
			url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${PUBLIC_MAPTILER_KEY}`,
		},
	},
	// glyphs: `https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=${PUBLIC_MAPTILER_KEY}`,
	glyphs: FONT_URL,
	layers: [
		{
			id: 'background',
			paint: {
				'background-color': THEME.LANDSCAPE,
			},
			type: 'background',
		},
		{
			'filter': ['==', 'class', 'grass'],
			'id': 'landcover_grass_fill',
			'metadata': {
				'mapbox:group': '1444849388993.3071',
			},
			'minzoom': 10,
			'paint': {
				'fill-antialias': true,
				'fill-color': {
					stops: [
						[10, colord(THEME.NATURE).alpha(0.3).toHslString()],
						[16, THEME.NATURE],
					],
				},
				'fill-opacity': 1,
				'fill-outline-color': TRANSPARENT,
			},
			'source': 'openmaptiles',
			'source-layer': 'landcover',
			'type': 'fill',
		},
		{
			'filter': ['==', 'class', 'grass'],
			'id': 'landcover_grass_pattern',
			'metadata': {
				'mapbox:group': '1444849388993.3071',
			},
			'minzoom': 10,
			'paint': {
				'fill-antialias': true,
				'fill-color': THEME.GRASS_PATTERN,
				'fill-opacity': {
					stops: [
						[10, 0.75],
						[14, 1],
					],
				},
				'fill-outline-color': THEME.GRASS_PATTERN,
				// 'fill-pattern': 'dash-t',
			},
			'source': 'openmaptiles',
			'source-layer': 'landcover',
			'type': 'fill',
		},
		{
			'filter': ['==', 'class', 'wood'],
			'id': 'landcover_wood_fill',
			'layout': {
				visibility: 'visible',
			},
			'minzoom': 10,
			'paint': {
				'fill-antialias': true,
				'fill-color': THEME.NATURE,
				'fill-opacity': 1,
			},
			'source': 'openmaptiles',
			'source-layer': 'landcover',
			'type': 'fill',
		},
		{
			'filter': ['==', 'class', 'wood'],
			'id': 'landcover_wood_pattern',
			'layout': {
				visibility: 'visible',
			},
			'minzoom': 10,
			'paint': {
				'fill-antialias': true,
				'fill-color': THEME.NATURE,
				'fill-opacity': 1,
				// 'fill-pattern': 'dots-t',
			},
			'source': 'openmaptiles',
			'source-layer': 'landcover',
			'type': 'fill',
		},
		{
			'filter': ['all', ['==', 'class', 'cemetery']],
			'id': 'landcover_cemetery_fill',
			'minzoom': 10,
			'paint': {
				'fill-antialias': true,
				'fill-color': THEME.NATURE,
				'fill-opacity': {
					stops: [
						[10, 0.75],
						[14, 1],
					],
				},
				'fill-outline-color': TRANSPARENT,
			},
			'source': 'openmaptiles',
			'source-layer': 'landuse',
			'type': 'fill',
		},
		{
			'filter': ['all', ['==', 'class', 'cemetery']],
			'id': 'landcover_cemetery_pattern',
			'paint': {
				'fill-antialias': true,
				'fill-color': THEME.NATURE,
				'fill-opacity': {
					stops: [
						[10, 0.75],
						[14, 1],
					],
				},
				'fill-outline-color': TRANSPARENT,
				// 'fill-pattern': 'cross-t',
			},
			'source': 'openmaptiles',
			'source-layer': 'landuse',
			'type': 'fill',
		},
		{
			'filter': [
				'all',
				['!=', 'brunnel', 'tunnel'],
				['==', '$type', 'Polygon'],
				['!=', 'intermittent', 1],
			],
			'id': 'water',
			'layout': {
				visibility: 'visible',
			},
			'paint': {
				'fill-antialias': true,
				'fill-color': THEME.WATER,
			},
			'source': 'openmaptiles',
			'source-layer': 'water',
			'type': 'fill',
		},
		{
			'filter': ['all', ['!=', 'class', 'river']],
			'id': 'waterway',
			'minzoom': 12,
			'source': 'openmaptiles',
			'source-layer': 'waterway',
			'type': 'line',
		},
		{
			'filter': ['all', ['==', 'class', 'rail']],
			'id': 'rail',
			'layout': {
				visibility: 'visible',
			},
			'minzoom': 13,
			'paint': {
				'line-color': {
					stops: [
						[13, colord(THEME.RAILS).alpha(0.3).toHslString()],
						[17, THEME.RAILS],
					],
				},
				'line-width': {
					stops: [
						[13, 0.85],
						[17, 2],
					],
				},
			},
			'source': 'openmaptiles',
			'source-layer': 'transportation',
			'type': 'line',
		},
		{
			'filter': ['all', ['==', 'class', 'rail']],
			'id': 'rail_hatch',
			'layout': {
				visibility: 'visible',
			},
			'minzoom': 15,
			'paint': {
				'line-color': THEME.RAILS,
				'line-dasharray': {
					stops: [
						[15, [0.2, 0.8]],
						[17, [0.2, 1]],
					],
				},
				'line-width': {
					stops: [
						[15, 2],
						[17, 6],
					],
				},
			},
			'source': 'openmaptiles',
			'source-layer': 'transportation',
			'type': 'line',
		},
		{
			'filter': ['all', ['==', '$type', 'Polygon'], ['==', 'brunnel', 'bridge']],
			'id': 'road_area_bridge',
			'layout': {
				visibility: 'visible',
			},
			'metadata': {},
			'paint': {
				'fill-antialias': true,
				'fill-color': THEME.LANDSCAPE,
				'fill-opacity': 1,
			},
			'source': 'openmaptiles',
			'source-layer': 'transportation',
			'type': 'fill',
		},
		{
			'filter': ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'pier']],
			'id': 'road_area_pier',
			'layout': {
				visibility: 'visible',
			},
			'metadata': {},
			'paint': {
				'fill-antialias': true,
				'fill-color': THEME.LANDSCAPE,
				'fill-opacity': 1,
			},
			'source': 'openmaptiles',
			'source-layer': 'transportation',
			'type': 'fill',
		},
		{
			'filter': ['all', ['==', '$type', 'LineString'], ['in', 'class', 'pier']],
			'id': 'road_pier',
			'layout': {
				'line-cap': 'round',
				'line-join': 'round',
				'visibility': 'visible',
			},
			'metadata': {},
			'paint': {
				'line-color': THEME.LANDSCAPE,
				'line-width': {
					base: 1.2,
					stops: [
						[15, 1],
						[17, 4],
					],
				},
			},
			'source': 'openmaptiles',
			'source-layer': 'transportation',
			'type': 'line',
		},
		{
			'filter': ['all', ['==', '$type', 'LineString'], ['==', 'class', 'path']],
			'id': 'road_path',
			'layout': {
				'line-cap': 'round',
				'line-join': 'round',
				'visibility': 'visible',
			},
			'metadata': {},
			'minzoom': 15,
			'paint': {
				'line-color': THEME.ROADS,
				'line-width': {
					stops: [
						[14, 2],
						[17, 4],
					],
				},
			},
			'source': 'openmaptiles',
			'source-layer': 'transportation',
			'type': 'line',
		},
		{
			'filter': [
				'all',
				['==', '$type', 'LineString'],
				['!in', 'class', 'pier', 'rail', 'path', 'primary'],
				['in', 'class', 'secondary', 'tertiary', 'minor', 'service'],
			],
			'id': 'road_secondary',
			'layout': {
				'line-cap': 'round',
				'line-join': 'round',
				'visibility': 'visible',
			},
			'metadata': {},
			'minzoom': 10,
			'paint': {
				'line-color': {
					stops: [
						[10, colord(THEME.ROADS).alpha(0.3).toHslString()],
						[12, colord(THEME.ROADS).alpha(0.5).toHslString()],
						[15, THEME.ROADS],
					],
				},
				'line-width': {
					stops: [
						[13, 0.5],
						[15, 3],
						[17, 8],
					],
				},
			},
			'source': 'openmaptiles',
			'source-layer': 'transportation',
			'type': 'line',
		},
		{
			'filter': [
				'all',
				['==', '$type', 'LineString'],
				['!in', 'class', 'pier', 'rail', 'path'],
				['==', 'class', 'primary'],
			],
			'id': 'road_primary',
			'layout': {
				'line-cap': 'round',
				'line-join': 'round',
				'visibility': 'visible',
			},
			'metadata': {},
			'minzoom': 8,
			'paint': {
				'line-color': {
					stops: [
						[8, colord(THEME.ROADS).alpha(0.19).toHslString()],
						[10, colord(THEME.ROADS).alpha(0.6).toHslString()],
						[17, THEME.ROADS],
					],
				},
				'line-width': {
					stops: [
						[12, 0.75],
						[15, 6],
						[17, 8],
					],
				},
			},
			'source': 'openmaptiles',
			'source-layer': 'transportation',
			'type': 'line',
		},
		{
			'filter': [
				'all',
				['==', '$type', 'LineString'],
				['!in', 'class', 'pier', 'path', 'rail'],
				['in', 'class', 'motorway', 'trunk'],
			],
			'id': 'road_highway_casing',
			'layout': {
				'line-cap': 'round',
				'line-join': 'round',
				'visibility': 'visible',
			},
			'metadata': {},
			'minzoom': 8,
			'paint': {
				'line-color': {
					stops: [
						[6, TRANSPARENT],
						[10, TRANSPARENT],
						[16, THEME.TEXT_HALO],
					],
				},
				'line-opacity': 1,
				'line-width': {
					stops: [
						[10, 4],
						[16, 16],
					],
				},
			},
			'source': 'openmaptiles',
			'source-layer': 'transportation',
			'type': 'line',
		},
		{
			'filter': [
				'all',
				['==', '$type', 'LineString'],
				['!in', 'class', 'pier', 'path', 'rail'],
				['in', 'class', 'motorway', 'trunk'],
			],
			'id': 'road_highway',
			'layout': {
				'line-cap': 'round',
				'line-join': 'round',
				'visibility': 'visible',
			},
			'metadata': {},
			'minzoom': 6,
			'paint': {
				'line-color': {
					stops: [
						[6, colord(THEME.ROADS).alpha(0.2).toHslString()],
						[10, colord(THEME.ROADS).alpha(0.6).toHslString()],
						[16, THEME.ROADS],
					],
				},
				'line-opacity': 1,
				'line-width': {
					stops: [
						[7, 1],
						[10, 2],
						[16, 8],
					],
				},
			},
			'source': 'openmaptiles',
			'source-layer': 'transportation',
			'type': 'line',
		},
		{
			'id': 'building_fill',
			'layout': {
				visibility: 'visible',
			},
			'metadata': {
				'mapbox:group': '1444849364238.8171',
			},
			'minzoom': 16,
			'paint': {
				'fill-antialias': true,
				'fill-color': colord(THEME.BUILDINGS).alpha(0.5).toHslString(),
				'fill-opacity': {
					base: 1,
					stops: [
						[8, 0],
						[11, 1],
					],
				},
				'fill-outline-color': THEME.BUILDINGS,
			},
			'source': 'openmaptiles',
			'source-layer': 'building',
			'type': 'fill',
		},
		{
			'id': 'building_pattern',
			'layout': {
				visibility: 'visible',
			},
			'metadata': {
				'mapbox:group': '1444849364238.8171',
			},
			'minzoom': 14,
			'paint': {
				'fill-color': colord(THEME.BUILDINGS).alpha(0.1).toHslString(),
				'fill-opacity': {
					base: 1,
					stops: [
						[13, 0],
						[16, 1],
					],
				},
				'fill-outline-color': THEME.BUILDINGS,
				// 'fill-pattern': 'hatch-t',
			},
			'source': 'openmaptiles',
			'source-layer': 'building',
			'type': 'fill',
		},
		{
			'filter': ['all', ['==', 'admin_level', 4]],
			'id': 'boundary_state',
			'layout': {
				'line-cap': 'round',
				'line-join': 'round',
				'visibility': 'visible',
			},
			'maxzoom': 14,
			'metadata': {
				'mapbox:group': 'a14c9607bc7954ba1df7205bf660433f',
			},
			'minzoom': 3,
			'paint': {
				'line-color': {
					stops: [
						[5, THEME.ADMINISTRATIVE],
						[6, THEME.ADMINISTRATIVE],
					],
				},
				'line-dasharray': {
					stops: [
						[5, [1, 1]],
						[6, [1, 2]],
					],
				},
				'line-opacity': 1,
				'line-width': {
					base: 1.3,
					stops: [
						[5, 1],
						[6, 1.2],
						[7, 1.6],
						[14, 5],
					],
				},
			},
			'source': 'openmaptiles',
			'source-layer': 'boundary',
			'type': 'line',
		},
		{
			'filter': ['==', 'admin_level', 2],
			'id': 'boundary_country_z5-',
			'layout': {
				'line-cap': 'round',
				'line-join': 'round',
				'visibility': 'visible',
			},
			'metadata': {},
			'minzoom': 5,
			'paint': {
				'line-color': THEME.ADMINISTRATIVE,
				'line-width': {
					stops: [
						[3, 1.5],
						[7, 3],
						[22, 6],
					],
				},
			},
			'source': 'openmaptiles',
			'source-layer': 'boundary',
			'type': 'line',
		},
		{
			'filter': ['all', ['==', 'admin_level', 2], ['!has', 'claimed_by']],
			'id': 'boundary_country_z0-4',
			'layout': {
				'line-cap': 'round',
				'line-join': 'round',
				'visibility': 'visible',
			},
			'maxzoom': 5,
			'metadata': {
				'mapbox:group': 'a14c9607bc7954ba1df7205bf660433f',
			},
			'minzoom': 2,
			'paint': {
				'line-blur': 0,
				'line-color': THEME.ADMINISTRATIVE,
				'line-opacity': 1,
				'line-width': {
					base: 1.1,
					stops: [
						[2, 1],
						[22, 20],
					],
				},
			},
			'source': 'openmaptiles',
			'source-layer': 'boundary',
			'type': 'line',
		},
		{
			'filter': ['all', ['==', '$type', 'LineString'], ['has', 'name']],
			'id': 'water_name_lakeline',
			'layout': {
				'symbol-placement': 'line',
				'symbol-spacing': 350,
				'text-field': '{name:latin} {name:nonlatin}',
				'text-font': [FONT.Regular],
				'text-letter-spacing': 0.2,
				'text-max-width': 5,
				'text-rotation-alignment': 'map',
				'text-size': 12,
				'visibility': 'visible',
			},
			'minzoom': 7,
			'paint': {
				'text-color': THEME.WATERNAMES,
			},
			'source': 'openmaptiles',
			'source-layer': 'water_name',
			'type': 'symbol',
		},
		{
			'filter': ['all', ['==', '$type', 'LineString'], ['has', 'name']],
			'id': 'water_name_way',
			'layout': {
				'symbol-placement': 'line',
				'symbol-spacing': 200,
				'text-field': '{name:latin} {name:nonlatin}',
				'text-font': [FONT.Medium],
				'text-max-width': 9,
				'text-rotation-alignment': 'map',
				'text-size': {
					stops: [
						[14, 12],
						[18, 16],
					],
				},
				'visibility': 'visible',
			},
			'minzoom': 14,
			'paint': {
				'text-color': THEME.WATERNAMES,
			},
			'source': 'openmaptiles',
			'source-layer': 'waterway',
			'type': 'symbol',
		},
		{
			'filter': ['all', ['==', '$type', 'Point'], ['!in', 'class', 'ocean', 'lake']],
			'id': 'water_name_sea',
			'layout': {
				'symbol-placement': 'point',
				'symbol-spacing': 250,
				'text-field': '{name:latin} {name:nonlatin}',
				'text-font': [FONT.Regular],
				'text-letter-spacing': 0.1,
				'text-max-width': 6,
				'text-rotation-alignment': 'map',
				'text-size': 12,
				'text-transform': 'none',
			},
			'minzoom': 4,
			'paint': {
				'text-color': THEME.WATERNAMES,
			},
			'source': 'openmaptiles',
			'source-layer': 'water_name',
			'type': 'symbol',
		},
		{
			'filter': ['all', ['==', '$type', 'Point'], ['==', 'class', 'ocean']],
			'id': 'water_name_ocean',
			'layout': {
				'symbol-placement': 'point',
				'symbol-spacing': 350,
				'text-field': '{name:latin} {name:nonlatin}',
				'text-font': [FONT.Regular],
				'text-letter-spacing': 0.2,
				'text-max-width': 5,
				'text-rotation-alignment': 'map',
				'text-size': 12,
				'text-transform': 'uppercase',
			},
			'minzoom': 2,
			'paint': {
				'text-color': THEME.WATERNAMES,
			},
			'source': 'openmaptiles',
			'source-layer': 'water_name',
			'type': 'symbol',
		},
		{
			'filter': ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk'],
			'id': 'road_label_primary',
			'layout': {
				'symbol-placement': 'line',
				'text-field': '{name:latin} {name:nonlatin}',
				'text-font': {
					stops: [
						[6, [FONT.Regular]],
						[16, [FONT.Medium]],
					],
				},
				'text-keep-upright': true,
				'text-rotation-alignment': 'map',
				'text-size': {
					base: 1,
					stops: [
						[13, 12],
						[14, 13],
					],
				},
				'visibility': 'visible',
			},
			'minzoom': 15,
			'paint': {
				'text-color': THEME.ROADNAMES,
				'text-halo-blur': 0,
				'text-halo-color': THEME.TEXT_HALO,
				'text-halo-width': TEXT_HALO_WIDTH,
			},
			'source': 'openmaptiles',
			'source-layer': 'transportation_name',
			'type': 'symbol',
		},
		{
			'filter': [
				'all',
				['==', '$type', 'LineString'],
				['in', 'class', 'minor', 'service', 'track'],
			],
			'id': 'road_label_secondary',
			'layout': {
				'symbol-placement': 'line',
				'text-field': '{name:latin} {name:nonlatin}',
				'text-font': {
					stops: [
						[6, [FONT.Regular]],
						[16, [FONT.Medium]],
					],
				},
				'text-rotation-alignment': 'map',
				'text-size': {
					base: 1,
					stops: [
						[13, 12],
						[14, 13],
					],
				},
				'visibility': 'visible',
			},
			'minzoom': 14.5,
			'paint': {
				'text-color': THEME.ROADNAMES,
				'text-halo-color': THEME.TEXT_HALO,
				'text-halo-width': TEXT_HALO_WIDTH,
			},
			'source': 'openmaptiles',
			'source-layer': 'transportation_name',
			'type': 'symbol',
		},
		{
			'filter': ['all'],
			'id': 'place_label_park',
			'layout': {
				'symbol-placement': 'point',
				'text-field': '{name:latin}',
				'text-font': [FONT.Regular],
				'text-line-height': 1,
				'text-pitch-alignment': 'map',
				'text-size': 12,
				'visibility': 'visible',
			},
			'minzoom': 11,
			'paint': {
				'icon-halo-width': TEXT_HALO_WIDTH,
				'text-color': THEME.PLACENAMES,
				'text-halo-color': THEME.TEXT_HALO,
				'text-halo-width': TEXT_HALO_WIDTH,
			},
			'source': 'openmaptiles',
			'source-layer': 'park',
			'type': 'symbol',
		},
		{
			'filter': ['all', ['==', '$type', 'Point'], ['in', 'class', 'village', 'hamlet']],
			'id': 'place_label_village',
			'layout': {
				'text-anchor': 'center',
				'text-field': '{name:latin} {name:nonlatin}',
				'text-font': {
					stops: [
						[12, [FONT.Regular]],
						[16, [FONT.Medium]],
					],
				},
				'text-max-width': 10,
				'text-size': {
					stops: [
						[12, 12],
						[16, 14],
					],
				},
				'visibility': 'visible',
			},
			'minzoom': 12,
			'paint': {
				'text-color': THEME.PLACENAMES,
				'text-halo-blur': 0,
				'text-halo-color': THEME.TEXT_HALO,
				'text-halo-width': TEXT_HALO_WIDTH,
			},
			'source': 'openmaptiles',
			'source-layer': 'place',
			'type': 'symbol',
		},
		{
			'filter': ['all', ['==', '$type', 'Point'], ['==', 'class', 'city']],
			'id': 'place_label_city',
			'layout': {
				'icon-anchor': 'center',
				'text-field': '{name:latin}',
				'text-font': {
					stops: [
						[4, [FONT.Regular]],
						[7, [FONT.Medium]],
					],
				},
				'text-max-width': 10,
				'text-size': {
					stops: [
						[4, 12],
						[7, 14],
						[8, 16],
					],
				},
				'visibility': 'visible',
			},
			'maxzoom': 16,
			'minzoom': 4,
			'paint': {
				'icon-translate': [1, 11],
				'text-color': THEME.PLACENAMES,
				'text-halo-blur': 0,
				'text-halo-color': THEME.TEXT_HALO,
				'text-halo-width': TEXT_HALO_WIDTH,
			},
			'source': 'openmaptiles',
			'source-layer': 'place',
			'type': 'symbol',
		},
		{
			'filter': ['all', ['==', '$type', 'Point'], ['==', 'class', 'town']],
			'id': 'place_label_town',
			'layout': {
				'icon-anchor': 'center',
				'text-field': '{name:latin}',
				'text-font': {
					stops: [
						[8, [FONT.Regular]],
						[14, [FONT.Medium]],
					],
				},
				'text-max-width': 10,
				'text-size': {
					stops: [
						[8, 12],
						[16, 14],
					],
				},
				'visibility': 'visible',
			},
			'maxzoom': 16,
			'minzoom': 10,
			'paint': {
				'icon-translate': [1, 11],
				'text-color': THEME.PLACENAMES,
				'text-halo-blur': 0,
				'text-halo-color': THEME.TEXT_HALO,
				'text-halo-width': TEXT_HALO_WIDTH,
			},
			'source': 'openmaptiles',
			'source-layer': 'place',
			'type': 'symbol',
		},
		{
			'filter': ['all', ['==', 'class', 'state']],
			'id': 'place_state-label',
			'layout': {
				'text-field': '{name:latin} {name:nonlatin}',
				'text-font': [FONT.Medium],
				'text-max-width': 10,
				'text-size': 13,
				'text-transform': 'uppercase',
				'visibility': 'visible',
			},
			'metadata': {
				'mapbox:group': 'a14c9607bc7954ba1df7205bf660433f',
			},
			'minzoom': 4,
			'paint': {
				'text-color': THEME.PLACENAMES,
			},
			'source': 'openmaptiles',
			'source-layer': 'place',
			'type': 'symbol',
		},
		{
			'filter': ['==', 'class', 'country'],
			'id': 'place_label_country',
			'layout': {
				'text-allow-overlap': false,
				'text-field': '{name:latin}',
				'text-font': {
					stops: [
						[3, [FONT.Regular]],
						[4, [FONT.Medium]],
					],
				},
				'text-ignore-placement': false,
				'text-max-width': 10,
				'text-padding': 2,
				'text-pitch-alignment': 'map',
				'text-size': {
					stops: [
						[3, 14],
						[4, 16],
						[5, 21],
					],
				},
				'text-transform': 'none',
				'visibility': 'visible',
			},
			'minzoom': 2,
			'paint': {
				'text-color': THEME.PLACENAMES,
				'text-halo-color': THEME.TEXT_HALO,
				'text-halo-width': TEXT_HALO_WIDTH,
			},
			'source': 'openmaptiles',
			'source-layer': 'place',
			'type': 'symbol',
		},
		{
			'filter': ['==', 'class', 'continent'],
			'id': 'place_label_continent',
			'layout': {
				'text-field': '{name:latin}',
				'text-font': [FONT.Medium],
				'text-line-height': 1.1,
				'text-max-width': 10,
				'text-size': {
					stops: [
						[3, 18],
						[4, 24],
					],
				},
				'visibility': 'visible',
			},
			'maxzoom': 2,
			'minzoom': 1,
			'paint': {
				'text-color': THEME.PLACENAMES,
				'text-halo-color': THEME.TEXT_HALO,
				'text-halo-width': TEXT_HALO_WIDTH,
			},
			'source': 'openmaptiles',
			'source-layer': 'place',
			'type': 'symbol',
		},
	],
	sprite: 'https://openmaptiles.github.io/maptiler-toner-gl-style/sprite',
	id: 'c4268e48-fac9-4478-8120-201224fbd4d8',
};

export default dark;
