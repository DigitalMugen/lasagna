import { ActivityData } from '../interfaces/ActivityData';
import LasagnaActivityLogActivityElement from './LasagnaActivityLogActivityElement';

import { innerHTML } from 'diffhtml';

(<any>window).customElements.define('lasagna-activity-log-activity', LasagnaActivityLogActivityElement);

const LOCALES = 'en-US';
const DATE_STRING_OPTIONS = {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
};

function generateDuration(started: Date | String | null, stopped: Date | String | null): String {
  function pad(source: String, length: Number): String {
    if (source.length >= length) return source;
    return `0${source}`;
  }

  const _started = started ? (started instanceof Date ? started : new Date(started)) : new Date();
  const _stopped = stopped ? (stopped instanceof Date ? stopped : new Date(stopped)) : new Date();
  const duration = Math.round((_stopped.getTime() - _started.getTime()) / 1000);
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor(duration % 3600 / 60);
  const seconds = duration % 3600;
  return `${hours}:${pad(minutes.toString(), 2)}:${pad(seconds.toString(), 2)}`;
}

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
    this.attachShadow({mode: 'open'});
    this.render();
  }

  render() {
    innerHTML(this.shadowRoot, `
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
        .c-activity-log__activity {
          display: flex;
          flex-direction: row;
        }
        .c-activity-log__activity > * {
          display: inline-block;
          margin: 0.1rem 0.25rem;
          border-bottom: 1px solid black;
          padding: 0 0.25rem;
        }
        .c-activity-log__activity > * > input {
          margin: 0;
          width: 100%;
          height: 1.1rem;
          border: none;
          padding: 0;
          font-size: 1rem;
        }
        .c-activity-log__activity-task {
          width: calc(100% - 26.5rem);
        }
        .c-activity-log__activity-task > input {
          text-align: left;
        }
        .c-activity-log__activity-time,
        .c-activity-log__activity-duration {
          width: calc(7.5rem);
        }
        .c-activity-log__activity-time > input,
        .c-activity-log__activity-duration > input {
          text-align: center;
        }
      </style>
      <section>
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
      </section>
    `);
  }

  renderActivities(activities: ActivityData[]): String {
    const elements = activities.reduce((acc, activity) => `${acc}<lasagna-activity-log-activity activity=""></lasagna-activity-log-activity>`, '');
    //const elements = activities.reduce((acc, activity) => `${acc}${this.renderActivity(activity)}`, '');
    return `${elements}<lasagna-activity-log-activity></lasagna-activity-log-activity>`;
    //return `${elements}${this.renderActivity({task: '', started: null, stopped: null})}`;
  }

  renderActivity(activity: ActivityData): String {
    return `
      <form class="c-activity-log__activity">
        <label class="c-activity-log__activity-task">
          <input type="text" value="${activity.task}" placeholder="Task name">
        </label>
        <label class="c-activity-log__activity-time">
          <input type="time" value="${activity.started}">
        </label>
        <label class="c-activity-log__activity-time">
          <input type="time" value="${activity.stopped}">
        </label>
        <label class="c-activity-log__activity-duration">
          <input type="text" value="${generateDuration(activity.started, activity.stopped)}">
        </label>
      </form>
    `;
  }
}
