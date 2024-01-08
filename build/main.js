(()=>{"use strict";var t={SPACE:"Space",ARROW_UP:"ArrowUp",ARROW_DOWN:"ArrowDown",ARROW_LEFT:"ArrowLeft",ARROW_RIGHT:"ArrowRight"},e={cat:["Dog","Rat","bat"],Helo:["hello","Help","Hell"],heldp:["help","held","hello"],foo:["bar"]},n=["keydown","click"],o="Input",r="Contenteditable",i=function(e,n,o){if(o===t.SPACE){var r=(n=n.slice(0,e)).split(" ").filter((function(t){return t}));return r[r.length-1].trim()}for(var i=n.trim().split(/\s+/),u=0,c=0;c<i.length;c++){var a=i[c],l=u,p=l+a.length;if(e>=l&&e<=p)return a;if(u+=a.length+1,c===i.length-1&&e===u)return i[c].trim()}return""};const u=new(function(){function t(){}return t.prototype.createPopup=function(t,e,n,r){var i=this,u=e.getBoundingClientRect(),c=document.createElement("div"),a=u.left,l=u.top+u.height;c.id="popup",this.createPopupStyles(a,l);var p=document.createElement("ul");p.id="popup__list",t.forEach((function(t){var u=document.createElement("li");u.textContent=t,u.classList.add("popup__list-item"),p.appendChild(u),u.addEventListener("click",(function(t){var u,c,a,l=(u=r===o?e.value:e.textContent,c=n,a=t.target.textContent,u.replace(c,a));r===o?e.value=l:e.textContent=l,i.removePopup(),setTimeout((function(){e.focus()}),0)}))})),c.appendChild(p),this.popupDiv=c,document.body.appendChild(c)},t.prototype.removePopup=function(){document.body.removeChild(this.popupDiv),this.popupDiv=null},t.prototype.getStoredBackground=function(){return new Promise((function(t){chrome.storage.local.get("dropdown-background",(function(e){var n=e["dropdown-background"];t(n)}))}))},t.prototype.setStoredBackground=function(t){chrome.storage.local.set({"dropdown-background":t})},t.prototype.createPopupStyles=function(t,e){return n=this,o=void 0,i=function(){var n,o;return function(t,e){var n,o,r,i,u={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(a){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(u=0)),u;)try{if(n=1,o&&(r=2&c[0]?o.return:c[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,c[1])).done)return r;switch(o=0,r&&(c=[2&c[0],r.value]),c[0]){case 0:case 1:r=c;break;case 4:return u.label++,{value:c[1],done:!1};case 5:u.label++,o=c[1],c=[0];continue;case 7:c=u.ops.pop(),u.trys.pop();continue;default:if(!((r=(r=u.trys).length>0&&r[r.length-1])||6!==c[0]&&2!==c[0])){u=0;continue}if(3===c[0]&&(!r||c[1]>r[0]&&c[1]<r[3])){u.label=c[1];break}if(6===c[0]&&u.label<r[1]){u.label=r[1],r=c;break}if(r&&u.label<r[2]){u.label=r[2],u.ops.push(c);break}r[2]&&u.ops.pop(),u.trys.pop();continue}c=e.call(t,u)}catch(t){c=[6,t],o=0}finally{n=r=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,a])}}}(this,(function(r){switch(r.label){case 0:return n=document.createElement("style"),[4,this.getStoredBackground()];case 1:return(o=r.sent())||(o=function(){for(var t="#ffffff";"#ffffff"===t.toLowerCase();)t="#"+Math.floor(16777215*Math.random()).toString(16);return t}(),this.setStoredBackground(o)),n.textContent="\n        #popup {\n            display: block;\n            position: absolute;\n            left: ".concat(t,"px;\n            top: ").concat(e,"px;\n            background: ").concat(o,";\n            border: 1px solid #ccc;    \n\t\t\tborder-radius:4px;        \n            width:150px;\n\t\t\tz-index:100;\n        }\n\n        #popup__list {\n            list-style:none;\n            padding:0;\n            margin: 0;\n        }\n\n        .popup__list-item {\n            cursor: pointer;\n            padding: 7px 15px;\n        }\n\n        \n        .popup__list-item:hover {\n            background: rgba(0,0,0,0.2);\n        }\n        "),document.head.appendChild(n),[2]}}))},new((r=void 0)||(r=Promise))((function(t,e){function u(t){try{a(i.next(t))}catch(t){e(t)}}function c(t){try{a(i.throw(t))}catch(t){e(t)}}function a(e){var n;e.done?t(e.value):(n=e.value,n instanceof r?n:new r((function(t){t(n)}))).then(u,c)}a((i=i.apply(n,o||[])).next())}));var n,o,r,i},t.prototype.isClickInsidePopup=function(t){return!this.popupDiv||this.popupDiv.contains(t.target)},t}()),c=new(function(){function c(){}return c.prototype.handleTextInputElements=function(){var t=this,e=document.querySelectorAll('input[type="text"], textarea'),i=document.querySelectorAll('[contenteditable="true"');e.forEach((function(e){var r=e.closest("iframe");r?t.handleClosestFrames(e,r):t.addMultipleEventListeners(e,n,o)})),i.forEach((function(e){var o=e.closest("iframe");o?t.handleClosestFrames(e,o):t.addMultipleEventListeners(e,n,r)}))},c.prototype.addMultipleEventListeners=function(t,e,o){var r=this;setTimeout((function(){e.forEach((function(e){t.addEventListener(e,(function(i){window.requestAnimationFrame((function(){var u=r.countCursorPositions(t,o),c=u[0],a=u[1];e===n[1]?r.handleClickEvent(c,a,i,t,o):r.handleKeydownEvent(c,i,t,o)}))}))}))}),100)},c.prototype.handleClickEvent=function(t,e,n,r,u){var c,a=u===o?r.value:r.textContent;c=t!==e?a.slice(t,e).trim():i(t,a,n.code),this.checkWord(c,r,u)},c.prototype.handleKeydownEvent=function(e,n,r,u){var c=u===o?r.value:r.textContent,a="";Object.values(t).includes(n.code)&&(a=i(e,c,n.code)),this.checkWord(a,r,u)},c.prototype.checkWord=function(t,n,o){e[t]&&u.createPopup(e[t],n,t,o)},c.prototype.countCursorPositions=function(t,e){var n,r;if(e===o)n=t.selectionStart,r=t.selectionEnd;else{var i=window.getSelection();if(i&&i.rangeCount>0){var u=i.getRangeAt(0);n=u.startOffset,r=u.endOffset}}return[n,r]},c.prototype.handleClosestFrames=function(t,e){var i,u=e.contentDocument||(null===(i=e.contentWindow)||void 0===i?void 0:i.document);if(u)if("true"===t.getAttribute("contenteditable")){var c=u.querySelector('[contenteditable="true"]');c&&this.addMultipleEventListeners(c,n,r)}else{var a=u.querySelector('input[type="text"]');a&&this.addMultipleEventListeners(a,n,o)}},c}());document.addEventListener("click",(function(t){u.isClickInsidePopup(t)||u.removePopup()})),c.handleTextInputElements()})();