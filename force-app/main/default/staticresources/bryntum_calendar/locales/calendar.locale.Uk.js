(function(d,l){var s=typeof exports=="object";if(typeof define=="function"&&define.amd)define([],l);else if(typeof module=="object"&&module.exports)module.exports=l();else{var u=l(),g=s?exports:d;for(var m in u)g[m]=u[m]}})(typeof self<"u"?self:void 0,()=>{var d={},l={exports:d},s=Object.defineProperty,u=Object.getOwnPropertyDescriptor,g=Object.getOwnPropertyNames,m=Object.prototype.hasOwnProperty,v=(e,t,a)=>t in e?s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,h=(e,t)=>{for(var a in t)s(e,a,{get:t[a],enumerable:!0})},f=(e,t,a,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of g(t))!m.call(e,o)&&o!==a&&s(e,o,{get:()=>t[o],enumerable:!(r=u(t,o))||r.enumerable});return e},E=e=>f(s({},"__esModule",{value:!0}),e),w=(e,t,a)=>(v(e,typeof t!="symbol"?t+"":t,a),a),y={};h(y,{default:()=>x}),l.exports=E(y);var i=typeof self<"u"?self:typeof globalThis<"u"?globalThis:null,b=class p{static mergeLocales(...t){let a={};return t.forEach(r=>{Object.keys(r).forEach(o=>{typeof r[o]=="object"?a[o]={...a[o],...r[o]}:a[o]=r[o]})}),a}static trimLocale(t,a){let r=(o,n)=>{t[o]&&(n?t[o][n]&&delete t[o][n]:delete t[o])};Object.keys(a).forEach(o=>{Object.keys(a[o]).length>0?Object.keys(a[o]).forEach(n=>r(o,n)):r(o)})}static normalizeLocale(t,a){if(!t)throw new Error('"nameOrConfig" parameter can not be empty');if(typeof t=="string"){if(!a)throw new Error('"config" parameter can not be empty');a.locale?a.name=t||a.name:a.localeName=t}else a=t;let r={};if(a.name||a.locale)r=Object.assign({localeName:a.name},a.locale),a.desc&&(r.localeDesc=a.desc),a.code&&(r.localeCode=a.code),a.path&&(r.localePath=a.path);else{if(!a.localeName)throw new Error(`"config" parameter doesn't have "localeName" property`);r=Object.assign({},a)}for(let o of["name","desc","code","path"])r[o]&&delete r[o];if(!r.localeName)throw new Error("Locale name can not be empty");return r}static get locales(){return i.bryntum.locales||{}}static set locales(t){i.bryntum.locales=t}static get localeName(){return i.bryntum.locale||"En"}static set localeName(t){i.bryntum.locale=t||p.localeName}static get locale(){return p.localeName&&this.locales[p.localeName]||this.locales.En||Object.values(this.locales)[0]||{localeName:"",localeDesc:"",localeCoode:""}}static publishLocale(t,a){let{locales:r}=i.bryntum,o=p.normalizeLocale(t,a),{localeName:n}=o;return!r[n]||a===!0?r[n]=o:r[n]=this.mergeLocales(r[n]||{},o||{}),r[n]}};w(b,"skipLocaleIntegrityCheck",!1);var c=b;i.bryntum=i.bryntum||{},i.bryntum.locales=i.bryntum.locales||{},c._$name="LocaleHelper";var C={localeName:"Uk",localeDesc:"Українська",localeCode:"uk-UA",Object:{Yes:"Так",No:"Ні",Cancel:"Скасувати",Ok:"OK",Week:"Тиждень",None:"Жодного"},CodeEditor:{apply:"Застосувати",autoApply:"Автоматично застосувати",downloadCode:"Завантажити код",editor:"Редактор коду",viewer:"Переглядач коду"},ColorPicker:{noColor:"Без кольору"},Combo:{noResults:"Немає результатів",recordNotCommitted:"Не вдалося додати запис",addNewValue:e=>`Додати ${e}`},FilePicker:{file:"Файл"},Field:{badInput:"Неприпустиме значення поля",patternMismatch:"Значення має відповідати певному шаблону",rangeOverflow:e=>`Значення повинно бути менше або дорівнювати ${e.max}`,rangeUnderflow:e=>`Значення повинно бути більше або дорівнювати ${e.min}`,stepMismatch:"Значення має відповідати кроку",tooLong:"Значення має бути коротшим",tooShort:"Значення має бути довшим",typeMismatch:"Значення потрібно вказати в спеціальному форматі",valueMissing:"Це обов’язкове поле",invalidValue:"Неприпустиме значення поля",minimumValueViolation:"Не вказано мінімальну кількість значень",maximumValueViolation:"Перевищено максимально допустиму кількість значень",fieldRequired:"Це обов’язкове поле",validateFilter:"Значення має бути вибрано зі списку"},DateField:{invalidDate:"Введено неприпустиму дату"},DatePicker:{gotoPrevYear:"Перейти до попереднього року",gotoPrevMonth:"Перейти до попереднього місяця",gotoNextMonth:"Перейти до наступного місяця",gotoNextYear:"Перейти до наступного року"},NumberFormat:{locale:"uk-UA",currency:"UAH"},DurationField:{invalidUnit:"Неприпустима одиниця"},TimeField:{invalidTime:"Введено неприпустимий час"},TimePicker:{hour:"Година",minute:"Хвилина",second:"Секунда"},List:{loading:"Завантаження...",selectAll:"Вибрати все"},GridBase:{loadMask:"Завантаження...",syncMask:"Триває збереження, зачекайте..."},PagingToolbar:{firstPage:"Перейти до першої сторінки",prevPage:"Перейти до попередньої сторінки",page:"Сторінка",nextPage:"Перейти до наступної сторінки",lastPage:"Перейти до останньої сторінки",reload:"Перезавантажити поточну сторінку",noRecords:"Немає записів для відображення",pageCountTemplate:e=>`з ${e.lastPage}`,summaryTemplate:e=>`Відображаються записи ${e.start} - ${e.end} з ${e.allCount}`},PanelCollapser:{Collapse:"Згорнути",Expand:"Розгорнути"},Popup:{close:"Закрити"},UndoRedo:{Undo:"Скасувати",Redo:"Повторити",UndoLastAction:"Скасувати останню дію",RedoLastAction:"Повторити останню невиконану дію",NoActions:"У черзі скасування немає елементів"},FieldFilterPicker:{equals:"дорівнює",doesNotEqual:"не дорівнює",isEmpty:"пусто",isNotEmpty:"не пустий",contains:"містить",doesNotContain:"не містить",startsWith:"починається з",endsWith:"закінчується на",isOneOf:"один із",isNotOneOf:"не один із",isGreaterThan:"більше",isLessThan:"менше",isGreaterThanOrEqualTo:"більше або дорівнює",isLessThanOrEqualTo:"менше або дорівнює",isBetween:"між",isNotBetween:"не між",isBefore:"до",isAfter:"після",isToday:"сьогодні",isTomorrow:"завтра",isYesterday:"учора",isThisWeek:"цей тиждень",isNextWeek:"наступний тиждень",isLastWeek:"минулий тиждень",isThisMonth:"цей місяць",isNextMonth:"наступний місяць",isLastMonth:"минулий місяць",isThisYear:"цей рік",isNextYear:"наступний рік",isLastYear:"минулий рік",isYearToDate:"з початку року",isTrue:"істина",isFalse:"хиба",selectAProperty:"Виберіть властивість",selectAnOperator:"Виберіть оператор",caseSensitive:"З урахуванням регістру",and:"та",dateFormat:"Д/М/РР",selectValue:"Виберіть значення",selectOneOrMoreValues:"Виберіть одне або кілька значень",enterAValue:"Введіть значення",enterANumber:"Введіть кількість",selectADate:"Вибрати дату",selectATime:"Виберіть час"},FieldFilterPickerGroup:{addFilter:"Додати фільтр"},DateHelper:{locale:"uk-UA",weekStartDay:0,nonWorkingDays:{0:!0,6:!0},weekends:{0:!0,6:!0},unitNames:[{single:"мілісекунда",plural:"мілісекунди",abbrev:"мс"},{single:"emillisecond",plural:"ems",abbrev:"ems"},{single:"секунда",plural:"секунди",abbrev:"с"},{single:"esecond",plural:"eseconds",abbrev:"es"},{single:"хвилина",plural:"хвилини",abbrev:"хв"},{single:"eminute",plural:"eminutes",abbrev:"emin"},{single:"година",plural:"години",abbrev:"год"},{single:"ehour",plural:"ehours",abbrev:"eh"},{single:"день",plural:"дні",abbrev:"дн."},{single:"eday",plural:"edays",abbrev:"ed"},{single:"тиждень",plural:"тижні",abbrev:"тиж."},{single:"eweek",plural:"eweeks",abbrev:"ew"},{single:"місяць",plural:"місяці",abbrev:"міс."},{single:"emonth",plural:"emonths",abbrev:"emon"},{single:"квартал",plural:"квартали",abbrev:"кв."},{single:"equarter",plural:"equarters",abbrev:"eq"},{single:"рік",plural:"роки",abbrev:"р."},{single:"eyear",plural:"eyears",abbrev:"eyr"},{single:"десятиліття",plural:"десятиліття",abbrev:"дес."},{single:"edecade",plural:"edecades",abbrev:"edec"}],unitAbbreviations:[["мс"],[],["с","с"],[],["хв","хв"],[],["год","год"],[],["дн."],[],["тиж.","тиж."],[],["міс.","міс.","міс."],[],["кв.","кварт.","квр"],[],["р.","р."],[],["дес."],[]],parsers:{L:"ММ/ДД/РРРР",LT:"ГГ:хв A",LTS:"ГГ:хв:сс A"},ordinalSuffix:e=>{let t=["11","12","13"].find(r=>e.endsWith(r)),a="-ий";if(!t){let r=e[e.length-1];a={1:"-ий",2:"-й",3:"-ій"}[r]||"-ий"}return e+a}}},F=c.publishLocale(C),S=new String,T={localeName:"Uk",localeDesc:"Українська",localeCode:"uk-UA",ColumnPicker:{column:"Стовпець",columnsMenu:"Стовпці",hideColumn:"Приховати стовпець",hideColumnShort:"Приховати",newColumns:"Створити стовпці"},Filter:{applyFilter:"Застосувати фільтр",filter:"Фільтр",editFilter:"Редагувати фільтр",on:"В",before:"До",after:"Після",equals:"Дорівнює",lessThan:"Менше",moreThan:"Більше",removeFilter:"Видалити фільтр",disableFilter:"Вимкнути фільтр"},FilterBar:{enableFilterBar:"Показати панель фільтрування",disableFilterBar:"Приховати панель фільтрування"},Group:{group:"Групувати",groupAscending:"Групувати за зростанням",groupDescending:"Групувати за спаданням",groupAscendingShort:"За зростанням",groupDescendingShort:"За спаданням",stopGrouping:"Зупинити групування",stopGroupingShort:"Зупинити"},HeaderMenu:{moveBefore:e=>`Перемістити перед "${e}"`,moveAfter:e=>`Перемістити після "${e}"`,collapseColumn:"Згорнути стовпець",expandColumn:"Розгорнути стовпець"},ColumnRename:{rename:"Перейменувати"},MergeCells:{mergeCells:"Об’єднати клітинки",menuTooltip:"Об’єднати клітинки з однаковим значенням у разі сортування за цим стовпцем"},Search:{searchForValue:"Пошук значення"},Sort:{sort:"Сортувати",sortAscending:"Сортувати за зростанням",sortDescending:"Сортувати за спаданням",multiSort:"Сортування за кількома критеріями",removeSorter:"Видалити сортування",addSortAscending:"Додати сортування за зростанням",addSortDescending:"Додати сортування за спаданням",toggleSortAscending:"Змінити на сортування за зростанням",toggleSortDescending:"Змінити на сортування за спаданням",sortAscendingShort:"За зростанням",sortDescendingShort:"За спаданням",removeSorterShort:"Вилучити",addSortAscendingShort:"+ за зростанням",addSortDescendingShort:"+ за спаданням"},Split:{split:"Розділити",unsplit:"Скасувати розділення",horizontally:"Горизонтально",vertically:"Вертикально",both:"В обох напрямках"},LockRows:{lockRow:"Замковий ряд",unlockRow:"Рядок без замка"},Column:{columnLabel:e=>`${e.text?`Стовпець типу ${e.text}. `:""}Натисніть клавішу ПРОБІЛ для виклику контекстного меню${e.sortable?" або ENTER для сортування":""}`,cellLabel:S},Checkbox:{toggleRowSelect:"Вибрати рядок або скасувати вибір",toggleSelection:"Вибрати весь набір даних або скасувати вибір"},RatingColumn:{cellLabel:e=>{var t;return`${e.text?e.text:""} ${(t=e.location)!=null&&t.record?`Оцінка : ${e.location.record.get(e.field)||0}`:""}`}},GridBase:{loadFailedMessage:"Не вдалося завантажити дані!",syncFailedMessage:"Не вдалося синхронізувати дані!",unspecifiedFailure:"Невизначена помилка",networkFailure:"Помилка мережі",parseFailure:"Не вдалося проаналізувати відповідь сервера",serverResponse:"Відповідь сервера:",noRows:"Немає записів для відображення",moveColumnLeft:"Перемістити до лівого розділу",moveColumnRight:"Перемістити до правого розділу",moveColumnTo:e=>`Перемістити стовпець до ${e}`},CellMenu:{removeRow:"Видалити"},RowCopyPaste:{copyRecord:"Копіювати",cutRecord:"Вирізати",pasteRecord:"Вставити",rows:"Рядки",row:"Рядок"},CellCopyPaste:{copy:"Копіювати",cut:"Вирізати",paste:"Вставити"},PdfExport:{"Waiting for response from server":"Очікування відповіді від сервера...","Export failed":"Помилка під час спроби експортувати дані","Server error":"Помилка сервера","Generating pages":"Створення сторінок...","Click to abort":"Скасувати"},ExportDialog:{width:"40em",labelWidth:"12em",exportSettings:"Налаштування експорту даних",export:"Експортувати дані",printSettings:"Параметри друку",print:"Роздрукувати",exporterType:"Контрольна пагінація",cancel:"Скасувати",fileFormat:"Формат файлу",rows:"Рядки",alignRows:"Вирівняти рядки",columns:"Стовпці",paperFormat:"Формат аркуша",orientation:"Орієнтація",repeatHeader:"Повторювати заголовок"},ExportRowsCombo:{all:"Усі рядки",visible:"Видимі рядки"},ExportOrientationCombo:{portrait:"Книжкова",landscape:"Альбомна"},SinglePageExporter:{singlepage:"Одна сторінка"},MultiPageExporter:{multipage:"Декілька сторінок",exportingPage:({currentPage:e,totalPages:t})=>`Експорт сторінки ${e}/${t}`},MultiPageVerticalExporter:{multipagevertical:"Декілька сторінок (книжкова орієнтація)",exportingPage:({currentPage:e,totalPages:t})=>`Експорт сторінки ${e}/${t}`},RowExpander:{loading:"Завантаження",expand:"Розгорнути",collapse:"Згорнути"},TreeGroup:{group:"Групувати за",stopGrouping:"Зупинити групування",stopGroupingThisColumn:"Розгрупувати стовпець"}},L=c.publishLocale(T),D={localeName:"Uk",localeDesc:"Українська",localeCode:"uk-UA",Object:{newEvent:"Створити подію"},ResourceInfoColumn:{eventCountText:e=>e+" подія"+(e!==1?"s":"")},Dependencies:{from:"З",to:"До",valid:"Припустимий",invalid:"Неприпустимий"},DependencyType:{SS:"ПП",SF:"ПЗ",FS:"ЗП",FF:"ЗЗ",StartToStart:"Початок-початок",StartToEnd:"Початок-завершення",EndToStart:"Завершення-початок",EndToEnd:"Завершення-завершення",short:["ПП","ПЗ","ЗП","ЗЗ"],long:["Початок-початок","Початок-завершення","Завершення-початок","Завершення-завершення"]},DependencyEdit:{From:"З",To:"До",Type:"Тип",Lag:"Відставання від графіку","Edit dependency":"Редагувати залежність",Save:"Зберегти",Delete:"Видалити",Cancel:"Скасувати",StartToStart:"Початок-початок",StartToEnd:"Початок‑завершення",EndToStart:"Завершення‑початок",EndToEnd:"Завершення‑завершення"},EventEdit:{Name:"Назва",Resource:"Ресурс",Start:"Початок",End:"Завершення",Save:"Зберегти",Delete:"Видалити",Cancel:"Скасувати","Edit event":"Редагувати подію",Repeat:"Повторити"},EventDrag:{eventOverlapsExisting:"Подія перекриває наявну подію для цього ресурсу",noDropOutsideTimeline:"За межами цієї часової шкали подію може бути видалено не повністю"},SchedulerBase:{"Add event":"Додати подію","Delete event":"Видалити подію","Unassign event":"Скасувати призначення події",color:"Колір"},TimeAxisHeaderMenu:{pickZoomLevel:"Масштаб",activeDateRange:"Діапазон дат",startText:"Дата початку",endText:"Дата завершення",todayText:"Сьогодні"},EventCopyPaste:{copyEvent:"Копіювати подію",cutEvent:"Вирізати подію",pasteEvent:"Вставити подію"},EventFilter:{filterEvents:"Завдання фільтра",byName:"За іменем"},TimeRanges:{showCurrentTimeLine:"Показати поточну часову шкалу"},PresetManager:{secondAndMinute:{displayDateFormat:"ll LTS",name:"Секунди"},minuteAndHour:{topDateFormat:"ддд ММ/ДД, гA",displayDateFormat:"ll LST"},hourAndDay:{topDateFormat:"ддд ММ/ДД",middleDateFormat:"LST",displayDateFormat:"ll LST",name:"День"},day:{name:"День/години"},week:{name:"Тиждень/години"},dayAndWeek:{displayDateFormat:"ll LST",name:"Тиждень/дні"},dayAndMonth:{name:"Місяць"},weekAndDay:{displayDateFormat:"ll LST",name:"Тиждень"},weekAndMonth:{name:"Тижні"},weekAndDayLetter:{name:"Тижні/дні тижня"},weekDateAndMonth:{name:"Місяці/тижні"},monthAndYear:{name:"Місяці"},year:{name:"Роки"},manyYears:{name:"Кілька років"}},RecurrenceConfirmationPopup:{"delete-title":"Ви видаляєте подію","delete-all-message":"Видалити всі екземпляри цієї події?","delete-further-message":"Видалити цей і всі майбутні екземпляри цієї події або лише вибрані екземпляри?","delete-only-this-message":"Ви хочете видалити цю появу цієї події?","delete-further-btn-text":"Видалити всі майбутні події","delete-only-this-btn-text":"Видалити лише цю подію","update-title":"Ви змінюєте повторювану подію","update-all-message":"Змінити всі екземпляри цієї події?","update-further-message":"Змінити лише цей екземпляр події чи й усі майбутні екземпляри?","update-only-this-message":"Ви хочете змінити цю появу цієї події?","update-further-btn-text":"Усі майбутні події","update-only-this-btn-text":"Лише ця подія",Yes:"Так",Cancel:"Скасувати",width:600},RecurrenceLegend:{" and ":" і ",Daily:"Щоденно","Weekly on {1}":({days:e})=>`Щотижня по ${e}`,"Monthly on {1}":({days:e})=>`${e} числа кожного місяця`,"Yearly on {1} of {2}":({days:e,months:t})=>`Щороку ${e} ${t}`,"Every {0} days":({interval:e})=>`Кожен ${e}-й день`,"Every {0} weeks on {1}":({interval:e,days:t})=>`Кожен ${e}-й тиждень, день тижня: ${t}`,"Every {0} months on {1}":({interval:e,days:t})=>`Кожен ${e}-й місяць, день тижня: ${t}`,"Every {0} years on {1} of {2}":({interval:e,days:t,months:a})=>`Кожен ${e}-й рік, дата: ${t}, місяць: ${a}`,position1:"перший",position2:"другий",position3:"третій",position4:"четвертий",position5:"п’ятий","position-1":"останній",day:"дн.",weekday:"день тижня","weekend day":"вихідний день",daysFormat:({position:e,days:t})=>`${e} ${t}`},RecurrenceEditor:{"Repeat event":"Повторити подію",Cancel:"Скасувати",Save:"Зберегти",Frequency:"Періодичність",Every:"Кожн.",DAILYintervalUnit:"дн.",WEEKLYintervalUnit:"тиж.",MONTHLYintervalUnit:"міс.",YEARLYintervalUnit:"р.",Each:"Кожн.",on:"В",the:"В","On the":"В","End repeat":"Завершити повторення","time(s)":"раз",Days:"день",Months:"місяць"},RecurrenceDaysCombo:{day:"дн.",weekday:"день тижня","weekend day":"вихідний день"},RecurrencePositionsCombo:{position1:"перший",position2:"другий",position3:"третій",position4:"четвертий",position5:"п’ятий","position-1":"останній"},RecurrenceStopConditionCombo:{Never:"Ніколи",After:"Після","On date":"Дата завершення повторення"},RecurrenceFrequencyCombo:{None:"Без повтору",Daily:"Щоденно",Weekly:"Щотижня в {0}",Monthly:"Щомісячно",Yearly:"Щорічно"},RecurrenceCombo:{None:"Немає",Custom:"Настроювані..."},Summary:{"Summary for":e=>`Резюме для ${e}`},ScheduleRangeCombo:{completeview:"Увесь розклад",currentview:"Видима область розкладу",daterange:"Діапазон дат",completedata:"Увесь розклад (усі події)"},SchedulerExportDialog:{"Schedule range":"Діапазон розкладу","Export from":"З","Export to":"До"},ExcelExporter:{"No resource assigned":"Немає виділених ресурсів"},CrudManagerView:{serverResponseLabel:"Відповідь сервера:"},DurationColumn:{Duration:"Тривалість"}},R=c.publishLocale(D),k={localeName:"Uk",localeDesc:"Українська",localeCode:"uk-UA",EventEdit:{Calendar:"Календар","All day":"Увесь день",day:"День",week:"Тиждень",month:"Місяць",year:"Рік",decade:"Десятиліття"},EventMenu:{duplicateEvent:"Копіювати подію",copy:"Копіювати"},Calendar:{toggleSidebar:"Перемкнути видимість бічної панелі",Today:"Сьогодні",Tomorrow:"Завтра",next:e=>`Далі ${e}`,previous:e=>`Назад ${e}`,plusMore:e=>`Ще +${e}`,allDay:"Увесь день",endsOn:e=>`Завершується ${e}`,weekOfYear:([e,t])=>`Тиждень ${t}, ${e}`,loadFail:"Не вдалося завантажити дані календаря. Зверніться до системного адміністратора"},CalendarDrag:{holdCtrlForRecurrence:"Утримуйте клавішу CTRL для повторення події"},CalendarMixin:{eventCount:e=>`${e||"Події відсутні"} event${e===1?"":"с"}`},EventTip:{"Edit event":"Редагувати подію",timeFormat:"LST"},ModeSelector:{includeWeekends:"Включити тижні",weekends:"Тижні"},AgendaView:{Agenda:"Порядок денний"},MonthView:{Month:"Місяць",monthUnit:"міс."},WeekView:{weekUnit:"тиж."},YearView:{Year:"Рік",yearUnit:"р.",noEvents:"Події відсутні"},EventList:{List:"Список",Start:"Початок",Finish:"Завершення",days:e=>`${e>1?`${e} `:""}day${e===1?"":"Дні"}`},DayView:{Day:"День",dayUnit:"дн.",daysUnit:"дн.",expandAllDayRow:"Розгорнути розділ з розкладом дня",collapseAllDayRow:"Згорнути  розділ з розкладом дня",timeFormat:"LST",timeAxisTimeFormat:"LST",noMatchingDates:"Немає відповідних дат"},DayAgendaView:{dayAgenda:"Порядок денний"},DayResourceView:{dayResourceView:"Ресурси на день"},Sidebar:{"Filter events":"Фільтрувати події"},WeekExpander:{expandTip:"Натисніть, щоб розгорнути рядок",collapseTip:"Натисніть, щоб згорнути рядок"}},x=c.publishLocale(k);if(typeof l.exports=="object"&&typeof d=="object"){var A=(e,t,a,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Object.getOwnPropertyNames(t))!Object.prototype.hasOwnProperty.call(e,o)&&o!==a&&Object.defineProperty(e,o,{get:()=>t[o],enumerable:!(r=Object.getOwnPropertyDescriptor(t,o))||r.enumerable});return e};l.exports=A(l.exports,d)}return l.exports});