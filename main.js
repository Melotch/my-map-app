// 1. БАЗА ДАННЫХ МАРШРУТОВ ПО ПОДРАЗДЕЛЕНИЯМ
const routeGroups = {
    "Фабричная Площадка": {
        enabled: true, // Будет включена сразу при загрузке сайта
        routes: [
            { id: "fab_1", name: "Автобус №1 (Главный конвейер)", color: "#e74c3c", coordinates: [[51.258, 37.501], [51.262, 37.515], [51.265, 37.525]] },
            { id: "fab_2", name: "Маршрут №3 (Дробильный цех)", color: "#e67e22", coordinates: [[51.251, 37.498], [51.255, 37.505], [51.259, 37.511]] }
        ]
    },
    "Рудо Управление": {
        enabled: false, // Выключена по умолчанию
        routes: [
            { id: "ru_1", name: "Смена А (Управление - Карьер)", color: "#2ecc71", coordinates: [[51.245, 37.482], [51.238, 37.471], [51.231, 37.455]] },
            { id: "ru_2", name: "УАЗ Попутный (Южный борт)", color: "#27ae60", coordinates: [[51.242, 37.485], [51.239, 37.478], [51.233, 37.469]] }
        ]
    },
    "ЦЖДТ": {
        enabled: false,
        routes: [
            { id: "czhdt_1", name: "Хозблок - Станция Фабричная", color: "#3498db", coordinates: [[51.261, 37.530], [51.268, 37.538], [51.275, 37.548]] },
            { id: "czhdt_2", name: "Переезд 12км (Дежурная смена)", color: "#2980b9", coordinates: [[51.263, 37.532], [51.266, 37.540], [51.270, 37.552]] }
        ]
    },
    "Губкин": {
        enabled: false,
        routes: [
            { id: "gub_1", name: "Экспресс (ул. Мира - Промплощадка)", color: "#9b59b6", coordinates: [[51.285, 37.545], [51.272, 37.528], [51.260, 37.508]] },
            { id: "gub_2", name: "Автобус через Журавлики", color: "#8e44ad", coordinates: [[51.292, 37.558], [51.280, 37.539], [51.261, 37.509]] }
        ]
    }
};

// Переменные для карты и хранения активных слоев
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
    
    // Инициализируем Three.js сцену, если это необходимо для 3D моделей автобусов
    initThreeJS();

    // Запускаем менеджер меню маршрутов
    initRouteManager();
}

// Заглушка для твоей логики Three.js (если рендеришь 3D технику поверх карты)
function initThreeJS() {
    console.log("Three.js контекст подготовлен");
    // Здесь живет твой код создания сцены, камер и рендерера для 3D
}

// 3. ОТРИСОВКА И УДАЛЕНИЕ ЛИНИЙ МАРШРУТОВ
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

    // Сюда можно дописать триггер для Mapbox / Three.js, например:
    // spawn3DBusModel(route.id, route.coordinates[0]);
}

function removeRouteFromMap(routeId) {
    if (activeMapLayers[routeId]) {
        console.log(`Удаление линии с карты: ${routeId}`);
        
        // Удаляем слой с карты Leaflet
        map.removeLayer(activeMapLayers[routeId]);
        // Стираем из нашего реестра активных слоев
        delete activeMapLayers[routeId];
        
        // Если привязан 3D автобус из Three.js, не забудь вызвать его удаление:
        // remove3DBusModel(routeId);
    }
}

// 4. ГЕНЕРАЦИЯ ДИНАМИЧЕСКОГО ИНТЕРФЕЙСА УПРАВЛЕНИЯ
function initRouteManager() {
    const container = document.getElementById('groups-container');
    if (!container) return;

    for (const [groupName, groupData] of Object.entries(routeGroups)) {
        // Делаем безопасный ID для HTML-тегов (убираем пробелы)
        const groupId = groupName.replace(/\s+/g, '_');
        
        const groupDiv = document.createElement('div');
        groupDiv.className = 'route-group';
        
        // Генерируем карточку группы с чекбоксом "Выбрать все"
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
            
            // Если у группы стоит флаг авто-включения — сразу наносим на карту
            if (groupData.enabled) {
                drawRouteOnMap(route);
            }
        });
    }
    
    // Включаем обработчики кликов (клики по чекбоксам)
    setupCheckboxListeners();
}

// 5. ЛОГИКА СВЯЗИ ЧЕКБОКСОВ С КАРТОЙ
function setupCheckboxListeners() {
    // Клик по галочке одиночного маршрута
    document.querySelectorAll('.route-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const routeId = e.target.dataset.routeId;
            const groupName = e.target.dataset.group;
            const route = routeGroups[groupName].routes.find(r => r.id === routeId);
            
            if (e.target.checked) {
                drawRouteOnMap(route);
            } else {
                removeRouteFromMap(routeId);
                // Если мы сняли галочку с маршрута, главный чекбокс группы должен отключиться
                document.querySelector(`.group-checkbox[data-group="${groupName}"]`).checked = false;
            }
        });
    });

    // Клик по главному чекбоксу подразделения (Включить / Выключить группу полностью)
    document.querySelectorAll('.group-checkbox').forEach(groupCheckbox => {
        groupCheckbox.addEventListener('change', (e) => {
            const groupName = e.target.dataset.group;
            const isChecked = e.target.checked;
            
            // Находим все дочерние чекбоксы маршрутов этого цеха
            const childBoxes = document.querySelectorAll(`.route-checkbox[data-group="${groupName}"]`);
            
            childBoxes.forEach(cb => {
                if (cb.checked !== isChecked) {
                    cb.checked = isChecked;
                    const routeId = cb.dataset.routeId;
                    const route = routeGroups[groupName].routes.find(r => r.id === routeId);
                    
                    if (isChecked) {
                        drawRouteOnMap(route);
                    } else {
                        removeRouteFromMap(routeId);
                    }
                }
            });
        });
    });
}

// Запускаем всё приложение после полной загрузки страницы
window.onload = initMap;