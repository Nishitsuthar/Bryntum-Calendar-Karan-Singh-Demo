export function createDataForCalendar(listOfApexData) {
    let calendar = {};
    let EVENTS = [];
    let RESOURCES = [];
    const resourceMap = new Map();

    listOfApexData.forEach(task => {
        let isTaskWithoutResource = true;
        if (task.buildertek__Contractor_Resource_1__c) {
            isTaskWithoutResource = false;
            if (!resourceMap.has(task.buildertek__Contractor_Resource_1__c)) {
                let color = getNextColor();
                resourceMap.set(task.buildertek__Contractor_Resource_1__c, color);
                let resObj1 = getResourceObject(task.buildertek__Contractor_Resource_1__r, color, task.buildertek__Contractor__c);
                RESOURCES.push(resObj1);
            }
            let obj1 = getTaskObject(task, task.buildertek__Contractor_Resource_1__c, resourceMap, task.buildertek__Contractor_Resource_1__r.Name);
            EVENTS.push(obj1);
        }

        if (task.buildertek__Contractor_Resource_2__c) {
            isTaskWithoutResource = false;
            if (!resourceMap.has(task.buildertek__Contractor_Resource_2__c)) {
                let color = getNextColor();
                resourceMap.set(task.buildertek__Contractor_Resource_2__c, color);
                let resObj2 = getResourceObject(task.buildertek__Contractor_Resource_2__r, color, task.buildertek__Contractor__c);
                RESOURCES.push(resObj2);
            }
            let obj2 = getTaskObject(task, task.buildertek__Contractor_Resource_2__c, resourceMap, task.buildertek__Contractor_Resource_2__r.Name);
            EVENTS.push(obj2);
        }

        if (task.buildertek__Contractor_Resource_3__c) {
            isTaskWithoutResource = false;
            if (!resourceMap.has(task.buildertek__Contractor_Resource_3__c)) {
                let color = getNextColor();
                resourceMap.set(task.buildertek__Contractor_Resource_3__c, color);
                let resObj3 = getResourceObject(task.buildertek__Contractor_Resource_3__r, color, task.buildertek__Contractor__c);
                RESOURCES.push(resObj3);
            }
            let obj3 = getTaskObject(task, task.buildertek__Contractor_Resource_3__c, resourceMap, task.buildertek__Contractor_Resource_3__r.Name);
            EVENTS.push(obj3);
        }

        if (task.buildertek__Internal_Resource_1__c) {
            isTaskWithoutResource = false;
            if (!resourceMap.has(task.buildertek__Internal_Resource_1__c)) {
                let color = getNextColor();
                resourceMap.set(task.buildertek__Internal_Resource_1__c, color);
                let resObj4 = getResourceObject(task.buildertek__Internal_Resource_1__r, color, task.buildertek__Contractor__c);
                RESOURCES.push(resObj4);
            }
            let obj4 = getTaskObject(task, task.buildertek__Internal_Resource_1__c, resourceMap, task.buildertek__Internal_Resource_1__r.Name);
            EVENTS.push(obj4);
        }

        if (task.buildertek__Internal_Resource_3__c) {
            isTaskWithoutResource = false;
            if (!resourceMap.has(task.buildertek__Internal_Resource_3__c)) {
                let color = getNextColor();
                resourceMap.set(task.buildertek__Internal_Resource_3__c, color);
                let resObj5 = getResourceObject(task.buildertek__Internal_Resource_3__r, color, task.buildertek__Contractor__c);
                RESOURCES.push(resObj5);
            }
            let obj5 = getTaskObject(task, task.buildertek__Internal_Resource_3__c, resourceMap, task.buildertek__Internal_Resource_3__r.Name);
            EVENTS.push(obj5);
        }

        if (task.buildertek__Internal_Resource_4__c) {
            isTaskWithoutResource = false;
            if (!resourceMap.has(task.buildertek__Internal_Resource_4__c)) {
                let color = getNextColor();
                resourceMap.set(task.buildertek__Internal_Resource_4__c, color);
                let resObj6 = getResourceObject(task.buildertek__Internal_Resource_4__r, color, task.buildertek__Contractor__c);
                RESOURCES.push(resObj6);
            }
            let obj6 = getTaskObject(task, task.buildertek__Internal_Resource_4__c, resourceMap, task.buildertek__Internal_Resource_4__r.Name);
            EVENTS.push(obj6);
        }

        if (isTaskWithoutResource) {
            let obj1 = getTaskObject(task, null, resourceMap, undefined);
            EVENTS.push(obj1);
        }

    });

    calendar['RESOURCES'] = RESOURCES;
    calendar['EVENTS'] = EVENTS;
    calendar['calendarStartDate'] = listOfApexData[0]?.buildertek__Start__c;

    return calendar;
}

function getTaskObject(task, resourceId, resourceColorMap, resourceName) {
    let sDate = new Date(task.buildertek__Start__c + 'Z');
    let eDate = new Date(task.buildertek__Finish__c + 'Z');
    eDate.setDate(eDate.getDate() + 1);

    sDate = sDate.toISOString();
    eDate = eDate.toISOString();
    sDate = sDate.substring(0, sDate.length - 5);
    eDate = eDate.substring(0, eDate.length - 5);

    let projName = task.buildertek__Schedule__r.buildertek__Project__c ? task.buildertek__Schedule__r.buildertek__Project__r.Name : 'No Project';
    let vendorName = task.buildertek__Contractor__c ? task.buildertek__Contractor__r.Name : 'No Vendor';
    return {
        "id": task.Id + '_' + resourceId,
        "proj": projName,
        "contractorName": vendorName,
        "name": task.Name + ' - ' + projName + ' - ' + vendorName,
        "startDate": sDate,
        "endDate": eDate,
        "taskDuration": task.buildertek__Duration__c,
        "resourceId": resourceId,
        "dependency": task.buildertek__Dependency__c ? task.buildertek__Dependency__r.Name : 'No Dependency',
        "eventColor": resourceColorMap.get(resourceId) || getNextColor(),
        "allDay": true,
        "readOnly": true,
        "contractorId": task.buildertek__Contractor__c,
        "resourceName": resourceName ? resourceName : "No Resource",
        "completed": task.buildertek__Completion__c ? task.buildertek__Completion__c : 0,
    };
}

// const eventColors = [
//     '#D50000', '#E67C73', '#F4511E', '#F6BF26',
//     '#33B679', '#0B8043', '#039BE5', '#3F51B5',
//     '#7986CB', '#8E24AA', '#616161'
// ];

const eventColors = [
    'red', 'purple', 'violet', 'blue',
    '#957d95', '#904c77', 'pink', 'indigo',
    'deep-orange', 'green', 'magenta'
];

// Initialize an index to keep track of the current color
let colorIndex = 0;

function getNextColor() {
    const color = eventColors[colorIndex];
    colorIndex = (colorIndex + 1) % eventColors.length;
    return color;
}

function getResourceObject(resource, color, contractorId) {
    return {
        "id": resource.Id,
        "name": resource.Name,
        "eventColor": color,
        "contractorId": contractorId
    };
}

export function getUpdatedListForVendorFilter(visibleTaskList) {
    let dataSet = new Set();
    let data = [];
    visibleTaskList.forEach(task => {
        let obj = {};
        if (task.contractorId && !dataSet.has(task.contractorId)) {

            obj['value'] = task.contractorId;
            obj['text'] = task.contractorName;
            data.push(obj);
            dataSet.add(task.contractorId);
        }
    });

    return data;
}

export function initialDataForScheduleSearchFilter(scheduleData) {
    let data = [];
    scheduleData.forEach(task => {
        let obj = {};
        obj['id'] = task.Id;
        obj['name'] = task.buildertek__Description__c;
        obj['type'] = task.buildertek__Project__c ? task.buildertek__Project__r.Name : 'No Project';
        obj['ProjectId'] = task.buildertek__Project__c;
        data.push(obj);
    });

    return data;
}

export function initialDataForVendorSearchFilter(vendorData) {
    let data = [];
    vendorData.forEach(vendor => {
        let obj = {};
        obj['value'] = vendor.Id;
        obj['text'] = vendor.Name;
        data.push(obj);
    });

    return data;
}

export function getListOfResourceIds(resourceData) {
    let data = [];
    resourceData.forEach(resource => {
        data.push(resource.id);
    });

    return data;
}

export function filterVendorOnProjectSelection(vendorData) {
    console.log('filterVendorOnProjectSelection vendorData:', vendorData);
    let data = [];
    const vendorIds = new Set();
    vendorData.forEach(vendor => {
        if (!vendorIds.has(vendor.buildertek__Contractor__c)) {
            let obj = {};
            obj['value'] = vendor.buildertek__Contractor__c;
            obj['text'] = vendor.buildertek__Contractor__r.Name;
            data.push(obj);
            vendorIds.add(vendor.buildertek__Contractor__c);
        }
    });

    return data;
}

export function filterResourceByVendor(vendorIds, globalData) {

    let data = {};
    data['RESOURCES'] = globalData.RESOURCES.filter(resource => vendorIds.includes(resource.contractorId));
    data['EVENTS'] = globalData.EVENTS.filter(event => vendorIds.includes(event.contractorId));

    return data;
}