# Widget-JSON-Validator
A JS tool to validate JSON for Widget.
## Checks supported

### Type Checkings
 - Header Type
 - Slot Type
 - Item Type
 - Other Predefined types...
 
 
### Item Reference Validation
If any item is referred with incorrect key. Or Value is not present but still accessed.

### Data Reference Validation
If any data is referred with incorrect key. Or Value is not present but still accessed.

### Action Reference Validation
If any click/view action is referred with incorrect key. Or Value is not present but still accessed.

### Event Reference Validation
If any event is referred with incorrect key. Or Value is not present but still accessed.

### Color Reference Validation
If any color is referred with incorrect key. Or Value is not present but still accessed.

### Style Reference Validation
If any style is referred with incorrect key. Or Value is not present but still accessed.

### Object Keys Validation
If any object has incorrect set of keys.

### Placeholder Replacement Validation
If placeholder is not satisfied with value.

### Nested Reference Validation
For e.g. : `view` --> `action` --> `event` --> `data`
 - `view` is not able to location `action`
 - `action` is not able to locate `event`
 - `event` is not able to locate data for its placeholders (if any)
 - `action` is not able to locate data for its placeholders (if any)
 

