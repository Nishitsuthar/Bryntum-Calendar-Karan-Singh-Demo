/* globals bryntum: true */
import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
import CALENDAR from "@salesforce/resourceUrl/bryntum_calendar";
import { RESOURCES, EVENTS } from "./data/data";
import calendarDataApex from "@salesforce/apex/BryntumCalendarControllerKaran.getProjectTaskRecords";
import { createDataForCalendar, initialDataForSearchFilter } from "./calendar_helper_karan";

export default class Calendar_component_karan extends LightningElement {

    globalCollectionForCalendarData;
    @track scheduleDataForSearchFilter;
    @track selectedScheduleIds = ['a2zDm0000004bPuIAI'];

    @api recordId = ['a2zDm0000004bPuIAI'];

    async connectedCallback() {
        await this.getCalendarDataFromServcer();
    }

    async getCalendarDataFromServcer() {
        const response = await calendarDataApex({ scheduleIdList: this.selectedScheduleIds });
        if (response.message === 'Success') {
            this.globalCollectionForCalendarData = createDataForCalendar(response.projectTasks);
            this.scheduleDataForSearchFilter = initialDataForSearchFilter(response.schedulesGroupByProjects);
            console.log('calendar data :', this.globalCollectionForCalendarData);
        } else {
            console.error('Error in getting data from server:', response.error);
            this.ShowToastEvent("Error in getting data from server", response.error, "error");
        }
    }

    renderedCallback() {

        if (this.bryntumInitialized) {
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
        let events = this.globalCollectionForCalendarData.EVENTS;
        let resources = this.globalCollectionForCalendarData.RESOURCES;
        let DateHelper = bryntum.calendar.DateHelper;

        console.log('date:', this.globalCollectionForCalendarData.calendarStartDate);

        if (!byPassCombo) {
            this.createProjectSelectionCombo();
        }

        window.calendar = new bryntum.calendar.Calendar({
            appendTo: this.template.querySelector('.container'),

            disableNonWorkingDays: true,

            // Start life looking at this date
            date: new Date(this.globalCollectionForCalendarData.calendarStartDate ? this.globalCollectionForCalendarData.calendarStartDate : new Date()),

            eventStore: {
                data: events
            },
            resourceStore: {
                data: resources
            },

            // Features named by the properties are included.
            // An object is used to configure the feature.
            features: {
                eventTooltip: {
                    showOn: 'hover',
                    renderer({ eventRecord }) {
                        console.log('eventRecord:', eventRecord);
                        return {
                            children: [{
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '4em 1fr'
                                },
                                children: ['From', {
                                    text: DateHelper.format(eventRecord.startDate, 'DD MMMM YYYY')
                                }]
                            }, {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '4em 1fr'
                                },
                                children: ['To', {
                                    text: DateHelper.format(eventRecord.endDate, 'DD MMMM YYYY')
                                }]
                            }]
                        };
                    },
                    align: 'l-r'
                }
            },

            modeDefaults: {
                hideNonWorkingDays: true
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
            }
        });
    }

    createProjectSelectionCombo() {
        try {
            new bryntum.calendar.Combo({
                appendTo: this.template.querySelector('.combo-container'),
                width: '100%',
                multiSelect: true,
                cls: 'foodmenu-combo',
                style: 'min-width: 45em;',
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
                    fields : [
                        'type',
                        'ProjectId'
                    ],
                    groupers: [
                        { field: 'type', ascending: true }
                    ],
                    data: this.scheduleDataForSearchFilter,
                },
                listeners : {
                    select(event) {
                        this.selectedScheduleIds = event.record.map(record => record.id);
                    }
                },
            });


            new bryntum.calendar.Button({
                appendTo: this.template.querySelector('.search-btn-1'),
                icon: 'b-fa-search',
                cls: 'b-raised',
                text: 'Search',
                color: 'b-blue',
                onClick: () => {
                    console.log('Add button clicked');
                    let that = this;
                    that.getCalendarDataFromServcer();
                    // that.createCalendar(true);
                }
            });
        } catch (error) {
            console.log('Error in createProjectSelectionCombo:', error);
        }
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