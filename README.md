## Description

Provides a basic list implementation for maintaining objects 

## Support
Supports both CommonJS and AMD eco system. If there is no loader, List is registered as a browser variable.

## Code Example
- Use it as browser variable
```javascript
    // Pass identifier key name as a string to constructor
    var list = new List({
        idProperty: "name"
    });
    // Add some objects to the list
    list.addElement({ name: "firstObject" });
    list.addElement({ name: "secondObject" });
    list.addElement({ name: "thirdObject" });
    // Get an element from the list
    var firstObject = list.getElement("firstObject");
```
- Use it with require.js
```javascript
require(["path/to/List"], function(List){
    // Work with List
});
```
- Use it with node.js
```javascript
var List = require("jean-list");
```
## Installation

`npm install jean-list --save --legacy-bundling`

## API Reference

### List Constructor

**Options**
- **idProperty**: `String` - `mandatory` - Name of the property, which will act as identifier
- **checkDuplicates**: `Boolean` - `optional` - If true, there will be a check processed, if added element is already in the list. Beware, that this options could drop the performance.
- **list**: `Object[]` - `optional` - List which shall be maintained

### List.addElement(element) 

Add an element to the list

**Parameters**
- **element**: `Object` - element, which shall be added to the list

**Returns**
- `Boolean` - True, if the element could be added

### List.getElement(id) 

Provides an element from the list based on its id

**Parameters**
- **id**: `String` - Id of the element

**Returns**
- `Object | null` - The element or null if it is not in

### List.updateElement(newElement) 

Updates the element in the collection with the passed one

**Parameters**
- **newElement**: `Object` - Updated element

**Returns**
- `Boolean` - True if element is updated, false otherwise

### List.deleteElement(id) 

Deletes an element from the list based on its id

**Parameters**
- **id**: `String` - Id of the element

**Returns**
- `Object | null` - The element or null if it is not in

### List.deleteAll() 

Removes all elements from the list

**Returns**
- `Boolean` - True if list is emptied, false otherwise

### List.forEachElement(callback) 

Passes every element in the list to the provided callback function
Beware, that this functionality is performance intensive

**Parameters**
- **callback**: `function` - Get element an his index within the list as arguments

**Example**:
```js
var list = new List({
  idProperty: "id"
});
list.addElement({ id: "1" });
list.forEachElement(function(element,index){
     // Work with element and index
});
```

## Tests

Open spec/spec-runner.html in browser to see the test cases.

## License

MIT