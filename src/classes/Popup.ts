import { ELEMENT_TYPES } from '../../constants';
import { findNearestWord, replaceWords, setCursorPos } from '../../utils';
import EditableElement from './EditableElement';

class Popup {
	popupDiv: HTMLElement | null = null;
	createPopup(
		options: string[],
		inputElement: HTMLInputElement,
		incorrectWord: string,
		elementType: string,
		startIndex: number,
		endIndex: number
	) {
		const popupDiv = document.createElement('div');

		document.addEventListener('click', (event) => {
			if (!this.isClickInsidePopup(event, popupDiv)) {
				this.removePopup();
			}
		});

		popupDiv.id = 'popup';

		this.createPopupStyles(inputElement, elementType);

		const list = document.createElement('ul');
		list.id = 'popup__list';

		options.forEach((optionText) => {
			const li = document.createElement('li');
			li.textContent = optionText;
			li.classList.add('popup__list-item');
			list.appendChild(li);
			//listener for choosing option
			li.addEventListener('click', (event) => {
				let newValue = replaceWords(
					elementType === ELEMENT_TYPES.INPUT
						? inputElement.value
						: inputElement.textContent,
					incorrectWord,
					(event.target as HTMLElement).textContent,
					startIndex,
					endIndex
				);

				if (elementType === ELEMENT_TYPES.INPUT) {
					inputElement.value = newValue;
				} else {
					inputElement.textContent = newValue;
				}
				this.removePopup();
				//using setTimeout to prevnt restoring old value for contenteditable divs
				setTimeout(() => {
					if (elementType === ELEMENT_TYPES.INPUT) {
						inputElement.setSelectionRange(endIndex, endIndex);
					} else {
						setCursorPos(inputElement, endIndex);
					}
					inputElement.focus();
				}, 0);
			});
		});

		this.popupDiv = popupDiv;

		popupDiv.appendChild(list);

		this.createChangeBackgroundInput(popupDiv);

		document.body.appendChild(popupDiv);
	}

	async createChangeBackgroundInput(popup: HTMLElement) {
		const wrapper = document.createElement('div');
		wrapper.id = 'color-input-wrapper';

		const changeBackgroundInput = document.createElement('input');
		changeBackgroundInput.value = await this.getStoredBackground();
		changeBackgroundInput.name = 'color';
		changeBackgroundInput.type = 'color';

		changeBackgroundInput.addEventListener('input', (e: Event) => {
			const elem = e.target as HTMLInputElement;
			this.setStoredBackground(elem.value);
			popup.style.background = elem.value;
		});

		wrapper.appendChild(changeBackgroundInput);
		popup.appendChild(wrapper);
	}

	removePopup() {
		if (this.popupDiv) {
			document.body.removeChild(this.popupDiv);
			this.popupDiv = null; // Reset the stored popupDiv
		}
	}

	isClickInsidePopup(event: MouseEvent, popupDiv: Element) {
		return this.popupDiv ? this.popupDiv.contains(event.target as Node) : true;
	}

	getStoredBackground(): Promise<string> {
		return new Promise((resolve) => {
			chrome.storage.local.get('dropdown-background', (res) => {
				const background = res['dropdown-background'];
				resolve(background);
			});
		});
	}

	setStoredBackground(background: string) {
		chrome.storage.local.set({ 'dropdown-background': background });
	}

	async createPopupStyles(inputElement: HTMLInputElement, elementType: string) {
		const styleTag = document.createElement('style');
		let background = await this.getStoredBackground();
		const inputRect = inputElement.getBoundingClientRect();
		if (!background) {
			background = 'white';
			this.setStoredBackground(background);
		}

		const width = this.countWidth(inputElement, elementType);

		styleTag.textContent = `
        #popup {
            position: absolute;
            left: ${inputRect.left + window.scrollX + width}px;
            top: ${inputRect.top + 20}px;
            background: ${background};
            border: 1px solid #ccc;    
			border-radius:4px;        
			z-index:5000;
        }

        #popup__list {
            list-style:none;
            padding:0;
            margin: 0;
        }

        .popup__list-item {
            cursor: pointer;
            padding: 7px;
        }

        
        .popup__list-item:hover {
            background: rgba(0,0,0,0.2);
        }

		#color-input-wrapper{
			display:flex;
			justify-content:space-between;
			padding: 5px;
		}
        `;

		document.head.appendChild(styleTag);
	}

	countWidth(inputElement: HTMLInputElement, elementType: string) {
		const inputValue =
			elementType === ELEMENT_TYPES.INPUT ? inputElement.value : inputElement.textContent;
		const [startX] = EditableElement.countCursorPositions(inputElement, elementType);

		let { start: cursorPosition } = findNearestWord(startX, inputValue, '');

		let tempElement = document.createElement('span');
		tempElement.style.fontSize = window.getComputedStyle(inputElement).fontSize;
		tempElement.style.fontFamily = window.getComputedStyle(inputElement).fontFamily;
		tempElement.style.visibility = 'hidden';

		if (elementType === ELEMENT_TYPES.INPUT) {
			tempElement.textContent = inputValue.substring(0, cursorPosition);
		} else {
			tempElement.innerHTML = inputValue.substring(0, cursorPosition);
		}

		document.body.appendChild(tempElement);

		let width = tempElement.offsetWidth;

		document.body.removeChild(tempElement);

		return width;
	}
}

export default new Popup();
