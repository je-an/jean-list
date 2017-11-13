define(["List"], function (List) {
    describe('List.spec.js', function () {
        var list = {},
            numberOfMembers = 3,
            numberOfMethods = 6,
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
            it("Provides an array, which contains the values from the list", function(){
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

