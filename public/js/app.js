/**
 * Lasagna core behavior module
 * 
 * @module
 * @copyright Bill Robitske, Jr. 2016
 * @author Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
 * @license MIT
 */

window.Lasagna = window.Lasagna || {};
window.Lasagna.App = (function() {

  var _classSelectors = {
    selectedDate: '.js-selected-date',
    dailyActivityTableBody: '.c-app-daily-activity__log-table-body'
  };

  var _selectedDate = new Date();

  var setSelectedDate = function(date) {
    if (!date) return;
    var newDate = date instanceof Date ? date : new Date(date);
    if (!newDate) return;
    _selectedDate = newDate;
    updateSelectedDateView();
  };

  var updateSelectedDateView = function() {
    var elements = document.querySelectorAll(_classSelectors.selectedDate);
    for (var i = 0, iLen = elements.length; i < iLen; ++i) {
      elements[i].textContent = _selectedDate.toLocaleDateString();
    }
  };

  window.addEventListener('load', function() {
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    setSelectedDate(date);
  });

  var addDailyActivity = function() {
    var tbody = document.querySelector(_classSelectors.dailyActivityTableBody);
    if (!tbody) return;
    var task = document.createElement('tr');
    task.innerHTML = '<td><input class="form-control" type="time"></td>' +
                     '<td><input class="form-control" type="time"></td>' +
                     '<td><input class="form-control" type="text"></td>';
    tbody.appendChild(task);  
  };

  /**
   * Expose module API
   */
  return {
    setSelectedDate: setSelectedDate,
    updateSelectedDateView: updateSelectedDateView,
    addDailyActivity: addDailyActivity
  };
})();