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
	const unitNodes: HTMLElement[] = [];
	const segmentNodes: HTMLElement[] = [];
	[...n.childNodes].forEach((cn) => {
		if (cn instanceof HTMLElement) {
			console.log('Node is element', cn);
			const parsed = parseNode(cn, delimiter);
			unitNodes.push(...parsed.unitNodes);
			segmentNodes.push(...parsed.segmentNodes);
		} else if (cn.nodeType === Node.TEXT_NODE) {
			console.log('Node is text node', cn);
			const newNodes: Node[] = [];
			cn.textContent.split(/(\s)/).forEach((segment, i) => {
				if (!segment) return;
				if (segment === ' ') return newNodes.push(document.createTextNode(' '));
				const segmentNode = document.createElement('span');
				// // segmentNode.setAttribute(SplitTextAttributes.Segment, '');
				segmentNode.style.whiteSpace = 'nowrap';
				segmentNode.style.position = 'relative';
				segmentNode.style.display = 'inline-block';
				segmentNodes.push(segmentNode);
				segment.split(delimiter).forEach((unit) => {
					console.log(unit);
					const unitNode = document.createElement('span');
					// 	// unitNode.setAttribute(SplitTextAttributes.Unit, '');
					unitNode.textContent = unit;
					unitNode.style.position = 'relative';
					unitNode.style.display = 'inline-block';
					// 	// unitNode.style.setProperty(SplitTextAttributes.CSSIndex, nUnits++ + '');
					segmentNode.appendChild(unitNode);
					unitNodes.push(unitNode);
				});
				newNodes.push(segmentNode);
			});
			cn.textContent = '';
			cn.after(...newNodes);
		}
	});
	return {
		unitNodes,
		segmentNodes,
	};
}
