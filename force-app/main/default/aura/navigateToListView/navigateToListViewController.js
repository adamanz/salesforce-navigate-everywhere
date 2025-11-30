({
    invoke: function(component, event, helper) {
        var navService = component.find('navService');
        var objectApiName = component.get('v.objectApiName');
        var listViewApiName = component.get('v.listViewApiName');

        if (!objectApiName) {
            throw new Error('Object API Name is required. Please provide the object API name (e.g. Account, Contact, MyObject__c).');
        }

        var pageReference = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: objectApiName,
                actionName: 'list'
            },
            state: {}
        };

        if (listViewApiName) {
            pageReference.state.filterName = listViewApiName;
        }

        navService.navigate(pageReference);
    }
})
