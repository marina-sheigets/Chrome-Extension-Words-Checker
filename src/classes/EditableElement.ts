import {
	ELEMENT_TYPES,
	EVENT_TYPES,
	KEYBOARD_CODES,
	MOCK_INCORRECT_WORDS_LIST,
} from '../../constants';
import { findNearestWord } from '../../utils';
import Popup from './Popup';

class EditableElement {
	handleTextInputElements() {
		const allInputs = document.querySelectorAll('body input[type="text"], body textarea');
		const allEditableElements = document.querySelectorAll('[contenteditable="true"]');

		allInputs.forEach((inputElement: HTMLInputElement) => {
			const iframe = inputElement.closest('iframe');
			if (iframe) {
				this.handleClosestFrames(inputElement, iframe);
			} else {
				// If the element is not within an iframe
				this.addMultipleEventListeners(inputElement, EVENT_TYPES, ELEMENT_TYPES.INPUT);
			}
		});

		allEditableElements.forEach((block: HTMLInputElement) => {
			const iframe = block.closest('iframe');
			if (iframe) {
				this.handleClosestFrames(block, iframe);
			} else {
				// If the element is not within an iframe
				this.addMultipleEventListeners(block, EVENT_TYPES, ELEMENT_TYPES.CONTENTEDITABLE);
			}
		});
	}

	addMultipleEventListeners(
		element: HTMLInputElement,
		eventsTypes: string[],
		elementType: string
	) {
		let setListeners = () => {
			eventsTypes.forEach((type) => {
				element.addEventListener(type, (event: KeyboardEvent) => {
					window.requestAnimationFrame(() => {
						const [startIndex, endIndex] = this.countCursorPositions(
							element,
							elementType
						);

						switch (type) {
							case EVENT_TYPES[1]: {
								this.handleClickEvent(
									startIndex,
									endIndex,
									event,
									element,
									elementType
								);
								break;
							}

							default: {
								this.handleKeydownEvent(startIndex, event, element, elementType);
							}
						}
					});
				});
			});
		};

		// Delay adding event listeners to ensure that autofocus settles
		setTimeout(setListeners, 100);
	}

	handleClickEvent(
		startIndex: number,
		endIndex: number,
		event: KeyboardEvent,
		element: HTMLInputElement,
		elementType: string
	) {
		Popup.removePopup();
		const value = elementType === ELEMENT_TYPES.INPUT ? element.value : element.textContent;
		let nearestWord = '';
		if (startIndex !== endIndex) {
			nearestWord = value.slice(startIndex, endIndex).trim();
			this.checkWord(
				nearestWord,
				element,
				elementType,
				startIndex,
				endIndex + nearestWord.length
			);
		} else {
			const { word, start, end } = findNearestWord(startIndex, value, event.code);
			this.checkWord(word, element, elementType, start, end);
		}
	}

	handleKeydownEvent(
		startIndex: number,
		event: KeyboardEvent,
		element: HTMLInputElement,
		elementType: string
	) {
		Popup.removePopup();
		const value = elementType === ELEMENT_TYPES.INPUT ? element.value : element.textContent;
		if (Object.values(KEYBOARD_CODES).includes(event.code)) {
			const { word, start, end } = findNearestWord(startIndex, value, event.code);
			this.checkWord(word, element, elementType, start, end);
		}
	}

	checkWord(
		word: string,
		inputElement: HTMLInputElement,
		elementType: string,
		startIndex: number,
		endIndex: number
	) {
		if (MOCK_INCORRECT_WORDS_LIST[word]) {
			Popup.createPopup(
				MOCK_INCORRECT_WORDS_LIST[word],
				inputElement,
				word,
				elementType,
				startIndex,
				endIndex
			);
		}
	}

	countCursorPositions(element: HTMLInputElement & HTMLElement, elementType: string) {
		let startIndex;
		let endIndex;
		if (elementType === ELEMENT_TYPES.INPUT) {
			startIndex = element.selectionStart;
			endIndex = element.selectionEnd;
		} else {
			const selection = window.getSelection();
			if (selection && selection.rangeCount > 0) {
				const selectedRange = selection.getRangeAt(0);
				startIndex = selectedRange.startOffset;
				endIndex = selectedRange.endOffset;
			}
		}
		return [startIndex, endIndex];
	}

	handleClosestFrames(element: HTMLElement, iframe: HTMLIFrameElement) {
		const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
		if (iframeDocument) {
			if (element.getAttribute('contenteditable') === 'true') {
				const editableInIframe: HTMLInputElement = iframeDocument.querySelector(
					'[contenteditable="true"]'
				);
				if (editableInIframe) {
					this.addMultipleEventListeners(
						editableInIframe,
						EVENT_TYPES,
						ELEMENT_TYPES.CONTENTEDITABLE
					);
				}
			} else {
				const inputInIframe: HTMLInputElement =
					iframeDocument.querySelector('input[type="text"]');
				if (inputInIframe) {
					this.addMultipleEventListeners(inputInIframe, EVENT_TYPES, ELEMENT_TYPES.INPUT);
				}
			}
		}
	}
}

export default new EditableElement();
