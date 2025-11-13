# Include Sorter

**Автор:** Есин Олег Евгеньевич, М3101

**IDE:** Visual Studio Code  

## Описание

Include Sorter - это расширение для VS Code, которое сортирует `#include` в C++ файлах согласно Google C++ Style.

 ### Активируется: 

- В Command Palette: `Include Sorter`
- `CTRL+M` 

### Ограничения:
- Работа только с C++ файлами (.cpp, .h, .hpp)
- Поддержка только однострочных `#include`

### Результат:
- Все `#include` перемещаются в начало файла
- `#include` сортируются в алфавитном порядке
- Исходный код после `#include` остается неизменным


## Пример:
![example](https://raw.githubusercontent.com/Oleold/include-sorter/refs/heads/work/images/example.gif)
Расширение работает только с С++

### 1.0.0

Первоначальная версия Include Sorter

## Commit History

* `0b5acf8e75972c6921d256e92a301858209404f4`: Comented on extension.ts
* `be2b1699bb018a4fa6b7dd23c2a28e156363509e`: Added all other
* `22a8df562f5c7e9c87bb306590459a952366532e`: Added check expansion. Added icon
* `e5705c32838584e230fcf5d82801c9a02f7b13db`: includes sorting
