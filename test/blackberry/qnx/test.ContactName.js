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

describe("ContactName", function () {
    var ContactName,
        parms = {
            "formatted" : "Gozer Gozerian",
            "familyName": "Gozerian",
            "givenName": "Gozer",
            "middleName": "The",
            "honorificPrefix": "Mrs",
            "honorificSuffix": "NLM"
        };

    beforeEach(function () {
        global.blackberry = {
            pim: {
                contacts: {
                    ContactName: jasmine.createSpy("new")
                }
            }
        };

        ContactName = require('cordova/plugin/qnx/ContactName');
    });

    afterEach(function () {
        global.blackberry = null;
    });

    describe("ctor", function () {
        it("calls webworks with the correct parameter format", function () {
            var name = new ContactName(parms.givenName + " " + parms.familyName, parms.familyName, parms.givenName, parms.middleName, parms.honorificPrefix, parms.honorificSuffix);

            expect(global.blackberry.pim.contacts.ContactName).toHaveBeenCalledWith(parms);
        });
    });
});