# Первая сборка шаблона

[← Вернуться к основному руководству](../README.md)

Прежде чем переделывать шаблон под свои нужды, соберите его как есть\
и убедитесь, что весь процесс работает: от клонирования репозитория\
до установленного и работающего на контроллере пакета.

## Установка необходимых инструментов

Убедитесь, что у вас установлены следующие пакеты:
- git - для клонирования репозитория c GitHub
- dpkg-buildpackage в пакете dpkg-dev - нужен для сборки в deb-пакет
- debhelper версии 11 или новее - его использует dpkg-buildpackage,\
  требуемая версия указана в `Build-Depends` файла `debian/control`

```terminal
$ sudo apt update && \
  sudo apt install git dpkg-dev debhelper
```

## Клонирование репозитория

Клонируйте репозиторий:

```terminal
$ git clone https://github.com/wirenboard/wb-git-template-dpkg-simple.git && \
  cd wb-git-template-dpkg-simple
```

В процессе разработки удобно клонировать сразу свою рабочую ветку:

```terminal
$ GIT_BRANCH_NAME="feature/add-template-files-first-iteration"
$ git clone -b "${GIT_BRANCH_NAME}" --single-branch "https://github.com/wirenboard/wb-git-template-dpkg-simple.git" && \
  cd wb-git-template-dpkg-simple
```

## Сборка пакета

1. Соберите пакет:

   ```terminal
   $ dpkg-buildpackage -rfakeroot -us -uc
   ```

   После успешной сборки в родительской директории появится файл `*.deb`

2. Очистка сгенерированных файлов:

   При сборке генерируется много файлов, которые можно удалить:

   ```terminal
   $ dpkg-buildpackage -rfakeroot -Tclean
   ```

## Установка пакета

Установите собранный пакет, указав путь к deb-файлу - имя файла\
зависит от названия пакета и версии, заданных в `debian/control`\
и `debian/changelog`:

```terminal
$ sudo apt install -y ../wb-packagename_0.0.1_all.deb
```

## Проверка работы пакета

Убедитесь, что после установки пакета виртуальные устройства из примеров\
появились в веб-интерфейсе контроллера на странице "Устройства":

![Виртуальные устройства в веб-интерфейсе](../webui-virtual-devices.png)

Если устройства не появились, посмотрите статус и логи сервиса `wb-rules`:

```terminal
$ systemctl status wb-rules
$ journalctl -u wb-rules -n 50
```

## Удаление пакета

Удалить пакет можно по его имени:

```terminal
$ sudo apt remove wb-packagename
```

После удаления виртуальные устройства могут остаться в веб-интерфейсе\
до перезапуска сервиса: `systemctl restart wb-rules`.
