(function (root, factory) { 
 	 if (typeof define === 'function' && define.amd) { 
	 	 define([], factory); 
	} else { 
	 	root.List = root.List || {}; 
	 	root.List = factory();
	}
}(this, function() {
!function(e){function r(e){for(var r=0,n=[];r<e.length;r++){var o=l.resolved[e[r]];o&&n.push(o)}return n}function n(){for(var e in l.unresolved){var n=l.unresolved[e],d=r(n.dependencies);o(e,n.factory,n.dependencies,d,!1)}}function o(e,r,n,o,d){o.length===n.length?l.resolved[e]=r.apply(r,o):d&&(l.unresolved[e]={dependencies:n,factory:r})}var l={resolved:{},unresolved:{}};e.define=function(e,d,i){l.resolved[e]?console.warn("There is already a module with id <"+e+"> defined. Therefore this module will be ignored"):"string"==typeof e&&Array.isArray(d)&&"function"==typeof i?(0===d.length?o(e,i,d,[],!1):o(e,i,d,r(d),!0),n()):console.warn("Passed arguments for module are invalid")},e.require=function(e,n){var o=r(e=Array.isArray(e)?e:[e]);if(1===o.length&&!n)return o[0];if(o.length!==e.length||!n)throw new Error("Not all modules are resolved");n.apply(n,o)}}(window);
define("node_modules/jean-amd/dist/jean-amd.min", function(){});

define('TypeCheck',[], function () {
    return {
        /**
         * Checks if passed element type is string
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is string, false otherwise
         */
        isString: function (o) {
            return (typeof o === "string") ? true : false;
        },
        /** 
         * Checks if passed element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isBoolean: function (o) {
            return (typeof o === "boolean") ? true : false;
        },
        /**
         * Checks if passed element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isNumber: function (o) {
            return (typeof o === "number") ? true : false;
        },
        /**
         * Checks if passed element is an object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isObject: function (o) {
            var isObject = false;
            if (this.isString(o) || this.isFunction(o)) {
                return false;
            }
            if (this.isEmptyObject(o)) {
                return true;
            }
            for (var k in o) {
                if (o.hasOwnProperty(k)) {
                    isObject = true;
                    break;
                }
            }
            return isObject;
        },
        /**
         * Checks if passed element is an empty object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isEmptyObject: function (o) {
            var isEmpty = true;
            if (!this.isDefined(o) || this.isBoolean(o) || this.isFunction(o) ||
                this.isNumber(o) || this.isString(o) || Array.isArray(o)) {
                return false;
            }
            for (var k in o) {
                if (o.hasOwnProperty(k)) {
                    isEmpty = false;
                    break;
                }
            }
            return isEmpty;
        },
        /**
        * Checks if passed element is a function
        * @public
        * @memberof TypeCheck
        * @param {Any} o - element to be checked
        * @returns {Boolean} True, if element is a function, false otherwise
        */
        isFunction: function (o) {
            return (typeof o === "function") ? true : false;
        },
        /**
         * Checks if passed element is defined
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is defined, false otherwise
         */
        isDefined: function (o) {
            return (o !== undefined && o != null);
        },
        /**
         * Checks if all elements in this array have the same type
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If options.type is not a string
         * @throws {TypeError} - If options.array is not a string
         * @param {Any[]} array - Array to be checked
         * @param {String} type - Type of elements in this array. Valid values are all which matches 
         *                        to the typeof operator
         * @returns {Boolean} - true if all elements in the array have the same type, false otherwise
         */
        isArrayTypeOf: function (array, type) {
            var isTypeOf = true;
            if (!this.isString(type)) {
                throw new TypeError("options.type is not a string");
            }
            if (!Array.isArray(array)) {
                throw new TypeError("options.array is not an array");
            }
            if (array.length === 0) {
                isTypeOf = false;
            }
            for (var i = 0, length = array.length; i < length; i++) {
                var o = array[i];
                if (typeof o !== type) {
                    isTypeOf = false;
                    break;
                }
            }
            return isTypeOf;
        }
    };
});
define('src/List',["TypeCheck"], function (TypeCheck) {
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
    return List;
});

 	 return require('src/List'); 
}));
