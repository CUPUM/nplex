import type { Style } from 'maplibre-gl'
import { colors } from './vars.css'

const mapStyle: Style = {
	"name": "nplex",
	"version": 8, // Always has to be 8
	"zoom": 10,
	"pitch": 0,
	"bearing": 0,
	"center": [-73.671, 45.5315], // Montréal
	"transition": {
		"duration": 275,
		"delay": 0
	},
	"sprite": "",
	"glyphs": "",
	"sources": {
	},
	"layers": [
	]
}

export default mapStyle;
