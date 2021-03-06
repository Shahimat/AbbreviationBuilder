# Abbreviation builder (построитель сокращений, ABuilder)

## Общая информация

Производит поиск в docx файлах аббревиатур и их сохранение во внешних файлах или билиотеках.
Для этого существуют 2 файла:

`ABuilder.js` - выполняет поиск аббревиатур и выписывает их во внешнем файле;
`ABuilderLib.js` - добавляет новые аббревиатуры в библиотеку.

## ABuilder

Пусть есть файл `source.docx`. Тогда комманда `node ABuilder source` при исполнении на выходе даст 2 файла - `result.txt` и `result.json`. Смысл в следующем:

`result.txt` - файл из которого можно копипастить список в ворд файл.

`result.json` - файл для обмена однотипными аббревиатурами (по сути - либа, library).


Советую для создания библиотеки переименовать файл `result.json` в `lib.json`. Внутри можно увидеть нечто подобное:

```json
{
	"ЕКА": "",
	"КА": "",
	"НИОКР": "",
	"РН": "",
	"СЧ": "",
	"ЭП": ""
}
```


Переделайте эту структуру вот в такую (наполнение не важно, главное структура):

```json
{
	"ЕКА": "европейское космичское агенство",
	"КА": "космический аппарат",
	"НИОКР": "научно-исследовательские и опытно-конструкторские работы",
	"РН": "ракета-носитель",
	"СЧ": "составная часть",
	"ЭП": [
		"эскизный проект",
		"эквивалентная позиция"
	]
}
```

Можно использовать библиотеку! например так: `node ABuilder source lib`. На выходе так-же получаем файлы `result.txt` и `result.json`, только там где есть совпадения - данные добавляются.

## ABuilderLib

Выполнив команду `node ABuilderLib source lib` мы из файла `source.json` запишем в файл `lib.json` недостающие аббревиатуры или в случае различных аббревиатур добавим в массив выбора.