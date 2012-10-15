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

describe("ContactUtils", function () {
    var ContactUtils;

    beforeEach(function () {
        global.blackberry = {
            pim: {
                contacts: {
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

        ContactUtils = require('cordova/plugin/qnx/ContactUtils');
    });

    afterEach(function () {
        global.blackberry = null;
    });

    describe("buildFilter", function () {
        it("constructs a webworks filter object based on proper Cordova inputs", function () {
            var filtertext = 'Test Filter',
                fields = ["name", "organizations", "phoneNumbers", "emails", "ims"],
                filter,
                expectedBBFilterObject = [{
                    fieldName: global.blackberry.pim.contacts.ContactFindOptions.SEARCH_FIELD_FAMILY_NAME,
                    fieldValue: filtertext
                }, {
                    fieldName: global.blackberry.pim.contacts.ContactFindOptions.SEARCH_FIELD_GIVEN_NAME,
                    fieldValue: filtertext
                }, {
                    fieldName: global.blackberry.pim.contacts.ContactFindOptions.SEARCH_FIELD_ORGANIZATION_NAME,
                    fieldValue: filtertext
                }, {
                    fieldName: global.blackberry.pim.contacts.ContactFindOptions.SEARCH_FIELD_PHONE,
                    fieldValue: filtertext
                }, {
                    fieldName: global.blackberry.pim.contacts.ContactFindOptions.SEARCH_FIELD_EMAIL,
                    fieldValue: filtertext
                }, {
                    fieldName: global.blackberry.pim.contacts.ContactFindOptions.SEARCH_FIELD_BBMPIN,
                    fieldValue: filtertext
                }];

            filter = ContactUtils.buildFilter(fields, filtertext);

            expect(filter).toEqual(expectedBBFilterObject);

        });

        it("ignores invalid or non-search field values intermixed with valid search fields", function () {
            var filtertext = 'Test Filter',
                fields = ["foo", "name", "bar", "phoneNumbers", "ridiculous", "ims"],
                filter,
                expectedBBFilterObject = [{
                    fieldName: global.blackberry.pim.contacts.ContactFindOptions.SEARCH_FIELD_FAMILY_NAME,
                    fieldValue: filtertext
                }, {
                    fieldName: global.blackberry.pim.contacts.ContactFindOptions.SEARCH_FIELD_GIVEN_NAME,
                    fieldValue: filtertext
                }, {
                    fieldName: global.blackberry.pim.contacts.ContactFindOptions.SEARCH_FIELD_PHONE,
                    fieldValue: filtertext
                }, {
                    fieldName: global.blackberry.pim.contacts.ContactFindOptions.SEARCH_FIELD_BBMPIN,
                    fieldValue: filtertext
                }];

            filter = ContactUtils.buildFilter(fields, filtertext);

            expect(filter).toEqual(expectedBBFilterObject);

        });

    });
});
