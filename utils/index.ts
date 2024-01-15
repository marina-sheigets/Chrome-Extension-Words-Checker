import { KEYBOARD_CODES } from '../constants';

export const isStringEmpty = (str: string) => {
	return !str.trim().length;
};

export const findNearestWord = (
	index: number,
	str: string,
	button: string
): { word: string; start: number; end: number } => {
	if (button === KEYBOARD_CODES.SPACE) {
		str = str.slice(0, index);
		const words = str.split(' ').filter((word) => word);
		const word = words[words.length - 1].trim();
		return { word, start: str.length - 1 - word.length, end: str.length - 1 };
	}
	const words = str.trim().split(/\s+/);

	let cumulativeIndex = 0;

	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		const start = cumulativeIndex;
		const end = start + word.length;

		if (index >= start && index <= end) {
			return { word, start, end };
		}

		cumulativeIndex += word.length + 1;
		if (i === words.length - 1 && index === cumulativeIndex) {
			const word = words[i].trim();
			return { word, start: str.length - 1 - word.length, end: str.length - 1 };
		}
	}

	return { word: '', start: index, end: index };
};

export const replaceWords = (
	str: string,
	oldVal: string,
	newVal: string,
	startIndex: number,
	endIndex: number
) => {
	if (startIndex < 0 || endIndex > str.length || startIndex >= endIndex) {
		// Invalid indixes
		return str;
	}

	const prefix = str.substring(0, startIndex);
	const suffix = str.substring(endIndex);

	const replacedSubstring = str.substring(startIndex, endIndex).replace(oldVal, newVal);

	return prefix + replacedSubstring + suffix;
};

export function setCursorPos(element: HTMLElement, position: number) {
	const range = document.createRange();
	const sel = window.getSelection();

	if (!sel || !element) {
		return;
	}

	let charCount = 0;
	let found = false;

	for (let i = 0; i < element.childNodes.length; i++) {
		const currentNode = element.childNodes[i];

		if (currentNode.nodeType === Node.TEXT_NODE) {
			const textNode = currentNode as Text;

			charCount += textNode.length;

			if (charCount >= position) {
				range.setStart(textNode, position - (charCount - textNode.length));
				range.collapse(true);
				found = true;
				break;
			}
		}
	}

	if (!found) {
		range.setStart(element, 0);
		range.collapse(true);
	}

	sel.removeAllRanges();
	sel.addRange(range);
}
