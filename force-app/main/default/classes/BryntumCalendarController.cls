public with sharing class BryntumCalendarController {

    @AuraEnabled
    public static MasterTaskWrpCls getProjectTaskRecords(){
        MasterTaskWrpCls calendarData = new MasterTaskWrpCls();
        try {
            calendarData.projectTasks = fetchProjectTasks(null);
            calendarData.schedulesGroupByProjects = [SELECT Id, buildertek__Description__c, buildertek__Project__c, buildertek__Project__r.Name FROM buildertek__Schedule__c ORDER BY buildertek__Project__r.Name NULLS Last LIMIT 10000];
            calendarData.vendorListWithResources = [SELECT Id, Name, buildertek__BT_Account_Type__c, (SELECT Id, Name FROM Contacts)  FROM Account WHERE Id IN (SELECT buildertek__Contractor__c FROM buildertek__Project_Task__c WHERE buildertek__Contractor__c != null) AND buildertek__BT_Account_Type__c = 'Vendor' ORDER BY Name NULLS Last LIMIT 10000];
            calendarData.message = 'Success';
        } catch (Exception ex) {
            System.debug('Exception: ' + ex.getMessage());
            calendarData.message = ex.getMessage();
        }
        return calendarData;
    }

    @AuraEnabled
    public static MasterTaskWrpCls searchProjectTaskRecordsBySchedule(List<Id> scheduleIdList){
        System.debug('scheduleIdList: ' + scheduleIdList);
        MasterTaskWrpCls filteredScheduleItemWrp = new MasterTaskWrpCls();
        try {
            filteredScheduleItemWrp.projectTasks = fetchProjectTasks(scheduleIdList);
            filteredScheduleItemWrp.filteredVendorListBySchedule = fetchContractors(scheduleIdList);
            filteredScheduleItemWrp.message = 'Success';
        } catch (Exception ex) {
            System.debug('Exception: ' + ex.getMessage());
            filteredScheduleItemWrp.message = ex.getMessage();
        }
        return filteredScheduleItemWrp;
    }

    public static List<buildertek__Project_Task__c> fetchProjectTasks(List<Id> scheduleIdList) {

        String query = 'SELECT Id, Name, buildertek__schedule__c, buildertek__Start__c, buildertek__Finish__c, buildertek__Completion__c, ' +
                       'buildertek__Schedule__r.buildertek__Project__r.Name, buildertek__Duration__c, buildertek__Dependency__r.Name, ' +
                       'buildertek__Contractor__c, buildertek__Contractor__r.Name, buildertek__task_color__c, ' +
                       'buildertek__Contractor_Resource_1__c, buildertek__Contractor_Resource_1__r.Name, ' +
                       'buildertek__Contractor_Resource_2__c, buildertek__Contractor_Resource_2__r.Name, ' +
                       'buildertek__Contractor_Resource_3__c, buildertek__Contractor_Resource_3__r.Name, ' +
                       'buildertek__Internal_Resource_1__r.Name, buildertek__Internal_Resource_3__c, ' +
                       'buildertek__Internal_Resource_3__r.Name, buildertek__Internal_Resource_4__c, ' +
                       'buildertek__Internal_Resource_4__r.Name ' +
                       'FROM buildertek__Project_Task__c';

        if (scheduleIdList != null && !scheduleIdList.isEmpty()) {
            query += ' WHERE buildertek__Schedule__c IN :scheduleIdList';
        }

        query += ' ORDER BY buildertek__Start__c ASC';

        List<buildertek__Project_Task__c> projectTasks = Database.query(query);
        System.debug('this is projectTasks'+projectTasks);

        return projectTasks;
    }

    public static List<buildertek__Project_Task__c> fetchContractors(List<Id> scheduleIdList) {

        String accType = 'Vendor';

        String query = 'SELECT Id, buildertek__Contractor__c, buildertek__Contractor__r.Name ' +
                       'FROM buildertek__Project_Task__c ' +
                       'WHERE buildertek__Contractor__c != null ' +
                       'AND buildertek__Contractor__r.buildertek__BT_Account_Type__c =:accType ';

        if (scheduleIdList != null && !scheduleIdList.isEmpty()) {
            query += 'AND buildertek__Schedule__c IN :scheduleIdList ';
        }

        query += 'ORDER BY buildertek__Contractor__r.Name NULLS Last';

        List<buildertek__Project_Task__c> contractors = Database.query(query);

        return contractors;
    }

    public class MasterTaskWrpCls {
        @AuraEnabled
        public List<buildertek__Project_Task__c> projectTasks {get; set;}

        @AuraEnabled
        public List<buildertek__schedule__c> schedulesGroupByProjects {get; set;}

        @AuraEnabled
        public List<Account> vendorListWithResources {get; set;}

        @AuraEnabled
        public List<buildertek__Project_Task__c> filteredVendorListBySchedule {get; set;}

        @AuraEnabled
        public String message {get; set;}
    }
}