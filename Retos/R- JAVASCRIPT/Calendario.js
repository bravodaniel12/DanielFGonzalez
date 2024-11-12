const daysElement = document.getElementById('days');
const currentMonthElement = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const eventForm = document.getElementById('eventForm');
const eventsList = document.getElementById('eventsList');
const apiKey = 'cOA0kng00kFNkWJURURkg7aZOfq4dVIp';  // Reemplaza con tu clave API

let holidays = [];  // Array para almacenar los días festivos

async function fetchHolidays() {
    const year = 2024;  // Ajustar el año según sea necesario
    const country = 'CO';  // País: Colombia
    const url = `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=${country}&year=${year}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        holidays = data.response.holidays.map(holiday => new Date(holiday.date.iso)); // Guardar solo las fechas
        console.log(holidays);  // Muestra los días festivos en la consola
    } catch (error) {
        console.error('Error fetching holidays:', error);
    }
}

fetchHolidays();

let currentDate = new Date();

function renderCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    currentMonthElement.textContent = `${getMonthName(month)} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    daysElement.innerHTML = '';
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement('div');
        daysElement.appendChild(emptyDay);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.textContent = i;

        // Marcar los días festivos
        const currentDay = new Date(year, month, i);
        if (holidays.some(holiday => holiday.toDateString() === currentDay.toDateString())) {
            day.style.backgroundColor = '#FFDD57';  // Color para días festivos
        }

        day.addEventListener('click', () => addEventToDay(i));
        daysElement.appendChild(day);
    }
}

function getMonthName(monthIndex) {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthNames[monthIndex];
}

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const eventDate = document.getElementById('eventDate').value;
    const eventDescription = document.getElementById('eventDescription').value;
    const event = { date: eventDate, description: eventDescription };
    
    // Guardar en local storage
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
    displayEvents();
    eventForm.reset();
});

function displayEvents() {
    eventsList.innerHTML = '';
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.textContent = `${event.date}: ${event.description}`;
        eventsList.appendChild(eventItem);
    });
}

function addEventToDay(day) {
    alert(`Añadir evento para el día ${day}`);
}

// Renderizar el calendario inicial
renderCalendar();
displayEvents();
