({
    invoke: function(component, event, helper) {
        var navService = component.find('navService');
        var objectApiName = component.get('v.objectApiName');
        var defaultFieldValues = component.get('v.defaultFieldValues');

        if (!objectApiName) {
            throw new Error('Object API Name is required. Please provide the object API name (e.g. Account, Contact, MyObject__c).');
        }

        var pageReference = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: objectApiName,
                actionName: 'new'
            },
            state: {
                useRecordTypeCheck: 1
            }
        };

        if (defaultFieldValues) {
            try {
                var parsedValues = JSON.parse(defaultFieldValues);
                pageReference.state.defaultFieldValues = component.find("pageRefUtils").encodeDefaultFieldValues(parsedValues);
            } catch (e) {
                throw new Error('Invalid JSON in Default Field Values. Please use format: {"FieldName": "Value"}. Error: ' + e.message);
            }
        }

        navService.navigate(pageReference);
    }
})
