import { ActivityData } from './interfaces/ActivityData';

import LasagnaActivityLogElement from './elements/LasagnaActivityLogElement';

/**
 * Implement custom elements
 */
(<any>window).customElements.define('lasagna-activity-log', LasagnaActivityLogElement);

/**
 * Start app
 */
window.addEventListener('load', () => {
  const today = new Date();
  const activities: ActivityData[] = [];
  const activityLog = document.querySelector('lasagna-activity-log');
  activityLog.setAttribute('date', today.toISOString().substr(0, 10));
  activityLog.setAttribute('activities', JSON.stringify(activities));
});