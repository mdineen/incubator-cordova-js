/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

describe("contacts", function () {
    var contacts,
        c;

    beforeEach(function () {
        global.blackberry = {
            pim: {
                contacts: {
                    create: jasmine.createSpy("create").andCallFake(function () { console.log("in the fake"); }),
                    find: jasmine.createSpy("find"),
                    ContactFindOptions: function (filter, sort, limit, favorite) {
                        this.filter = filter || null;
                        this.sort = sort || null;
                        this.limit = limit || -1; // -1 for returning all results
                        this.favorite = favorite || false;
                    }
                }
            }
        };
        Object.defineProperty(global.blackberry.pim.contacts.ContactFindOptions, "SEARCH_FIELD_GIVEN_NAME", { "value": 0 });
        Object.defineProperty(global.blackberry.pim.contacts.ContactFindOptions, "SEARCH_FIELD_FAMILY_NAME", { "value": 1 });
        Object.defineProperty(global.blackberry.pim.contacts.ContactFindOptions, "SEARCH_FIELD_ORGANIZATION_NAME", { "value": 2 });
        Object.defineProperty(global.blackberry.pim.contacts.ContactFindOptions, "SEARCH_FIELD_PHONE", { "value": 3 });
        Object.defineProperty(global.blackberry.pim.contacts.ContactFindOptions, "SEARCH_FIELD_EMAIL", { "value": 4 });
        Object.defineProperty(global.blackberry.pim.contacts.ContactFindOptions, "SEARCH_FIELD_BBMPIN", { "value": 5 });
        Object.defineProperty(global.blackberry.pim.contacts.ContactFindOptions, "SORT_FIELD_FAMILY_NAME", { "value": 1 });

        contacts = require('cordova/plugin/qnx/contacts');
    });

    afterEach(function () {
        global.blackberry = null;
    });

    describe("find", function () {
        it("calls webworks with the correct parameter format", function () {
            var findOptions = {
                    multiple: true,
                    filter: 'Test Filter'
                },
                fields = ["name", "id", "emails"],
                s = function () { },
                f = function () { },
                expectedBBContactFindOptions = {
                    filter: [
                        {
                            fieldName: global.blackberry.pim.contacts.ContactFindOptions.SEARCH_FIELD_FAMILY_NAME,
                            fieldValue: 'Test Filter'
                        }],
                    sort: [
                        {
                            fieldName: global.blackberry.pim.contacts.ContactFindOptions.SORT_FIELD_FAMILY_NAME,
                            desc: false
                        }],
                    limit: -1,
                    favorite: false
                };

            contacts.find(fields, s, f, findOptions);

            expect(blackberry.pim.contacts.find).toHaveBeenCalled();
            expect(blackberry.pim.contacts.find.mostRecentCall.args[0]).toEqual(fields);
            expect(blackberry.pim.contacts.find.mostRecentCall.args[1]).toEqual(expectedBBContactFindOptions);
            expect(blackberry.pim.contacts.find.mostRecentCall.args[2]).toEqual(s);
            expect(blackberry.pim.contacts.find.mostRecentCall.args[3]).toEqual(f);
        });
    });

    describe("create", function () {
        it("calls webworks passing through the object passed to cordova", function () {
            var parms = { "abc": "123" };
            contacts.create(parms);

            waits(1);
            runs(function () {
                expect(blackberry.pim.contacts.create).toHaveBeenCalledWith(parms);
            });
        });
    });
});
