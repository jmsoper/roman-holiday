## Roman holiday
----------------
(because sometimes you need an extra holiday.)

Looking for something to celebrate? Check to see if there's a holiday you can celebrate today, or search the calendar for upcoming holidays.

Roman holiday stores a JSON file with descriptions and dates for all Roman holidays (as described by Richard M. Heli at histmyst.org). Text has sometimes been modified.

A tiny API iterates over this file to generate a calendar object which can be searched for a given holiday.

On visiting the site, a user will see the current date, and either a description of the day's holiday, or the date and description of the next upcoming holiday.

Uses express and pug!

## TODO
- [x] build JSON file
- [x] build logic to create calendar object
- [x] allow api to search for a record at a given date
- [x] allow api to find the next calendar record
- [x] build a route to query from the clientside
- [x] send the current date as a query param and return a holiday
- [x] Pull next holiday if there is none for a given day
- [x] Pass down the date of the given holiday
- [x] Mark that there is no holiday on the given day, and state the next one
- [x] this code is junky -- this should probably be done with template files
- [ ] build a navigable calendar to explore all holidays
- [x] have even basic styles :joy:
- [-] provide simple animations based on holidays
- [ ] add tags to holidays to choose which animations should be shown
- [x] provide sensible fallbacks in case there's a slow network connection


Made by [Glitch](https://glitch.com/)
-------------------

\ ゜o゜)ノ