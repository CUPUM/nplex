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
	element.setAttribute(SplitTextAttributes.Host, '');
	return parseNode(element, delimiter);
}

function parseNode(n: Node, delimiter: SplitTextOptions['delimiter']) {
	const contentNodes = [];
	const segmentNodes = [];
	n.childNodes.forEach((childNode) => {
		if (childNode instanceof HTMLElement) {
			const parsed = parseNode(childNode, delimiter);
			contentNodes.push(...parsed.contentNodes);
			segmentNodes.push(...parsed.segmentNodes);
		} else if (childNode.nodeType === Node.TEXT_NODE) {
			const newChildNodes: Node[] = [];
			childNode.textContent.split(/(\s)/).forEach((word, i) => {
				if (!word) return;
				if (word === ' ') {
					const spaceNode = document.createTextNode(' ');
					contentNodes.push(spaceNode);
					newChildNodes.push(spaceNode);
					return;
				}
				const segmentNode = document.createElement('span');
				segmentNode.setAttribute(SplitTextAttributes.Segment, '');
				segmentNode.style.whiteSpace = 'nowrap';
				segmentNode.style.position = 'relative';
				segmentNode.style.display = 'inline-block';
				segmentNodes.push(segmentNode);
				newChildNodes.push(segmentNode);
				word.split(delimiter).forEach((unit) => {
					const unitNode = document.createElement('span');
					unitNode.setAttribute(SplitTextAttributes.Unit, '');
					unitNode.textContent = unit;
					unitNode.style.position = 'relative';
					unitNode.style.display = 'inline-block';
					segmentNode.appendChild(unitNode);
					contentNodes.push(unitNode);
				});
			});
			childNode.textContent = '';
			childNode.after(...newChildNodes);
		}
	});
	return {
		contentNodes,
		segmentNodes,
	};
}
