import { ELEMENT_TYPES } from '../../constants';
import { createRandomBackground, replaceWords } from '../../utils';

class Popup {
	popupDiv: HTMLDivElement | null;

	createPopup(
		options: string[],
		inputElement: HTMLInputElement,
		incorrectWord: string,
		elementType: string
	) {
		const inputRect = inputElement.getBoundingClientRect();

		const popupDiv = document.createElement('div');

		const popupLeft = inputRect.left;
		const popupTop = inputRect.top + inputRect.height;

		popupDiv.id = 'popup';

		this.createPopupStyles(popupLeft, popupTop);

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
					(event.target as HTMLElement).textContent
				);

				if (elementType === ELEMENT_TYPES.INPUT) {
					inputElement.value = newValue;
				} else {
					inputElement.textContent = newValue;
				}
				this.removePopup();

				//using setTimeout to prevnt restoring old value for contenteditable divs
				setTimeout(() => {
					inputElement.focus();
				}, 0);
			});
		});

		popupDiv.appendChild(list);
		this.popupDiv = popupDiv;
		document.body.appendChild(popupDiv);
	}

	removePopup() {
		document.body.removeChild(this.popupDiv);
		this.popupDiv = null;
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

	async createPopupStyles(popupLeft: number, popupTop: number) {
		const styleTag = document.createElement('style');
		let background = await this.getStoredBackground();

		if (!background) {
			background = createRandomBackground();
			this.setStoredBackground(background);
		}

		styleTag.textContent = `
        #popup {
            display: block;
            position: absolute;
            left: ${popupLeft}px;
            top: ${popupTop}px;
            background: ${background};
            border: 1px solid #ccc;    
			border-radius:4px;        
            width:150px;
			z-index:100;
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
        `;

		document.head.appendChild(styleTag);
	}

	isClickInsidePopup(event: MouseEvent) {
		return this.popupDiv ? this.popupDiv.contains(event.target as Node) : true;
	}
}

export default new Popup();
