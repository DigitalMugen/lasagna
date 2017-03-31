function convertToDate(value: any): Date | null {
  if (!value) return null;
  if (value instanceof Date) return new Date(value.valueOf());
  const parsedValue = Date.parse(value);
  if (isNaN(parsedValue)) return null;
  return new Date(parsedValue);
}

/**
 * Data container for a logged activity
 */
export default class Activity {
  task: string;
  started: Date | null;
  stopped: Date | null;

  constructor(initState: any = {}) {
    this.task = `${initState.task || ''}`;
    this.started = convertToDate(initState.started);
    this.stopped = convertToDate(initState.stopped);
  }

  get duration(): number {
    if (!this.started) return 0;
    const stopped = this.stopped || new Date(Date.now());
    return Math.max(stopped.getTime() - this.started.getTime(), 0);
  }

  toJSON(): Object {
    return {
      task: this.task,
      started: this.started ? this.started.toISOString() : null,
      stopped: this.stopped ? this.stopped.toISOString() : null
    };
  }

  static createFromJSON(value: string): Activity {
    return new Activity(JSON.parse(value, (key, value) =>
      (key === 'started' || key === 'stopped') && !value
        ? new Date(Date.parse(value))
        : value));
  }

  static createArrayFromJSON(value: string): Activity[] {
    const data = JSON.parse(value);
    if (!Array.isArray(data)) return [];
    return data.map((item) => new Activity(item));
  }
}
