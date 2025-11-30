({
    invoke: function(component, event, helper) {
        var navService = component.find('navService');
        var recordId = component.get('v.recordId');
        var objectApiName = component.get('v.objectApiName');
        var actionName = component.get('v.actionName');

        if (!recordId) {
            throw new Error('Record ID is required. Please provide the 18-character Salesforce Record ID.');
        }

        var validActions = ['view', 'edit', 'clone'];
        var action = actionName ? actionName.toLowerCase() : 'view';

        if (!validActions.includes(action)) {
            throw new Error('Invalid action. Please use: view, edit, or clone. You provided: ' + actionName);
        }

        var pageReference = {
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: action
            }
        };

        if (objectApiName) {
            pageReference.attributes.objectApiName = objectApiName;
        }

        navService.navigate(pageReference);
    }
})
