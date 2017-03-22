interface ActivityData {
  task: string | null;
  started: Date | string | null;
  stopped: Date | string | null;
}

export default class LasagnaActivityLogElement extends HTMLElement {
  activities: ActivityData[];

  constructor() {
    super();
    this.activities = [];
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'});
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

  createActivityElement(index: number): HTMLElement {
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
    const activityForm = <HTMLFormElement>activityElement.querySelector('.c-activity-log__activity');
    
    // Fill out form values
    if (activity.task) activityForm['task'].value = activity.task;
    if (activity.started) activityForm['started'].value = activity.started;
    if (activity.stopped) activityForm['stopped'].value = activity.stopped;
    activityForm['duration'].value = LasagnaActivityLogElement.formatDuration(LasagnaActivityLogElement.computeDuration(activity.started, activity.stopped));

    // Attach event handlers
    activityForm['task'].addEventListener('change', () => {this.updateActivity(index, 'task', activityForm['task'].value);});
    activityForm['started'].addEventListener('change', () => {this.updateActivity(index, 'started', activityForm['started'].value);});
    activityForm['stopped'].addEventListener('change', () => {this.updateActivity(index, 'stopped', activityForm['stopped'].value);;});

    return activityElement;
  }

  updateActivity(index: number, detail: string, value: string) {
    if (detail !== 'task' && detail !== 'started' && detail !== 'stopped') return;
    if (index > this.activities.length) return;
    if (index === this.activities.length) this.activities[index] = {
      task: null,
      started: null,
      stopped: null
    };
    if (detail === 'started' || detail === 'stopped') {
      const date = new Date();
      date.setHours(Number.parseInt(value.substr(0, 2)));
      date.setMinutes(Number.parseInt(value.substr(3, 2)));
      date.setSeconds(0);
      date.setMilliseconds(0)
      this.activities[index][detail] = date;
      this.updateDuration(index);
    } else {
      this.activities[index][detail] = value;
    }
  }

  updateDuration(index: number) {
    if (index >= this.activities.length) return;
    const activity = this.activities[index];
    const activityForm = <HTMLFormElement>this.shadowRoot.querySelectorAll('.c-activity-log__activity').item(index);
    activityForm['duration'].value = LasagnaActivityLogElement.formatDuration(LasagnaActivityLogElement.computeDuration(activity.started, activity.stopped));
  }

  static computeDuration(started: Date | string | null, stopped: Date | string | null): number {
    const _started = started ? (started instanceof Date ? started : new Date(started))
                             : new Date();
    const _stopped = stopped ? (stopped instanceof Date ? stopped : new Date(stopped))
                             : new Date();
    const duration = Math.round((_stopped.getTime() - _started.getTime()) / 1000);
    return duration > 0 ? duration : 0;
  }

  static formatDuration(duration: number): string {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor(duration % 3600 / 60);
    const seconds = Math.floor(duration % 60);
    
    function pad(source: string, places: number): string {
      if (source.length >= places) return source;
      return `0${source}`;
    }

    return `${hours}:${pad(minutes.toString(), 2)}:${pad(seconds.toString(), 2)}`;
  }
}
