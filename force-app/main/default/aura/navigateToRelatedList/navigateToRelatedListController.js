({
    invoke: function(component, event, helper) {
        var navService = component.find('navService');
        var recordId = component.get('v.recordId');
        var objectApiName = component.get('v.objectApiName');
        var relationshipApiName = component.get('v.relationshipApiName');

        if (!recordId) {
            throw new Error('Parent Record ID is required.');
        }
        if (!objectApiName) {
            throw new Error('Parent Object API Name is required (e.g. Account, Opportunity).');
        }
        if (!relationshipApiName) {
            throw new Error('Relationship API Name is required. Find this in Object Manager on the lookup field of the child object (e.g. Contacts, OpportunityLineItems).');
        }

        var pageReference = {
            type: 'standard__recordRelationshipPage',
            attributes: {
                recordId: recordId,
                objectApiName: objectApiName,
                relationshipApiName: relationshipApiName,
                actionName: 'view'
            }
        };

        navService.navigate(pageReference);
    }
})
