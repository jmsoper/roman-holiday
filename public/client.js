// you need a data object which keeps all the holidays.
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

//get today's date
const today = new Date();

// fetch today's holiday (or the upcoming one, if there is none today) on load
fetch(`/get_holiday?day=${today.getDate()}&month=${today.getMonth()}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
  console.log(data);
    // Set up the preface -- if today is not a holiday, say so.
    const holidayPreface = document.getElementById('date-preface');
    const preface = data.date.isToday ? 'Today\'s holiday is' : 'Today is not a holiday. The next holiday is on ' + months[data.date.month] + ' ' + data.date.day + ':';
    const datePreface = document.createTextNode(preface);
    holidayPreface.appendChild(datePreface);
    const holidayName = document.getElementById('holiday-name');
    holidayName.innerHTML = data.holiday[0].name;
    // Then describe the given holiday (present or future.)
    const descriptionBlock = document.getElementById('holiday-description'); 
    const descriptionText = data.holiday[0].description; 
    descriptionBlock.innerText = descriptionText; 
});
