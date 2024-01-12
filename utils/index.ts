import { KEYBOARD_CODES } from '../constants';

export const isStringEmpty = (str: string) => {
	return !str.trim().length;
};

export const findNearestWord = (index: number, str: string, button: string) => {
	if (button === KEYBOARD_CODES.SPACE) {
		str = str.slice(0, index);
		const words = str.split(' ').filter((word) => word);
		return words[words.length - 1].trim();
	}
	const words = str.trim().split(/\s+/);

	let cumulativeIndex = 0;

	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		const start = cumulativeIndex;
		const end = start + word.length;

		if (index >= start && index <= end) {
			return word;
		}

		cumulativeIndex += word.length + 1;
		if (i === words.length - 1 && index === cumulativeIndex) {
			return words[i].trim();
		}
	}

	return '';
};

export const replaceWords = (
	str: string,
	oldVal: string,
	newVal: string,
	cursorPosition: number
): string => {
	if (
		str[cursorPosition - 1] === ' ' &&
		(str[cursorPosition] === ' ' || cursorPosition === str.length)
	) {
		let strPart = str.slice(0, cursorPosition);
		let rest = str.slice(cursorPosition);
		let reversedResStr = reverseString(strPart).replace(oldVal, newVal);

		return reverseString(reversedResStr) + rest;
	}

	const words = str.split(/\s+/);

	let currentPos = 0;

	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		const start = currentPos;
		const end = start + word.length;

		if (cursorPosition >= start && cursorPosition <= end) {
			return str.slice(0, start) + newVal + str.slice(end);
		}

		currentPos = end + 1; // Move to the next word (adding 1 for the space)
	}

	// If the cursor is at the end of the string, handle it separately
	if (cursorPosition === str.length) {
		return str.replace(new RegExp(`\\b${words[words.length - 1]}\\b`), newVal);
	}

	// Cursor position is not within any word, return the original string
	return str;
};

const reverseString = (str: string) => {
	let words = str.split(/\s+/);
	return words.length === 1 ? str : words.join(' ');
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
