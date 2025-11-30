({
    invoke: function(component, event, helper) {
        var navService = component.find('navService');
        var appTarget = component.get('v.appTarget');

        if (!appTarget) {
            throw new Error('App Target is required. Provide either the App ID (DurableId) or developer name with namespace (e.g. standard__Sales, c__MyCustomApp).');
        }

        var pageReference = {
            type: 'standard__app',
            attributes: {
                appTarget: appTarget
            }
        };

        navService.navigate(pageReference);
    }
})
