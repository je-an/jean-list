define(["TypeCheck"], function (TypeCheck) {
    /**
     * Provides a basic list implementation
     * @alias List
     * @constructor
     * @throws {TypeError} - if passed idProperty is not from type string
     * @param {Object} options - Configuration object
     * @param {String} options.idProperty - Name of the property, which will act as identifier
     * @param {Boolean} [options.checkDuplicates=false] - If true, there will be a check processed, if 
     *                                                    added elements is already in the list. Beware, that
     *                                                    this options could drop the performance.
     * @param {Object[]} [options.list=[]] - Array, which shall be maintained 
     */
    var List = function (options) {
        if (TypeCheck.isString(options.idProperty)) {
            this._idProperty = options.idProperty;
        } else {
            throw new TypeError("options.idProperty is not from type 'string'");
        }
        if (options.list) {
            if (Array.isArray(options.list) && TypeCheck.isArrayTypeOf(options.list, "object")) {
                this._list = options.list;
            } else {
                throw new TypeError("options.list is not and array or there are something else than objects within.");
            }
        } else {
            this._list = [];
        }
        this._checkDuplicates = options.checkDuplicates ? options.checkDuplicates : false;
        Object.defineProperty(this, 'length', {
            get: function () { // jscs:ignore
                return this._list.length;
            },
            configurable: true,
            enumerable: true
        });
    };
    /** @enum */
    List.sortType = List.prototype.sortType = {
        ASCENDING: "ascending",
        DESCENDING: "descending"
    };
    /**   
     * Add an element to the list
     * @public
     * @memberof List
     * @throws {TypeError} - if element is not an object
     * @param {Object} element - element, which shall be added to the list
     * @returns {Boolean} - True, if the element could be added
     */
    List.prototype.addElement = function (element) {
        if (!TypeCheck.isObject(element)) {
            throw new TypeError("element is not a object");
        }
        var isAdded = false, isDuplicate = false, idProperty = this._idProperty;
        if (element.hasOwnProperty(this._idProperty)) {
            if (this._checkDuplicates) {
                this.forEachElement(function (o, i) {
                    if (element[idProperty] === o[idProperty]) {
                        isDuplicate = true;
                        isAdded = false;
                        return false;
                    }
                });
            }
            if (!isDuplicate) {
                this._list.push(element);
                isAdded = true;
            }
        }
        return isAdded;
    };
    /**
     * Provides an element from the list based on its id
     * @public
     * @memberof List
     * @throws {TypeError} - If id is not from type string
     * @param {String} id - Id of the element
     * @returns {Object|null} - The element or null if it is not in
     */
    List.prototype.getElement = function (id) {
        if (!TypeCheck.isString(id)) {
            throw new TypeError("id ist not from type string");
        }
        var list = this._list, length = list.length, idProperty = this._idProperty;
        for (var i = 0; i < length; i++) {
            var element = list[i];
            if (element[idProperty] === id) {
                return element;
            }
        }
        return null;
    };
    /**
     * Updates the element in the collection with the passed one
     * @public
     * @memberof List
     * @throws {TypeError} - If passes element is not an Object
     * @param {Object} newElement - Updated element
     * @returns {Boolean} - True if element is updated, false otherwise
     */
    List.prototype.updateElement = function (newElement) {
        if (!TypeCheck.isObject(newElement)) {
            throw new TypeError("Passed element is not an object");
        }
        if (newElement.hasOwnProperty(this._idProperty)) {
            var list = this._list, length = list.length, idProperty = this._idProperty;
            for (var i = 0; i < length; i++) {
                var element = list[i];
                if (element[idProperty] === newElement[idProperty]) {
                    list[i] = newElement;
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Deletes an element from the list based on its id
     * @public
     * @memberof List
     * @throws {TypeError} - If id is not from type string
     * @param {String} id - Id of the element
     * @returns {Boolean} - True if the element is deleted, false otherwise
     */
    List.prototype.deleteElement = function (id) {
        if (!TypeCheck.isString(id)) {
            throw new TypeError("id ist not a string");
        }
        var list = this._list, length = list.length, idProperty = this._idProperty;
        for (var i = 0; i < length; i++) {
            var element = list[i];
            if (element[idProperty] === id) {
                list[i] = {};
                list.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    /**
     * Checks, if an element is part of the list
     * @public
     * @memberof List
     * @throws {TypeError} - If id is not a string
     * @param {String} id - Id of the element which shall be checked
     * @returns {Boolean} - True if the element is part of the collection, false otherwise
     */
    List.prototype.containsElement = function (id) {
        if (!TypeCheck.isString(id)) {
            throw new TypeError("id ist not a string");
        }
        return TypeCheck.isDefined(this.getElement(id)) ? true : false;
    };
    /**
     * Removes all elements from the list
     * @public
     * @memberof List
     * @returns {Boolean} - True if list is emptied, false otherwise
     */
    List.prototype.deleteAll = function () {
        var list = this._list;
        if (list.length !== 0) {
            this._list = [];
            return true;
        } else {
            return false;
        }
    };
    /** 
     * Passes every element in the list to the provided callback function
     * Beware, that this functionality is performance intensive
     * @public
     * @memberof List
     * @throws {TypeError} - If callback is not a function
     * @param {Function} callback - Get element an his index within the list as arguments
     * @example
     * var list = new List({
     *   idProperty: "id"
     * });
     * list.addElement({ id: "1" });
     * list.forEachElement(function(element,index){
     *      // Work with element and index
     * });
     */
    List.prototype.forEachElement = function (callback) {
        if (!TypeCheck.isFunction(callback)) {
            throw new TypeError("callback is not a function");
        }
        var list = this._list, length = list.length;
        for (var i = 0; i < length; i++) {
            callback(list[i], i);
        }
    };
    /**
     * Provides an array with the values from the list
     * @returns {Object[]} - list values
     */
    List.prototype.toArray = function () {
        return this._list;
    };
    /**
     * Provides the index of the element, if it is part of the list
     * @throws {TypeError} - If o is not an object
     * @param {Object} o - Object for which the index shall be retrieved
     * @returns {Number} - index of the element within the list or -1 if the element is not
     *                     part of the list.  
     */
    List.prototype.indexOf = function (o) {
        if (!TypeCheck.isObject(o)) {
            throw new TypeError("o is not an object");
        }
        return this._list.indexOf(o);
    };
    /**
     * Moves the element of currentIndex to the position of newIndex.
     * @throws {TypeError} - If currentIndex or newIndex are not numbers
     * @throws {Error} - If currentIndex or newIndex are not positive
     * @throws {Error} - If currentIndex or newIndex is bigger then list length
     * @param {Number} currentIndex - Index of object, which shall be moved
     * @param {Number} newIndex - Moves the object behind currentIndex to newIndex
     */
    List.prototype.moveIndex = function (currentIndex, newIndex) {
        if (!TypeCheck.isNumber(currentIndex) || !TypeCheck.isNumber(newIndex)) {
            throw new TypeError("currentIndex or newIndex are not numbers");
        }
        if (currentIndex < 0 || newIndex < 0) {
            throw new Error("currentIndex/newIndex are must be positive");
        }
        if (currentIndex > (this.length - 1) || newIndex > (this.length - 1)) {
            throw new Error("currentIndex or newIndex is bigger then list length");
        }
        if (newIndex >= this.length) {
            var k = newIndex - this.length;
            while ((k--) + 1) {
                this._list.push(undefined);
            }
        }
        this._list.splice(newIndex, 0, this._list.splice(currentIndex, 1)[0]);
    };
    /**
     * Sorts the elements regarding to the provided compare function
     * @throws {TypeError} - If fn is not a function
     * @param  {Function} fn - the function which will be used for sorting
     *                         if return value < 0 -> a is placed before b
     *                         if return value = 0 -> nothing is changed
     *                         if return value > 0 -> b is placed before a
     * @returns {Boolean} - True if sorting is successful, Exception otherwise
     */
    List.prototype.sort = function (fn) {
        if (TypeCheck.isFunction(fn)) {
            this._list.sort(fn);
        } else {
            throw new TypeError("fn is not a function");
        }
        return true;
    };
    /**
     * Sorts the objects within by the number of a provided property
     * @throws {TypeError} - If propertyName or sortType is invalid
     * @throws {TypeError} - If propertyName is not a member of the objects within the list
     * @param {String} propertyName - the name of the property which shall be used for sorting
     * @param {List.sortType} sortType - the sort type - ascending or descending
     * @returns {Boolean} - True if sorting is successful, exception otherwise
     */
    List.prototype.sortByNumber = function (propertyName, sortType) {
        var instance = this;
        if (TypeCheck.isString(propertyName) && TypeCheck.isEnumValue(sortType, this.sortType)) {
            this._list.sort(function (a, b) {
                if (a[propertyName] < b[propertyName]) {
                    if (sortType === instance.sortType.ASCENDING) {
                        return -1;
                    } else if (sortType === instance.sortType.DESCENDING) {
                        return 1;
                    }
                }
                if (a[propertyName] > b[propertyName]) {
                    if (sortType === instance.sortType.ASCENDING) {
                        return 1;
                    } else if (sortType === instance.sortType.DESCENDING) {
                        return -1;
                    }
                }
                return 0;
            });
        } else {
            throw new TypeError("propertyName or sortType is invalid");
        }
        return true;
    };
    return List;
});