(function(c,r){var h=typeof exports=="object";if(typeof define=="function"&&define.amd)define([],r);else if(typeof module=="object"&&module.exports)module.exports=r();else{var u=r(),p=h?exports:c;for(var m in u)p[m]=u[m]}})(typeof self<"u"?self:void 0,()=>{var c={},r={exports:c},h=Object.defineProperty,u=Object.getOwnPropertyDescriptor,p=Object.getOwnPropertyNames,m=Object.prototype.hasOwnProperty,b=(e,n,t)=>n in e?h(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,v=(e,n)=>{for(var t in n)h(e,t,{get:n[t],enumerable:!0})},T=(e,n,t,i)=>{if(n&&typeof n=="object"||typeof n=="function")for(let a of p(n))!m.call(e,a)&&a!==t&&h(e,a,{get:()=>n[a],enumerable:!(i=u(n,a))||i.enumerable});return e},k=e=>T(h({},"__esModule",{value:!0}),e),C=(e,n,t)=>(b(e,typeof n!="symbol"?n+"":n,t),t),d={};v(d,{default:()=>E}),r.exports=k(d);var l=typeof self<"u"?self:typeof globalThis<"u"?globalThis:null,y=class g{static mergeLocales(...n){let t={};return n.forEach(i=>{Object.keys(i).forEach(a=>{typeof i[a]=="object"?t[a]={...t[a],...i[a]}:t[a]=i[a]})}),t}static trimLocale(n,t){let i=(a,o)=>{n[a]&&(o?n[a][o]&&delete n[a][o]:delete n[a])};Object.keys(t).forEach(a=>{Object.keys(t[a]).length>0?Object.keys(t[a]).forEach(o=>i(a,o)):i(a)})}static normalizeLocale(n,t){if(!n)throw new Error('"nameOrConfig" parameter can not be empty');if(typeof n=="string"){if(!t)throw new Error('"config" parameter can not be empty');t.locale?t.name=n||t.name:t.localeName=n}else t=n;let i={};if(t.name||t.locale)i=Object.assign({localeName:t.name},t.locale),t.desc&&(i.localeDesc=t.desc),t.code&&(i.localeCode=t.code),t.path&&(i.localePath=t.path);else{if(!t.localeName)throw new Error(`"config" parameter doesn't have "localeName" property`);i=Object.assign({},t)}for(let a of["name","desc","code","path"])i[a]&&delete i[a];if(!i.localeName)throw new Error("Locale name can not be empty");return i}static get locales(){return l.bryntum.locales||{}}static set locales(n){l.bryntum.locales=n}static get localeName(){return l.bryntum.locale||"En"}static set localeName(n){l.bryntum.locale=n||g.localeName}static get locale(){return g.localeName&&this.locales[g.localeName]||this.locales.En||Object.values(this.locales)[0]||{localeName:"",localeDesc:"",localeCoode:""}}static publishLocale(n,t){let{locales:i}=l.bryntum,a=g.normalizeLocale(n,t),{localeName:o}=a;return!i[o]||t===!0?i[o]=a:i[o]=this.mergeLocales(i[o]||{},a||{}),i[o]}};C(y,"skipLocaleIntegrityCheck",!1);var s=y;l.bryntum=l.bryntum||{},l.bryntum.locales=l.bryntum.locales||{},s._$name="LocaleHelper";var f={localeName:"Vi",localeDesc:"Tiếng Việt",localeCode:"vi",Object:{Yes:"Có",No:"Không",Cancel:"Hủy bỏ ",Ok:"OK",Week:"Tuần",None:"Không"},CodeEditor:{apply:"Áp dụng",autoApply:"Tự động áp dụng",downloadCode:"Tải mã",editor:"Trình soạn thảo mã",viewer:"Trình xem mã"},ColorPicker:{noColor:"Không màu"},Combo:{noResults:"Ko có kết quả",recordNotCommitted:"Không thể thêm hồ sơ",addNewValue:e=>`Thêm ${e}`},FilePicker:{file:"Tập tin"},Field:{badInput:"Giá trị trường không hợp lệ",patternMismatch:"Giá trị phải phù hợp với một mẫu cụ thể",rangeOverflow:e=>`Giá trị phải nhỏ hơn hoặc bằng ${e.max}`,rangeUnderflow:e=>`Giá trị phải lớn hơn hoặc bằng ${e.min}`,stepMismatch:"Giá trị phải phù hợp với bước",tooLong:"Giá trị phải ngắn hơn",tooShort:"Giá trị phải dài hơn",typeMismatch:"Giá trị bắt buộc phải ở định dạng đặc biệt",valueMissing:"Trường này là bắt buộc",invalidValue:"Giá trị trường không hợp lệ",minimumValueViolation:"Vi phạm giá trị tối thiểu",maximumValueViolation:"Vi phạm giá trị tối đa",fieldRequired:"Trường này là bắt buộc",validateFilter:"Giá trị phải được chọn từ danh sách"},DateField:{invalidDate:"Đầu vào ngày không hợp lệ"},DatePicker:{gotoPrevYear:"Chuyển đến năm trước",gotoPrevMonth:"Chuyển đến tháng trước",gotoNextMonth:"Chuyển đến tháng sau",gotoNextYear:"Sang năm sau"},NumberFormat:{locale:"vi",currency:"VND"},DurationField:{invalidUnit:"Đơn vị không hợp lệ"},TimeField:{invalidTime:"Đầu vào thời gian không hợp lệ"},TimePicker:{hour:"Giờ",minute:"Phút",second:"Thứ hai"},List:{loading:"Đang tải...",selectAll:"Chọn Tất cả"},GridBase:{loadMask:"Đang tải...",syncMask:"Đang lưu các thay đổi, vui lòng đợi ..."},PagingToolbar:{firstPage:"Đi đến trang đầu tiên",prevPage:"Đi đến trang trước",page:"Trang",nextPage:"Đi đến trang tiếp theo",lastPage:"Đi đến trang cuối cùng",reload:"Tải lại trang hiện tại",noRecords:"Không có hồ sơ nào để hiển thị",pageCountTemplate:e=>`/ ${e.lastPage}`,summaryTemplate:e=>`Hiển thị hồ sơ ${e.start} - ${e.end} of ${e.allCount}`},PanelCollapser:{Collapse:"Thu gọn",Expand:"Mở rộng"},Popup:{close:"Đóng cửa sổ bật lên"},UndoRedo:{Undo:"Hoàn tác",Redo:"Làm lại",UndoLastAction:"Hoàn tác hành động cuối cùng",RedoLastAction:"Làm lại hành động đã hoàn tác cuối cùng",NoActions:"Không có mục nào trong hàng đợi hoàn tác"},FieldFilterPicker:{equals:"bằng",doesNotEqual:"không bằng",isEmpty:"trống rỗng",isNotEmpty:"không trống rỗng",contains:"chứa",doesNotContain:"không chứa",startsWith:"bắt đầu với",endsWith:"kết thúc với",isOneOf:"là một trong những",isNotOneOf:"không phải là một trong những",isGreaterThan:"lớn hơn",isLessThan:"nhỏ hơn",isGreaterThanOrEqualTo:"lớn hơn hoặc bằng",isLessThanOrEqualTo:"nhỏ hơn hoặc bằng",isBetween:"ở giữa",isNotBetween:"không ở giữa",isBefore:"trước",isAfter:"sau",isToday:"hôm nay",isTomorrow:"ngày mai",isYesterday:"hôm qua",isThisWeek:"tuần này",isNextWeek:"tuần sau",isLastWeek:"tuần trước",isThisMonth:"tháng này",isNextMonth:"tháng sau",isLastMonth:"tháng trước",isThisYear:"năm nay",isNextYear:"năm sau",isLastYear:"năm trước",isYearToDate:"năm cho đến nay",isTrue:"đúng",isFalse:"sai",selectAProperty:"Chọn một tài sản",selectAnOperator:"Chọn một nhà điều hành",caseSensitive:"Phân biệt chữ hoa chữ thường",and:"và",dateFormat:"D/M/YY",selectValue:"Chọn một giá trị",selectOneOrMoreValues:"Chọn một hoặc nhiều giá trị",enterAValue:"Nhập một giá trị",enterANumber:"Nhập một số",selectADate:"Nhập một ngày",selectATime:"Chọn thời gian"},FieldFilterPickerGroup:{addFilter:"Thêm bộ lọc"},DateHelper:{locale:"vi",weekStartDay:1,nonWorkingDays:{0:!0,6:!0},weekends:{0:!0,6:!0},unitNames:[{single:"milligiây",plural:"ms",abbrev:"ms"},{single:"emillisecond",plural:"ems",abbrev:"ems"},{single:"giây",plural:"giây",abbrev:"sec"},{single:"esecond",plural:"eseconds",abbrev:"es"},{single:"phút",plural:"phút",abbrev:"min"},{single:"eminute",plural:"eminutes",abbrev:"emin"},{single:"giờ",plural:"giờ",abbrev:"h"},{single:"ehour",plural:"ehours",abbrev:"eh"},{single:"ngày",plural:"ngày",abbrev:"d"},{single:"eday",plural:"edays",abbrev:"ed"},{single:"tuần",plural:"tuần",abbrev:"w"},{single:"eweek",plural:"eweeks",abbrev:"ew"},{single:"tháng",plural:"tháng",abbrev:"mon"},{single:"emonth",plural:"emonths",abbrev:"emon"},{single:"quý",plural:"quý",abbrev:"q"},{single:"equarter",plural:"equarters",abbrev:"eq"},{single:"năm",plural:"năm",abbrev:"yr"},{single:"eyear",plural:"eyears",abbrev:"eyr"},{single:"thậpkỷ",plural:"thậpkỷ",abbrev:"dec"},{single:"edecade",plural:"edecades",abbrev:"edec"}],unitAbbreviations:[["mil"],[],["s","sec"],[],["m","min"],[],["h","hr"],[],["d"],[],["w","wk"],[],["mo","mon","mnt"],[],["q","quar","qrt"],[],["y","yr"],[],["dec"],[]],parsers:{L:"DD/MM/YYYY",LT:"HH:mm",LTS:"HH:mm:ss A"},ordinalSuffix:e=>e}},L=s.publishLocale(f),D=new String,x={localeName:"Vi",localeDesc:"Tiếng Việt",localeCode:"vi",ColumnPicker:{column:"Cột",columnsMenu:"Cột",hideColumn:"Ẩn Cột",hideColumnShort:"Ẩn",newColumns:"Cột mới"},Filter:{applyFilter:"Áp dụng bộ lọc",filter:"Bộ lọc",editFilter:"Chỉnh sửa bộ lọc",on:"Bật",before:"Trước",after:"Sau",equals:"Bằng",lessThan:"Ít hơn",moreThan:"Nhiều hơn",removeFilter:"Xóa bỏ bộ lọc",disableFilter:"Bỏ bộ lọc"},FilterBar:{enableFilterBar:"Hiển thị thanh bộ lọc",disableFilterBar:"Ẩn thanh bộ lọc"},Group:{group:"Nhóm",groupAscending:"Nhóm tăng dần",groupDescending:"Nhóm giảm dần",groupAscendingShort:"Tăng dần",groupDescendingShort:"Giảm dần",stopGrouping:"Dừng nhóm",stopGroupingShort:"Dừng"},HeaderMenu:{moveBefore:e=>`Di chuyển trước "${e}"`,moveAfter:e=>`Di chuyển sau "${e}"`,collapseColumn:"Thu gọn cột",expandColumn:"Mở rộng cột"},ColumnRename:{rename:"Đổi tên"},MergeCells:{mergeCells:"Hợp nhất các ô",menuTooltip:"Hợp nhất các ô có cùng giá trị khi được sắp xếp theo Column này"},Search:{searchForValue:"Tìm kiếm giá trị"},Sort:{sort:"Sắp xếp",sortAscending:"Sắp xếp tăng dần",sortDescending:"Sắp xếp giảm dần",multiSort:"Sắp xếp nhiều kiểu",removeSorter:"Xóa bộ sắp xếp",addSortAscending:"Thêm bộ sắp xếp tăng dần",addSortDescending:"Thêm bộ sắp xếp giảm dần",toggleSortAscending:"Thay đổi thành tăng dần",toggleSortDescending:"Thay đổi thành giảm dần",sortAscendingShort:"Tăng dần",sortDescendingShort:"Giảm dần",removeSorterShort:"Xóa",addSortAscendingShort:"+ Tăng dần",addSortDescendingShort:"+ Giảm dần"},Split:{split:"Chia",unsplit:"Gộp",horizontally:"Ngang",vertically:"Dọc",both:"Cả hai"},LockRows:{lockRow:"Khóa dòng",unlockRow:"Mở khóa dòng"},Column:{columnLabel:e=>`${e.text?`${e.text} column. `:""}nhấn phím SPACE cho menu ngữ cảnh menu${e.sortable?", nhấn phím ENTER để sắp xếp":""}`,cellLabel:D},Checkbox:{toggleRowSelect:"Chuyển đổi lựa chọn hàng",toggleSelection:"Chuyển đổi lựa chọn của toàn bộ tập dữ liệu"},RatingColumn:{cellLabel:e=>{var n;return`${e.text?e.text:""} ${(n=e.location)!=null&&n.record?`xếp hạng : ${e.location.record.get(e.field)||0}`:""}`}},GridBase:{loadFailedMessage:"Tải dữ liệu không thành công!",syncFailedMessage:"Đồng bộ hóa dữ liệu không thành công!",unspecifiedFailure:"Lỗi không xác định",networkFailure:"Lỗi mạng",parseFailure:"Không thể phân tích cú pháp phản hồi của máy chủ",serverResponse:"Phản hồi của máy chủ:",noRows:"Không có hồ sơ nào để hiển thị",moveColumnLeft:"Di chuyển sang phần bên trái",moveColumnRight:"Di chuyển sang phần bên phải",moveColumnTo:e=>`Di chuyển cột đến ${e}`},CellMenu:{removeRow:"Xóa hàng"},RowCopyPaste:{copyRecord:"Sao chép",cutRecord:"Cắt",pasteRecord:"Dán",rows:"hàng",row:"hàng"},CellCopyPaste:{copy:"Sao chép",cut:"Cắt",paste:"Dán"},PdfExport:{"Waiting for response from server":"Đang chờ phản hồi từ máy chủ ...","Export failed":"Xuất không thành công","Server error":"Lỗi máy chủ","Generating pages":"Đang tạo trang ...","Click to abort":"Hủy bỏ"},ExportDialog:{width:"40em",labelWidth:"12em",exportSettings:"Cài đặt xuất",export:"Xuất",printSettings:"Cài đặt in",print:"In",exporterType:"Kiểm soát phân trang",cancel:"Hủy bỏ",fileFormat:"Định dạng tệp",rows:"Dòng",alignRows:"Căn chỉnh các dòng",columns:"Các cột",paperFormat:"Định dạng trang",orientation:"Hướng",repeatHeader:"Lặp lại tiêu đề"},ExportRowsCombo:{all:"Tất cả các hàng",visible:"Dòng có thể nhìn thấy"},ExportOrientationCombo:{portrait:"Dọc",landscape:"Ngang"},SinglePageExporter:{singlepage:"Trang đơn"},MultiPageExporter:{multipage:"Nhiều trang",exportingPage:({currentPage:e,totalPages:n})=>`Xuất trang ${e}/${n}`},MultiPageVerticalExporter:{multipagevertical:"Nhiều trang (theo chiều dọc)",exportingPage:({currentPage:e,totalPages:n})=>`Xuất trang ${e}/${n}`},RowExpander:{loading:"Đang tải",expand:"Mở rộng",collapse:"Thu gọn"},TreeGroup:{group:"Nhóm theo",stopGrouping:"Dừng nhóm",stopGroupingThisColumn:"Hủy nhóm cột này"}},M=s.publishLocale(x),S={localeName:"Vi",localeDesc:"Tiếng Việt",localeCode:"vi",Object:{newEvent:"Sự kiện mới"},ResourceInfoColumn:{eventCountText:e=>e+" kiện"},Dependencies:{from:"Từ",to:"Đến",valid:"Hợp lệ",invalid:"Không hợp lệ"},DependencyType:{SS:"BB",SF:"BK",FS:"KB",FF:"KK",StartToStart:"Bắt đầu đến Bắt đầu",StartToEnd:"Bắt đầu đến Kết thúc",EndToStart:"Kết thúc đến Bắt đầu",EndToEnd:"Kết thúc đến Kết thúc",short:["BB","BK","KB","KK"],long:["Bắt đầu đến Bắt đầu","Bắt đầu đến Kết thúc","Kết thúc đến Bắt đầu","Kết thúc đến Kết thúc"]},DependencyEdit:{From:"Từ",To:"Đến",Type:"Loại",Lag:"Lag","Edit dependency":"Chỉnh sửa Phụ thuộc",Save:"Lưu",Delete:"Xóa",Cancel:"Hủy bỏ",StartToStart:"Bắt đầu đến Bắt đầu",StartToEnd:"Bắt đầu đến Kết thúc",EndToStart:"Kết thúc đến Bắt đầu",EndToEnd:"Kết thúc đến Kết thúc"},EventEdit:{Name:"Tên",Resource:"Tài nguyên",Start:"Bắt đầu",End:"Kết thúc",Save:"Lưu",Delete:"Xóa",Cancel:"Hủy bỏ","Edit event":"Chỉnh sửa sự kiện",Repeat:"Lặp lại"},EventDrag:{eventOverlapsExisting:"Sự kiện chồng chéo sự kiện hiện có cho tài nguyên này",noDropOutsideTimeline:"Sự kiện không thể bị bỏ hoàn toàn ngoài dòng thời gian"},SchedulerBase:{"Add event":"Thêm sự kiện","Delete event":"Xóa sự kiện","Unassign event":"Bỏ chỉ định sự kiện",color:"Màu sắc"},TimeAxisHeaderMenu:{pickZoomLevel:"Thu phóng",activeDateRange:"Phạm vi ngày",startText:"Ngày bắt đầu",endText:"Ngày kết thúc",todayText:"Hôm nay"},EventCopyPaste:{copyEvent:"Sao chép sự kiện",cutEvent:"Cắt sự kiện",pasteEvent:"Dán sự kiện"},EventFilter:{filterEvents:"Lọc nhiệm vụ",byName:"Theo tên"},TimeRanges:{showCurrentTimeLine:"Hiển thị dòng thời gian hiện tại"},PresetManager:{secondAndMinute:{displayDateFormat:"ll LTS",name:"giây"},minuteAndHour:{topDateFormat:"ddd DD/MM, H",displayDateFormat:"ll LST"},hourAndDay:{topDateFormat:"ddd DD/MM",middleDateFormat:"LST",displayDateFormat:"ll LST",name:"Ngày"},day:{name:"Ngày/giờ"},week:{name:"Tuần/giờ"},dayAndWeek:{displayDateFormat:"ll LST",name:"Tuần/ngày"},dayAndMonth:{name:"Tháng"},weekAndDay:{displayDateFormat:"ll LST",name:"Tuần"},weekAndMonth:{name:"Tuần"},weekAndDayLetter:{name:"Tuần/ngày trong tuần"},weekDateAndMonth:{name:"Tháng/tuần"},monthAndYear:{name:"Tháng"},year:{name:"Năm"},manyYears:{name:"Năm"}},RecurrenceConfirmationPopup:{"delete-title":"Bạn đang xóa một sự kiện","delete-all-message":"Bạn có muốn xóa tất cả các lần xuất hiện của sự kiện này không?","delete-further-message":"Bạn có muốn xóa sự kiện này và tất cả các lần xuất hiện trong tương lai của sự kiện này hay chỉ sự kiện đã chọn?","delete-only-this-message":"Bạn có muốn xóa sự kiện này không?","delete-further-btn-text":"Xóa tất cả các sự kiện trong tương la","delete-only-this-btn-text":"Chỉ xóa sự kiện này","update-title":"Bạn đang thay đổi một sự kiện lặp lại","update-all-message":"Bạn có muốn thay đổi tất cả các lần xuất hiện của sự kiện này không?","update-further-message":"Bạn chỉ muốn thay đổi lần xuất hiện này của sự kiện hay lần này và tất cả các lần xuất hiện trong tương lai?","update-only-this-message":"Bạn có muốn thay đổi sự kiện này không?","update-further-btn-text":"Tất cả các sự kiện trong tương lai","update-only-this-btn-text":"Chỉ Sự kiện này",Yes:"Có",Cancel:"Hủy bỏ",width:600},RecurrenceLegend:{" and ":" và ",Daily:"Hằng ngày","Weekly on {1}":({days:e})=>`Hằng tuần vào ngày ${e}`,"Monthly on {1}":({days:e})=>`Hằng tháng vào tháng ${e}`,"Yearly on {1} of {2}":({days:e,months:n})=>`Hằng nằm vào năm ${e} của ${n}`,"Every {0} days":({interval:e})=>`Mỗi ${e} ngày`,"Every {0} weeks on {1}":({interval:e,days:n})=>`Mỗi ${e} tuần vào ngày ${n}`,"Every {0} months on {1}":({interval:e,days:n})=>`Mỗi ${e} tháng vào ngày ${n}`,"Every {0} years on {1} of {2}":({interval:e,days:n,months:t})=>`Mỗi ${e} năm vào ngày ${n} của tháng ${t}`,position1:"thứ nhất",position2:"thứ hai",position3:"thứ ba",position4:"thứ tư",position5:"thứ năm","position-1":"cuối cùng",day:"ngày",weekday:"ngày trong tuần","weekend day":"ngày cuối tuần",daysFormat:({position:e,days:n})=>`${e} ${n}`},RecurrenceEditor:{"Repeat event":"Lặp lại sự kiện",Cancel:"Hủy bỏ",Save:"Lưu",Frequency:"Tần suất",Every:"Mỗi",DAILYintervalUnit:"ngày",WEEKLYintervalUnit:"tuần",MONTHLYintervalUnit:"tháng",YEARLYintervalUnit:"năm",Each:"Mỗi",on:"Vào",the:"Vào","On the":"Vào","End repeat":"Kết thúc lặp lại","time(s)":"lần",Days:"Ngày",Months:"Tháng"},RecurrenceDaysCombo:{day:"ngày",weekday:"ngày trong tuần","weekend day":"ngày cuối tuần"},RecurrencePositionsCombo:{position1:"thứ nhất",position2:"thứ hai",position3:"thứ ba",position4:"thứ tư",position5:"thứ năm","position-1":"cuối cùng"},RecurrenceStopConditionCombo:{Never:"Không bao giờ",After:"Sau","On date":"Vào ngày"},RecurrenceFrequencyCombo:{None:"Không lặp lại",Daily:"Hằng ngày",Weekly:"Hằng tuần",Monthly:"Hằng tháng",Yearly:"Hằng năm"},RecurrenceCombo:{None:"Không",Custom:"Tùy chỉnh..."},Summary:{"Summary for":e=>`Tóm tắt cho ngày ${e}`},ScheduleRangeCombo:{completeview:"Hoàn thành lịch trình",currentview:"Lịch trình hiển thị",daterange:"Phạm vi ngày",completedata:"Toàn bộ lịch trình (cho tất cả các sự kiện)"},SchedulerExportDialog:{"Schedule range":"Phạm vi lịch trình","Export from":"Xuất từ","Export to":"Xuất đến"},ExcelExporter:{"No resource assigned":"Không có tài nguyên nào được chỉ định"},CrudManagerView:{serverResponseLabel:"Phản hồi của máy chủ:"},DurationColumn:{Duration:"Thời hạn"}},F=s.publishLocale(S),w={localeName:"Vi",localeDesc:"Tiếng Việt",localeCode:"vi",EventEdit:{Calendar:"Lịch","All day":"Cả ngày",day:"Ngày",week:"Tuần",month:"Tháng",year:"Năm",decade:"Thập kỷ"},EventMenu:{duplicateEvent:"Sự kiện lặp lại",copy:"sao chép"},Calendar:{toggleSidebar:"Chuyển đổi tính hiển thị của thanh bên",Today:"Hôm nay",Tomorrow:"Ngày mai",next:e=>`Sau ${e}`,previous:e=>`Trước ${e}`,plusMore:e=>`+ thêm ${e} `,allDay:"Cả ngày",endsOn:e=>`Kết thúc vào ngày ${e}`,weekOfYear:([e,n])=>`Tuần trong năm${n}, ${e}`,loadFail:"Tải dữ liệu lịch không thành công. Vui lòng liên hệ với quản trị hệ thống của quý vị"},CalendarDrag:{holdCtrlForRecurrence:"Giữ nút CTRL cho một sự kiện lặp lại"},CalendarMixin:{eventCount:e=>`${e||"không"} sự kiện`},EventTip:{"Edit event":"Chỉnh sửa sự kiện",timeFormat:"LST"},ModeSelector:{includeWeekends:"Bao gồm những ngày cuối tuần",weekends:"Những ngày cuối tuần"},AgendaView:{Agenda:"Lịch trình"},MonthView:{Month:"Tháng",monthUnit:"Đơn vị tháng"},WeekView:{weekUnit:"Đơn vị tuần"},YearView:{Year:"Năm",yearUnit:"Đơn vị năm",noEvents:"Không có sự kiện"},EventList:{List:"Danh sách",Start:"Bắt đầu",Finish:"Kết thúc",days:e=>`${e} ngày`},DayView:{Day:"Ngày",dayUnit:"Đơn vị ngày",daysUnit:"Đơn vị ngày",expandAllDayRow:"Mở rộng phần cả ngày",collapseAllDayRow:"Thu gọn phần cả ngày",timeFormat:"LST",timeAxisTimeFormat:"LST",noMatchingDates:"Không có ngày phù hợp"},DayAgendaView:{dayAgenda:"Lịch trình trong ngày"},DayResourceView:{dayResourceView:"Nguồn tài nguyên hàng ngày"},Sidebar:{"Filter events":"Lọc sự kiện"},WeekExpander:{expandTip:"Nhấp để mở rộng hàng",collapseTip:"Nhấp để thu gọn hàng"}},E=s.publishLocale(w);if(typeof r.exports=="object"&&typeof c=="object"){var N=(e,n,t,i)=>{if(n&&typeof n=="object"||typeof n=="function")for(let a of Object.getOwnPropertyNames(n))!Object.prototype.hasOwnProperty.call(e,a)&&a!==t&&Object.defineProperty(e,a,{get:()=>n[a],enumerable:!(i=Object.getOwnPropertyDescriptor(n,a))||i.enumerable});return e};r.exports=N(r.exports,c)}return r.exports});