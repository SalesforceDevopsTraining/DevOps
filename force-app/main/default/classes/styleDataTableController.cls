public with sharing class styleDataTableController {
    @AuraEnabled (cacheable = true)
    public static list<Account> getAccounts() {
        return [SELECT Id, Name, AnnualRevenue, Industry, Phone FROM ACCOUNT ];
    }
}
