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
      <input type="text" placeholder="Task name" value="${activity.task}">
      <input type="time" value="${activity.started}">
      <input type="time" value="${activity.stopped}">
      <input type="text">
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
      </style>
      <h1>Activity Log for <span>${this.date.toLocaleDateString(LOCALES, DATE_STRING_OPTIONS)}</span></h1>
      <section>
        <header>
          <span>Task</span>
          <span>Started At</span>
          <span>Stopped At</span>
          <span>Duration</span>
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
