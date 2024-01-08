export const KEYBOARD_CODES = {
	SPACE: 'Space',
	ARROW_UP: 'ArrowUp',
	ARROW_DOWN: 'ArrowDown',
	ARROW_LEFT: 'ArrowLeft',
	ARROW_RIGHT: 'ArrowRight',
};

export const MOCK_INCORRECT_WORDS_LIST: { [key: string]: string[] } = {
	cat: ['Dog', 'Rat', 'bat'],
	Helo: ['hello', 'Help', 'Hell'],
	heldp: ['help', 'held', 'hello'],
	foo: ['bar'],
};

export const EVENT_TYPES = ['keydown', 'click'];
export const ELEMENT_TYPES = {
	INPUT: 'Input',
	CONTENTEDITABLE: 'Contenteditable',
};
