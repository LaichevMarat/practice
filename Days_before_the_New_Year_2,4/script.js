// Основная функция при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const dateInput = document.getElementById('dateInput');
    const daysResult = document.querySelector('#daysResult p');
    const leapYearResult = document.querySelector('#leapYearResult p');
    
    // Обработчик нажатия кнопки
    calculateBtn.addEventListener('click', function() {
        const dateString = dateInput.value.trim();
        
        if (!dateString) {
            showError('Пожалуйста, введите дату');
            return;
        }
        
        // Парсинг даты
        const date = parseDate(dateString);
        if (!date) {
            showError('Неверный формат даты. Используйте ДД.ММ.ГГГГ');
            return;
        }
        
        // Проверка корректности даты
        if (!isValidDate(date)) {
            showError('Некорректная дата');
            return;
        }
        
        // Расчет дней до Нового года
        const daysToNewYear = calculateDaysToNewYear(date);
        
        // Проверка високосного года
        const isLeap = isLeapYear(date.year);
        
        // Вывод результатов
        displayResults(daysToNewYear, isLeap);
    });
    
    // Автодобавление точек при вводе
    dateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^\d]/g, '');
        
        if (value.length > 2 && value.length <= 4) {
            value = value.substring(0, 2) + '.' + value.substring(2);
        } else if (value.length > 4) {
            value = value.substring(0, 2) + '.' + value.substring(2, 4) + '.' + value.substring(4, 8);
        }
        
        e.target.value = value;
    });
    
    // Обработка нажатия Enter
    dateInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateBtn.click();
        }
    });
});

// Функция парсинга даты из строки ДД.ММ.ГГГГ
function parseDate(dateString) {
    const parts = dateString.split('.');
    
    if (parts.length !== 3) {
        return null;
    }
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return null;
    }
    
    return { day, month, year };
}

// Проверка корректности даты
function isValidDate(date) {
    const { day, month, year } = date;
    
    // Проверка диапазонов
    if (month < 1 || month > 12) return false;
    if (year < 1000 || year > 9999) return false;
    
    // Проверка дней в месяце
    const daysInMonth = getDaysInMonth(month, year);
    if (day < 1 || day > daysInMonth) return false;
    
    return true;
}

// Получение количества дней в месяце
function getDaysInMonth(month, year) {
    const febDays = isLeapYear(year) ? 29 : 28;
    const daysInMonth = [31, febDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[month - 1];
}

// Функция проверки високосного года
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Функция расчета дней до Нового года
function calculateDaysToNewYear(date) {
    const { day, month, year } = date;
    
    // Создаем объекты Date для введенной даты и Нового года
    const inputDate = new Date(year, month - 1, day);
    const newYearDate = new Date(year, 11, 31); // 31 декабря
    
    // Если дата уже после Нового года, считаем для следующего года
    if (inputDate > newYearDate) {
        newYearDate.setFullYear(year + 1);
    }
    
    // Разница в миллисекундах
    const diffTime = newYearDate - inputDate;
    
    // Перевод в дни
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
}

// Функция отображения результатов
function displayResults(days, isLeap) {
    const daysResult = document.querySelector('#daysResult p');
    const leapYearResult = document.querySelector('#leapYearResult p');
    
    // Отображение дней
    daysResult.textContent = `${days} дней`;
    daysResult.style.color = days === 0 ? '#e74c3c' : '#27ae60';
    
    // Отображение информации о годе
    leapYearResult.textContent = isLeap ? 'Високосный' : 'Не високосный';
    leapYearResult.style.color = isLeap ? '#e74c3c' : '#3498db';
}

// Функция показа ошибок
function showError(message) {
    const daysResult = document.querySelector('#daysResult p');
    const leapYearResult = document.querySelector('#leapYearResult p');
    
    daysResult.textContent = 'Ошибка';
    daysResult.style.color = '#e74c3c';
    
    leapYearResult.textContent = message;
    leapYearResult.style.color = '#e74c3c';
    
    // Автоматическое скрытие ошибки
    setTimeout(() => {
        daysResult.textContent = '-';
        leapYearResult.textContent = '-';
        daysResult.style.color = '#2c3e50';
        leapYearResult.style.color = '#2c3e50';
    }, 3000);
}