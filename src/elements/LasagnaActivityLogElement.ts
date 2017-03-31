import Activity from '../data/Activity';

const timeString = ((now) => {
  function pad(source: string, length: number): string {
    if (source.length >= length) return source;
    return `0${source}`;
  }
  function formatOffset(offset: number): string {
    const sign = offset <= 0 ? '+' : '-';
    const hours = Math.floor(offset / 60);
    const minutes = offset % 60;
    return `${sign}${pad(hours.toString(), 2)}:${pad(minutes.toString(), 2)}`;
  }
  const offset = (new Date(now)).getTimezoneOffset();
  return `T00:00:00${formatOffset(offset)}`;
})(Date.now());

function formatDate(value: Date): string {
  return value.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });
}

function addDays(date: Date, days: number): Date {
  const newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export default class LasagnaActivityLogElement extends HTMLElement {
  constructor() {
    super();
  }

  get date(): Date {
    if (!this.hasAttribute('date')) return new Date(Date.now());
    const dateValue = Date.parse(`${this.getAttribute('date')}${timeString}`);
    console.log(this.getAttribute('date'), timeString, dateValue);
    if (isNaN(dateValue)) return new Date(Date.now());
    return new Date(dateValue);
  }

  set date(value: Date) {
    this.setAttribute('date', value.toISOString().substr(0, 10));
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
        :host * {
          box-sizing: border-block;
        }
        :host section {
          display: flex;
          flex-direction: column;
          margin: 0.25rem 0;
          border: 1px solid black;
          border-radius: 0.5rem;
          padding: 0.25rem 0.5rem;
        }
        :host(:first-child) section {
          margin-top: 0;
        }
        :host(:last-child) section {
          margin-bottom: 0;
        }
        :host header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin: -0.25rem -0.5rem;
          margin-bottom: 0.25rem;
          border-bottom: 1px solid black;
          border-top-left-radius: calc(0.5rem - 1px);
          border-top-right-radius: calc(0.5rem - 1px);
          padding: 0.25rem 0.5rem;
        }
        :host h1 {
          margin: 0;
          padding: 0;
          font-size: 1.25rem;
          font-weight: 500;
        }
        :host header button {
          margin: 0;
          border: 1px solid black;
          border-radius: 0.25rem;
          background-color: white;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
        }
      </style>
      <section>
        <header>
          <button id="movePreviousDate">&larr; ${formatDate(addDays(this.date, -1))}</button>
          <h1>Activity for ${formatDate(this.date)}</h1>
          <button id="moveNextDate">${formatDate(addDays(this.date, 1))} &rarr;</button>
        </header>
        <slot name="activities"></slot>
      </section>
    `;
    shadowRoot.querySelector('#movePreviousDate').addEventListener('click', () => { this.date = addDays(this.date, -1); });
    shadowRoot.querySelector('#moveNextDate').addEventListener('click', () => { this.date = addDays(this.date, 1); });
  }

  static get observedAttributes(): string[] {
    return ['date'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch(name) {
      case 'date':
        this.renderForDate();
        break;
    }
  }

  renderForDate() {
    if (!this.shadowRoot) return;
    const date = this.date;
    this.shadowRoot.querySelector('#movePreviousDate').innerHTML = `&larr; ${formatDate(addDays(date, -1))}`;
    this.shadowRoot.querySelector('h1').innerHTML = `Activity for ${formatDate(date)}`;
    this.shadowRoot.querySelector('#moveNextDate').innerHTML = `${formatDate(addDays(date, 1))} &rarr;`;
  }
}
