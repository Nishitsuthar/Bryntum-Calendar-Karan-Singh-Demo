(function(d,t){var s=typeof exports=="object";if(typeof define=="function"&&define.amd)define([],t);else if(typeof module=="object"&&module.exports)module.exports=t();else{var m=t(),v=s?exports:d;for(var c in m)v[c]=m[c]}})(typeof self<"u"?self:void 0,()=>{var d={},t={exports:d},s=Object.defineProperty,m=Object.getOwnPropertyDescriptor,v=Object.getOwnPropertyNames,c=Object.prototype.hasOwnProperty,k=(e,a,o)=>a in e?s(e,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[a]=o,b=(e,a)=>{for(var o in a)s(e,o,{get:a[o],enumerable:!0})},y=(e,a,o,n)=>{if(a&&typeof a=="object"||typeof a=="function")for(let r of v(a))!c.call(e,r)&&r!==o&&s(e,r,{get:()=>a[r],enumerable:!(n=m(a,r))||n.enumerable});return e},h=e=>y(s({},"__esModule",{value:!0}),e),S=(e,a,o)=>(k(e,typeof a!="symbol"?a+"":a,o),o),j={};b(j,{default:()=>z}),t.exports=h(j);var l=typeof self<"u"?self:typeof globalThis<"u"?globalThis:null,g=class u{static mergeLocales(...a){let o={};return a.forEach(n=>{Object.keys(n).forEach(r=>{typeof n[r]=="object"?o[r]={...o[r],...n[r]}:o[r]=n[r]})}),o}static trimLocale(a,o){let n=(r,i)=>{a[r]&&(i?a[r][i]&&delete a[r][i]:delete a[r])};Object.keys(o).forEach(r=>{Object.keys(o[r]).length>0?Object.keys(o[r]).forEach(i=>n(r,i)):n(r)})}static normalizeLocale(a,o){if(!a)throw new Error('"nameOrConfig" parameter can not be empty');if(typeof a=="string"){if(!o)throw new Error('"config" parameter can not be empty');o.locale?o.name=a||o.name:o.localeName=a}else o=a;let n={};if(o.name||o.locale)n=Object.assign({localeName:o.name},o.locale),o.desc&&(n.localeDesc=o.desc),o.code&&(n.localeCode=o.code),o.path&&(n.localePath=o.path);else{if(!o.localeName)throw new Error(`"config" parameter doesn't have "localeName" property`);n=Object.assign({},o)}for(let r of["name","desc","code","path"])n[r]&&delete n[r];if(!n.localeName)throw new Error("Locale name can not be empty");return n}static get locales(){return l.bryntum.locales||{}}static set locales(a){l.bryntum.locales=a}static get localeName(){return l.bryntum.locale||"En"}static set localeName(a){l.bryntum.locale=a||u.localeName}static get locale(){return u.localeName&&this.locales[u.localeName]||this.locales.En||Object.values(this.locales)[0]||{localeName:"",localeDesc:"",localeCoode:""}}static publishLocale(a,o){let{locales:n}=l.bryntum,r=u.normalizeLocale(a,o),{localeName:i}=r;return!n[i]||o===!0?n[i]=r:n[i]=this.mergeLocales(n[i]||{},r||{}),n[i]}};S(g,"skipLocaleIntegrityCheck",!1);var p=g;l.bryntum=l.bryntum||{},l.bryntum.locales=l.bryntum.locales||{},p._$name="LocaleHelper";var D={localeName:"Sr",localeDesc:"Srpski",localeCode:"sr",Object:{Yes:"Da",No:"Ne",Cancel:"Otkaži",Ok:"OK",Week:"Nedelja",None:"Ништа"},CodeEditor:{apply:"Primeni",autoApply:"Automatski primeni",downloadCode:"Preuzmi kod",editor:"Editor koda",viewer:"Pregledač koda"},ColorPicker:{noColor:"Без боје"},Combo:{noResults:"Nema rezultata",recordNotCommitted:"Rezultati nisu mogli biti dodati",addNewValue:e=>`Dodaj ${e}`},FilePicker:{file:"Datoteka"},Field:{badInput:"Neispravna vrednost polja",patternMismatch:"Vrednost treba da odgovara određenom šablonu",rangeOverflow:e=>`Vrednost mora biti manja ili jednaka ${e.max}`,rangeUnderflow:e=>`Vrednost mora biti veća ili jednaka ${e.min}`,stepMismatch:"Vrednost treba da odgovara koraku",tooLong:"Vrednost treba da je kraća",tooShort:"Vrednost treba da je duža",typeMismatch:"Potrebno je da vrednost bude određenog formata",valueMissing:"Ovo polje je potrebno",invalidValue:"Neispravna vrednost polja",minimumValueViolation:"Minimalna vrednost prekršaja",maximumValueViolation:"Maksimalna vrednost prekršaja",fieldRequired:"Ovo polje je potrebno",validateFilter:"Vrednost mora da bude izabrana sa liste"},DateField:{invalidDate:"Neispravni unos datuma"},DatePicker:{gotoPrevYear:"Idi na prethodnu godinu",gotoPrevMonth:"Idi na prethodni mesec",gotoNextMonth:"Idi na sledeći mesec",gotoNextYear:"Idi na sledeću godinu"},NumberFormat:{locale:"sr",currency:"RSD"},DurationField:{invalidUnit:"Neispravna jedinica"},TimeField:{invalidTime:"Neispravan unos vremena"},TimePicker:{hour:"Sat",minute:"Minut",second:"Sekunda"},List:{loading:"Učitavanje...",selectAll:"Odaberi sve"},GridBase:{loadMask:"Učitavanje...",syncMask:"Promene se čuvaju, molim sačekajte..."},PagingToolbar:{firstPage:"Idi na prvu stranu",prevPage:"Idi na prethodnu stranu",page:"Strana",nextPage:"Idi na sledeću stranu",lastPage:"Idi na poslednju stranu",reload:"Ponovo učitaj trenutnu stranu",noRecords:"Nema zapisa za prikaz",pageCountTemplate:e=>`od ${e.lastPage}`,summaryTemplate:e=>`Prikazuju se zapisi ${e.start} - ${e.end} od ${e.allCount}`},PanelCollapser:{Collapse:"Skupi",Expand:"Raširi"},Popup:{close:"Zatvori iskačući prozor"},UndoRedo:{Undo:"Opozovi",Redo:"Ponovi",UndoLastAction:"Opozovi poslednju radnju",RedoLastAction:"Ponovi poslednju opozvanu radnju",NoActions:"Nema stavki u redu za opoziv"},FieldFilterPicker:{equals:"jednako",doesNotEqual:"nije jednako",isEmpty:"je prazno",isNotEmpty:"nije prazno",contains:"sadrži",doesNotContain:"ne sadrži",startsWith:"počinje sa",endsWith:"završava sa",isOneOf:"je jedan od",isNotOneOf:"nije jedan od",isGreaterThan:"je veći od",isLessThan:"je manji od",isGreaterThanOrEqualTo:"je veći ili jednak od",isLessThanOrEqualTo:"je manji ili jednak od",isBetween:"je između",isNotBetween:"nije između",isBefore:"je pre",isAfter:"je posle",isToday:"je danas",isTomorrow:"je sutra",isYesterday:"je juče",isThisWeek:"je ove nedelje",isNextWeek:"je sledeće nedelje",isLastWeek:"je prošle nedelje",isThisMonth:"je ovog meseca",isNextMonth:"je sledećeg meseca",isLastMonth:"je prošlog meseca",isThisYear:"je ove godine",isNextYear:"je sledeće godine",isLastYear:"je prošle godine",isYearToDate:"je od početka godine do danas",isTrue:"je tačan",isFalse:"je netačan",selectAProperty:"Izaberite svojstvo",selectAnOperator:"Izaberite operatora",caseSensitive:"Osetljivo na mala i velika slova",and:"i",dateFormat:"D/M/YY",selectValue:"Izaberite vrednost",selectOneOrMoreValues:"Izaberite jednu ili više vrednosti",enterAValue:"Unesite vrednost",enterANumber:"Unesite broj",selectADate:"Izaberite datum",selectATime:"Izaberite vreme"},FieldFilterPickerGroup:{addFilter:"Dodajte filter"},DateHelper:{locale:"sr",weekStartDay:1,nonWorkingDays:{0:!0,6:!0},weekends:{0:!0,6:!0},unitNames:[{single:"milisekund",plural:"milisekundi",abbrev:"ms"},{single:"emillisecond",plural:"ems",abbrev:"ems"},{single:"sekunda",plural:"sekunde",abbrev:"s"},{single:"esecond",plural:"eseconds",abbrev:"es"},{single:"minut",plural:"minuta",abbrev:"min"},{single:"eminute",plural:"eminutes",abbrev:"emin"},{single:"sat",plural:"sati",abbrev:""},{single:"ehour",plural:"ehours",abbrev:"eh"},{single:"dan",plural:"dana",abbrev:"d"},{single:"eday",plural:"edays",abbrev:"ed"},{single:"nedelja",plural:"nedelje",abbrev:"ned"},{single:"eweek",plural:"eweeks",abbrev:"ew"},{single:"mesec",plural:"meseci",abbrev:"mes"},{single:"emonth",plural:"emonths",abbrev:"emon"},{single:"kvartal",plural:"kvartala",abbrev:"kv"},{single:"equarter",plural:"equarters",abbrev:"eq"},{single:"godina",plural:"godine",abbrev:"god"},{single:"eyear",plural:"eyears",abbrev:"eyr"},{single:"dekada",plural:"dekade",abbrev:"dek"},{single:"edecade",plural:"edecades",abbrev:"edec"}],unitAbbreviations:[["ms"],[],["s","sek"],[],["m","min"],[],["sat","sati"],[],["d"],[],["ned","ned"],[],["mes","mes","mes"],[],["kv","kv","kv"],[],["g","god"],[],["dek"],[]],parsers:{L:"D.M.YYYY",LT:"HH:mm",LTS:"HH:mm:ss A"},ordinalSuffix:e=>e+"."}},w=p.publishLocale(D),f=new String,P={localeName:"Sr",localeDesc:"Srpski",localeCode:"sr",ColumnPicker:{column:"Kolona",columnsMenu:"Kolone",hideColumn:"Sakrij kolonu",hideColumnShort:"Sakrij",newColumns:"Nove kolone"},Filter:{applyFilter:"Primeni filter",filter:"Filter",editFilter:"Uredi filter",on:"Uključeno",before:"Pre",after:"Posle",equals:"Jednako",lessThan:"Manje od",moreThan:"Više od",removeFilter:"Ukloni filter",disableFilter:"Onemogući filter"},FilterBar:{enableFilterBar:"Prikaži traku sa filterima",disableFilterBar:"Sakrij traku sa filterima"},Group:{group:"Grupiši",groupAscending:"Grupiši uzlazno",groupDescending:"Grupiši silazno",groupAscendingShort:"Uzlazno",groupDescendingShort:"Silazno",stopGrouping:"Prekini grupisanje",stopGroupingShort:"Stani"},HeaderMenu:{moveBefore:e=>`Pomeri pre "${e}"`,moveAfter:e=>`Pomeri posle "${e}"`,collapseColumn:"Skupi kolonu",expandColumn:"Proširi kolonu"},ColumnRename:{rename:"Preimenuj"},MergeCells:{mergeCells:"Spoj ćelije",menuTooltip:"Spoj ćelije sa istim vrednostima sortirane prema ovoj koloni"},Search:{searchForValue:"Pretraži vrednost"},Sort:{sort:"Sortiraj",sortAscending:"Sortiraj uzlazno",sortDescending:"Sortiraj silazno",multiSort:"Višestruko sortiranje",removeSorter:"Ukloni sortiranje",addSortAscending:"Dodaj uzlazno sortiranje",addSortDescending:"Dodaj silazno sortiranje",toggleSortAscending:"Promeni u uzlazno",toggleSortDescending:"Promeni u sliazno",sortAscendingShort:"Uzlazno",sortDescendingShort:"Silazno",removeSorterShort:"Ukloni",addSortAscendingShort:"+ Uzlazno",addSortDescendingShort:"+ Silazno"},Split:{split:"Podeljeno",unsplit:"Nepodeljeno",horizontally:"Horizontalno",vertically:"Vertikalno",both:"Oboje"},LockRows:{lockRow:"Zaključaj red",unlockRow:"Otključaj red"},Column:{columnLabel:e=>`${e.text?`${e.text} kolone. `:""}SPACE za kontekstni meni${e.sortable?", ENTER za sortiranje":""}`,cellLabel:f},Checkbox:{toggleRowSelect:"Naizmenični izbor reda",toggleSelection:"Naizmenični izbor kompletnog seta podataka"},RatingColumn:{cellLabel:e=>{var a;return`${e.text?e.text:""} ${(a=e.location)!=null&&a.record?`ocena : ${e.location.record.get(e.field)||0}`:""}`}},GridBase:{loadFailedMessage:"Učitavanje podataka nije uspelo!",syncFailedMessage:"Sinhronizacija podataka nije uspela!",unspecifiedFailure:"Neodređena greška",networkFailure:"Greška mreže",parseFailure:"Raščlanjivanje odgovora servera nije uspelo",serverResponse:"Odgovor servera:",noRows:"Nema zapisa za prikaz",moveColumnLeft:"Pomeri u levi odeljak",moveColumnRight:"Pomeri u desni odeljak",moveColumnTo:e=>`Pomeri kolonu u ${e}`},CellMenu:{removeRow:"Obriši"},RowCopyPaste:{copyRecord:"Kopiraj",cutRecord:"Iseci",pasteRecord:"Umetni",rows:"redova",row:"red"},CellCopyPaste:{copy:"Kopiraj",cut:"Iseci",paste:"Umetni"},PdfExport:{"Waiting for response from server":"Čeka se na odgovor servera...","Export failed":"Izvoz nije uspeo","Server error":"Greška servera","Generating pages":"Generišem stranice...","Click to abort":"Otkaži"},ExportDialog:{width:"40em",labelWidth:"12em",exportSettings:"Izvezi podešavanja",export:"Izvezi",printSettings:"Postavke štampe",print:"Štampa",exporterType:"Kontrola straničenja",cancel:"Otkaži",fileFormat:"Format datoteke",rows:"Redovi",alignRows:"Poravnaj redove",columns:"Kolone",paperFormat:"Format papira",orientation:"Orijentacija",repeatHeader:"Ponovi zaglavlje"},ExportRowsCombo:{all:"Svi redovi",visible:"Vidljivi redovi"},ExportOrientationCombo:{portrait:"Upravno",landscape:"Položeno"},SinglePageExporter:{singlepage:"Jedna strana"},MultiPageExporter:{multipage:"Više strana",exportingPage:({currentPage:e,totalPages:a})=>`Izvos stranice ${e}/${a}`},MultiPageVerticalExporter:{multipagevertical:"Više strana (uspravno)",exportingPage:({currentPage:e,totalPages:a})=>` Izvos stranice ${e}/${a}`},RowExpander:{loading:"Učitavanje",expand:"Raširi",collapse:"Skupi"},TreeGroup:{group:"Grupiši po",stopGrouping:"Prekini grupisanje",stopGroupingThisColumn:"Prekini grupisanje ove kolone"}},C=p.publishLocale(P),O={localeName:"Sr",localeDesc:"Srpski",localeCode:"sr",Object:{newEvent:"Novi dogđaj"},ResourceInfoColumn:{eventCountText:e=>e+" dogđaj"+(e!==1?"događaji":"i")},Dependencies:{from:"Od",to:"Do",valid:"Ispravan",invalid:"Neispravan"},DependencyType:{SS:"PP",SF:"PK",FS:"KP",FF:"KK",StartToStart:"Od početka do početka",StartToEnd:"Od početka do kraja",EndToStart:"Od kraja do početka",EndToEnd:"Od kraja do kraja",short:["PP","PK","KP","KK"],long:["Od početka do početka","Od početka do kraja","Od kraja do početka","Od kraja do kraja"]},DependencyEdit:{From:"Od",To:"Do",Type:"Tip",Lag:"Kašnjenje","Edit dependency":"Uredi zavisnost",Save:"Sačuvaj",Delete:"Obriši",Cancel:"Otkaži",StartToStart:"Od početka do početka",StartToEnd:"Od početka do kraja",EndToStart:"Od kraja do početka",EndToEnd:"Od kraja do kraja"},EventEdit:{Name:"Ime",Resource:"Resurs",Start:"Početak",End:"Kraj",Save:"Sačuvaj",Delete:"Obriši",Cancel:"Otkaži","Edit event":"Uredi događaj",Repeat:"Ponovi"},EventDrag:{eventOverlapsExisting:"Događaj preklapa postojeći događaj za ovaj resurs",noDropOutsideTimeline:"Događaj možda nije u potpunosti spušten izvan vremenske linije"},SchedulerBase:{"Add event":"Dodaj događaj","Delete event":"Obriši događaj","Unassign event":"Poništi dodelu događaja",color:"Boja"},TimeAxisHeaderMenu:{pickZoomLevel:"Zumiranje",activeDateRange:"Opseg datuma",startText:"Početni datum",endText:"Krajnji datum",todayText:"Danas"},EventCopyPaste:{copyEvent:"Kopiraj događaj",cutEvent:"Iseci događaj",pasteEvent:"Umetni događaj"},EventFilter:{filterEvents:"Filtriraj zadatke",byName:"Po imenu"},TimeRanges:{showCurrentTimeLine:"Prikaži trenutnu vremensku liniju"},PresetManager:{secondAndMinute:{displayDateFormat:"ll LTS",name:"Sekundi"},minuteAndHour:{topDateFormat:"ddd D.M., hA",displayDateFormat:"ll LST"},hourAndDay:{topDateFormat:"ddd D.M.",middleDateFormat:"LST",displayDateFormat:"ll LST",name:"Dan"},day:{name:"Dan/sati"},week:{name:"Nedelja/sati"},dayAndWeek:{displayDateFormat:"ll LST",name:"Nedelja/dana"},dayAndMonth:{name:"Mesec"},weekAndDay:{displayDateFormat:"ll LST",name:"Nedelja"},weekAndMonth:{name:"Nedelja"},weekAndDayLetter:{name:"Nedelja/radnih dana"},weekDateAndMonth:{name:"Meseci/nedelja"},monthAndYear:{name:"Meseci"},year:{name:"Godina"},manyYears:{name:"Više godina"}},RecurrenceConfirmationPopup:{"delete-title":"Brisanje događaja","delete-all-message":"Da li želišda obrišeš sva pojavljivanja ovog događaja?","delete-further-message":"Da li želiš da obrišeš ovaj i sva sledeća pojavljivanja ovog događaja, ili samo odabrano pojavljivanje?","delete-only-this-message":"Да ли желите да обришете ово појављивање овог догађаја?","delete-further-btn-text":"Obriši sve buduće događaje","delete-only-this-btn-text":"Obriši samo ovaj događaj","update-title":"Izmena događaja koji se ponavlja","update-all-message":"Da li želiš da promeniš sva pojavljivanja ovog događaja?","update-further-message":"Da li želiš da promeniš samo ovo pojavljivanje događaja, ili ovo i svako buduće pojavljivanje? ","update-only-this-message":"Да ли желите да промените ово појављивање овог догађаја?","update-further-btn-text":"Sve buduće događaje","update-only-this-btn-text":"Samo ovaj događaj",Yes:"Da",Cancel:"Otkaži",width:600},RecurrenceLegend:{" and ":" i ",Daily:"Dnevno","Weekly on {1}":({days:e})=>`Svake nedelje u ${e}`,"Monthly on {1}":({days:e})=>`Svakog meseca u ${e}`,"Yearly on {1} of {2}":({days:e,months:a})=>`Svake godine u ${e} u ${a}`,"Every {0} days":({interval:e})=>`Svakih ${e} dana`,"Every {0} weeks on {1}":({interval:e,days:a})=>`Svakih ${e} nedelja u ${a}`,"Every {0} months on {1}":({interval:e,days:a})=>`Svakih ${e} meseci u ${a}`,"Every {0} years on {1} of {2}":({interval:e,days:a,months:o})=>`Svakih ${e} godina na ${a} u ${o}`,position1:"prvi",position2:"drugi",position3:"treći",position4:"četvrti",position5:"peti","position-1":"poslednji",day:"dan",weekday:"radni dan","weekend day":"dan vikenda",daysFormat:({position:e,days:a})=>`${e} ${a}`},RecurrenceEditor:{"Repeat event":"Ponovi događaj",Cancel:"Otkaži",Save:"Sačuvaj",Frequency:"Frekvencija",Every:"Svaki(h)",DAILYintervalUnit:"dan(a)",WEEKLYintervalUnit:"nedelje(e)",MONTHLYintervalUnit:"mesec(a)",YEARLYintervalUnit:"godina(e)",Each:"Svake",on:"Dan",the:"Na","On the":"Na","End repeat":"Kraj ponavljanja","time(s)":"put(a)",Days:"Дани",Months:"Месецима"},RecurrenceDaysCombo:{day:"dan",weekday:"radni dan","weekend day":"dan vikenda"},RecurrencePositionsCombo:{position1:"prvi",position2:"drugi",position3:"treći",position4:"četvrti",position5:"peti","position-1":"poslednji"},RecurrenceStopConditionCombo:{Never:"Nikad",After:"Nakon","On date":"Na dan"},RecurrenceFrequencyCombo:{None:"Bez ponavljanja",Daily:"Dnevno",Weekly:"Nedeljno",Monthly:"Mesečno",Yearly:"Godišnje"},RecurrenceCombo:{None:"Nema",Custom:"Prilagođeno…"},Summary:{"Summary for":e=>`Pregled na ${e}`},ScheduleRangeCombo:{completeview:"Kompletan raspored",currentview:"Vidljiv raspored",daterange:"Opseg datuma",completedata:"Kompletan raspored (za sve događaje)"},SchedulerExportDialog:{"Schedule range":"Opseg rasporeda","Export from":"Od","Export to":"Do"},ExcelExporter:{"No resource assigned":"Nema pridruženih resursa"},CrudManagerView:{serverResponseLabel:"Odgovor servera:"},DurationColumn:{Duration:"Trajanje"}},T=p.publishLocale(O),N={localeName:"Sr",localeDesc:"Srpski",localeCode:"sr",EventEdit:{Calendar:"Kalendar","All day":"Ceo dan",day:"Dan",week:"Nedelja",month:"Mesec",year:"Godina",decade:"Decenija"},EventMenu:{duplicateEvent:"Dupliraj događaj",copy:"kopiraj"},Calendar:{toggleSidebar:"Prebaci vidljivost bočne trake",Today:"Danas",Tomorrow:"Сутра",next:e=>`Sledeći ${e}`,previous:e=>`Prethodni ${e}`,plusMore:e=>`+${e} više`,allDay:"Ceo dan",endsOn:e=>`Završava ${e}`,weekOfYear:([e,a])=>`Nedelja ${a}, ${e}`,loadFail:"Učitavanje podataka kalendara nije uspelo. Obratite se svom sistemskom administratoru"},CalendarDrag:{holdCtrlForRecurrence:"Držite CTRL za događaje koji se ponavljaju"},CalendarMixin:{eventCount:e=>`${e||"Nema"} događaj${e&&e>1?"e":""}`},EventTip:{"Edit event":"Uredi događaj",timeFormat:"LST"},ModeSelector:{includeWeekends:"Uključi vikende",weekends:"Vikendi"},AgendaView:{Agenda:"Rokovnik"},MonthView:{Month:"Mesec",monthUnit:"mesec"},WeekView:{weekUnit:"nedelja"},YearView:{Year:"Godina",yearUnit:"godina",noEvents:"Nema događaja"},EventList:{List:"Lista",Start:"Početak",Finish:"Kraj",days:e=>`${e>1?`${e} `:""}dan${e===1?"":"a"}`},DayView:{Day:"Dan",dayUnit:"dan",daysUnit:"dana",expandAllDayRow:"Proširi red ceo dan",collapseAllDayRow:"Skupi red ceo dan",timeFormat:"LST",timeAxisTimeFormat:"LST",noMatchingDates:"Nema odgovarajućih datuma"},DayAgendaView:{dayAgenda:" Дневни ред"},DayResourceView:{dayResourceView:"Dnevni resursi"},Sidebar:{"Filter events":"Filtriraj događaje"},WeekExpander:{expandTip:"Klkni da raširiš red",collapseTip:"Klikni da skupiš red"}},z=p.publishLocale(N);if(typeof t.exports=="object"&&typeof d=="object"){var E=(e,a,o,n)=>{if(a&&typeof a=="object"||typeof a=="function")for(let r of Object.getOwnPropertyNames(a))!Object.prototype.hasOwnProperty.call(e,r)&&r!==o&&Object.defineProperty(e,r,{get:()=>a[r],enumerable:!(n=Object.getOwnPropertyDescriptor(a,r))||n.enumerable});return e};t.exports=E(t.exports,d)}return t.exports});