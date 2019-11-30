/* The holidays from the JSON come in an array of "months".
 * Each month has is an object with a key "holidays", with a value that is an array of holidays.
 * Each holiday is an object with a string "name", string "description" and
 * an array of integers, each representing a date. Dates are *not* zero indexed.
 * Months *are* zero-indexed.
 */

const holidayData = require("./holidays.json");

class Calendar {
  constructor(holidayData) {
    // Just like in the JSON, months are zero-index. i.e., months[0] = January
    this.months = this.buildCalendar(holidayData);
  }

  /* This function constructs a calendar obj in memory from the JSON of holidays.
   * Currently, there is not an "undefined" space for every day in a month,
   * but in the future it might simplify building the browsing calendar on the frontend
   * if there were.
   */
  buildCalendar(data) {
    const cal = [];
    const months = data.months;

    for (let i = 0; i < months.length; i++) {
      const monthData = months[i];
      const filledMonth = new Month(monthData.name);
      filledMonth.setAllHolidays(monthData.holidays);
      cal.push(filledMonth);
    }
    return cal;
  }

  getNextDay(date) {
    date.isToday = false;
    // if the day is _not_ the last in the month, increment the day.
    if (date.day < this.months[date.month].days.length) {
      date.day++;
    } else {
      date.day = 1;
      /*
       * if the day _is_ the last in the month, increment the month,
       * unless the month is december, in which case set it to jan
       */
      date.month = date.month < 11 ? date.month + 1 : 0;
    }
    return date;
  }

  // a recursive function for finding the next upcoming holiday.
  getHoliday(date) {
    console.log("date", date);
    const givenDay = this.months[date.month].days[date.day];
    if (givenDay) {
      return { holiday: givenDay, date: date };
    } else {
      // if there is no holiday on this day, iterate one day forward and try again.
      const nextDay = this.getNextDay(date);
      return this.getHoliday(nextDay);
    }
  }
}

class Month {
  constructor(name, numberOfDays) {
    this.name = name;
    this.numberOfDays = numberOfDays;
    /* Days is an array of arrays, and null values.
     * If there is *no* holiday, you'll have a null value.
     * If there *is* at least one holiday, you'll have an array
     * with as many holidays as occur on that day
     */
    this.days = [];
  }

  setDay(day, holiday) {
    if (this.days[day - 1]) {
      this.days[day - 1].push(holiday);
    } else {
      this.days[day - 1] = [holiday];
    }
  }

  setAllHolidays(holidays) {
    //This iterates over the array of holidays in the JSON for any given month.
    for (let i = 0; i < holidays.length; i++) {
      const holiday = holidays[i];
      for (let j = 0; j < holiday.dates.length; j++) {
        const date = holiday.dates[j];
        /* Worth noting that since the 'dates' in the JSON are not zero-indexed,
         * they aren't zero-indexed in the month "days" array either. (But months are...)
         * So, January 3 would be calendar.months[0].days[3].
         */
        this.setDay(date, {
          name: holiday.name,
          description: holiday.description,
          spansMultipleDays: holiday.dates.length > 1
        });
      }
    }
  }
}

const calendar = new Calendar(holidayData);

module.exports = calendar;
