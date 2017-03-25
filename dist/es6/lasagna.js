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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const LOCALES = 'en-US';
const DATE_STRING_OPTIONS = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
};
class LogActivityElement extends HTMLElement {
    constructor() {
        super();
    }
    get activity() {
        if (!this.hasAttribute('activity'))
            return { task: '', started: null, stopped: null };
        const activityData = JSON.parse(this.getAttribute('activity'));
        return {
            task: activityData.task || '',
            started: activityData.started ? new Date(activityData.started) : null,
            stopped: activityData.stopped ? new Date(activityData.stopped) : null
        };
    }
    connectedCallback() {
        const activity = this.activity;
        this.innerHTML = `
      <label class="column-task">
        <input type="text" placeholder="Task name" value="${activity.task}">
      </label>
      <label class="column-detail">
        <input type="time" value="${activity.started}">
      </label>
      <label class="column-detail">
        <input type="time" value="${activity.stopped}">
      </label>
      <label class="column-detail">
        <input type="text">
      </label>
    `;
    }
}
window.customElements.define('lasagna-activity-log-activity', LogActivityElement);
/**
 * Activity Log web component behavior
 */
class LasagnaActivityLogElement extends HTMLElement {
    /**
     * Activity Log element constructor
     */
    constructor() {
        super();
    }
    /**
     * Attributes to watch for changes
     */
    static get observedAttributes() { return ['date', 'activities']; }
    /**
     * Handle changes to observed attributes
     * @param attr Name of the changed attribute
     * @param oldValue Attribute's old value
     * @param newValue Attribute's new value
     */
    attributeChangedCallback(attr, oldValue, newValue) {
        switch (attr) {
            case 'date':
                this.updateDateDisplay(this.date);
                break;
            default:
                break;
        }
    }
    /**
     * Date of activities listed in this log
     */
    get date() {
        if (!this.hasAttribute('date'))
            return new Date();
        return new Date(this.getAttribute('date'));
    }
    /**
     * Complete construction of DOM element
     */
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
      <style>
        :host {
          font-size: 1rem;
        }
        :host * {
          box-sizing: border-box;
        }
        :host h1 {
          font-size: 1.25rem;
          font-weight: 600;
        }
        :host section {
          display: flex;
          flex-direction: column;
        }
        :host section > header {
          display: flex;
          flex-direction: row;
        }
        :host .column-task {
          display: inline-block;
          width: calc(100% - 31.5rem);
          padding: 0;
          text-align: left;
        }
        :host .column-detail {
          display: inline-block;
          margin: 0;
          width: 10.5rem;
          padding: 0 0 0 0.5rem;
          text-align: center;
        }
        :host .column-task input,
        :host .column-detail input {
          width: 100%;
          border: none;
          border-bottom: 1px solid black;
          height: 1.1rem;
        }
      </style>
      <h1>Activity Log for <span>${this.date.toLocaleDateString(LOCALES, DATE_STRING_OPTIONS)}</span></h1>
      <section>
        <header>
          <span class="column-task">Task</span>
          <span class="column-detail">Started At</span>
          <span class="column-detail">Stopped At</span>
          <span class="column-detail">Duration</span>
        </header>
        <lasagna-activity-log-activity></lasagna-activity-log-activity>
      </section>
    `;
    }
    /**
     * Updates the diplayed date of this activity log
     * @param newDate New date of this activity log
     */
    updateDateDisplay(newDate) {
        const dateDisplay = this.shadowRoot.querySelector('h1 > span');
        dateDisplay.innerHTML = this.date.toLocaleDateString(LOCALES, DATE_STRING_OPTIONS);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LasagnaActivityLogElement;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elements_LasagnaActivityLogElement__ = __webpack_require__(0);

/**
 * Implement custom elements
 */
window.customElements.define('lasagna-activity-log', __WEBPACK_IMPORTED_MODULE_0__elements_LasagnaActivityLogElement__["a" /* default */]);
/**
 * Start app
 */
window.addEventListener('load', () => {
    const today = new Date();
    const activities = [];
    const activityLog = document.querySelector('lasagna-activity-log');
    activityLog.setAttribute('date', today.toISOString().substr(0, 10));
    activityLog.setAttribute('activities', JSON.stringify(activities));
});


/***/ })
/******/ ]);
//# sourceMappingURL=lasagna.js.map