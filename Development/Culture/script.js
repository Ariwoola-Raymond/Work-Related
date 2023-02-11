const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const calendarTable = document.querySelector("#calendar-table");
const calendarBody = document.querySelector("#calendar-body");
const monthYear = document.querySelector("#month-year");
const eventContainer = document.querySelector("#event-container");
const addEventForm = document.querySelector("#add-event-form");
const eventNameInput = document.querySelector("#event-name");
const eventDateInput = document.querySelector("#event-date");

const events = {};

function renderCalendar() {
  while (calendarBody.firstChild) {
    calendarBody.removeChild(calendarBody.firstChild);
  }

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const firstDayOfWeek = firstDay.getDay();
  const lastDate = lastDay.getDate();

  monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfWeek) {
        const cell = document.createElement("td");
        cell.textContent = "";
        row.appendChild(cell);
      } else if (date > lastDate) {
        break;
      } else {
        const cell = document.createElement("td");
        cell.textContent = date;
        cell.classList.add("date-cell");
        if (events[`${currentYear}-${currentMonth + 1}-${date}`]) {
          cell.classList.add("event");
        }
        row.appendChild(cell);
        date++;
      }
    }
    calendarBody.appendChild(row);
  }
}

function renderEvents() {
  while (eventContainer.firstChild) {
    eventContainer.removeChild(eventContainer.firstChild);
  }

  Object.entries(events).forEach(([date, eventList]) => {
    const dateContainer = document.createElement("div");
    dateContainer.classList.add("date-container");
    dateContainer.textContent = date;

    const eventListContainer = document.createElement("ul");
    eventList.forEach(event => {
      const eventItem = document.createElement("li");
      eventItem.textContent = event;
      eventListContainer.appendChild(eventItem);
    });
    dateContainer.appendChild(eventListContainer);
    eventContainer.appendChild(dateContainer);
  });
}

// calendarTable.addEventListener("click", event
