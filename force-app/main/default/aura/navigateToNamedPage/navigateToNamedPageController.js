({
    invoke: function(component, event, helper) {
        var navService = component.find('navService');
        var pageName = component.get('v.pageName');
        var isExperiencePage = component.get('v.isExperiencePage');

        if (!pageName) {
            throw new Error('Page Name is required. For Lightning: home, chatter, today, dataAssessment, filePreview. For Experience Cloud: home, account-management, contact-support, etc.');
        }

        var pageReference;

        if (isExperiencePage) {
            pageReference = {
                type: 'comm__namedPage',
                attributes: {
                    name: pageName
                }
            };
        } else {
            pageReference = {
                type: 'standard__namedPage',
                attributes: {
                    pageName: pageName
                }
            };
        }

        navService.navigate(pageReference);
    }
})
