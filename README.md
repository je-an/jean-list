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

### List.sortType

- **ASCENDING**: `String` - Sorts the elements ascending
- **DESCENDING**: `String` - Sorts the elements descending


### List.length

Provides the number of elements, which are maintained by the list

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
- `Boolean` - True, if the element is deleted, false otherwise 

### List.containsElement(id) 

Checks, if an element is part of the list

**Parameters**
- **id**: `String` - Id of the element

**Returns**
- `Boolean` - True, if the element is part of the collection, false otherwise

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

### List.toArray() 

Provides an array, which contains the maintained elements

**Returns**
- `Object[]` - values which are maintained by the list

### List.indexOf(o) 

Provides the index of the element, if it is part of the list

**Parameters**
- **o**: `Object` - Object for which the index shall be retrieved

**Returns**
- `Number` - index of the element within the list or -1 if the element is not part of the list.

### List.moveIndex(currentIndex, newIndex) 

Moves the object currentIndex to newIndex

**Parameters**
- **currentIndex**: `Number` - Index of object, which shall be moved
- **newIndex**: `Number` - Moves the object behind currentIndex to newIndex

### List.sort(fn) 

Sorts the elements regarding to the provided compare function

**Parameters**
- **fn**: `Function` - the function which will be used for sorting, see Array.prototype.sort()

**Returns**
- `Boolean` - True if sorting is successful, Exception otherwise

### List.sortByNumber(propertyName, sortType) 

Sorts the objects within by the number of a provided property

**Parameters**
- **propertyName**: `String` - name of the property which shall be used for sorting
- **sortType**: `List.sortType` - the sort type - ascending or descending

**Returns**
- `Boolean` - True if sorting is successful, Exception otherwise

## Tests

Open spec/spec-runner.html in browser to see the test cases.

## Credit

The `moveIndex` method is taken from [Reids](https://stackoverflow.com/users/236139/reid)
 accepted answer from the [most popular stackoverflow post](https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another/5306832#comment59437131_5306832) on this topic. All credit goes to [Reid](https://stackoverflow.com/users/236139/reid). Only adjustments have been made, to make it work with this module.

## License

MIT