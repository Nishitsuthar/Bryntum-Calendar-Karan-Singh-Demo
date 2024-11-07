/* globals bryntum: true */
import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
import CALENDAR from "@salesforce/resourceUrl/bryntum_calendar";
import { RESOURCES, EVENTS, myObj1 } from "./data/data";
import calendarDataApex from "@salesforce/apex/BryntumCalendarController.getProjectTaskRecords";
import { NavigationMixin } from 'lightning/navigation';
import searchTaskWithScheduleId from "@salesforce/apex/BryntumCalendarController.searchProjectTaskRecordsBySchedule";
import { createDataForCalendar, initialDataForVendorSearchFilter, initialDataForScheduleSearchFilter, filterVendorOnProjectSelection, filterResourceByVendor, getListOfResourceIds, getUpdatedListForVendorFilter } from "./calendar_helper";

export default class Calendar_component extends NavigationMixin(LightningElement) {

    globalCollectionForCalendarData;
    @track scheduleDataForSearchFilter;
    @track vendorDataForSearchFilter;
    @track globalProjectCombo;
    @track globalVendorCombo;
    @track dataLoaded = false;
    @track selectedResourcesList;

    connectedCallback() {
        this.getCalendarDataFromServcer();
    }

    async getCalendarDataFromServcer() {
        const response = await calendarDataApex();
        if (response.message === 'Success') {
            this.globalCollectionForCalendarData = createDataForCalendar(response.projectTasks);
            this.scheduleDataForSearchFilter = initialDataForScheduleSearchFilter(response.schedulesGroupByProjects);
            this.vendorDataForSearchFilter = initialDataForVendorSearchFilter(response.vendorListWithResources);
            this.selectedResourcesList = getListOfResourceIds(this.globalCollectionForCalendarData.RESOURCES);
            this.dataLoaded = true;
            console.log('calendar data :', this.globalCollectionForCalendarData);
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
                this.ShowToastEvent("Error loading Bryntum Calendar", error, "error");
            });
    }

    createCalendar(byPassCombo) {
        let DateHelper = bryntum.calendar.DateHelper;

        if (!byPassCombo) {
            this.createProjectSelectionCombo();
        }

        let combo2 = this.globalVendorCombo;

        let localResourceIds = this.selectedResourcesList;

        window.calendar = new bryntum.calendar.Calendar({
            appendTo: this.template.querySelector('.container'),

            disableNonWorkingDays: true,

            // Start life looking at this date
            date: new Date(),

            project: {
                events: this.globalCollectionForCalendarData?.EVENTS,
                resources: this.globalCollectionForCalendarData?.RESOURCES
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

            tbar: {
                items: {
                    // Description between the prev and next buttons
                    viewDescription: {
                        weight: 350
                    },
                    filterByName: {
                        type: 'textfield',
                        weight: 650,
                        icon: 'b-fa b-fa-filter',
                        placeholder: 'Find tasks by name',
                        clearable: true,
                        keyStrokeChangeDelay: 100,
                        triggers: {
                            filter: {
                                align: 'start',
                                cls: 'b-fa b-fa-filter'
                            }
                        },

                        // "up." means look in ownership tree. Will be found on the Calendar
                        onChange: 'up.onNameFilterChange'
                    },
                }
            },

            sidebar: {
                items: {
                    datePicker: {
                        hidden: true
                    },
                    eventFilter: false,
                    resourceFilter: {
                        // Initially select resource IDs 2, 3 and 4
                        selected: localResourceIds,
                        selectAllItem: true
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

            onNameFilterChange({ value }) {
                // We filter using a RegExp, so quote significant characters
                value = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                // A filter with an id replaces any previous filter with that id.
                // Leave any other filters which may be in use in place.
                calendar.eventStore.filter({
                    id: 'eventNameFilter',
                    filterBy: event => event.name.match(new RegExp(value, 'i'))
                });
            },

            onProjectSelected({ record }) {
                // this.gantt.project.load(record.url);
            },

            onActiveItemChange({ activeItem }) {
                this.syncResourceFilter({ source: activeItem });
            },

            onDateChange() {
                this.syncResourceFilter({ source: this.activeView });
            },

            onBeforePrint() {
                this.syncResourceFilter({ source: this.activeView });
            },

            onViewPaint({ firstPaint }) {
                if (firstPaint) {
                    this.syncResourceFilter({ source: this.activeView });
                }
            },

            onDataChange({ project, store, action, record, records, changes }) {
                if (action != 'filter') {
                    this.syncResourceFilter({ source: this.activeView });
                }
            },

            syncResourceFilter({ source: activeView }) {
                try {
                    let resourceFilter = this.widgetMap.resourceFilter;
                    resourceFilter.selected = localResourceIds;

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

                        combo2.items = getUpdatedListForVendorFilter(visibleEvents);

                        if (assignedResources.size == 0) {
                            resourceFilter.selectAllItem = false;
                        } else if (assignedResources.size > 0 && !resourceFilter.selectAllItem) {
                            resourceFilter.selectAllItem = true;
                        }

                        // Filter the resourceFilter's store to only show resources
                        // which have visible events
                        resourceFilter.store.filter({
                            id: 'assignedResourceFilter',
                            filterBy: r => assignedResources.has(r)
                        });
                    }
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
            let selectedVendorIds;

            let projectCombo = new bryntum.calendar.Combo({
                appendTo: this.template.querySelector('.combo-container-1'),
                width: '100%',
                multiSelect: true,
                cls: 'foodmenu-combo',
                style: 'min-width: 38em;',
                label: 'Select Project Schedules',
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

            new bryntum.calendar.Button({
                appendTo: this.template.querySelector('.search-btn-1'),
                icon: 'b-fa-search',
                cls: 'b-raised',
                text: 'Search',
                color: 'b-blue',
                onClick: () => {
                    let Mask = bryntum.calendar.Mask;
                    Mask.mask({
                        target: this.template.querySelector('.container'),
                        text: 'Searching...',
                        mode: 'dark-blur'
                    });

                    if (vendorCombo.value) {
                        vendorCombo.value = [];
                    }

                    console.log('scheduleIds before apex :', scheduleIds);
                    this.handlerSearchTaskWithScheduleId(scheduleIds);
                }
            });

            let vendorCombo = new bryntum.calendar.Combo({
                appendTo: this.template.querySelector('.combo-container-2'),
                width: '100%',
                multiSelect: true,
                style: 'min-width: 34em;',
                label: 'Select Vendor',
                items: this.vendorDataForSearchFilter,
                listeners: {
                    select(event) {
                        selectedVendorIds = event.record.map(record => record.id);
                    }
                },
            });

            this.globalVendorCombo = vendorCombo;

            new bryntum.calendar.Button({
                appendTo: this.template.querySelector('.search-btn-2'),
                icon: 'b-fa-search',
                cls: 'b-raised',
                text: 'Search',
                color: 'b-blue',
                onClick: () => {
                    try {
                        let Mask = bryntum.calendar.Mask;
                        if (selectedVendorIds?.length > 0) {
                            Mask.mask({
                                target: this.template.querySelector('.container'),
                                text: 'Searching...',
                                mode: 'dark-blur'
                            });
                            this.handleResourceFilteringWithVendorId(selectedVendorIds);
                        } else {
                            Mask.mask({
                                target: this.template.querySelector('.container'),
                                text: 'Searching...',
                                mode: 'dark-blur'
                            });
                            this.handlerSearchTaskWithScheduleId(scheduleIds);
                        }
                    } catch (error) {
                        console.log('Error in search vendor button:', error);
                    }
                }
            });

        } catch (error) {
            console.log('Error in createProjectSelectionCombo:', error);
        }
    }

    async handlerSearchTaskWithScheduleId(selectedIdsOfSchedule) {
        try {
            let responseFromServer = await searchTaskWithScheduleId({ scheduleIdList: selectedIdsOfSchedule })
            console.log('responseFromServer:', responseFromServer);
            let filteredData = createDataForCalendar(responseFromServer.projectTasks);
            console.log('filteredData search Project :', filteredData);
            let updatedVendorDataForSearchFilter = filterVendorOnProjectSelection(responseFromServer.filteredVendorListBySchedule);
            this.globalVendorCombo.items = updatedVendorDataForSearchFilter;
            window.calendar.project.events = filteredData.EVENTS;
            window.calendar.project.resources = filteredData.RESOURCES;
            this.globalCollectionForCalendarData = filteredData;
            bryntum.calendar.Mask.unmask(this.template.querySelector('.container'));
        } catch (error) {
            bryntum.calendar.Mask.unmask(this.template.querySelector('.container'));
            bryntum.calendar.Toast.show('Something went wrong');
            console.log('Error in handlerSearchTaskWithScheduleId:', error);
        }
    }

    handleResourceFilteringWithVendorId(vendorIds) {
        let vendorFilteredData = filterResourceByVendor(vendorIds, this.globalCollectionForCalendarData);
        window.calendar.project.resources = vendorFilteredData.RESOURCES;
        window.calendar.project.events = vendorFilteredData.EVENTS;
        bryntum.calendar.Mask.unmask(this.template.querySelector('.container'));
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