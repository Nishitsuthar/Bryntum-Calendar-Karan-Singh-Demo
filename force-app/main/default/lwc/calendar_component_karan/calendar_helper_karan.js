export function createDataForCalendar(listOfApexData) {
    console.log('listOfApexData:', listOfApexData);
    let calendar = {};
    let EVENTS = [];
    let RESOURCES = [];

    listOfApexData.forEach(task => {
        if (task.buildertek__Contractor_Resource_1__c) {
            let obj1 = getTaskObject(task, task.buildertek__Contractor_Resource_1__c);
            let resObj1 = getResourceObject(task.buildertek__Contractor_Resource_1__r);
            EVENTS.push(obj1);
            RESOURCES.push(resObj1);
        }

        if (task.buildertek__Contractor_Resource_2__c) {
            let obj2 = getTaskObject(task, task.buildertek__Contractor_Resource_2__c);
            let resObj2 = getResourceObject(task.buildertek__Contractor_Resource_2__r);
            EVENTS.push(obj2);
            RESOURCES.push(resObj2);
        }

        if (task.buildertek__Contractor_Resource_3__c) {
            let obj3 = getTaskObject(task, task.buildertek__Contractor_Resource_3__c);
            let resObj3 = getResourceObject(task.buildertek__Contractor_Resource_3__r);
            EVENTS.push(obj3);
            RESOURCES.push(resObj3);
        }

        if (task.buildertek__Internal_Resource_1__c) {
            let obj4 = getTaskObject(task, task.buildertek__Internal_Resource_1__c);
            let resObj4 = getResourceObject(task.buildertek__Internal_Resource_1__r);
            EVENTS.push(obj4);
            RESOURCES.push(resObj4);
        }

        if (task.buildertek__Internal_Resource_3__c) {
            let obj5 = getTaskObject(task, task.buildertek__Internal_Resource_3__c);
            let resObj5 = getResourceObject(task.buildertek__Internal_Resource_3__r);
            EVENTS.push(obj5);
            RESOURCES.push(resObj5);
        }

        if (task.buildertek__Internal_Resource_4__c) {
            let obj6 = getTaskObject(task, task.buildertek__Internal_Resource_4__c);
            let resObj6 = getResourceObject(task.buildertek__Internal_Resource_4__r);
            EVENTS.push(obj6);
            RESOURCES.push(resObj6);
        }

    });

    calendar['RESOURCES'] = RESOURCES;
    calendar['EVENTS'] = EVENTS;
    calendar['calendarStartDate'] = listOfApexData[0]?.buildertek__Start__c;

    return calendar;
}

function getTaskObject(task, resourceId) {
    let sDate = new Date(task.buildertek__Start__c);
    let eDate = new Date(task.buildertek__Finish__c);
    eDate.setDate(eDate.getDate() + 1);
    sDate = sDate.toISOString();
    eDate = eDate.toISOString();
    sDate = sDate.substring(0, sDate.length - 2);
    eDate = eDate.substring(0, eDate.length - 2);

    return {
        "id": task.Id + '_' + resourceId,
        "name": task.Name,
        "startDate": sDate,
        "endDate": eDate,
        "resourceId": resourceId,
        "eventColor": "green",
        "allDay": true
    };
}

function getResourceObject(resource) {
    return {
        "id": resource.Id,
        "name": resource.Name,
        "eventColor": "green"
    };
}

export function initialDataForSearchFilter(scheduleData) {
    console.log('foo:', scheduleData);
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