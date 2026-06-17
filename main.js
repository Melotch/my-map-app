// 1. БАЗА ДАННЫХ МАРШРУТОВ ПО ПОДРАЗДЕЛЕНИЯМ
const routeGroups = {
    "Фабричная Площадка": {
        enabled: true, // Будет включена сразу при загрузке сайта
        routes: [
            {
                id: "fab_1",
                name: "РУ-ФП",
                color: "#e74c3c",
                coordinates: [], // ← ВСТАВЬТЕ КООРДИНАТЫ ЗДЕСЬ
                stops: [
                    { id: "stop_fab1_1", name: "Остановка 1", coords: [] }, // ← КООРДИНАТЫ ОСТАНОВКИ
            { id: "stop_fab1_2", name: "Остановка 2", coords: [] }  // ← КООРДИНАТЫ ОСТАНОВКИ
                ]
            },
            {
                id: "fab_2",
                name: "ТЦ Славянка-ФП",
                color: "#e67e22",
                coordinates: [], // ← ВСТАВЬТЕ КООРДИНАТЫ ЗДЕСЬ
                stops: []
            }
        ]
    },
    "Рудо Управление": {
        enabled: false, // Выключена по умолчанию
        routes: [
            {
                id: "ru_1",
                name: "ФП-РУ",
                color: "#2ecc71",
                coordinates: [], // ← ВСТАВЬТЕ КООРДИНАТЫ ЗДЕСЬ
                stops: []
            },
            {
                id: "ru_2",
                name: "ТЦ Славянка-РУ",
                color: "#27ae60",
                coordinates: [], // ← ВСТАВЬТЕ КООРДИНАТЫ ЗДЕСЬ
                stops: [
                    { id: "stop_ru2_1", name: "Остановка A", coords: [] }, // ← КООРДИНАТЫ ОСТАНОВКИ
            { id: "stop_ru2_2", name: "Остановка B", coords: [] }  // ← КООРДИНАТЫ ОСТАНОВКИ
                ]
            }
        ]
    },
    "ЦЖДТ": {
        enabled: false,
        routes: [
            {
                id: "czhdt_1",
                name: "",
                color: "#3498db",
                coordinates: [], // ← ВСТАВЬТЕ КООРДИНАТЫ ЗДЕСЬ
                stops: []
            },
            {
                id: "czhdt_2",
                name: "",
                color: "#2980b9",
                coordinates: [], // ← ВСТАВЬТЕ КООРДИНАТЫ ЗДЕСЬ
                stops: []
            }
        ]
    },
    "Губкин": {
        enabled: false,
        routes: [
            {
                id: "gub_1",
                name: "",
                color: "#9b59b6",
                coordinates: [], // ← ВСТАВЬТЕ КООРДИНАТЫ ЗДЕСЬ
                stops: []
            },
            {
                id: "gub_2",
                name: "",
                color: "#8e44ad",
                coordinates: [], // ← ВСТАВЬТЕ КООРДИНАТЫ ЗДЕСЬ
                stops: []
            }
        ]
    }
};

// Переменные для карты и хранения активных слоёв
let map;
const activeMapLayers = {};

// 2. ИНИЦИАЛИЗАЦИЯ КАРТЫ (Leaflet)
function initMap() {
    // Устанавливаем фокус карты на район промплощадки (Губкин)
    map = L.map('map').setView([51.258, 37.508], 13);

    // Подключаем стандартную подложку OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    console.log("Карта успешно инициализирована");

    // Запускаем менеджер меню маршрутов
    initRouteManager();
}

// 3. ОТРИСОВКА И УДАЛЕНИЕ ЛИНИЙ МАРШРУТОВ И ОСТАНОВОК
function drawRouteOnMap(route) {
    if (activeMapLayers[route.id]) return; // Если уже нарисован, игнорируем

    console.log(`Отрисовка линии маршрута: ${route.name}`);

    // Рисуем полилинию средствами Leaflet
    const polyline = L.polyline(route.coordinates, {
        color: route.color,
        weight: 5,
        opacity: 0.85,
        lineJoin: 'round'
    }).addTo(map);

    // Сохраняем ссылку на слой, чтобы в будущем его стереть по ID
    activeMapLayers[route.id] = polyline;

    // Отрисовываем остановки
    drawStopsOnMap(route);
}

function removeRouteFromMap(routeId) {
    if (activeMapLayers[routeId]) {
        console.log(`Удаление линии с карты: ${routeId}`);

        // Удаляем слой с карты Leaflet
        map.removeLayer(activeMapLayers[routeId]);
        // Стираем из нашего реестра активных слоёв
        delete activeMapLayers[routeId];

        // Удаляем остановки
        removeStopsFromMap(routeId);
    }
}

// Функции для работы с остановками
function drawStopsOnMap(route) {
    if (!route.stops) return;

    route.stops.forEach(stop => {
        if (!activeMapLayers[stop.id]) {
            const marker = L.marker(stop.coords, {
                icon: L.divIcon({
                    className: 'stop-marker',
            html: `<div class="stop-icon">${stop.name}</div>`,
            iconSize: [40, 40]
        })
            }).addTo(map);

            activeMapLayers[stop.id] = marker;
        }
    });
}

function removeStopsFromMap(routeId) {
    for (const groupName in routeGroups) {
        const group = routeGroups[groupName];
        group.routes.forEach(route => {
            if (route.id === routeId && route.stops) {
                route.stops.forEach(stop => {
                    if (activeMapLayers[stop.id]) {
                map.removeLayer(activeMapLayers[stop.id]);
                delete activeMapLayers[stop.id];
            }
        ;
// 4. ГЕНЕРАЦИЯ ДИНАМИЧЕСКОГО ИНТЕРФЕЙСА УПРАВЛЕНИЯ
function initRouteManager() {
    const container = document.getElementById('routeSidebar');
    if (!container) return;

    for (const [groupName, groupData] of Object.entries(routeGroups)) {
        // Делаем безопасный ID для HTML-тегов (убираем пробелы)
        const groupId = groupName.replace(/\s+/g, '_');

        const groupDiv = document.createElement('div');
        groupDiv.className = 'route-group';

        // Генерируем карточку группы с чекбоксом «Выбрать всё»
        groupDiv.innerHTML = `
            <label class="route-group-title">
                <input type="checkbox" class="group-checkbox" data-group="${groupName}" ${groupData.enabled ? 'checked' : ''}>
                ${groupName}
            </label>
            <div class="group-routes-list" id="list-${groupId}"></div>
        `;
        container.appendChild(groupDiv);

        const routesListContainer = document.getElementById(`list-${groupId}`);

        // Перебираем вложенные маршруты конкретного подразделения
        groupData.routes.forEach(route => {
            const routeLabel = document.createElement('label');
            routeLabel.className = 'route-item';
            routeLabel.innerHTML = `
                <input type="checkbox" class="route-checkbox" data-route-id="${route.id}" data-group="${groupName}" ${groupData.enabled ? 'checked' : ''}>
                <span class="color-bullet" style="background: ${route.color};"></span>
                ${route.name}
            `;
            routesListContainer.appendChild(routeLabel);

            // Если у группы стоит флаг автовключения — сразу наносим на карту
            if (groupData.enabled) {
                drawRouteOnMap(route);
            }
        });
    }

    // Включаем обработчики кликов (клики по чекбоксам)
    setupCheckboxListeners();
}

 /* 5. ОБРАБОТЧИКИ КЛИКОВ ПО ЧЕКБОКСАМ
 * Отвечают за:
 * - включение/выключение группы маршрутов (чекбокс группы)
 * - включение/выключение отдельного маршрута (чекбокс маршрута)
 */
function setupCheckboxListeners() {
    // Обработчик для чекбоксов групп (выбрать всё)
    document.querySelectorAll('.group-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const groupName = this.getAttribute('data-group');
            const isChecked = this.checked;

            // Обновляем флаг enabled в данных
            routeGroups[groupName].enabled = isChecked;

            // Проходим по всем маршрутам этой группы
            routeGroups[groupName].routes.forEach(route => {
                const routeCheckbox = document.querySelector(
                    (`input[data-route-id="${route.id}"]`);

                if (routeCheckbox) {
                    routeCheckbox.checked = isChecked;

                    // Добавляем или удаляем маршрут с карты
            if (isChecked) {
                drawRouteOnMap(route);
            } else {
                removeRouteFromMap(route.id);
            }
        }
            });
        });
    });

    // Обработчик для чекбоксов отдельных маршрутов
    document.querySelectorAll('.route-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const routeId = this.getAttribute('data-route-id');
            const groupName = this.getAttribute('data-group');
            const isChecked = this.checked;

            // Находим маршрут в данных по ID
            const route = routeGroups[groupName].routes.find(r => r.id === routeId);

            if (route) {
                if (isChecked) {
                    drawRouteOnMap(route);
                } else {
                    removeRouteFromMap(routeId);
                }
            }
        });
    });
}

/**
 * 6. ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ МЕНЮ (для мобильных устройств)
 */
function toggleMenu() {
    const sidebar = document.getElementById('routeSidebar');
    sidebar.classList.toggle('active');
}

/**
 * 7. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
 */
document.addEventListener('DOMContentLoaded', function() {
    initMap();

    // Добавляем обработчик для кнопки переключения меню (если она есть)
    const menuToggleBtn = document.getElementById('menuToggle');
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', toggleMenu);
    }
});
