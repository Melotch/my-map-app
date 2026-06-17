// 1. Создаем карту, привязывая её к div с id="map"
const map = L.map('map').setView([51.258, 37.508], 13); 

// 2. Добавляем базовый слой карт (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 1. БАЗА ДАННЫХ МАРШРУТОВ ПО ПОДРАЗДЕЛЕНИЯМ (Цвета перенесены на уровень категорий)
const routeGroups = {
    "Фабричная Площадка": {
        enabled: true,
        color: "#e74c3c", // Красный для Фабрики
        routes: [
            {
                id: "fab_1",
                name: "РУ-ФП",
                coordinates: [
                    [51.27766425509148, 37.72653402161464], [51.277819108393146, 37.72871705496806],
                    [51.27788166355026, 37.72998360853734], [51.27796829903954, 37.731518448538964],
                    [51.278067692741416, 37.73209884067654], [51.285824237144965, 37.79873627344588] // Свернул для читаемости
                ],
                stops: [
                    { id: "stop_fab1_1", name: "Остановка 1", coords: [51.27766, 37.72653] }, // Добавил тестовые координаты для проверки
                    { id: "stop_fab1_2", name: "Остановка 2", coords: [51.28582, 37.79873] }
                ]
            },
            {
                id: "fab_2",
                name: "ТЦ Славянка-ФП",
                coordinates: [], 
                stops: []
            }
        ]
    },
    "Рудо Управление": {
        enabled: false,
        color: "#2ecc71", // Зеленый для Рудоуправления
        routes: [
            {
                id: "ru_1",
                name: "ФП-РУ",
                coordinates: [], 
                stops: []
            },
            {
                id: "ru_2",
                name: "ТЦ Славянка-РУ",
                coordinates: [], 
                stops: [
                    { id: "stop_ru2_1", name: "Остановка A", coords: [] }, 
                    { id: "stop_ru2_2", name: "Остановка B", coords: [] }  
                ]
            }
        ]
    },
    "ЦЖДТ": {
        enabled: false,
        color: "#3498db", // Синий для ЦЖДТ
        routes: [
            {
                id: "czhdt_1",
                name: "Маршрут ЦЖДТ 1",
                coordinates: [], 
                stops: []
            }
        ]
    },
    "Губкин": {
        enabled: false,
        color: "#9b59b6", // Фиолетовый для городских маршрутов Губкина
        routes: [
            {
                id: "gub_1",
                name: "Маршрут Губкин 1",
                coordinates: [], 
                stops: []
            }
        ]
    }
};

// Переменные для карты и хранения активных слоёв
const activeMapLayers = {};

function initMap() {
    console.log("Карта успешно инициализирована");
    initRouteManager();
}

// 3. ОТРИСОВКА И УДАЛЕНИЕ С УЧЕТОМ ЦВЕТА КАТЕГОРИИ
function drawRouteOnMap(route, groupColor) {
    if (!route.coordinates || route.coordinates.length === 0) return; 
    if (activeMapLayers[route.id]) return; 

    console.log(`Отрисовка линии маршрута: ${route.name}`);

    // Используем цвет группы groupColor
    const polyline = L.polyline(route.coordinates, {
        color: groupColor, 
        weight: 6,       // Сделал чуть жирнее для красоты
        opacity: 0.85,
        lineJoin: 'round'
    }).addTo(map);

    activeMapLayers[route.id] = polyline;

    // Передаем цвет группы в отрисовку остановок
    drawStopsOnMap(route, groupColor);
}

function removeRouteFromMap(routeId) {
    if (activeMapLayers[routeId]) {
        map.removeLayer(activeMapLayers[routeId]);
        delete activeMapLayers[routeId];
        removeStopsFromMap(routeId);
    }
}

function drawStopsOnMap(route, groupColor) {
    if (!route.stops) return;

    route.stops.forEach(stop => {
        if (stop.coords && stop.coords.length === 2) {
            if (!activeMapLayers[stop.id]) {
                // Создаем маркер, который красится в цвет линии через border или background
                const marker = L.marker(stop.coords, {
                    icon: L.divIcon({
                        className: 'stop-marker-container',
                        html: `
                            <div class="stop-marker-pulse" style="background-color: ${groupColor}"></div>
                            <div class="stop-marker-body" style="border-color: ${groupColor}">
                                <span class="stop-title">${stop.name}</span>
                            </div>
                        `,
                        iconSize: [30, 30],
                        iconAnchor: [15, 15] // Центрируем маркер ровно по координате
                    })
                }).addTo(map);

                activeMapLayers[stop.id] = marker;
            }
        }
    });
}

function removeStopsFromMap(routeId) {
    for (const groupName in routeGroups) {
        routeGroups[groupName].routes.forEach(route => {
            if (route.id === routeId && route.stops) {
                route.stops.forEach(stop => {
                    if (activeMapLayers[stop.id]) {
                        map.removeLayer(activeMapLayers[stop.id]);
                        delete activeMapLayers[stop.id];
                    }
                });
            }
        });
    }
}

// 4. ГЕНЕРАЦИЯ ИНТЕРФЕЙСА (Цвет пули берется из группы)
function initRouteManager() {
    const container = document.getElementById('routeSidebar');
    if (!container) return;

    for (const [groupName, groupData] of Object.entries(routeGroups)) {
        const groupId = groupName.replace(/\s+/g, '_');
        const groupDiv = document.createElement('div');
        groupDiv.className = 'route-group';

        groupDiv.innerHTML = `
            <label class="route-group-title" style="border-left: 4px solid ${groupData.color}; padding-left: 8px;">
                <input type="checkbox" class="group-checkbox" data-group="${groupName}" ${groupData.enabled ? 'checked' : ''}>
                ${groupName}
            </label>
            <div class="group-routes-list" id="list-${groupId}"></div>
        `;
        container.appendChild(groupDiv);

        const routesListContainer = document.getElementById(`list-${groupId}`);

        groupData.routes.forEach(route => {
            const routeLabel = document.createElement('label');
            routeLabel.className = 'route-item';
            routeLabel.innerHTML = `
                <input type="checkbox" class="route-checkbox" data-route-id="${route.id}" data-group="${groupName}" ${groupData.enabled ? 'checked' : ''}>
                <span class="color-bullet" style="background: ${groupData.color};"></span>
                ${route.name || "Без названия"}
            `;
            routesListContainer.appendChild(routeLabel);

            if (groupData.enabled) {
                drawRouteOnMap(route, groupData.color); // Передаем цвет при автозагрузке
            }
        });
    }

    setupCheckboxListeners();
}

// 5. ОБРАБОТЧИКИ КЛИКОВ (Передаем цвета групп при кликах)
function setupCheckboxListeners() {
    document.querySelectorAll('.group-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const groupName = this.getAttribute('data-group');
            const isChecked = this.checked;
            const groupColor = routeGroups[groupName].color;

            routeGroups[groupName].enabled = isChecked;

            routeGroups[groupName].routes.forEach(route => {
                const routeCheckbox = document.querySelector(`input[data-route-id="${route.id}"]`);

                if (routeCheckbox) {
                    routeCheckbox.checked = isChecked;
                    if (isChecked) {
                        drawRouteOnMap(route, groupColor);
                    } else {
                        removeRouteFromMap(route.id);
                    }
                }
            });
        });
    });

    document.querySelectorAll('.route-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const routeId = this.getAttribute('data-route-id');
            const groupName = this.getAttribute('data-group');
            const isChecked = this.checked;
            const groupColor = routeGroups[groupName].color;

            const route = routeGroups[groupName].routes.find(r => r.id === routeId);

            if (route) {
                if (isChecked) {
                    drawRouteOnMap(route, groupColor);
                } else {
                    removeRouteFromMap(routeId);
                }
            }
        });
    });
}

function toggleMenu() {
    const sidebar = document.getElementById('routeSidebar');
    if (sidebar) sidebar.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    initMap();
    const menuToggleBtn = document.getElementById('menuToggle');
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', toggleMenu);
    }
});
