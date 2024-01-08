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

export const replaceWords = (str: string, oldVal: string, newVal: string) => {
	return str.replace(oldVal, newVal);
};
export const createRandomBackground = () => {
	let color = '#ffffff';

	while (color.toLowerCase() === '#ffffff') {
		color = '#' + Math.floor(Math.random() * 16777215).toString(16);
	}

	return color;
};
