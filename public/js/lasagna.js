/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var timeString = (function (now) {
    function pad(source, length) {
        if (source.length >= length)
            return source;
        return "0" + source;
    }
    function formatOffset(offset) {
        var sign = offset <= 0 ? '+' : '-';
        var hours = Math.floor(offset / 60);
        var minutes = offset % 60;
        return "" + sign + pad(hours.toString(), 2) + ":" + pad(minutes.toString(), 2);
    }
    var offset = (new Date(now)).getTimezoneOffset();
    return "T00:00:00" + formatOffset(offset);
})(Date.now());
function formatDate(value) {
    return value.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
    });
}
function addDays(date, days) {
    var newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}
var LasagnaActivityLogElement = (function (_super) {
    __extends(LasagnaActivityLogElement, _super);
    function LasagnaActivityLogElement() {
        return _super.call(this) || this;
    }
    Object.defineProperty(LasagnaActivityLogElement.prototype, "date", {
        get: function () {
            if (!this.hasAttribute('date'))
                return new Date(Date.now());
            var dateValue = Date.parse("" + this.getAttribute('date') + timeString);
            console.log(this.getAttribute('date'), timeString, dateValue);
            if (isNaN(dateValue))
                return new Date(Date.now());
            return new Date(dateValue);
        },
        set: function (value) {
            this.setAttribute('date', value.toISOString().substr(0, 10));
        },
        enumerable: true,
        configurable: true
    });
    LasagnaActivityLogElement.prototype.connectedCallback = function () {
        var _this = this;
        var shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = "\n      <style>\n        :host * {\n          box-sizing: border-block;\n        }\n        :host section {\n          display: flex;\n          flex-direction: column;\n          margin: 0.25rem 0;\n          border: 1px solid black;\n          border-radius: 0.5rem;\n          padding: 0.25rem 0.5rem;\n        }\n        :host(:first-child) section {\n          margin-top: 0;\n        }\n        :host(:last-child) section {\n          margin-bottom: 0;\n        }\n        :host header {\n          display: flex;\n          flex-direction: row;\n          justify-content: space-between;\n          align-items: center;\n          margin: -0.25rem -0.5rem;\n          margin-bottom: 0.25rem;\n          border-bottom: 1px solid black;\n          border-top-left-radius: calc(0.5rem - 1px);\n          border-top-right-radius: calc(0.5rem - 1px);\n          padding: 0.25rem 0.5rem;\n        }\n        :host h1 {\n          margin: 0;\n          padding: 0;\n          font-size: 1.25rem;\n          font-weight: 500;\n        }\n        :host header button {\n          margin: 0;\n          border: 1px solid black;\n          border-radius: 0.25rem;\n          background-color: white;\n          padding: 0.25rem 0.5rem;\n          font-size: 0.75rem;\n        }\n      </style>\n      <section>\n        <header>\n          <button id=\"movePreviousDate\">&larr; " + formatDate(addDays(this.date, -1)) + "</button>\n          <h1>Activity for " + formatDate(this.date) + "</h1>\n          <button id=\"moveNextDate\">" + formatDate(addDays(this.date, 1)) + " &rarr;</button>\n        </header>\n        <slot name=\"activities\"></slot>\n      </section>\n    ";
        shadowRoot.querySelector('#movePreviousDate').addEventListener('click', function () { _this.date = addDays(_this.date, -1); });
        shadowRoot.querySelector('#moveNextDate').addEventListener('click', function () { _this.date = addDays(_this.date, 1); });
    };
    Object.defineProperty(LasagnaActivityLogElement, "observedAttributes", {
        get: function () {
            return ['date'];
        },
        enumerable: true,
        configurable: true
    });
    LasagnaActivityLogElement.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        switch (name) {
            case 'date':
                this.renderForDate();
                break;
        }
    };
    LasagnaActivityLogElement.prototype.renderForDate = function () {
        if (!this.shadowRoot)
            return;
        var date = this.date;
        this.shadowRoot.querySelector('#movePreviousDate').innerHTML = "&larr; " + formatDate(addDays(date, -1));
        this.shadowRoot.querySelector('h1').innerHTML = "Activity for " + formatDate(date);
        this.shadowRoot.querySelector('#moveNextDate').innerHTML = formatDate(addDays(date, 1)) + " &rarr;";
    };
    return LasagnaActivityLogElement;
}(HTMLElement));
exports.default = LasagnaActivityLogElement;


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LasagnaActivityLogElement_1 = __webpack_require__(1);
/**
 * Implement custom elements
 */
window.customElements.define('lasagna-activity-log', LasagnaActivityLogElement_1.default);
/**
 * Start app
 */
window.addEventListener('load', function () {
    //const today = new Date();
    var activityLog = document.querySelector('lasagna-activity-log');
    //activityLog.setAttribute('date', today.toISOString().substr(0, 10));
});


/***/ })
/******/ ]);
//# sourceMappingURL=lasagna.js.map