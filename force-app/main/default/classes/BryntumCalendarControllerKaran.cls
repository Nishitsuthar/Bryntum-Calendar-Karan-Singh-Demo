public with sharing class BryntumCalendarControllerKaran {

    @AuraEnabled
    public static MasterTaskWrpCls getProjectTaskRecords(List<Id> scheduleIdList){
        MasterTaskWrpCls calendarData = new MasterTaskWrpCls();
        try {
            calendarData.projectTasks = [SELECT Id, Name, buildertek__schedule__c, buildertek__Start__c, buildertek__Finish__c, buildertek__task_color__c, buildertek__Contractor_Resource_1__c, buildertek__Contractor_Resource_1__r.Name, buildertek__Contractor_Resource_2__c, buildertek__Contractor_Resource_2__r.Name, buildertek__Contractor_Resource_3__c, buildertek__Contractor_Resource_3__r.Name, buildertek__Internal_Resource_1__r.Name, buildertek__Internal_Resource_3__c, buildertek__Internal_Resource_3__r.Name, buildertek__Internal_Resource_4__c, buildertek__Internal_Resource_4__r.Name FROM buildertek__Project_Task__c WHERE (buildertek__Contractor_Resource_1__c != null OR buildertek__Contractor_Resource_2__c != null OR buildertek__Contractor_Resource_3__c != null OR buildertek__Internal_Resource_1__c != null OR buildertek__Internal_Resource_3__c != null OR buildertek__Internal_Resource_4__c != null) AND buildertek__Schedule__c IN:scheduleIdList ORDER BY buildertek__Start__c ASC];
            calendarData.schedulesGroupByProjects = [SELECT Id, buildertek__Description__c, buildertek__Project__c, buildertek__Project__r.Name FROM buildertek__Schedule__c ORDER BY buildertek__Project__r.Name NULLS Last LIMIT 10000];
            calendarData.message = 'Success';
        } catch (Exception ex) {
            System.debug('Exception: ' + ex.getMessage());
            calendarData.message = ex.getMessage();
        }
        return calendarData;
    }

    public class MasterTaskWrpCls {
        @AuraEnabled
        public List<buildertek__Project_Task__c> projectTasks {get; set;}

        @AuraEnabled
        public List<buildertek__schedule__c> schedulesGroupByProjects {get; set;}

        @AuraEnabled
        public String message {get; set;}
    }
}