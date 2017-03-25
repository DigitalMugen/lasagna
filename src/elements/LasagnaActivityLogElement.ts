import { ActivityData } from '../interfaces/ActivityData';

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
        this.updateDateDisplay(this.date);
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

  /**
   * Complete construction of DOM element
   */
  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'});
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
  updateDateDisplay(newDate: Date) {
    const dateDisplay = this.shadowRoot.querySelector('h1 > span');
    dateDisplay.innerHTML = this.date.toLocaleDateString(LOCALES, DATE_STRING_OPTIONS);
  }
}
