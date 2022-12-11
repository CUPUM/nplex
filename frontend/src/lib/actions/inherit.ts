interface InheritOptions {}

/**
 * Directive to implement computed inheritance of css variables, allowing calculations based on
 * parent variables. Exposes the inherited vars under the `--inh-[var name]: [value]` pattern.
 */
export function inherit(element: HTMLElement, options: InheritOptions) {}
