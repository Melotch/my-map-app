import json
import os

# Скрипт сам найдёт все geojson файлы в этой папке
for filename in os.listdir("."):
    if filename.endswith(".geojson"):
        print(f"Обрабатываю файл: {filename}")

        try:
            with open(filename, "r", encoding="utf-8") as f:
                data = json.load(f)


            # Функция для разворота [lng, lat] -> [lat, lng]
            def flip(coords):
                if isinstance(coords[0], list):
                    return [flip(c) for c in coords]
                return [coords[1], coords[0]]


            all_route_coords = []

            # Собираем абсолютно все координаты из файла
            if "features" in data:
                for feature in data["features"]:
                    if "geometry" in feature and "coordinates" in feature["geometry"]:
                        flipped = flip(feature["geometry"]["coordinates"])

                        # Если это LineString (массив точек [[lat, lng], ...])
                        if isinstance(flipped[0], list) and not isinstance(flipped[0][0], list):
                            all_route_coords.extend(flipped)
                        # Если это MultiLineString или сложная структура (массив массивов точек)
                        elif isinstance(flipped[0], list) and isinstance(flipped[0][0], list):
                            for sub_route in flipped:
                                all_route_coords.extend(sub_route)
                        # Если это одиночная точка [lat, lng]
                        else:
                            all_route_coords.append(flipped)

            elif "geometry" in data:
                flipped = flip(data["geometry"]["coordinates"])
                if isinstance(flipped[0], list):
                    all_route_coords.extend(flipped)
                else:
                    all_route_coords.append(flipped)

            if all_route_coords:
                # Создаем имя файла для результата
                output_name = filename.replace(".geojson", "_ready.txt")

                with open(output_name, "w", encoding="utf-8") as f:
                    # Записываем полный объединенный массив точек для main.js
                    f.write(json.dumps(all_route_coords, indent=4))
                print(f" -> Успешно сохранен ПОЛНЫЙ маршрут ({len(all_route_coords)} точек): {output_name}")
            else:
                print(f" -> Предупреждение: В {filename} не найдены координаты")

        except Exception as e:
            print(f" -> Ошибка при обработке {filename}: {e}")

print("\nВсе файлы переобработаны! Проверяй новые текстовые файлы.")