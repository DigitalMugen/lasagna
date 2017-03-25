import { ActivityData } from '../interfaces/ActivityData';

import { innerHTML } from 'diffhtml';

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

  get activity(): ActivityData {
    if (!this.hasAttribute('activity')) return { task: '', started: null, stopped: null };
    const activityData = <any>JSON.parse(this.getAttribute('activity'));
    return {
      task: activityData.task || '',
      started: activityData.started ? new Date(activityData.started) : null,
      stopped: activityData.stopped ? new Date(activityData.stopped) : null
    };
  }

  connectedCallback() {
    const activity = this.activity;
    this.innerHTML = `
      <style>
        .c-activity {
          display: flex;
          flex-direction: row;
        }
        .c-activity > * {
          display: inline-block;
          margin: 0.1rem 0.25rem;
          border-bottom: 1px solid black;
          padding: 0 0.25rem;
        }
        .c-activity > * > input {
          margin: 0;
          width: 100%;
          height: 1.1rem;
          border: none;
          padding: 0;
          font-size: 1rem;
        }
        .c-activity__task {
          width: calc(100% - 26.5rem);
        }
        .c-activity__task > input {
          text-align: left;
        }
        .c-activity__time,
        .c-activity__duration {
          width: calc(7.5rem);
        }
        .c-activity__time > input,
        .c-activity__duration > input {
          text-align: center;
        }
      </style>
      <form class="c-activity">
        <label class="c-activity__task">
          <input type="text" value="${activity.task}" placeholder="Task name">
        </label>
        <label class="c-activity__time">
          <input type="time" value="${activity.started}">
        </label>
        <label class="c-activity__time">
          <input type="time" value="${activity.stopped}">
        </label>
        <label class="c-activity__duration">
          <input type="text">
        </label>
      </form>
    `;
  }
}
(<any>window).customElements.define('lasagna-activity-log-activity', LogActivityElement);

/**
 * Activity Log web component behavior
 */
export default class LasagnaActivityLogElement extends HTMLElement {

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
  attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
    switch (attr) {
      case 'date':
        this.render();
        break;
      default:
        break;
    }
  }

  /**
   * Date of activities listed in this log
   */
  get date(): Date {
    if (!this.hasAttribute('date')) return new Date();
    return new Date(this.getAttribute('date'));
  }

  set date(value: Date) {
    this.setAttribute('date', value.toISOString());
  }

  /**
   * Complete construction of DOM element
   */
  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
        .c-activity-log__title {
          font-size: 1.5rem;
          font-weight: 600;
        }
        .c-activity-log__headings {
          display: flex;
          flex-direction: row;
        }
        .c-activity-log__headings > * {
          display: inline-block;
          margin: 0.1rem 0.25rem;
          border-bottom: 1px solid transparent;
          padding: 0.25rem;
          font-weight: 500;
        }
        .c-activity-log__task-heading {
          width: calc(100% - 26.5rem);
          text-align: left;
        }
        .c-activity-log__time-heading,
        .c-activity-log__duration-heading {
          width: 7.5rem;
          text-align: center;
        }
      </style>
      <section>
      </section>
    `;
    this.render();
  }

  render() {
    innerHTML(this.shadowRoot.querySelector('section'), `
      <header>
        <h1 class="c-activity-log__title">Activity Log for ${this.date.toLocaleDateString(LOCALES, DATE_STRING_OPTIONS)}</h1>
        <div class="c-activity-log__headings">
          <span class="c-activity-log__task-heading">Task</span>
          <span class="c-activity-log__time-heading">Started At</span>
          <span class="c-activity-log__time-heading">Stopped At</span>
          <span class="c-activity-log__duration-heading">Duration</span>
        </div>
      </header>
      <div class="c-activity-log__activities">
        ${this.renderActivities([])}
      </div>
    `);
  }

  renderActivities(activities: ActivityData[]): String {
    const elements = activities.reduce((acc, activity) => `${acc}<lasagna-activity-log-activity></lasagna-activity-log-activity>`, '');
    return `${elements}<lasagna-activity-log-activity></lasagna-activity-log-activity>`;
  }
}
