import login from "@salesforce/apex/LightningLoginFormController.login";

export function createDataForCalendar(listOfApexData) {
    let calendar = {};
    let EVENTS = [];
    let RESOURCES = [];
    let ASSIGNMENTS = [];
    const resourceMap = new Map();    

    listOfApexData.forEach(task => {
        let obj1;
        let isTaskWithoutResource = true;
        let count = 0;
        const resources = [
            task.buildertek__Contractor_Resource_1__c,
            task.buildertek__Contractor_Resource_2__c,
            task.buildertek__Contractor_Resource_3__c,
            task.buildertek__Internal_Resource_1__c,
            task.buildertek__Internal_Resource_3__c,
            task.buildertek__Internal_Resource_4__c
        ];
    
        resources.forEach((resource) => {
            if (resource) {
                count++;
            }
        });

        if (task.buildertek__Contractor_Resource_1__c) {
            
            isTaskWithoutResource = false;
            if (!resourceMap.has(task.buildertek__Contractor_Resource_1__c)) {
                let color = getNextColor();
                resourceMap.set(task.buildertek__Contractor_Resource_1__c, color);                
                let resObj1 = getResourceObject(task.buildertek__Contractor_Resource_1__r, color, task.buildertek__Contractor__c, 'External', task);
                RESOURCES.push(resObj1);
            }
            obj1 = getTaskObject(task, task.buildertek__Contractor_Resource_1__c, resourceMap, task.buildertek__Contractor_Resource_1__r.Name);
            if(count == 1){
                EVENTS.push(obj1);
            }
            let ass1 = getAssignmentObject(task, task.buildertek__Contractor_Resource_1__c);            
            ASSIGNMENTS.push(ass1);
        }

        if (task.buildertek__Contractor_Resource_2__c) {            
            isTaskWithoutResource = false;
            if (!resourceMap.has(task.buildertek__Contractor_Resource_2__c)) {
                let color = getNextColor();
                resourceMap.set(task.buildertek__Contractor_Resource_2__c, color);
                let resObj2 = getResourceObject(task.buildertek__Contractor_Resource_2__r, color, task.buildertek__Contractor__c, 'External', task);
                RESOURCES.push(resObj2);
            }
            obj1 = getTaskObject(task, task.buildertek__Contractor_Resource_2__c, resourceMap, task.buildertek__Contractor_Resource_2__r.Name);
            if(count == 1){
                EVENTS.push(obj1);
            }
            let ass2 = getAssignmentObject(task, task.buildertek__Contractor_Resource_2__c);
            ASSIGNMENTS.push(ass2);
        }

        if (task.buildertek__Contractor_Resource_3__c) {
            isTaskWithoutResource = false;
            if (!resourceMap.has(task.buildertek__Contractor_Resource_3__c)) {
                let color = getNextColor();
                resourceMap.set(task.buildertek__Contractor_Resource_3__c, color);
                let resObj3 = getResourceObject(task.buildertek__Contractor_Resource_3__r, color, task.buildertek__Contractor__c, 'External', task);
                RESOURCES.push(resObj3);
            }
            obj1 = getTaskObject(task, task.buildertek__Contractor_Resource_3__c, resourceMap, task.buildertek__Contractor_Resource_3__r.Name);
            if(count == 1){
                EVENTS.push(obj1);
            }
            let ass3 = getAssignmentObject(task, task.buildertek__Contractor_Resource_3__c);
            ASSIGNMENTS.push(ass3);
        }

        if (task.buildertek__Internal_Resource_1__c) {
            isTaskWithoutResource = false;
            if (!resourceMap.has(task.buildertek__Internal_Resource_1__c)) {
                let color = getNextColor();
                resourceMap.set(task.buildertek__Internal_Resource_1__c, color);
                console.log('logging contractor',task);
                
                let resObj4 = getResourceObject(task.buildertek__Internal_Resource_1__r, color, task.buildertek__Contractor__c, 'Internal', task);
                RESOURCES.push(resObj4);     
            }
            obj1 = getTaskObject(task, task.buildertek__Internal_Resource_1__c, resourceMap, task.buildertek__Internal_Resource_1__r.Name);
            if(count == 1){
                EVENTS.push(obj1);
            }
            let ass4 = getAssignmentObject(task, task.buildertek__Internal_Resource_1__c);
            ASSIGNMENTS.push(ass4);
        }

        if (task.buildertek__Internal_Resource_3__c) {
            isTaskWithoutResource = false;
            if (!resourceMap.has(task.buildertek__Internal_Resource_3__c)) {
                let color = getNextColor();
                resourceMap.set(task.buildertek__Internal_Resource_3__c, color);
                console.log('logging contractor',task);

                let resObj5 = getResourceObject(task.buildertek__Internal_Resource_3__r, color, task.buildertek__Contractor__c, 'Internal', task);
                RESOURCES.push(resObj5);
            }
            obj1 = getTaskObject(task, task.buildertek__Internal_Resource_3__c, resourceMap, task.buildertek__Internal_Resource_3__r.Name);
            if(count == 1){
                EVENTS.push(obj1);
            }
            let ass5 = getAssignmentObject(task, task.buildertek__Internal_Resource_3__c);
            ASSIGNMENTS.push(ass5);
        }

        if (task.buildertek__Internal_Resource_4__c) {
            isTaskWithoutResource = false;
            if (!resourceMap.has(task.buildertek__Internal_Resource_4__c)) {
                let color = getNextColor();
                resourceMap.set(task.buildertek__Internal_Resource_4__c, color);
                console.log('logging contractor',task);

                let resObj6 = getResourceObject(task.buildertek__Internal_Resource_4__r, color, task.buildertek__Contractor__c, 'Internal', task);
                RESOURCES.push(resObj6);
            }
            obj1 = getTaskObject(task, task.buildertek__Internal_Resource_4__c, resourceMap, task.buildertek__Internal_Resource_4__r.Name);
            if(count == 1){
                EVENTS.push(obj1);
            }
            let ass6 = getAssignmentObject(task, task.buildertek__Internal_Resource_4__c);
            ASSIGNMENTS.push(ass6);
        }

        if(count>1){
            let obj7 = getTaskObjectMultiple(task);
            EVENTS.push(obj7);
        }

        if (isTaskWithoutResource) {
            if(!resourceMap.has('NoResource')){
                let color = getNextColor();
                resourceMap.set('NoResource', color);    
                let resObj7 = getResourceObject('NoResource', color, undefined, "None", "NoPhase");
                RESOURCES.push(resObj7);
            }
            let obj1 = getTaskObject(task, 123 , resourceMap, undefined);
            EVENTS.push(obj1);
            let ass7 = getAssignmentObject(task, 123);
            ASSIGNMENTS.push(ass7);

        }
    });

    const noResource = RESOURCES.filter(resource => resource.name.toLowerCase() === "no resource");
    const internalResources = RESOURCES.filter(resource => resource.type === "Internal" && resource.name.toLowerCase() !== "internal");
    const externalResources = RESOURCES.filter(resource => resource.type === "External" && resource.name.toLowerCase() !== "external");
    internalResources.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    externalResources.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    const SORTEDRESOURCE = [
        ...noResource,
        ...internalResources,
        ...externalResources
    ];
    calendar['RESOURCES'] = SORTEDRESOURCE;
    calendar['EVENTS'] = EVENTS;
    calendar['ASSIGNMENTS'] = ASSIGNMENTS;
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
        "id": task.Id,
        "proj": projName,
        "contractorName": vendorName,
        "name": task.Name + ' - ' + projName + ' - ' + vendorName,
        "startDate": sDate,
        "endDate": eDate,
        "phase": task.buildertek__Phase__c ? task.buildertek__Phase__c : 'No Phase',
        "taskDuration": task.buildertek__Duration__c,
        "dependency": task.buildertek__Dependency__c ? task.buildertek__Dependency__r.Name : 'No Dependency',
        "eventColor": resourceColorMap.get(resourceId) || getNextColor(),
        "allDay": true,
        "readOnly": true,
        "contractorId": task.buildertek__Contractor__c,
        "resourceName": resourceName ? resourceName : "No Resource",
        "completed": task.buildertek__Completion__c ? task.buildertek__Completion__c : 0,
    };
}

function getTaskObjectMultiple(task) {
    let sDate = new Date(task.buildertek__Start__c + 'Z');
    let eDate = new Date(task.buildertek__Finish__c + 'Z');
    eDate.setDate(eDate.getDate() + 1);

    let name = '';
    const resources = [
        task.buildertek__Contractor_Resource_1__r,
        task.buildertek__Contractor_Resource_2__r,
        task.buildertek__Contractor_Resource_3__r,
        task.buildertek__Internal_Resource_1__r,
        task.buildertek__Internal_Resource_3__r,
        task.buildertek__Internal_Resource_4__r
    ];

    resources.forEach((resource) => {
        if (resource) {
            name += ' [ ' + resource.Name + ' ] ';
        }
    });

    sDate = sDate.toISOString();
    eDate = eDate.toISOString();
    sDate = sDate.substring(0, sDate.length - 5);
    eDate = eDate.substring(0, eDate.length - 5);

    let projName = task.buildertek__Schedule__r.buildertek__Project__c ? task.buildertek__Schedule__r.buildertek__Project__r.Name : 'No Project';
    let vendorName = task.buildertek__Contractor__c ? task.buildertek__Contractor__r.Name : 'No Vendor';
    console.log("multiple is here "+ task.Name+'-'+projName+'-'+vendorName);    
    return {
        "id": task.Id,
        "proj": projName,
        "contractorName": vendorName,
        "name": task.Name + ' - ' + projName + ' - ' + vendorName + ' - ' + name,
        "startDate": sDate,
        "endDate": eDate,
        "phase": task.buildertek__Phase__c ? task.buildertek__Phase__c : 'No Phase',
        "taskDuration": task.buildertek__Duration__c,
        "dependency": task.buildertek__Dependency__c ? task.buildertek__Dependency__r.Name : 'No Dependency',
        "eventColor":  getNextColor(),
        "allDay": true,
        "readOnly": true,
        "contractorId": task.buildertek__Contractor__c,
        "resourceName": name,
        "completed": task.buildertek__Completion__c ? task.buildertek__Completion__c : 0,
    };
}

function getAssignmentObject(task, resourceId) {
    return {
        "id": resourceId + '_' + task.Id,  //doesn't matter
        "resourceId": resourceId, // resourceid will be important
        "eventId": task.Id,
        "contractorId": task.buildertek__Contractor__c,
        "phase": task.buildertek__Phase__c ? task.buildertek__Phase__c : 'No Phase',
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

function getResourceObject(resource, color, contractorId, type, task) {
    // console.log('getResourceObject');
    
    // console.log(`Resource: ${JSON.stringify(resource)}, contractorID: ${contractorId}`);
    if(resource === 'NoResource'){
        return {
            "id": 123,
            "name": "No Resource",
            "eventColor": color,
            "contractorId": contractorId,
            "type": "No Resource",
            "phase": "No Phase"
        }
    }
    return {
        "id": resource.Id,
        "name": resource.Name,
        "eventColor": color,
        "contractorId": contractorId,
        "type": type,
        "phase": task.buildertek__Phase__c ? task.buildertek__Phase__c : 'No Phase'
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
    console.log('proper working vendor data', data);
    

    return data;
}

export function getUpdatedListForTaskFilter(visibleTaskList) {
    let dataSet = new Set();
    let data = [];
    console.log(visibleTaskList);
    
    visibleTaskList.forEach(task => {
        let obj = {};
        if (task.id && !dataSet.has(task.id)) {
            console.log('INside loop');
            
            obj['value'] = task.id;
            obj['text'] = task.name;
            data.push(obj);
            dataSet.add(task.id);
        }
    });
    console.log('Proper Working Tasks',data);
    

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

export function initialDataForPhaseSearchFilter(phaseData) {

    const data = Object.keys(phaseData).map(key => ({
        text: key,
        value: phaseData[key]
    }));

    return data;
}

export function initialDataForTaskSearchFilter(taskData) {

    let data = [];
    taskData.forEach(task => {
        let obj = {};
        obj['value'] = task.Id;
        obj['text'] = task.Name;
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
    console.log('filterVendor got invoked');
    
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
    console.log('data in filter vendor',data);
    
    return data;
}


export function filterResourceByVendor(vendorIds, globalData) {
    console.log('Searching vendor based on Resource');
    

    let data = {};
    // console.log('globalData.RESOURCES:', JSON.stringify(globalData.RESOURCES));
    
    data['RESOURCES'] = globalData.RESOURCES;
    data['EVENTS'] = globalData.EVENTS.filter(event => vendorIds.includes(event.contractorId));
    data['ASSIGNMENTS'] = globalData.ASSIGNMENTS.filter(assignment => vendorIds.includes(assignment.contractorId));

    return data;
}

export function filterResourceByPhase(phaseNames, globalData) {
    console.log('Searching phases');
    let data = {};

    data['RESOURCES'] = globalData.RESOURCES;
    data['EVENTS'] = globalData.EVENTS.filter(event => phaseNames.includes(event.phase));
    data['ASSIGNMENTS'] = globalData.ASSIGNMENTS.filter(assignment => phaseNames.includes(assignment.phase));

    return data;
}

export function filterResourceByTaskName(taskNames, globalData) {
    try {
        
        console.log('Searching tasks', taskNames);
        let data = {};
        data['ASSIGNMENTS'] = globalData.ASSIGNMENTS.filter(assignment => taskNames.includes(assignment.eventId));
        console.log('UPDATED ASSIGNMENTS'+ data['ASSIGNMENTS']);
        data['EVENTS'] = globalData.EVENTS.filter(event => taskNames.includes(event.id));
        console.log('UPDATED EVENTS'+ data['EVENTS']);
        data['RESOURCES'] = globalData.RESOURCES;
        console.log('UPDATED RESOURCES'+ data['RESOURCES']);
        return data;

        
    } catch (error) {
        console.log('Error in filterResourceByTaskName:', error);
    }

}