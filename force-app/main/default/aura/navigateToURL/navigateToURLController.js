({
    invoke: function(component, event, helper) {
        var navService = component.find('navService');
        var url = component.get('v.url');

        if (!url) {
            throw new Error('URL is required. Please provide a valid URL (e.g. https://www.salesforce.com).');
        }

        var pageReference = {
            type: 'standard__webPage',
            attributes: {
                url: url
            }
        };

        navService.navigate(pageReference);
    }
})
