/* globals bryntum: true */
import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
import CALENDAR from "@salesforce/resourceUrl/bryntum_calendar";
import { RESOURCES, EVENTS, ASSIGNMENTS } from "./data/data";
import calendarDataApex from "@salesforce/apex/BryntumCalendarController.getProjectTaskRecords";
import { NavigationMixin } from 'lightning/navigation';
import searchTaskWithScheduleId from "@salesforce/apex/BryntumCalendarController.searchProjectTaskRecordsBySchedule";
import { createDataForCalendar, initialDataForVendorSearchFilter, initialDataForPhaseSearchFilter, initialDataForTaskSearchFilter, initialDataForScheduleSearchFilter, filterVendorOnProjectSelection, filterResourceByVendor, filterResourceByPhase, filterResourceByTaskName, getListOfResourceIds, getUpdatedListForVendorFilter, getUpdatedListForTaskFilter } from "./calendar_helper";

export default class Calendar_component extends NavigationMixin(LightningElement) {

    @track globalCollectionForCalendarData;
    @track scheduleDataForSearchFilter;
    @track phaseDataForSearchFilter;
    @track taskDataForSearchFilter;
    @track vendorDataForSearchFilter;
    @track globalProjectCombo;
    @track globalPhaseCombo;
    @track globalVendorCombo;
    @track globalTaskCombo;
    @track dataLoaded = false;
    @track selectedResourcesList;
    @track assignments;
    @track isReset = false;
    @track selectedTaskIds = [];
    @track globalbutton1;
    @track globalbutton2;

    connectedCallback() {
        this.getCalendarDataFromServcer();
    }

    async getCalendarDataFromServcer() {
        const response = await calendarDataApex();
        if (response.message === 'Success') {
            this.globalCollectionForCalendarData = createDataForCalendar(response.projectTasks);
            this.scheduleDataForSearchFilter = initialDataForScheduleSearchFilter(response.schedulesGroupByProjects);
            this.phaseDataForSearchFilter = initialDataForPhaseSearchFilter(response.phaseListValueFromScheduleItemMap);
            this.taskDataForSearchFilter = initialDataForTaskSearchFilter(response.taskListValueFromScheduleItem);
            this.vendorDataForSearchFilter = initialDataForVendorSearchFilter(response.vendorListWithResources);
            this.selectedResourcesList = getListOfResourceIds(this.globalCollectionForCalendarData.RESOURCES);
            this.dataLoaded = true;
            // this.orginaldata = {...this.globalCollectionForCalendarData};
            // console.log('This IS ORIGINAL DATA'+this.orginaldata);
            
            console.log('calendar data :', this.globalCollectionForCalendarData);
            console.log(response.taskListValueFromScheduleItem);
            
            console.log('THIS IS TASK DATA:', this.taskDataForSearchFilter);
            
        } else {
            console.error('Error in getting data from server:', response.error);
            this.ShowToastEvent("Error in getting data from server", response.error, "error");
        }
    }

    renderedCallback() {
        this.initializeBryntumCalendar();
    }

    initializeBryntumCalendar() {

        if (this.bryntumInitialized || !this.dataLoaded) {
            return;
        }
        this.bryntumInitialized = true;

        Promise.all([
            loadScript(this, CALENDAR + "/calendar.lwc.module.js"),
            loadStyle(this, CALENDAR + "/calendar.stockholm.css")
        ])
            .then(() => {
                console.log(`Bryntum Core version: ${bryntum.getVersion('core')}`);
                console.log('bryntum calendar ', bryntum.calendar);
                this.createCalendar(false);
            })
            .catch(error => {
                console.log('Error loading Bryntum Calendar:', error);
                let e = error;
                console.log('error encounter ',JSON.parse(JSON.stringify(e)));
                
                this.ShowToastEvent("Error loading Bryntum Calendar", error, "error");
            });
    }

    createCalendar(byPassCombo) {
        let DateHelper = bryntum.calendar.DateHelper;

        if (!byPassCombo) {
            this.createProjectSelectionCombo();
        }

        let combo2 = this.globalVendorCombo;
        let combo3 = this.globalTaskCombo;

        console.log('this is this.selectedResourcesList',this.selectedResourcesList);
        let localResourceIds = getListOfResourceIds(this.globalCollectionForCalendarData.RESOURCES);
        
        

        // console.log('EVENTS & RESOURCES:',JSON.parse(JSON.stringify(EVENTS)) , JSON.parse(JSON.stringify(RESOURCES)));
        // console.log('Global Collection for calendar',this.globalCollectionForCalendarData);
        // console.log('ASSIGNMENTS:', JSON.parse(JSON.stringify(ASSIGNMENTS)));
        
        this.orginaldata = {...this.globalCollectionForCalendarData}
        var that = this;

        window.calendar = new bryntum.calendar.Calendar({
            appendTo: this.template.querySelector('.container'),

            disableNonWorkingDays: true,

            // Start life looking at this date
            date: new Date(),

            project: {
                events: this.globalCollectionForCalendarData?.EVENTS,
                // events: EVENTS,
                resources: this.globalCollectionForCalendarData?.RESOURCES,
                // resources: RESOURCES,
                assignments: this.globalCollectionForCalendarData?.ASSIGNMENTS
                // assignments: ASSIGNMENTS

            },

            mode: 'month',

            modes: {
                year: null,
                month: {
                    eventRenderer({ eventRecord, renderData }) {
                        renderData.cls = `taskColorCls`;
                    }
                },
                week: {
                    eventRenderer({ eventRecord, renderData }) {
                        renderData.cls = `taskColorCls`;
                    }
                },
                day: {
                    eventRenderer({ eventRecord, renderData }) {
                        renderData.cls = `taskColorCls`;
                    }
                },
                agenda: {
                    sortEvents(events) {
                        return events.sort((e1, e2) => {
                            const projectNameComparison = e1.proj.localeCompare(e2.proj);

                            if (projectNameComparison === 0) {
                                return e1.contractorName.localeCompare(e2.contractorName);
                            }

                            return projectNameComparison;
                        });
                    }
                }
            },

            // Features named by the properties are included.
            // An object is used to configure the feature.
            features: {
                eventMenu: {
                    items: {
                        deleteEvent: false,
                        editEvent: false,
                        duplicate: false,
                    }
                },
                eventTooltip: {
                    showOn: 'hover',
                    renderer({ eventRecord }) {
                        let eDateToShow = new Date(eventRecord.endDate);

                        Date.prototype.subtractDays = function (d) {
                            this.setTime(this.getTime() - (d * 24 * 60 * 60 * 1000));
                            return this;
                        }

                        eDateToShow = eDateToShow.subtractDays(1);

                        return {
                            children: [{
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '8em 1fr'
                                },
                                children: ['Start :', {
                                    text: DateHelper.format(eventRecord.startDate, 'DD MMMM YYYY')
                                }]
                            }, {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '8em 1fr'
                                },
                                children: ['Finish :', {
                                    text: DateHelper.format(eDateToShow, 'DD MMMM YYYY')
                                }]
                            }, {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '8em 1fr'
                                },
                                children: ['Project :', {
                                    text: eventRecord.proj
                                }]
                            }, {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '8em 1fr'
                                },
                                children: ['Dependency :', {
                                    text: eventRecord.dependency
                                }]
                            }, {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '8em 1fr'
                                },
                                children: ['Completion(%) :', {
                                    text: eventRecord.completed
                                }]
                            }, {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '8em 1fr'
                                },
                                children: ['Vendor :', {
                                    text: eventRecord.contractorName
                                }]
                            }, {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '8em 1fr'
                                },
                                children: ['Resource :', {
                                    text: eventRecord.resourceName
                                }]
                            }, {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '8em 1fr'
                                },
                                children: ['Duration :', {
                                    text: eventRecord.taskDuration + ' days'
                                }]
                            }]
                        };
                    },
                    align: 'l-r'
                },
                eventEdit: {
                    readOnly: true,
                }
            },

            modeDefaults: {
                hideNonWorkingDays: false,
                eventHeight: 24,
                autoRowHeight: true,
                maxEventsPerCell: 7
            },

            // tbar: {
            //     items: {
            //         // Description between the prev and next buttons
            //         viewDescription: {
            //             weight: 350
            //         },
            //         filterByName: {
            //             type: 'combo',
            //             width: 300,
            //             items: this.taskDataForSearchFilter,
            //             weight: 650,
            //             icon: 'b-fa b-fa-filter',
            //             placeholder: 'Find tasks by name',
            //             clearable: true,
            //             multiSelect: true,  // Enable multi-selection
            //             keyStrokeChangeDelay: 100,
            //             displayField: 'text',
            //             valueField: 'value',
            //             // eventValues: 'Testing Tirth',
            //             listeners: {
            //                 change : 'up.onNameFilterChange'
            //             },
            //             },
            //     }
            // },

            sidebar: {
                items: {
                    datePicker: {
                        hidden: true
                    },
                    eventFilter: false,
                    resourceFilter: {
                        // Initially select resource IDs 2, 3 and 4
                        // selected: true,
                        selected: localResourceIds,
                        store : {
                            
                            groupers : [
                                {
                                    field: 'type',
                                    ascending: false
                                },
                            ],
                            sorters : [{
                                ascending : false
                            }]
                        }
                    },
                    // This is the "ref" of the new field
                    resourceFilterFilter: {
                        // Inserts just before the resourceFilter List
                        weight: 190,

                        // Best to put rules in your own CSS: [data-ref="resourceFilterFilter"] { ... }
                        style: 'flex : 0 0 auto; margin-top: 1em',
                        placeholder: 'Filter resources',
                        type: 'textfield',
                        keyStrokeChangeDelay: 100,
                        onChange: 'up.onResourceFilterFilterChange'
                    }
                }
            },

            onResourceFilterFilterChange({ value }) {
                // A filter with an id replaces any previous filter with that id.
                // Leave any other filters which may be in use in place.
                this.widgetMap.resourceFilter.store.filter({
                    id: 'resourceFilterFilter',
                    filterBy: r => r.name.toLowerCase().startsWith(value.toLowerCase()) // a function which returns true to include the record
                });
            },



            onProjectSelected({ record }) {
                // this.gantt.project.load(record.url);
            },

            onActiveItemChange({ activeItem }) {
                this.syncResourceFilter({ source: activeItem , bool: true, initial: false });
                console.log('Active Item INVOKED');
                
            },

            onDateChange() {
                this.syncResourceFilter({ source: this.activeView , bool: true, initial: false});
                console.log('Date CHANGE INVOKED');
                
            },

            onBeforePrint() {
                this.syncResourceFilter({ source: this.activeView, bool: false, initial: false });
                console.log('Before PRINT INVOKED');
                
            },
                
            onViewPaint({ firstPaint }) {
                console.log('PAINT INVOKED');
                
                if (firstPaint) {
                    this.syncResourceFilter({ source: this.activeView, bool: false, initial: true });
                    console.log('First PAINT INVOKED');
                    
                }
            },

            onDataChange({ project, store, action, record, records, changes }) {
                if (action != 'filter') {
                    this.syncResourceFilter({ source: this.activeView, bool: false, initial: false });
                    console.log('DATA CHANGE INVOKED');
                }
                console.log('OUTSIDE DATA CHANGE INVOKED');
                
            },

            syncResourceFilter({ source: activeView, bool: datechange, initial: paint }) {
                console.log("inside syncResource filter");
                
                try {
                    let resourceFilter = this.widgetMap.resourceFilter;
                    resourceFilter.selected = localResourceIds;
                    console.log('this is widgetmap',this.widgetMap);
                    if (activeView.type == 'agendaview') {
                        that.globalbutton1.disabled = true;
                        that.globalbutton2.disabled = true;
                    }
                    else{
                        that.globalbutton1.disabled = false;
                        that.globalbutton2.disabled = false;
                    }
                    

                    if (activeView.isVisible) {
                        const
                            { allDayEvents } = activeView,
                            { resourceFilter } = this.widgetMap,
                            dayCells = [...activeView.cellMap.values()],
                            assignedResources = new Set();

                        // If it's a DayView we need to know about its all day events
                        if (allDayEvents) {
                            dayCells.splice(dayCells.length, 0, ...allDayEvents.cellMap.values());
                        }

                        // Extract events from all the cell data
                        const visibleEvents = dayCells.flatMap(c => c.events.map(e => e.eventRecord || e));

                        // Collect the Map of all assigned resources for the events
                        visibleEvents.forEach(event => {
                            event.resources.forEach(r => assignedResources.add(r));
                        });
                        console.log('HERE ARE VISIBLE EVENTS', visibleEvents);
                        console.log('HERE ARE VISIBLE RESOURCE', assignedResources);
                        console.log('check isReset ', that.isReset);

                        if(that.isReset){
                            combo3.items = getUpdatedListForTaskFilter(visibleEvents);
                            that.isReset = false;
                        }
                        
                        if(datechange){
                            // console.log('GLOBAL VENDOR', this.globalVendorCombo);
                            combo2.items = getUpdatedListForVendorFilter(visibleEvents);
                            combo3.items = getUpdatedListForTaskFilter(visibleEvents);
                            
                            if(that.selectedTaskIds.length > 0){
                                that.globalTaskCombo.disabled = true;
                            }
                        }

                        if(paint){
                            console.log('Paint Got Invoked');
                            combo2.items = getUpdatedListForVendorFilter(visibleEvents);
                            combo3.items = getUpdatedListForTaskFilter(visibleEvents);
                        }

                        if (assignedResources.size == 0) {
                            // resourceFilter.selectAllItem = false;
                        } else if (assignedResources.size > 0) {
                            console.log("Inside selectallitem");
                            
                            // resourceFilter.selectAllItem = true;
                        }

                        // Filter the resourceFilter's store to only show resources
                        // which have visible events
                        resourceFilter.store.filter({
                            id: 'assignedResourceFilter',
                            filterBy: r => assignedResources.has(r)
                        });
                        console.log('Assingned resource size is ============='+assignedResources.size);
                    }
                    console.log("outside syncResource filter");
                } catch (error) {
                    console.log('Error in syncResourceFilter:', error);
                }
            }
        });


        // Adding a listener using the "on" method
        window.calendar.on('eventClick', ({ source, domEvent, date, eventElement, eventRecord, resourceRecord, fromOverflowPopup }) => {
            let recordId = eventRecord.id;
            recordId = recordId?.split('_')[0];
            this.navigateToRecord(recordId);
        });

        calendar.on('beforeActiveItemChange', (e) => {
            if (e.activeItem.type == 'monthview' || e.activeItem.type == 'agendaview') {
                e.source.up('Calendar').sidebar.widgetMap.datePicker.hidden = true
            }
            else {
                e.source.up('Calendar').sidebar.widgetMap.datePicker.hidden = false
            }
        });
    }

    createProjectSelectionCombo() {
        try {
            let scheduleIds = [];
            let selectedVendorIds = [];
            let selectedPhaseIds = [];
            let selectedTaskIds = this.selectedTaskIds;
            let that = this;

            //* combo search for project and schedule
            let projectCombo = new bryntum.calendar.Combo({
                appendTo: this.template.querySelector('.combo-container-1'),
                width: '100%',
                multiSelect: true,
                cls: 'foodmenu-combo',
                style: 'min-width: 30em;',
                placeholder: 'Search Project Schedule',
                displayField: 'name',
                valueField: 'id',
                value: [1, 5, 9],
                listCls: 'grouped-combo',
                picker: {
                    groupHeaderTpl: (record, groupName) => `
                       <i class="b-fa-solid b-fa-helmet-safety" style="margin-right:0.8em;"></i>${groupName}
                    `
                },
                chipView: {
                    iconTpl: () => `<i class="b-fa-solid b-fa-calendar-days"></i>&nbsp;`
                },

                listItemTpl: record => `
                    <div class="b-foodmenu-item">
                        <span class="name">${record.name}</span>
                    </div>
                `,
                editable: true,
                store: {
                    fields: [
                        'type',
                        'ProjectId'
                    ],
                    groupers: [
                        { field: 'type', ascending: true }
                    ],
                    data: this.scheduleDataForSearchFilter,
                },
                listeners: {
                    select(event) {
                        scheduleIds = event.record.map(record => record.id);
                    }
                },
            });

            this.globalProjectCombo = projectCombo;

            //* combo search for vendor
            let vendorCombo = new bryntum.calendar.Combo({
                appendTo: this.template.querySelector('.combo-container-2'),
                width: '100%',
                multiSelect: true,
                style: 'min-width: 30em;',
                placeholder: 'Search Vendor',
                items: this.vendorDataForSearchFilter,
                listeners: {
                    select(event) {
                        selectedVendorIds = event.record.map(record => record.id);
                    }
                },
            });
            
            this.globalVendorCombo = vendorCombo;

            //* combo search for Phases
            let phaseCombo = new bryntum.calendar.Combo({
                appendTo: this.template.querySelector('.combo-container-phase'),
                width: '100%',
                multiSelect: true,
                style: 'min-width: 30em;',
                placeholder: 'Search Phase',
                items: this.phaseDataForSearchFilter, //!pass phase values
                listeners: {
                    select(event) {
                        selectedPhaseIds = event.record.map(record => record.id);
                    }
                },
            });

            this.globalPhaseCombo = phaseCombo;

            let Taskcombo = new bryntum.calendar.Combo({
                appendTo: this.template.querySelector('.combo-container-3'),
                width: '100%',
                multiSelect: true,
                style: 'min-width: 30em;',
                placeholder: 'Search Task',
                items: this.taskDataForSearchFilter, //!pass task values
                listeners: {
                    select(event) {
                        try {
                            selectedTaskIds = event.record.map(record => record.id);
                            that.selectedTaskIds = JSON.parse(JSON.stringify(selectedTaskIds));
                        } catch (error) {
                            console.log('Error in select event:', error);
                        }
                    }
                },
            });

            this.globalTaskCombo = Taskcombo;
            
            //* button search for project and schedule
            let button1 = new bryntum.calendar.Button({
                appendTo: this.template.querySelector('.search-btn-1'),
                icon: 'b-fa-search',
                cls: 'b-raised',
                text: 'Search',
                color: 'b-blue',
                onClick: () => {
                    try {
                        let Mask = bryntum.calendar.Mask;
                        Mask.mask({
                            target: this.template.querySelector('.container'),
                            text: 'Searching...',
                            mode: 'dark-blur'
                        });
    
                        // this.handlerSearchTaskWithScheduleId(scheduleIds);                        
                        this.handlerSearch(scheduleIds, selectedVendorIds, selectedPhaseIds, selectedTaskIds);
                    } catch (error) {
                        console.log('Error in search button click:', error);
                    }
                }
            });

            this.globalbutton1 = button1;

            let button2 = new bryntum.calendar.Button({
                appendTo: this.template.querySelector('.reset'),
                cls: 'b-raised',
                text: 'Reset',
                color: 'b-blue',
                onClick: () => {
                    let Mask = bryntum.calendar.Mask;
                    Mask.mask({
                        target: this.template.querySelector('.container'),
                        text: 'Reseting...',
                        mode: 'dark-blur'
                    });

                    this.isReset = true;
                    
                    projectCombo.value = [];
                    vendorCombo.value = [];
                    phaseCombo.value = [];
                    Taskcombo.value = [];
                    Taskcombo.disabled = false;
                    this.handlerSearch([], [], [], []);
                    console.log('GLOBAL VENDOR', this.globalVendorCombo);
                    
                }
            });

            this.globalbutton2 = button2;

        } catch (error) {
            console.log('Error in createProjectSelectionCombo:', error);
        }
    }

    async handlerSearchTaskWithScheduleId(selectedIdsOfSchedule) {
        try {
            let responseFromServer = await searchTaskWithScheduleId({ scheduleIdList: selectedIdsOfSchedule })
            console.log('responseFromServer:', responseFromServer);
            let filteredData = createDataForCalendar(responseFromServer.projectTasks);
            window.calendar.project.events = filteredData.EVENTS;
            window.calendar.project.resources = filteredData.RESOURCES;
            window.calendar.project.assignments = filteredData.ASSIGNMENTS;            
            this.globalCollectionForCalendarData = filteredData;
            console.log('filteredData search Project :', filteredData);
            let updatedVendorDataForSearchFilter = filterVendorOnProjectSelection(responseFromServer.filteredVendorListBySchedule);
            this.globalVendorCombo.items = updatedVendorDataForSearchFilter;
            console.log('This are filtered Resources', filteredData.RESOURCES);
            bryntum.calendar.Mask.unmask(this.template.querySelector('.container'));
        } catch (error) {
            bryntum.calendar.Mask.unmask(this.template.querySelector('.container'));
            bryntum.calendar.Toast.show('Something went wrong');
            console.log('Error in handlerSearchTaskWithScheduleId:', error);
        }
    }

    handlerSearch(projectScheduleIdList, vendorIdList, phaseList, taskIdList){        

        console.log('taskIdList in handlerSearch: ', JSON.parse(JSON.stringify(taskIdList)));
        

        searchTaskWithScheduleId({ scheduleIdList: projectScheduleIdList })
        .then((result) => {
            this.processSearchResult(result, vendorIdList, phaseList, taskIdList);


            //---------------------------------------DANGER------------------------------------------------


            //! DO NOT TOUCH THIS IS NECESSARY AS DATA IS NOT LOADED ON UI IN FIRST TIME

            //! NOTE: ALSO THIS IS NOT RECURSION IT IS JUST INVOKEING METHOD SECOND TIME

            searchTaskWithScheduleId({ scheduleIdList: projectScheduleIdList })
            .then((result) => {
                this.processSearchResult(result, vendorIdList, phaseList, taskIdList);
                bryntum.calendar.Mask.unmask(this.template.querySelector('.container'));

            });
        })
        .catch((error) => {
            this.ShowToastEvent("Error", error, "error");
            bryntum.calendar.Mask.unmask(this.template.querySelector('.container'));
        })
    }

    processSearchResult(result, vendorIdList, phaseList, taskIdList){
        let filteredDataList = [];
        this.globalVendorCombo.items = filterVendorOnProjectSelection(result.filteredVendorListBySchedule);
        filteredDataList = createDataForCalendar(result.projectTasks);
        if(vendorIdList.length > 0){
            filteredDataList = filterResourceByVendor(vendorIdList, filteredDataList);
        }
        
        if(phaseList.length > 0){
            filteredDataList =  filterResourceByPhase(phaseList, filteredDataList);
        }
        
        if(taskIdList.length > 0){
            filteredDataList = filterResourceByTaskName(taskIdList, filteredDataList);
        }
        
        window.calendar.project.events = filteredDataList?.EVENTS;
        window.calendar.project.resources = filteredDataList?.RESOURCES;
        window.calendar.project.assignments = filteredDataList?.ASSIGNMENTS;
        this.globalCollectionForCalendarData = filteredDataList;
    }

    handleResourceFilteringWithVendorId(vendorIds) {
        let vendorFilteredData = filterResourceByVendor(vendorIds, this.globalCollectionForCalendarData);
        console.log('vendorFilteredData:', vendorFilteredData);
        window.calendar.project.assignments = vendorFilteredData.ASSIGNMENTS;
        window.calendar.project.events = vendorFilteredData.EVENTS;
        window.calendar.project.resources = vendorFilteredData.RESOURCES;
        this.globalCollectionForCalendarData = vendorFilteredData;
        bryntum.calendar.Mask.unmask(this.template.querySelector('.container'));
    }

    handleResourceFilteringWithPhases(phaseNames) {
        let phaseFilteredData = filterResourceByPhase(phaseNames, this.globalCollectionForCalendarData);
        console.log('phaseFilteredData:', phaseFilteredData);
        window.calendar.project.assignments = phaseFilteredData.ASSIGNMENTS;
        window.calendar.project.events = phaseFilteredData.EVENTS;
        window.calendar.project.resources = phaseFilteredData.RESOURCES;
        this.globalCollectionForCalendarData = phaseFilteredData;
        bryntum.calendar.Mask.unmask(this.template.querySelector('.container'));
    }

    handleTaskFilter(taskIds) {
        console.log('FILTERING TASK STARTED', this.value);
        let tasksName = [];
        tasksName = taskIds;
        console.log("filter implemented", tasksName);
        let taskFilteredData = filterResourceByTaskName(tasksName, this.globalCollectionForCalendarData);
        console.log('taskFilteredData:', taskFilteredData);
        window.calendar.project.assignments = taskFilteredData.ASSIGNMENTS;
        window.calendar.project.events = taskFilteredData.EVENTS;
        window.calendar.project.resources = taskFilteredData.RESOURCES;
        bryntum.calendar.Mask.unmask(this.template.querySelector('.container'));
        console.log('FILTERING TASK COMPLETED');
        console.log('filter implementation completed');
    }

    navigateToRecord(recordId) {

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: 'view'
            }
        });
    }

    ShowToastEvent(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
}