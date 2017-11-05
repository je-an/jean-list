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
     * @param {Object[]} [options.list=[]] - Array, which should be maintained 
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
            throw new TypeError("id ist not from type string");
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
    return List;
});