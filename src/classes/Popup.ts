import { ELEMENT_TYPES } from '../../constants';
import { replaceWords, setCursorPos } from '../../utils';
import EditableElement from './EditableElement';

class Popup {
	popupDiv: HTMLElement | null = null;
	createPopup(
		options: string[],
		inputElement: HTMLInputElement,
		incorrectWord: string,
		elementType: string
	) {
		const popupDiv = document.createElement('div');

		document.addEventListener('click', (event) => {
			if (!this.isClickInsidePopup(event, popupDiv)) {
				this.removePopup();
			}
		});

		popupDiv.id = 'popup';

		this.createPopupStyles(inputElement);

		const list = document.createElement('ul');
		list.id = 'popup__list';

		options.forEach((optionText) => {
			const li = document.createElement('li');
			li.textContent = optionText;
			li.classList.add('popup__list-item');
			list.appendChild(li);

			const [startIndex, endIndex] = EditableElement.countCursorPositions(
				inputElement,
				elementType
			);
			//listener for choosing option
			li.addEventListener('click', (event) => {
				let newValue = replaceWords(
					elementType === ELEMENT_TYPES.INPUT
						? inputElement.value
						: inputElement.textContent,
					incorrectWord,
					(event.target as HTMLElement).textContent,
					startIndex
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

		const inputLabel = document.createElement('label');
		inputLabel.textContent = 'Color: ';
		inputLabel.htmlFor = 'color';
		inputLabel.style.fontStyle = 'italic';

		const changeBackgroundInput = document.createElement('input');
		changeBackgroundInput.value = await this.getStoredBackground();
		changeBackgroundInput.name = 'color';
		changeBackgroundInput.type = 'color';

		changeBackgroundInput.addEventListener('input', (e: Event) => {
			const elem = e.target as HTMLInputElement;
			this.setStoredBackground(elem.value);
			popup.style.background = elem.value;
		});

		wrapper.appendChild(inputLabel);
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

	async createPopupStyles(inputElement: Element) {
		const styleTag = document.createElement('style');
		let background = await this.getStoredBackground();
		const inputRect = inputElement.getBoundingClientRect();
		if (!background) {
			background = 'white';
			this.setStoredBackground(background);
		}

		styleTag.textContent = `
        #popup {
            position: absolute;
            left: ${inputRect.left}px;
            top: ${inputRect.top + inputRect.height}px;
            background: ${background};
            border: 1px solid #ccc;    
			border-radius:4px;        
            width:${inputRect.width}px;
			z-index:5000;
        }

        #popup__list {
            list-style:none;
            padding:0;
            margin: 0;
        }

        .popup__list-item {
            cursor: pointer;
            padding: 7px 15px;
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
}

export default new Popup();
