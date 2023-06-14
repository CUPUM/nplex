import type { ValueOf } from 'type-fest';

/**
 * List of CSS cursor names.
 */
export const CURSOR = {
	ADD: 'add',
	ALIAS: 'alias',
	AUTO: 'auto',
	CELL: 'cell',
	COPY: 'copy',
	CROSSHAIR: 'crosshair',
	DEFAULT: 'default',
	DRAG: 'drag',
	GRAB: 'grab',
	GRABBING: 'grabbing',
	HELP: 'help',
	MOVE: 'move',
	NONE: 'none',
	PROGRESS: 'progress',
	POINTER: 'pointer',
	TEXT: 'text',
	URL: 'URL',
	WAIT: 'wait',
	INITIAL: 'initial',
	INHERIT: 'inherit',
	COL_RESIZE: 'col-resize',
	CONTEXT_MENU: 'context-menu',
	E_RESIZE: 'e-resize',
	EW_RESIZE: 'ew-resize',
	N_RESIZE: 'n-resize',
	NE_RESIZE: 'ne-resize',
	NESW_RESIZE: 'nesw-resize',
	NS_RESIZE: 'ns-resize',
	NW_RESIZE: 'nw-resize',
	NWSE_RESIZE: 'nwse-resize',
	NO_DROP: 'no-drop',
	NOT_ALLOWED: 'not-allowed',
	ROW_RESIZE: 'row-resize',
	S_RESIZE: 's-resize',
	SE_RESIZE: 'se-resize',
	SW_RESIZE: 'sw-resize',
	VERTICAL_TEXT: 'vertical-text',
	W_RESIZE: 'w-resize',
	ZOOM_IN: 'zoom-in',
	ZOOM_OUT: 'zoom-out',
} as const;

export type Cursor = ValueOf<typeof CURSOR>;
