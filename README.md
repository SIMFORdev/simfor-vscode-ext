# simforide

SIMFOR - система математического моделирования

## Установка

Выполните установку зависимостей и системы математического моделирования
```bash
wget -O - https://raw.githubusercontent.com/SIMFORdev/simfor/master/install-deps.sh | bash
wget -O - https://raw.githubusercontent.com/SIMFORdev/simfor/master/install-simfor.sh | bash
```

## Инструкция по общим моментам

### Создание проекта

1) Открыть VS Code
2) File -> Open folder -> Выбираете папку и нажимаете Открыть. **Важно, чтобы папка, где будет создаваться проект, была пустой**
3) Переходите в расширение SIMFOR и жмете на `Create SIMFOR project`.

### Создание модуля/библиотеки

1) Переходите в расширение SIMFOR и жмете на `Create SIMFOR module`
2) В всплывшем окне вводите название модуля и жмете `Enter`

### Удаление модуля/библиотеки

1) Зайти в конфигурационный файл `.vscode/simforext.json`
2) В поле `"cppFiles"` удалить файлы, которые больше не будут использоваться в проекте
3) Переходите в расширение SIMFOR и жмете на `Refresh simforext.json`

### Сборка проекта

Происходит через расширение CMakeTools. При переходе в него, сборочные цели распологаются в окне `PROJECT OUTLINE`. При наведении на имя цели (оно будет подсвечено как Executable) появится кнопка `Build`. При нажатии на неё произойдет сборка.

### Запуск проекта

Происходит через встроенные средства VSCode. Необходимо перейти в окно запуска и отладки, сверху выбрать конфигурацию запуска и нажать запустить. Есть 4 варианта запуска:
1) запуск с MPI в режиме отладки (через консольный gdb),
2) запуск с MPI бер откладки,
3) запуск без фреймворков многопоточного программирования,
4) запуск с OpenMP.

### Изменение количества потоков для MPI

1) Зайти в конфигурационный файл `.vscode/simforext.json`
2) В поле `"threadsCount"` изменить количество потоков
3) Переходите в расширение SIMFOR и жмете на `Refresh simforext.json`

### Примеры

Примеры работы с SIMFOR можно увидеть по этой [ссылке](https://github.com/SIMFORdev/simfor/tree/master/examples).