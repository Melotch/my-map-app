// 1. Создаем карту, привязывая её к div с id="map"
const map = L.map('map').setView([51.258, 37.508], 13); 

// 2. Добавляем базовый слой карт (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 1. БАЗА ДАННЫХ МАРШРУТОВ ПО ПОДРАЗДЕЛЕНИЯМ
const routeGroups = {
    "Фабричная Площадка": {
        enabled: true, // Будет включена сразу при загрузке сайта
        // ПОЧИНЕНО: Теперь это правильный массив объектов [ {...}, {...} ]
        routes: [
            {
                id: "fab_1",
                name: "РУ-ФП",
                color: "#e74c3c",
                coordinates: [
                    [51.27766425509148, 37.72653402161464],
                    [51.277819108393146, 37.72871705496806],
                    [51.27788166355026, 37.72998360853734],
                    [51.27796829903954, 37.731518448538964],
                    [51.278067692741416, 37.73209884067654],
                    [51.27837309244083, 37.73270006417047],
                    [51.27867251425633, 37.7330303157359],
                    [51.279081967593356, 37.73350458744798],
                    [51.2795459487088, 37.734047168409376],
                    [51.279983882993605, 37.73450965865035],
                    [51.28018513610772, 37.734879127347966],
                    [51.28029363225994, 37.735390927906764],
                    [51.280350151507605, 37.73604402037603],
                    [51.28045859444566, 37.73756236432985],
                    [51.280640856756094, 37.73969114160835],
                    [51.28075039234187, 37.74149914934594],
                    [51.28087147425458, 37.743378779315975],
                    [51.28096325697527, 37.74522139903638],
                    [51.28097347618504, 37.74672660803958],
                    [51.28091070730258, 37.74835232248964],
                    [51.28087893774631, 37.74961374897845],
                    [51.28096054430105, 37.75056635943278],
                    [51.28115299417573, 37.75176327609225],
                    [51.281437771241826, 37.7537996884015],
                    [51.28166374119931, 37.75583213012882],
                    [51.28187356950397, 37.75786206267858],
                    [51.28205417960896, 37.76006288509549],
                    [51.28212344892404, 37.76196948928134],
                    [51.28225444583964, 37.76429087094334],
                    [51.28273125976878, 37.770959469523916],
                    [51.28312633325339, 37.77520904076661],
                    [51.28345207020695, 37.77823310391619],
                    [51.283772696206256, 37.781009206783125],
                    [51.28409968208314, 37.78401001160739],
                    [51.284417596744134, 37.786836057412955],
                    [51.28441413822594, 37.78758878086481],
                    [51.28436500210597, 37.78775082157168],
                    [51.28428537550286, 37.78788434594031],
                    [51.284296359930664, 37.78813846778448],
                    [51.28434849595331, 37.78831001793412],
                    [51.28445760110142, 37.788421753651704],
                    [51.28451701447884, 37.78850661393665],
                    [51.28469029842623, 37.78912440895249],
                    [51.28487448097093, 37.790650042130125],
                    [51.28509542284377, 37.792538810942204],
                    [51.285281417289696, 37.79412960943819],
                    [51.28556342287891, 37.79645074548347],
                    [51.285824237144965, 37.79873627344588]
                ],
                stops: [
                    { id: "stop_fab1_1", name: "Остановка 1", coords: [] }, 
                    { id: "stop_fab1_2", name: "Остановка 2", coords: [] }  
                ]
            },
            {
                id: "fab_2",
                name: "ТЦ Славянка-ФП",
                color: "#e67e22",
                coordinates: [], 
                stops: []
            }
        ]
    },
    "Рудо Управление": {
        enabled: false, 
        routes: [
            {
                id: "ru_1",
                name: "ФП-РУ",
                color: "#2ecc71",
                coordinates: [], 
                stops: []
            },
            {
                id: "ru_2",
                name: "ТЦ Славянка-РУ",
                color: "#27ae60",
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
        routes: [
            {
                id: "czhdt_1",
                name: "Маршрут ЦЖДТ 1",
                color: "#3498db",
                coordinates: [], 
                stops: []
            },
            {
                id: "czhdt_2",
                name: "Маршрут ЦЖДТ 2",
                color: "#2980b9",
                coordinates: [], 
                stops: []
            }
        ]
    },
    "Губкин": {
        enabled: false,
        routes: [
            {
                id: "gub_1",
                name: "Маршрут Губкин 1",
                color: "#9b59b6",
                coordinates: [], 
                stops: []
            },
            {
                id: "gub_2",
                name: "Маршрут Губкин 2",
                color: "#8e44ad",
                coordinates: [], 
                stops: []
            }
        ]
    }
};

// Переменные для карты и хранения активных слоёв
const activeMapLayers = {};

// 2. ИНИЦИАЛИЗАЦИЯ КАРТЫ (Leaflet)
function initMap() {
    // Карта уже создана в самом начале файла, здесь просто добавляем настройки подложки если нужно,
    // но чтобы избежать повторной инициализации, этот блок оставляем чистым.
    console.log("Карта успешно инициализирована");

    // Запускаем менеджер меню маршрутов
    initRouteManager();
}

// 3. ОТРИСОВКА И УДАЛЕНИЕ ЛИНИЙ МАРШРУТОВ И ОСТАНОВОК
function drawRouteOnMap(route) {
    if (!route.coordinates || route.coordinates.length === 0) return; // Защита от пустых маршрутов
    if (activeMapLayers[route.id]) return; 

    console.log(`Отрисовка линии маршрута: ${route.name}`);

    const polyline = L.polyline(route.coordinates, {
        color: route.color,
        weight: 5,
        opacity: 0.85,
        lineJoin: 'round'
    }).addTo(map);

    activeMapLayers[route.id] = polyline;

    drawStopsOnMap(route);
}

function removeRouteFromMap(routeId) {
    if (activeMapLayers[routeId]) {
        console.log(`Удаление линии с карты: ${routeId}`);
        map.removeLayer(activeMapLayers[routeId]);
        delete activeMapLayers[routeId];
        removeStopsFromMap(routeId);
    }
}

function drawStopsOnMap(route) {
    if (!route.stops) return;

    route.stops.forEach(stop => {
        // Проверяем, заданы ли координаты остановки, чтобы Leaflet не падал
        if (stop.coords && stop.coords.length === 2) {
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
                });
            }
        });
    }
}

// 4. ГЕНЕРАЦИЯ ДИНАМИЧЕСКОГО ИНТЕРФЕЙСА УПРАВЛЕНИЯ
function initRouteManager() {
    const container = document.getElementById('routeSidebar');
    if (!container) return;

    for (const [groupName, groupData] of Object.entries(routeGroups)) {
        const groupId = groupName.replace(/\s+/g, '_');

        const groupDiv = document.createElement('div');
        groupDiv.className = 'route-group';

        groupDiv.innerHTML = `
            <label class="route-group-title">
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
                <span class="color-bullet" style="background: ${route.color};"></span>
                ${route.name || "Без названия"}
            `;
            routesListContainer.appendChild(routeLabel);

            if (groupData.enabled) {
                drawRouteOnMap(route);
            }
        });
    }

    setupCheckboxListeners();
}

// 5. ОБРАБОТЧИКИ КЛИКОВ ПО ЧЕКБОКСАМ
function setupCheckboxListeners() {
    document.querySelectorAll('.group-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const groupName = this.getAttribute('data-group');
            const isChecked = this.checked;

            routeGroups[groupName].enabled = isChecked;

            routeGroups[groupName].routes.forEach(route => {
                const routeCheckbox = document.querySelector(`input[data-route-id="${route.id}"]`);

                if (routeCheckbox) {
                    routeCheckbox.checked = isChecked;

                    if (isChecked) {
                        drawRouteOnMap(route);
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
    if (sidebar) sidebar.classList.toggle('active');
}

/**
 * 7. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
 */
document.addEventListener('DOMContentLoaded', function() {
    initMap();

    const menuToggleBtn = document.getElementById('menuToggle');
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', toggleMenu);
    }
});
