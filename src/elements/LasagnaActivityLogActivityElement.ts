import { ActivityData } from '../interfaces/ActivityData';

import { html, innerHTML } from 'diffhtml';

function formatDuration(duration: number): String {
  function pad(source: String, length: Number): String {
    if (source.length >= length) return source;
    return pad(`0${source}`, length);
  }
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor(duration % 3600 / 60);
  const seconds = duration % 60;
  return `${hours}:${pad(minutes.toString(), 2)}:${pad(seconds.toString(), 2)}`;
}

function computeDuration(started: Date | String | null, stopped: Date | String | null): number {
  function forceDate(date: Date | String | null): Date {
    return date ? (date instanceof Date ? date : new Date(date)) : new Date();
  }
  return Math.floor((forceDate(stopped).getTime() - forceDate(started).getTime()) / 1000);
}

export default class LasagnaActivityLogActivityElement extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes(): String[] {
    return ['activity'];
  }

  get activity(): ActivityData {
    if (!this.hasAttribute('activity')) return {task: '', started: null, stopped: null};
    return <ActivityData>JSON.parse(this.getAttribute('activity'));
  }

  set activity(value: ActivityData) {
    this.setAttribute('activity', JSON.stringify(value));
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.render();
  }

  attributeChangedCallback(name: String, oldValue: String, newValue: String) {
    if (name === 'activity') this.render();
  }

  render() {
    const activity = this.activity;
    console.log(this.shadowRoot.innerHTML);
    innerHTML(this.shadowRoot, html`
      <style>
      </style>
      <form>
        <!--<label>
          <input type="text" value="${activity.task}" placeholder="Task name">
        </label>
        <label>
          <input type="time" value="${activity.stopped}">
        </label>
        <label>
          <input type="time" value="${activity.stopped}">
        </label>
        <label>
          <input type="text" value="${formatDuration(computeDuration(activity.started, activity.stopped))}">
        </label>-->
      </form>
    `);
    console.log(this.shadowRoot.innerHTML);
  }
}