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
        describe("List", function () {
            it("TODO: Check if all methods are available | EXPECTATION: List has all necessary methods", function () {
                // Member
                expect(list._list).not.toBeUndefined();
                expect(list._idProperty).not.toBeUndefined();

                // Prüft, ob alle Member vorhanden sind
                var memberCount = Object.keys(list).length;
                expect(memberCount).toEqual(numberOfMembers);

                // Methoden
                expect(list.addElement).not.toBeUndefined();
                expect(list.getElement).not.toBeUndefined();
                expect(list.updateElement).not.toBeUndefined();
                expect(list.deleteElement).not.toBeUndefined();
                expect(list.deleteAll).not.toBeUndefined();
                expect(list.forEachElement).not.toBeUndefined();

                // Prüft ob die 
                var methodCount = Object.keys(Object.getPrototypeOf(list)).length;
                expect(methodCount).toEqual(numberOfMethods);
            });
        });
        describe("List Constructor", function () {
            it("TODO: Pass valid options to constructor | EXPECTATION: IdProperty and internal array are initialised", function () {
                var l = new List({
                    idProperty: "id"
                });
                expect(l._idProperty === "id").toBe(true);
                expect(Array.isArray(l._list)).toBe(true);
            });
            it("TODO: Pass not a string as id property to constructor | EXPECTATION: Exception is thrown, IdProperty is mandatory", function () {
                try {
                    var l = new List({ // jshint ignore:line
                        idProperty: 2
                    });
                } catch (e) {
                    expect(e instanceof Error).toBe(true);
                }
            });
            it("TODO: Pass nothing to constructor | EXPECTATION: Exception is thrown", function () {
                try {
                    var l = new List(); // jshint ignore:line
                } catch (e) {
                    expect(e instanceof Error).toBe(true);
                }
            });
            it("TODO: Pass an array to constructor | EXPECTATION: array is now maintained by list", function () {
                var l = new List({
                    idProperty: "id",
                    list: [{ name: "iamlist" }]
                });
                expect(Array.isArray(l._list)).toBe(true);
                expect(l._list[0].name).toEqual("iamlist");
            });
            it("TODO: Pass not a list to constructor | EXPECTATION: Throws type error", function () {
                try {
                    var l = new List({
                        idProperty: "id",
                        list: { name: "iShouldBeAList" }
                    });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("TODO: Set check duplicate true | EXPECTATION: Duplicate checking is enabled", function () {
                var l = new List({
                    idProperty: "name",
                    checkDuplicates: true
                });
                expect(l._checkDuplicates).toBe(true);
            });
            it("TODO: Set check duplicate false | EXPECTATION: Duplicate checking is disabled", function () {
                var l = new List({
                    idProperty: "name",
                    checkDuplicates: false
                });
                expect(l._checkDuplicates).toBe(false);
            });
            it("TODO: Set check duplicate not explicit | EXPECTATION: Duplicate checking is disabled", function () {
                var l = new List({
                    idProperty: "name",
                    checkDuplicates: false
                });
                expect(l._checkDuplicates).toBe(false);
            });
        });
        describe("List.prototype.addElement", function () {
            it("TODO: Add elements to list | EXPECTATION: incrementation of internal lists length", function () {
                expect(list.addElement(testElementOne)).toBe(true);
                expect(list._list.length === 1).toBe(true);
                expect(list.addElement(testElementTwo)).toBe(true);
                expect(list._list.length === 2).toBe(true);
                expect(list.addElement(testElementThree)).toBe(true);
                expect(list._list.length === 3).toBe(true);
            });
            it("TODO: Add element to list which not contains id property | EXPECTATION: element not added to list", function () {
                expect(list.addElement(wrongIdElement)).toBe(false);
            });
            it("TODO: Add element to list which contains duplicate id value | EXPECTATION: element not added to list", function () {
                var l = new List({
                    idProperty: "name",
                    checkDuplicates: true
                });
                l.addElement(testElementOne);
                l.addElement(testElementTwo);
                l.addElement(testElementThree);
                expect(l.addElement(testElementOne)).toBe(false);
            });
            it("TODO: Pass something else instead of object | EXPECTATION: Throws type error", function () {
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
            it("TODO: Get element | EXPECTATION: Provides the element", function () {
                list.addElement(testElementOne);
                var elem = list.getElement(testElementOne.name);
                expect(elem.name === testElementOne.name).toBe(true);
            });
            it("TODO: Pass wrong id | EXPECTATION: Result is null", function () {
                list.addElement(testElementOne);
                var elem = list.getElement("123");
                expect(elem).toBeNull();
            });
            it("TODO: Pass number as id | EXPECTATION: Throws type error", function () {
                list.addElement(testElementOne);
                try {
                    var elem = list.getElement(123); // jshint ignore:line
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("List.prototype.updateElement", function () {
            it("TODO: Pass an updated object | EXPECTATION: Object in list is updated", function () {
                list.addElement({ name: "1", value: 1 });
                expect(list.updateElement({ name: "1", value: 2 })).toBe(true);
                var e = list.getElement("1");
                expect(e.value === 2).toBe(true);
            });
            it("TODO: Pass an object which not contains id property| EXPECTATION: Returns false", function () {
                list.addElement({ name: "1", value: 1 });
                expect(list.updateElement({ value: 2 })).toBe(false);
            });
            it("TODO: Pass something else than an object | EXPECTATION: Throws type error", function () {
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
            it("TODO: Delete Element from List | EXPECTATION: Element is removed from list", function () {
                list.addElement(testElementOne);
                expect(list.deleteElement(testElementOne.name)).toBe(true);
                expect(list._list.length === 0).toBe(true);
            });
            it("TODO: Pass wrong id to List | EXPECTATION: Element is not removed, because it is not in", function () {
                list.addElement(testElementOne);
                expect(list.deleteElement(testElementTwo.name)).toBe(false);
                expect(list._list.length === 0).toBe(false);
            });
            it("TODO: Pass number as id | EXPECTATION: Throws type error", function () {
                try {
                    var elem = list.deleteElement(123); // jshint ignore:line
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("List.prototype.deleteAll", function () {
            it("TODO: Delete all elements | EXPACTATION: All elements are removed from the internal array", function () {
                list.addElement(testElementOne);
                list.addElement(testElementTwo);
                list.addElement(testElementThree);
                expect(list.deleteAll()).toBe(true);
            });
            it("TODO: Delete all elements when list is empty | EXPACTATION: Nothing happens", function () {
                expect(list.deleteAll()).toBe(false);
            });
        });
        describe("List.prototype.forEachElement", function () {
            it("TODO: Add elements and iterate through them | EXPECTATION: Iteration is successful", function () {
                list.addElement(testElementOne);
                list.addElement(testElementTwo);
                list.addElement(testElementThree);
                list.forEachElement(function (element, index) {
                    expect(element).not.toBeUndefined();
                    expect(index === element.index).toBe(true);
                });
            });
            it("TODO: Pass something else as a function as callback | EXPECTATION: Throws type error", function () {
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
    });
});

