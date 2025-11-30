# Navigate Everywhere - Salesforce Flow Action

[![Salesforce API](https://img.shields.io/badge/Salesforce%20API-63.0-blue)](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/)
[![License: BSD-3](https://img.shields.io/badge/License-BSD--3-green.svg)](LICENSE)
[![Flow Action](https://img.shields.io/badge/Flow-Local%20Action-blueviolet)](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/components_using_flow_actions.htm)

A powerful Salesforce Flow Local Action that enables navigation to virtually any page type in Lightning Experience. Originally created by [Eric Smith](https://github.com/ericrsmith35) as part of [UnofficialSF](https://unofficialsf.com/).

## Features

- Navigate to records (view, edit, clone)
- Navigate to object pages (home, list, new)
- Navigate to external URLs
- Navigate to custom tabs
- Navigate to Knowledge articles
- Navigate to Experience Cloud pages
- Navigate to named pages (Home, Chatter, Today, etc.)
- Navigate to related lists
- Navigate to Lightning apps
- Support for default field values when creating new records
- Record Type selection support

## Deployment

### Prerequisites

- [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli) installed
- Authenticated to your target org

### Authenticate to Your Org

```bash
# For production/developer org
sf org login web -a MyOrg

# For sandbox
sf org login web -a MySandbox -r https://test.salesforce.com
```

### Deploy to Org

```bash
# Deploy to default org
sf project deploy start

# Deploy to specific org
sf project deploy start -o MyOrg

# Validate only (no deployment)
sf project deploy start -o MyOrg --dry-run
```

## Available Actions

This package includes **two options** for navigation:

### Option 1: All-in-One Action (Original)
Use `navigateEverywhereLFA` when you need maximum flexibility with a single component.

### Option 2: Simplified Single-Purpose Actions (New)
Use these purpose-built actions for a cleaner Flow builder experience:

| Action | Description | Use When |
|--------|-------------|----------|
| `navigateToRecord` | View, edit, or clone a record | Opening an existing record |
| `navigateToNewRecord` | Create a new record | Creating records with optional defaults |
| `navigateToListView` | Open object list view | Showing filtered lists |
| `navigateToURL` | Open external URL | Linking to external sites |
| `navigateToApp` | Switch Lightning app | Changing application context |
| `navigateToRelatedList` | Open a related list | Showing child records |
| `navigateToNamedPage` | Go to standard/community page | Home, Chatter, Today, etc. |

## Using in Flow

### Adding an Action

1. Open **Setup** > **Flows**
2. Create or edit a **Screen Flow**
3. Add an **Action** element
4. Search for your preferred action (e.g., `navigateToRecord`)
5. Configure the input variables

> **Note:** These are Local Actions, meaning they run in the browser context. They work in Screen Flows only, not in Record-Triggered or Scheduled Flows.

---

## Simplified Actions Reference

### navigateToRecord
Navigate to an existing record in view, edit, or clone mode.

| Input | Required | Description |
|-------|----------|-------------|
| `recordId` | Yes | The 18-character Salesforce Record ID |
| `objectApiName` | No | Object API name (helps with page resolution) |
| `actionName` | Yes | `view`, `edit`, or `clone` |

**Example:**
```
Record ID: {!recordId}
Action: edit
```

---

### navigateToNewRecord
Open a new record form with optional default field values.

| Input | Required | Description |
|-------|----------|-------------|
| `objectApiName` | Yes | Object API name (e.g., Account, Case) |
| `defaultFieldValues` | No | JSON string of field defaults |

**Example:**
```
Object API Name: Case
Default Field Values: {"Subject":"Support Request","Priority":"High"}
```

**Building JSON in Flow:**
Use a formula resource:
```
'{"Subject": "' & {!varSubject} & '", "AccountId": "' & {!varAccountId} & '"}'
```

---

### navigateToListView
Navigate to an object's list view.

| Input | Required | Description |
|-------|----------|-------------|
| `objectApiName` | Yes | Object API name (e.g., Account, Opportunity) |
| `listViewApiName` | No | Developer name of specific list view |

**Example:**
```
Object API Name: Opportunity
List View API Name: My_Open_Opportunities
```

---

### navigateToURL
Navigate to any external URL.

| Input | Required | Description |
|-------|----------|-------------|
| `url` | Yes | Full URL including https:// |

**Example:**
```
URL: https://help.salesforce.com
```

---

### navigateToApp
Switch to a different Lightning app.

| Input | Required | Description |
|-------|----------|-------------|
| `appTarget` | Yes | App ID or developer name with namespace |

**Namespace prefixes:**
- Standard apps: `standard__` (e.g., `standard__LightningSales`)
- Custom apps: `c__` (e.g., `c__MyCustomApp`)
- Managed packages: `namespace__` (e.g., `mypackage__AppName`)

---

### navigateToRelatedList
Navigate to a related list for a parent record.

| Input | Required | Description |
|-------|----------|-------------|
| `recordId` | Yes | Parent record ID |
| `objectApiName` | Yes | Parent object API name |
| `relationshipApiName` | Yes | Child relationship name |

**Finding the Relationship API Name:**
Go to Object Manager > Child Object > Lookup Field > See "Child Relationship Name"

**Example:**
```
Parent Record ID: {!accountId}
Parent Object API Name: Account
Relationship API Name: Contacts
```

---

### navigateToNamedPage
Navigate to standard named pages or Experience Cloud pages.

| Input | Required | Description |
|-------|----------|-------------|
| `pageName` | Yes | Name of the page |
| `isExperiencePage` | No | Set true for Experience Cloud |

**Lightning Experience pages:** `home`, `chatter`, `today`, `dataAssessment`, `filePreview`

**Experience Cloud pages:** `home`, `account-management`, `contact-support`, `error`, `login`, `top-articles`, `topic-catalog`

---

## Original All-in-One Action Reference

## Input Variables

| Variable | Label | Required | Description |
|----------|-------|----------|-------------|
| `destinationType` | Destination Type | Yes | The type of page to navigate to (see table below) |
| `destinationName` | Destination Name | Conditional | Object API name, App name, Tab name, or Page name |
| `destinationRecordId` | Destination Record Id | Conditional | The record ID for record-based navigation |
| `destinationAction` | Destination Action | Conditional | The action to perform (see table below) |
| `destinationActionFilter` | Destination Action Filter | No | List view filter name for object list pages |
| `destinationUrl` | Destination URL | Conditional | URL for web page navigation or Knowledge article URL name |
| `relationshipName` | Relationship Name | Conditional | API name of the relationship for related list navigation |
| `defaultVals` | Default Field Values in JSON | No | JSON string of default field values for new record creation |

## Destination Types

| Type | Description | Required Variables |
|------|-------------|-------------------|
| `record` | Navigate to a specific record | `destinationRecordId`, `destinationAction` |
| `object` | Navigate to an object page | `destinationName`, `destinationAction` |
| `url` | Navigate to an external URL | `destinationUrl` |
| `tab` | Navigate to a custom tab | `destinationName` |
| `knowledge` | Navigate to a Knowledge article | `destinationName` (articleType), `destinationUrl` (urlName) |
| `namedpage` | Navigate to a named page | `destinationName` |
| `experiencepage` | Navigate to an Experience Cloud page | `destinationName` |
| `relatedlist` | Navigate to a related list | `destinationRecordId`, `destinationName`, `destinationAction`, `relationshipName` |
| `app` | Navigate to a Lightning app | `destinationName` |

## Destination Actions by Type

### Record Type Actions
| Action | Description |
|--------|-------------|
| `view` | Open record in view mode |
| `edit` | Open record in edit mode |
| `clone` | Clone the record |

### Object Type Actions
| Action | Description |
|--------|-------------|
| `home` | Object home page |
| `list` | Object list view (use `destinationActionFilter` for specific list) |
| `new` | New record page (supports Record Type selection) |

### Related List Type Actions
| Action | Description |
|--------|-------------|
| `view` | View the related list |

## Usage Examples

### Navigate to Record (View)

```
Destination Type: record
Destination Name: Account
Destination Record Id: {!recordId}
Destination Action: view
```

### Navigate to Record (Edit)

```
Destination Type: record
Destination Name: Contact
Destination Record Id: {!contactId}
Destination Action: edit
```

### Navigate to Object List with Filter

```
Destination Type: object
Destination Name: Opportunity
Destination Action: list
Destination Action Filter: My_Open_Opportunities
```

### Create New Record with Default Values

```
Destination Type: object
Destination Name: Case
Destination Action: new
Default Field Values in JSON: {"Subject":"Support Request","Priority":"High","AccountId":"{!accountId}"}
```

### Navigate to External URL

```
Destination Type: url
Destination URL: https://help.salesforce.com
```

### Navigate to Custom Tab

```
Destination Type: tab
Destination Name: My_Custom_Tab
```

### Navigate to Related List

```
Destination Type: relatedlist
Destination Name: Account
Destination Record Id: {!accountId}
Destination Action: view
Relationship Name: Contacts
```

### Navigate to Knowledge Article

```
Destination Type: knowledge
Destination Name: FAQ
Destination URL: how-to-reset-password
```

### Navigate to Named Page

```
Destination Type: namedpage
Destination Name: home
```

Valid named pages: `home`, `chatter`, `today`, `dataAssessment`, `filePreview`

### Navigate to Experience Cloud Page

```
Destination Type: experiencepage
Destination Name: home
```

Valid experience pages: `home`, `Account Management`, `Contact Support`, `Error`, `Login`, `Top Articles`, `Topic Catalog`, or custom page names

### Navigate to Lightning App

```
Destination Type: app
Destination Name: standard__LightningSales
```

> **Note:** For custom apps not in managed packages, use the prefix `c__` (e.g., `c__MyCustomApp`)

## Best Practices

Based on Salesforce Lightning Navigation best practices:

1. **Use NavigationMixin patterns** - This component uses the `lightning:navigation` service which is the recommended approach over deprecated methods like `force:navigateToSObject`

2. **Handle errors gracefully** - The component includes comprehensive error messages for missing or invalid parameters

3. **Use Record Type selection** - When creating new records with `destinationAction: new`, the component automatically enables Record Type selection if configured on the object

4. **Default field values** - Use JSON format for `defaultVals` to pre-populate fields on new records. Values are encoded using `lightning:pageReferenceUtils`

5. **List view filters** - Use `destinationActionFilter` with the list view API name (not label) to navigate directly to filtered views

## API Version

This package uses Salesforce API version **62.0** (Winter '25).

## File Structure

```
salesforce-navigate-everywhere/
├── force-app/
│   └── main/
│       └── default/
│           ├── aura/
│           │   ├── navigateEverywhereLFA/     # All-in-one action
│           │   ├── navigateToRecord/          # View/edit/clone records
│           │   ├── navigateToNewRecord/       # Create new records
│           │   ├── navigateToListView/        # Object list views
│           │   ├── navigateToURL/             # External URLs
│           │   ├── navigateToApp/             # Lightning apps
│           │   ├── navigateToRelatedList/     # Related lists
│           │   └── navigateToNamedPage/       # Named/community pages
│           └── lwc/
├── config/
├── scripts/
├── sfdx-project.json
└── README.md
```

## Credits

- Original Author: [Eric Smith](https://github.com/ericrsmith35)
- Source: [UnofficialSF Lightning Flow Components](https://github.com/UnofficialSF/LightningFlowComponents)
- Record Type selection enhancement: Jonathan Muller

## License

MIT License - See [LICENSE](LICENSE) for details.

## Related Resources

- [Salesforce Navigation Service Documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning:navigation)
- [PageReference Types](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_page_reference_type)
- [UnofficialSF Flow Actions](https://unofficialsf.com/flow-action-and-screen-component-basepacks/)
