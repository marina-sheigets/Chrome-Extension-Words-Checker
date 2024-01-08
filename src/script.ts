import EditableElement from './classes/EditableElement';
import Popup from './classes/Popup';

document.addEventListener('click', (event) => {
	if (!Popup.isClickInsidePopup(event)) {
		Popup.removePopup();
	}
});

EditableElement.handleTextInputElements();
