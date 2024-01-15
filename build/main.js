(()=>{"use strict";var t={SPACE:"Space",ARROW_UP:"ArrowUp",ARROW_DOWN:"ArrowDown",ARROW_LEFT:"ArrowLeft",ARROW_RIGHT:"ArrowRight"},e={cat:["Dog","Rat","bat"],Helo:["hello","Help","Hell"],heldp:["help","held","hello"],foo:["bar"]},n=["keydown","click"],o="Input",r="Contenteditable",i=function(e,n,o){if(o===t.SPACE){var r=(n=n.slice(0,e)).split(" ").filter((function(t){return t}));return{word:c=r[r.length-1].trim(),start:n.length-1-c.length,end:n.length-1}}for(var i=n.trim().split(/\s+/),u=0,a=0;a<i.length;a++){var c,l=u,d=l+(c=i[a]).length;if(e>=l&&e<=d)return{word:c,start:l,end:d};if(u+=c.length+1,a===i.length-1&&e===u){var p=i[a].trim();return{word:p,start:n.length-1-p.length,end:n.length-1}}}return{word:"",start:e,end:e}},u=function(t,e,n,o){return new(n||(n=Promise))((function(r,i){function u(t){try{c(o.next(t))}catch(t){i(t)}}function a(t){try{c(o.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(u,a)}c((o=o.apply(t,e||[])).next())}))},a=function(t,e){var n,o,r,i,u={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(c){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(u=0)),u;)try{if(n=1,o&&(r=2&a[0]?o.return:a[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,a[1])).done)return r;switch(o=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return u.label++,{value:a[1],done:!1};case 5:u.label++,o=a[1],a=[0];continue;case 7:a=u.ops.pop(),u.trys.pop();continue;default:if(!((r=(r=u.trys).length>0&&r[r.length-1])||6!==a[0]&&2!==a[0])){u=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){u.label=a[1];break}if(6===a[0]&&u.label<r[1]){u.label=r[1],r=a;break}if(r&&u.label<r[2]){u.label=r[2],u.ops.push(a);break}r[2]&&u.ops.pop(),u.trys.pop();continue}a=e.call(t,u)}catch(t){a=[6,t],o=0}finally{n=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}};const c=new(function(){function t(){this.popupDiv=null}return t.prototype.createPopup=function(t,e,n,r,i,u){var a=this,c=document.createElement("div");document.addEventListener("click",(function(t){a.isClickInsidePopup(t,c)||a.removePopup()})),c.id="popup",this.createPopupStyles(e,r);var l=document.createElement("ul");l.id="popup__list",t.forEach((function(t){var c=document.createElement("li");c.textContent=t,c.classList.add("popup__list-item"),l.appendChild(c),c.addEventListener("click",(function(t){var c=function(t,e,n,o,r){if(o<0||r>t.length||o>=r)return t;var i=t.substring(0,o),u=t.substring(r);return i+t.substring(o,r).replace(e,n)+u}(r===o?e.value:e.textContent,n,t.target.textContent,i,u);r===o?e.value=c:e.textContent=c,a.removePopup(),setTimeout((function(){r===o?e.setSelectionRange(u,u):function(t,e){var n=document.createRange(),o=window.getSelection();if(o&&t){for(var r=0,i=!1,u=0;u<t.childNodes.length;u++){var a=t.childNodes[u];if(a.nodeType===Node.TEXT_NODE){var c=a;if((r+=c.length)>=e){n.setStart(c,e-(r-c.length)),n.collapse(!0),i=!0;break}}}i||(n.setStart(t,0),n.collapse(!0)),o.removeAllRanges(),o.addRange(n)}}(e,u),e.focus()}),0)}))})),this.popupDiv=c,c.appendChild(l),this.createChangeBackgroundInput(c),document.body.appendChild(c)},t.prototype.createChangeBackgroundInput=function(t){return u(this,void 0,void 0,(function(){var e,n,o,r=this;return a(this,(function(i){switch(i.label){case 0:return(e=document.createElement("div")).id="color-input-wrapper",n=document.createElement("input"),o=n,[4,this.getStoredBackground()];case 1:return o.value=i.sent(),n.name="color",n.type="color",n.addEventListener("input",(function(e){var n=e.target;r.setStoredBackground(n.value),t.style.background=n.value})),e.appendChild(n),t.appendChild(e),[2]}}))}))},t.prototype.removePopup=function(){this.popupDiv&&(document.body.removeChild(this.popupDiv),this.popupDiv=null)},t.prototype.isClickInsidePopup=function(t,e){return!this.popupDiv||this.popupDiv.contains(t.target)},t.prototype.getStoredBackground=function(){return new Promise((function(t){chrome.storage.local.get("dropdown-background",(function(e){var n=e["dropdown-background"];t(n)}))}))},t.prototype.setStoredBackground=function(t){chrome.storage.local.set({"dropdown-background":t})},t.prototype.createPopupStyles=function(t,e){return u(this,void 0,void 0,(function(){var n,o,r,i;return a(this,(function(u){switch(u.label){case 0:return n=document.createElement("style"),[4,this.getStoredBackground()];case 1:return o=u.sent(),r=t.getBoundingClientRect(),o||(o="white",this.setStoredBackground(o)),i=this.countWidth(t,e),n.textContent="\n        #popup {\n            position: absolute;\n            left: ".concat(r.left+window.scrollX+i,"px;\n            top: ").concat(r.top+20,"px;\n            background: ").concat(o,";\n            border: 1px solid #ccc;    \n\t\t\tborder-radius:4px;        \n\t\t\tz-index:5000;\n        }\n\n        #popup__list {\n            list-style:none;\n            padding:0;\n            margin: 0;\n        }\n\n        .popup__list-item {\n            cursor: pointer;\n            padding: 7px;\n        }\n\n        \n        .popup__list-item:hover {\n            background: rgba(0,0,0,0.2);\n        }\n\n\t\t#color-input-wrapper{\n\t\t\tdisplay:flex;\n\t\t\tjustify-content:space-between;\n\t\t\tpadding: 5px;\n\t\t}\n        "),document.head.appendChild(n),[2]}}))}))},t.prototype.countWidth=function(t,e){var n=e===o?t.value:t.textContent,r=l.countCursorPositions(t,e)[0],u=i(r,n,"").start,a=document.createElement("span");a.style.fontSize=window.getComputedStyle(t).fontSize,a.style.fontFamily=window.getComputedStyle(t).fontFamily,a.style.visibility="hidden",e===o?a.textContent=n.substring(0,u):a.innerHTML=n.substring(0,u),document.body.appendChild(a);var c=a.offsetWidth;return document.body.removeChild(a),c},t}()),l=new(function(){function u(){}return u.prototype.handleTextInputElements=function(){var t=this,e=document.querySelectorAll('body input[type="text"], body textarea'),i=document.querySelectorAll('[contenteditable="true"]');e.forEach((function(e){var r=e.closest("iframe");r?t.handleClosestFrames(e,r):t.addMultipleEventListeners(e,n,o)})),i.forEach((function(e){var o=e.closest("iframe");o?t.handleClosestFrames(e,o):t.addMultipleEventListeners(e,n,r)}))},u.prototype.addMultipleEventListeners=function(t,e,o){var r=this;setTimeout((function(){e.forEach((function(e){t.addEventListener(e,(function(i){window.requestAnimationFrame((function(){var u=r.countCursorPositions(t,o),a=u[0],c=u[1];e===n[1]?r.handleClickEvent(a,c,i,t,o):r.handleKeydownEvent(a,i,t,o)}))}))}))}),100)},u.prototype.handleClickEvent=function(t,e,n,r,u){c.removePopup();var a=u===o?r.value:r.textContent,l="";if(t!==e)l=a.slice(t,e).trim(),this.checkWord(l,r,u,t,e+l.length);else{var d=i(t,a,n.code),p=d.word,s=d.start,f=d.end;this.checkWord(p,r,u,s,f)}},u.prototype.handleKeydownEvent=function(e,n,r,u){c.removePopup();var a=u===o?r.value:r.textContent;if(Object.values(t).includes(n.code)){var l=i(e,a,n.code),d=l.word,p=l.start,s=l.end;this.checkWord(d,r,u,p,s)}},u.prototype.checkWord=function(t,n,o,r,i){e[t]&&c.createPopup(e[t],n,t,o,r,i)},u.prototype.countCursorPositions=function(t,e){var n,r;if(e===o)n=t.selectionStart,r=t.selectionEnd;else{var i=window.getSelection();if(i&&i.rangeCount>0){var u=i.getRangeAt(0);n=u.startOffset,r=u.endOffset}}return[n,r]},u.prototype.handleClosestFrames=function(t,e){var i,u=e.contentDocument||(null===(i=e.contentWindow)||void 0===i?void 0:i.document);if(u)if("true"===t.getAttribute("contenteditable")){var a=u.querySelector('[contenteditable="true"]');a&&this.addMultipleEventListeners(a,n,r)}else{var c=u.querySelector('input[type="text"]');c&&this.addMultipleEventListeners(c,n,o)}},u}());l.handleTextInputElements()})();