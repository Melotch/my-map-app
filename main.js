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
    [51.28091070730258, 37.74835232248964], // Вот здесь была критическая ошибка, исправил!
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
    [51.285824237144965, 37.79873627344588],
    [51.28616611192243, 37.80155208907814],
    [51.28649267449339, 37.804377695512215],
    [51.28682317372537, 37.807058566606685],
    [51.287025243313735, 37.80872293116167],
    [51.28721759362267, 37.810327376205095],
    [51.28741674470214, 37.81216779196612],
    [51.28763379128901, 37.813998041519625],
    [51.28783242830448, 37.815911311560626], // Исправил опечатку
    [51.28785868365341, 37.816597624334946],
    [51.28782573992984, 37.81732493484705],
    [51.28744235971212, 37.81954140645834],
    [51.287370125831615, 37.819867410171526],
    [51.2869485198006, 37.82087173196814],
    [51.28646962251406, 37.820385287825815],
    [51.2856982379233, 37.81936677552139],
    [51.28485351681255, 37.81831479877491],
    [51.28377731964204, 37.81696351297461],
    [51.28268469174631, 37.815629647834214],
    [51.2807475122718, 37.81320604212479],
    [51.279349406288446, 37.81143061206612],
    [51.27908102797622, 37.81124933239951],
    [51.27877472777166, 37.81090797612313],
    [51.27864169397313, 37.810997902806804],
    [51.27862809516901, 37.8110676920773],
    [51.278519116464565, 37.8111012191691],
    [51.27795522656436, 37.810819319596305],
    [51.27752352073361, 37.810485853955015],
    [51.27720107283153, 37.8102668586657],
    [51.276743998432636, 37.80996905906045],
    [51.2763006057385, 37.80967068040991],
    [51.275750448684164, 37.80932242665864],
    [51.27488792084327, 37.8087600880354],
    [51.27401870417006, 37.80818407305844],
    [51.272844111213885, 37.80743031922128],
    [51.27237414086301, 37.80704152056222],
    [51.27210242605679, 37.80645656846326],
    [51.2720308596121, 37.80613334607034],
    [51.27190892889837, 37.80597621364055],
    [51.27175826276465, 37.80593809998791],
    [51.271561916001104, 37.80576146770204],
    [51.271412799563535, 37.80557658703219],
    [51.27102759676694, 37.804829880142506],
    [51.26999320134402, 37.80292121968165],
    [51.26908651939624, 37.80127570576977],
    [51.26758708815777, 37.79850616100833],
    [51.266312129035356, 37.79616444985302],
    [51.26541197125013, 37.79504308662234],
    [51.26420693381871, 37.793699969570696],
    [51.262770357613704, 37.79210655318445],
    [51.261410082707926, 37.790570018940684],
    [51.25946438849368, 37.78840665255447],
    [51.258778475347924, 37.787636832390604],
    [51.258474960741154, 37.787192008597856],
    [51.257768175300555, 37.786023042486306],
    [51.25380952977645, 37.77845155806719],
    [51.25285726688705, 37.77648712294413],
    [51.25267349212842, 37.7765638980855],
    [51.25252654986343, 37.77663974443627],
    [51.25246974721966, 37.77667493911167],
    [51.25224760365384, 37.77696059616318],
    [51.25195869720301, 37.77732789456098],
    [51.25152200254914, 37.777881142055094],
    [51.25106109577271, 37.77846930139063],
    [51.250534207753645, 37.779151627986096],
    [51.25030602856819, 37.779427179678095],
    [51.250034264135394, 37.779622351708696],
    [51.24974132496132, 37.779875422912625],
    [51.24965059729416, 37.7799493990546],
    [51.24961253385561, 37.779980723786025],
    [51.249506424333646, 37.780012535268725],
    [51.24928080105701, 37.780071545131364],
    [51.248879424181155, 37.780046597757405],
    [51.24834729451959, 37.77981613713558],
    [51.24657532600571, 37.77902971992063],
    [51.24636427987744, 37.77898162127599],
    [51.24620412513735, 37.77900601801383],
    [51.246007481396276, 37.77907658063123],
    [51.245679088945394, 37.77934444306149],
    [51.24458361349048, 37.78044054994899],
    [51.244427178739926, 37.78074858464379],
    [51.244333596790085, 37.78104167680351],
    [51.24422488913066, 37.781455370135546],
    [51.244109784538864, 37.78209702632904],
    [51.24390230300253, 37.783168511744606],
    [51.24376171055806, 37.78394957208823],
    [51.24346562829544, 37.78404535019797],
    [51.24316152418649, 37.78454765907102],
    [51.24318542236884, 37.78491355267164],
    [51.24332427432779, 37.78500800431519],
    [51.24353990812244, 37.785109792228496],
    [51.24347128858557, 37.78549165224274],
    [51.24333845395668, 37.78621239595424],
    [51.24316683132801, 37.787148620846324],
    [51.24310121435494, 37.787479109370935],
    [51.24298052877964, 37.78824329967523],
    [51.24291776136681, 37.788652940349095],
    [51.243392367236765, 37.788861484719064],
    [51.244005579955655, 37.78914285664544],
    [51.24370432838623, 37.790737130951015],
    [51.243323973839836, 37.7928152674331],
    [51.24331343400627, 37.79292859951531],
    [51.2433303078966, 37.79324760041891],
    [51.24343929902446, 37.79360660707397],
    [51.243400733365974, 37.79379322887888],
    [51.24332938172637, 37.79416977846455],
    [51.243227622978026, 37.79471892658455]
    ],
                stops: [
                    { id: "stop_fab1_1", name: "Остановка 1", coords: [] }, // Добавил тестовые координаты для проверки
                    { id: "stop_fab1_2", name: "Остановка 2", coords: [] }
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
