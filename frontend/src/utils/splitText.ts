export enum SplitTextAttributes {
	Host = 'split-text-host',
	Segment = 'split-text-segment',
	Unit = 'split-text-unit',
}

interface SplitTextOptions {
	delimiter?: string | RegExp;
}

/**
 * Parsing node tree recursively, splitting and wrapping content.
 */
export function splitText(element: HTMLElement, { delimiter = '' }: SplitTextOptions = {}) {
	// element.setAttribute(SplitTextAttributes.Host, '');
	return parseNode(element, delimiter);
}

function parseNode(n: Node, delimiter: SplitTextOptions['delimiter']) {
	const nodes: HTMLElement[] = [];
	[...n.childNodes].forEach((cn) => {
		if (cn instanceof HTMLElement) {
			nodes.push(...parseNode(cn, delimiter));
		} else if (cn.nodeType === Node.TEXT_NODE) {
			const newNodes: Node[] = [];
			cn.textContent.split(/(\s)/).forEach((segment, i) => {
				if (!segment) return;
				if (segment === ' ') return newNodes.push(document.createTextNode(' '));
				const segmentNode = document.createElement('span');
				// // segmentNode.setAttribute(SplitTextAttributes.Segment, '');
				segmentNode.style.cssText =
					'position: relative; display: inline-block; white-space: nowrap; transform-style: preserve-3d;';
				newNodes.push(segmentNode);
				segment.split(delimiter).forEach((unit) => {
					const maskNode = document.createElement('span');
					maskNode.style.cssText = 'position: relative; display: inline-block; transform-style: preserve-3d;';
					segmentNode.appendChild(maskNode);
					const contentNode = document.createElement('span');
					maskNode.appendChild(contentNode);
					// 	// unitNode.setAttribute(SplitTextAttributes.Unit, '');
					contentNode.textContent = unit;
					contentNode.style.cssText =
						'position: relative; display: inline-block; transform-style: preserve-3d;';
					// 	// unitNode.style.setProperty(SplitTextAttributes.CSSIndex, nUnits++ + '');
					nodes.push(contentNode);
				});
			});
			cn.textContent = '';
			cn.after(...newNodes);
		}
	});
	return nodes;
}
