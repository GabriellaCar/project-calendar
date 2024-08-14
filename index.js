const holidays = {
    "01-01": "Ano Novo",
    "04-21": "Tiradentes",
    "05-01": "Dia do Trabalho",
    "09-07": "Independência do Brasil",
    "10-12": "Nossa Senhora Aparecida",
    "11-02": "Finados",
    "11-15": "Proclamação da República",
    "12-25": "Natal"
};

const events = {
    "08-15": "Aniversário de São Paulo"
};

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar(month, year) {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('month-year');
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    monthYear.textContent = `${monthNames[month]} ${year}`;
    calendar.innerHTML = '';

    // Adicionando os dias da semana
    daysOfWeek.forEach(day => {
        calendar.innerHTML += `<div class="week-day">${day}</div>`;
    });

    // Preenchendo os dias do mês
    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += '<div class="day"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayString = day.toString().padStart(2, '0');
        const monthString = (month + 1).toString().padStart(2, '0');
        const dateString = `${monthString}-${dayString}`;
        const isHoliday = holidays[dateString] ? 'holiday' : '';
        const isEvent = events[dateString] ? 'event' : '';

        calendar.innerHTML += `<div class="day ${isHoliday} ${isEvent}" onclick="openModal('${dateString}')">${day}</div>`;
    }
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

function openModal(date) {
    const modal = document.getElementById('event-modal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const saveBtn = document.getElementById('save-event');
    const eventNameInput = document.getElementById('event-name');

    modal.style.display = 'block';

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    saveBtn.onclick = function() {
        const eventName = eventNameInput.value;
        if (eventName) {
            events[date] = eventName;
            modal.style.display = 'none';
            generateCalendar(currentMonth, currentYear);
        }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    generateCalendar(currentMonth, currentYear);
});
