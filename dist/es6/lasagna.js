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
class LasagnaActivityLogElement extends HTMLElement {
    constructor() {
        super();
        this.activities = [];
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
      <style>
        :host * {
          box-sizing: border-box;
        }
        :host .c-activity-log {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        :host .c-activity-log__heading,
        :host .c-activity-log__activity {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        :host .c-activity-log__heading {
          font-weight: 600;
        }
        :host .c-activity-log__detail-task {
          display: block;
          width: calc(100% - 22.5rem);
          padding: 0.05rem 0.25rem;
          text-align: left;
        }
        :host .c-activity-log__detail-started,
        :host .c-activity-log__detail-stopped,
        :host .c-activity-log__detail-duration {
          display: block;
          width: 7.5rem;
          padding: 0.05rem 0.25rem;
          text-align: center;
        }
        :host .c-activity-log__activity input {
          border: none;
          border-bottom: 1px solid lightgray;
          width: 100%;
          height: 100%;
          font-size: 1rem;
        }
        :host .c-activity-log__detail-started input,
        :host .c-activity-log__detail-stopped input,
        :host .c-activity-log__detail-duration input {
          text-align: center;
        }
      </style>
      <section class="c-activity-log">
        <header class="c-activity-log__heading">
          <span class="c-activity-log__detail-task">Task</span>
          <span class="c-activity-log__detail-started">Started At</span>
          <span class="c-activity-log__detail-stopped">Stopped At</span>
          <span class="c-activity-log__detail-duration">Duration</span>
        </header>
      </section>
    `;
        const newActivity = this.createActivityElement(0);
        shadowRoot.querySelector('.c-activity-log').appendChild(newActivity);
    }
    createActivityElement(index) {
        const activity = index < this.activities.length ? this.activities[index] : {
            task: null,
            started: null,
            stopped: null
        };
        const activityElement = document.createElement('article');
        activityElement.innerHTML = `
      <form class="c-activity-log__activity">
        <label class="c-activity-log__detail-task">
          <input type="text" name="task" placeholder="Task name">
        </label>
        <label class="c-activity-log__detail-started">
          <input type="time" name="started">
        </label>
        <label class="c-activity-log__detail-stopped">
          <input type="time" name="stopped">
        </label>
        <label class="c-activity-log__detail-duration">
          <input type="text" name="duration" disabled>
        </label>
      </form>
    `;
        const activityForm = activityElement.querySelector('.c-activity-log__activity');
        // Fill out form values
        if (activity.task)
            activityForm['task'].value = activity.task;
        if (activity.started)
            activityForm['started'].value = activity.started;
        if (activity.stopped)
            activityForm['stopped'].value = activity.stopped;
        activityForm['duration'].value = LasagnaActivityLogElement.formatDuration(LasagnaActivityLogElement.computeDuration(activity.started, activity.stopped));
        // Attach event handlers
        activityForm['task'].addEventListener('change', () => { this.updateActivity(index, 'task', activityForm['task'].value); });
        activityForm['started'].addEventListener('change', () => { this.updateActivity(index, 'started', activityForm['started'].value); });
        activityForm['stopped'].addEventListener('change', () => { this.updateActivity(index, 'stopped', activityForm['stopped'].value); ; });
        return activityElement;
    }
    updateActivity(index, detail, value) {
        if (detail !== 'task' && detail !== 'started' && detail !== 'stopped')
            return;
        if (index > this.activities.length)
            return;
        if (index === this.activities.length)
            this.activities[index] = {
                task: null,
                started: null,
                stopped: null
            };
        this.activities[index][detail] = value;
        if (detail === 'started' || detail === 'stopped')
            this.updateDuration(index);
    }
    updateDuration(index) {
        if (index >= this.activities.length)
            return;
        const activity = this.activities[index];
        const activityForm = this.querySelectorAll('.c-activity-log__activities')[index];
        activityForm['duration'].value = LasagnaActivityLogElement.formatDuration(LasagnaActivityLogElement.computeDuration(activity.started, activity.stopped));
    }
    static computeDuration(started, stopped) {
        const _started = started ? (started instanceof Date ? started : new Date(started))
            : new Date();
        const _stopped = stopped ? (stopped instanceof Date ? stopped : new Date(stopped))
            : new Date();
        const duration = _stopped.getTime() - _started.getTime();
        return duration > 0 ? duration : 0;
    }
    static formatDuration(duration) {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor(duration % 3600 / 60);
        const seconds = Math.floor(duration % 60);
        function pad(source, places) {
            if (source.length >= places)
                return source;
            return `0${source}`;
        }
        return `${hours}:${pad(minutes.toString(), 2)}:${pad(seconds.toString(), 2)}`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LasagnaActivityLogElement;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elements_LasagnaActivityLogElement__ = __webpack_require__(0);

window.customElements.define('lasagna-activity-log', __WEBPACK_IMPORTED_MODULE_0__elements_LasagnaActivityLogElement__["a" /* default */]);


/***/ })
/******/ ]);
//# sourceMappingURL=lasagna.js.map