(()=>{"use strict";var e={271:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(752),i=r(464);t.default=class{constructor(e){this.client=e,this.regex=new RegExp("/hello")}validate(e){return o.__awaiter(this,void 0,void 0,(function*(){return!!e}))}execute(e){var t,r;return o.__awaiter(this,void 0,void 0,(function*(){const o=null===(r=null===(t=e.message)||void 0===t?void 0:t.from)||void 0===r?void 0:r.id;if(!o)throw Error("The key doesn't exists!");yield this.client.sendMessage(o,"Make your choice!",{parseMode:i.TelegramTypes.ParseMode.HTML,replyMarkup:{keyboard:[[{text:"Button #1"}],[{text:"Button #2"},{text:"Button #3"}]],resizeKeyboard:!0}})}))}}},374:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(752),i=r(464);t.default=class{constructor(e){this.client=e,this.regex=new RegExp("/start")}validate(e){return o.__awaiter(this,void 0,void 0,(function*(){return!!e}))}execute(e){var t,r;return o.__awaiter(this,void 0,void 0,(function*(){const o=null===(r=null===(t=e.message)||void 0===t?void 0:t.from)||void 0===r?void 0:r.id;if(!o)throw Error("The key doesn't exists!");yield this.client.sendMessage(o,"Welcome to the telegram chat!",{parseMode:i.TelegramTypes.ParseMode.HTML})}))}}},464:e=>{e.exports=require("messaging-api-telegram")},752:e=>{e.exports=require("tslib")}},t={};function r(o){var i=t[o];if(void 0!==i)return i.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,r),s.exports}var o={};(()=>{var e=o;Object.defineProperty(e,"__esModule",{value:!0}),e.webhook=void 0;const t=r(752),i=r(464),s=t.__importDefault(r(374)),n=t.__importDefault(r(271));e.webhook=function(e){var r,o,a;return t.__awaiter(this,void 0,void 0,(function*(){const d=String(e.bindingData.token),l=null===(a=e.req)||void 0===a?void 0:a.body,u=new i.TelegramClient({accessToken:d});try{const e=[new s.default(u),new n.default(u)];try{for(var c,v=t.__asyncValues(e);!(c=yield v.next()).done;){const e=c.value;(yield e.validate(l))&&(yield e.execute(l))}}catch(e){r={error:e}}finally{try{c&&!c.done&&(o=v.return)&&(yield o.call(v))}finally{if(r)throw r.error}}}catch(t){const r=t.message;e.log.error(r)}e.res={statusCode:204}}))}})();var i=exports;for(var s in o)i[s]=o[s];o.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})();