define(["List"], function (List) {
    describe('List.spec.js', function () {
        var list = {},
            testElementOne = {
                name: "elementOne",
                index: 0
            },
            testElementTwo = {
                name: "elementTwo",
                index: 1
            },
            testElementThree = {
                name: "elementThree",
                index: 2
            },
            wrongIdElement = {
                id: "wrongIdProperty"
            };
        beforeEach(function () {
            list = new List({ idProperty: "name" });
        });
        describe("List Constructor", function () {
            it("Is initialised correctly, if valid options are passed", function () {
                var l = new List({
                    idProperty: "id"
                });
                expect(l._idProperty === "id").toBe(true);
                expect(Array.isArray(l._list)).toBe(true);
            });
            it("Maintains array as list, if it is passed to constructor", function () {
                var l = new List({
                    idProperty: "id",
                    list: [{ name: "iamlist" }]
                });
                expect(Array.isArray(l._list)).toBe(true);
                expect(l._list[0].name).toEqual("iamlist");
            });
            it("Duplicate checking is enabbled", function () {
                var l = new List({
                    idProperty: "name",
                    checkDuplicates: true
                });
                expect(l._checkDuplicates).toBe(true);
            });
            it("Duplicate checking is disabled", function () {
                var l = new List({
                    idProperty: "name",
                    checkDuplicates: false
                });
                expect(l._checkDuplicates).toBe(false);
            });
            it("Duplicate checking is disabled, if it is not set explicitly", function () {
                var l = new List({
                    idProperty: "name"
                });
                expect(l._checkDuplicates).toBe(false);
            });
            it("Throws exception, if something else as a string is passed as idProperty", function () {
                try {
                    var l = new List({ // jshint ignore:line
                        idProperty: 2
                    });
                } catch (e) {
                    expect(e instanceof Error).toBe(true);
                }
            });
            it("Throws exception, if nothing is passed to the constructor", function () {
                try {
                    var l = new List(); // jshint ignore:line
                } catch (e) {
                    expect(e instanceof Error).toBe(true);
                }
            });
            it("Throws exception, if not a array is passed for maintenance", function () {
                try {
                    var l = new List({
                        idProperty: "id",
                        list: { name: "iShouldBeAList" }
                    });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("List.prototype.addElement", function () {
            it("Adds element to list", function () {
                expect(list.addElement(testElementOne)).toBe(true);
                expect(list._list.length === 1).toBe(true);
                expect(list.addElement(testElementTwo)).toBe(true);
                expect(list._list.length === 2).toBe(true);
                expect(list.addElement(testElementThree)).toBe(true);
                expect(list._list.length === 3).toBe(true);
            });
            it("Adds element to list, if its id is already in the list and duplicate check is disabled", function () {
                var l = new List({
                    idProperty: "name",
                    checkDuplicates: false
                });
                l.addElement(testElementOne);
                l.addElement(testElementTwo);
                l.addElement(testElementThree);
                expect(l.addElement(testElementOne)).toBe(true);
            });
            it("Ignores element, if it doesnt contain the right id property", function () {
                expect(list.addElement(wrongIdElement)).toBe(false);
            });
            it("Ignores element, if its id is already in the list and duplicate check is enabled", function () {
                var l = new List({
                    idProperty: "name",
                    checkDuplicates: true
                });
                l.addElement(testElementOne);
                l.addElement(testElementTwo);
                l.addElement(testElementThree);
                expect(l.addElement(testElementOne)).toBe(false);
            });
            it("Throws exception, if something else as an object shall be added to the list", function () {
                try {
                    list.addElement("");
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.addElement(1);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.addElement(undefined);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.addElement(null);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.addElement(function () { });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.forEachElement();
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("List.prototype.prependElement", function () {
            it("Prepends element to list", function () {
                expect(list.prependElement(testElementOne)).toBe(true);
                expect(list._list.length === 1).toBe(true);
                expect(list.prependElement(testElementTwo)).toBe(true);
                expect(list._list.length === 2).toBe(true);
                expect(list.indexOf(testElementTwo) === 0).toBe(true);
                expect(list.prependElement(testElementThree)).toBe(true);
                expect(list._list.length === 3).toBe(true);
                expect(list.indexOf(testElementThree) === 0).toBe(true);
            });
            it("Prepends element to list, if its id is already in the list and duplicate check is disabled", function () {
                var l = new List({
                    idProperty: "name",
                    checkDuplicates: false
                });
                l.prependElement(testElementOne);
                l.prependElement(testElementTwo);
                l.prependElement(testElementThree);
                expect(l.prependElement(testElementOne)).toBe(true);
            });
            it("Ignores element, if it doesnt contain the right id property", function () {
                expect(list.prependElement(wrongIdElement)).toBe(false);
            });
            it("Ignores element, if its id is already in the list and duplicate check is enabled", function () {
                var l = new List({
                    idProperty: "name",
                    checkDuplicates: true
                });
                l.prependElement(testElementOne);
                l.prependElement(testElementTwo);
                l.prependElement(testElementThree);
                expect(l.prependElement(testElementOne)).toBe(false);
            });
            it("Throws exception, if something else as an object shall be prepended to the list", function () {
                try {
                    list.prependElement("");
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.prependElement(1);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.prependElement(undefined);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.prependElement(null);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.prependElement(function () { });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.prependElement();
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("List.prototype.getElement", function () {
            it("Provides the requested element", function () {
                list.addElement(testElementOne);
                var elem = list.getElement(testElementOne.name);
                expect(elem.name === testElementOne.name).toBe(true);
            });
            it("Provides null, if an element request have no result", function () {
                list.addElement(testElementOne);
                var elem = list.getElement("123");
                expect(elem).toBeNull();
            });
            it("Throws exception, if number is passed as request id", function () {
                list.addElement(testElementOne);
                try {
                    var elem = list.getElement(123); // jshint ignore:line
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("List.prototype.updateElement", function () {
            it("Updates an element", function () {
                list.addElement({ name: "1", value: 1 });
                expect(list.updateElement({ name: "1", value: 2 })).toBe(true);
                var e = list.getElement("1");
                expect(e.value === 2).toBe(true);
            });
            it("Dont update if element has no id property", function () {
                list.addElement({ name: "1", value: 1 });
                expect(list.updateElement({ value: 2 })).toBe(false);
            });
            it("Throws exception, if something else as an object for updating", function () {
                try {
                    list.updateElement("");
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.updateElement(1);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.updateElement(function () { });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.updateElement(undefined);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.updateElement(null);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.updateElement();
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("List.prototype.deleteElement", function () {
            it("Deletes element from list", function () {
                list.addElement(testElementOne);
                expect(list.deleteElement(testElementOne.name)).toBe(true);
                expect(list._list.length === 0).toBe(true);
            });
            it("Deletes nothing if a id is passed which is not maintained by the list", function () {
                list.addElement(testElementOne);
                expect(list.deleteElement(testElementTwo.name)).toBe(false);
                expect(list._list.length === 0).toBe(false);
            });
            it("Throws error, if number is passed as id", function () {
                try {
                    var elem = list.deleteElement(123); // jshint ignore:line
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("List.prototype.containsElement", function () {
            it("Provides true, if element is part of the list", function () {
                list.addElement(testElementOne);
                expect(list.containsElement(testElementOne.name)).toBe(true);
            });
            it("Provides false, if element is not part of the list", function () {
                list.addElement(testElementOne);
                expect(list.deleteElement(testElementTwo.name)).toBe(false);
            });
            it("Throws error, if not a string is passed as id", function () {
                try {
                    var elem = list.containsElement(123); // jshint ignore:line
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("List.prototype.deleteAll", function () {
            it("Deletes all elements from the list", function () {
                list.addElement(testElementOne);
                list.addElement(testElementTwo);
                list.addElement(testElementThree);
                expect(list.deleteAll()).toBe(true);
            });
            it("Deletes nothing, if list is empty", function () {
                expect(list.deleteAll()).toBe(false);
            });
        });
        describe("List.prototype.forEachElement", function () {
            it("Iterates through all elements which are maintained by the list", function () {
                list.addElement(testElementOne);
                list.addElement(testElementTwo);
                list.addElement(testElementThree);
                list.forEachElement(function (element, index) {
                    expect(element).not.toBeUndefined();
                    expect(index === element.index).toBe(true);
                });
            });
            it("Throws exception, if something else is passed as callback", function () {
                try {
                    list.forEachElement("");
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.forEachElement(1);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.forEachElement(undefined);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.forEachElement(null);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
                try {
                    list.forEachElement();
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("List.prototype.toArray", function () {
            beforeEach(function () {
                list = new List({ idProperty: "name" });
            });
            it("Provides an array, which contains the values from the list", function () {
                list.addElement({ name: "test1" });
                list.addElement({ name: "test2" });
                list.addElement({ name: "test3" });
                var a = list.toArray();
                expect(Array.isArray(a)).toBe(true);
                expect(a.length).toEqual(3);
                expect(a[0].name).toEqual("test1");
                expect(a[1].name).toEqual("test2");
                expect(a[2].name).toEqual("test3");
            });
        });
        describe("List.prototype.indexOf", function () {
            beforeEach(function () {
                list = new List({ idProperty: "name" });
            });
            it("Provides index of element within the list", function () {
                var one = { name: "test1" }, two = { name: "test2" }, three = { name: "test3" };
                list.addElement(one);
                list.addElement(two);
                list.addElement(three);
                expect(list.indexOf(one)).toEqual(0);
                expect(list.indexOf(two)).toEqual(1);
                expect(list.indexOf(three)).toEqual(2);
            });
            it("Provides -1 if element is not within the list", function () {
                var one = { name: "test1" }, two = { name: "test2" }, three = { name: "test3" };
                list.addElement(one);
                list.addElement(two);
                expect(list.indexOf(one)).toEqual(0);
                expect(list.indexOf(two)).toEqual(1);
                expect(list.indexOf(three)).toEqual(-1);
            });
            it("Throws TypeError, if provided element is not an object", function () {
                try {
                    list.indexOf(1);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("List.prototype.moveIndex", function () {
            beforeEach(function () {
                list = new List({ idProperty: "name" });
            });
            it("Moves element within the list", function () {
                var one = { name: "test1" }, two = { name: "test2" }, three = { name: "test3" },
                    four = { name: "test4" }, five = { name: "test5" };
                list.addElement(one);
                list.addElement(two);
                list.addElement(three);
                list.addElement(four);
                list.addElement(five);
                list.moveIndex(3, 1);

                var arr = list.toArray();
                expect(arr[1].name).toEqual("test4");
            });
            it("Throws TypeError, If currentIndex is not a number", function () {
                try {
                    list.moveIndex("1", 2);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("Throws TypeError, If newIndex is not a number", function () {
                try {
                    list.moveIndex(1, "2");
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("Throws Error, If currentIndex is negative", function () {
                try {
                    list.moveIndex(-1, 2);
                } catch (e) {
                    expect(e instanceof Error).toBe(true);
                }
            });
            it("Throws Error, If newIndex is not a number", function () {
                try {
                    list.moveIndex(1, -1);
                } catch (e) {
                    expect(e instanceof Error).toBe(true);
                }
            });
            it("Throws Error, If currentIndex is bigger then list length", function () {
                try {
                    list.moveIndex(900, 2);
                } catch (e) {
                    expect(e instanceof Error).toBe(true);
                }
            });
            it("Throws Error, If newIndex is bigger then list length", function () {
                try {
                    list.moveIndex(1, 900);
                } catch (e) {
                    expect(e instanceof Error).toBe(true);
                }
            });
        });
        describe("List.prototype.sort", function () {
            beforeEach(function () {
                list = new List({ idProperty: "id" });
            });
            it("sorts the array correctly", function () {
                var one = { id: "1", no: 1 },
                    two = { id: "2", no: 2 },
                    three = { id: "3", no: 3 },
                    four = { id: "4", no: 4 },
                    five = { id: "5", no: 5 };

                list.addElement(one);
                list.addElement(three);
                list.addElement(four);
                list.addElement(five);
                list.addElement(two);

                var result = list.sort(function (a, b) {
                    if (a.no < b.no) {
                        return -1;
                    }
                    if (a.no > b.no) {
                        return 1;
                    }
                    return 0;
                });



                var a = [], isSorted = true;

                list.forEachElement(function (o, i) {
                    if (o.no === i + 1) {
                        a.push(true);
                    } else {
                        a.push(false);
                    }
                });
                for (var i = 0; i < a.length; i++) {
                    if (a[i] === false) {
                        isSorted = false;
                    }
                }
                expect(isSorted).toBe(true);
            });

            it("Throws TypeError, If fn is not a function", function () {
                try {
                    list.sort(undefined);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("List.prototype.sortByNumber", function () {
            beforeEach(function () {
                list = new List({ idProperty: "id" });
            });
            it("sorts the array ascending", function () {
                var one = { id: "1", no: 1 },
                    two = { id: "2", no: 2 },
                    three = { id: "3", no: 3 },
                    four = { id: "4", no: 4 },
                    five = { id: "5", no: 5 };

                list.addElement(one);
                list.addElement(three);
                list.addElement(four);
                list.addElement(five);
                list.addElement(two);

                list.sortByNumber("no", list.sortType.ASCENDING);

                var a = [], isSorted = true;

                list.forEachElement(function (o, i) {
                    if (o.no === i + 1) {
                        a.push(true);
                    } else {
                        a.push(false);
                    }
                });
                for (var i = 0; i < a.length; i++) {
                    if (a[i] === false) {
                        isSorted = false;
                    }
                }
                expect(isSorted).toBe(true);
            });
            it("sorts the array descending", function () {
                var one = { id: "1", no: 1 },
                    two = { id: "2", no: 2 },
                    three = { id: "3", no: 3 },
                    four = { id: "4", no: 4 },
                    five = { id: "5", no: 5 };

                list.addElement(one);
                list.addElement(three);
                list.addElement(four);
                list.addElement(five);
                list.addElement(two);

                list.sortByNumber("no", list.sortType.DESCENDING);

                var a = [], isSorted = true, length = list.length;

                list.forEachElement(function (o, i) {
                    if (o.no === length) {
                        a.push(true);
                    } else {
                        a.push(false);
                    }
                    length--;
                });
                for (var i = 0; i < a.length; i++) {
                    if (a[i] === false) {
                        isSorted = false;
                    }
                }
                expect(isSorted).toBe(true);
            });
            it("Throws TypeError, If parameters are invalid", function () {
                try {
                    list.sort(undefined, undefined);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("After instantiation,", function () {
            describe("when values are added,", function () {
                beforeEach(function () {
                    list = new List({ idProperty: "name" });
                });
                it("property <length> provides the amount of elements within the list", function () {
                    list.addElement({ name: "test" });
                    expect(list.length).toEqual(1);
                    list.addElement({ name: "test1" });
                    list.addElement({ name: "test2" });
                    list.addElement({ name: "test3" });
                    expect(list.length).toEqual(4);
                    list.deleteElement("test1");
                    expect(list.length).toEqual(3);
                    list.deleteElement("test2");
                    list.deleteElement("test3");
                    expect(list.length).toEqual(1);
                });
            })
        });
    });
});

