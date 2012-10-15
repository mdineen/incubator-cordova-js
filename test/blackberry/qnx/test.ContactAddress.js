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

describe("ContactAddress", function () {
    var ContactAddress,
        parms = {
            "type": null,
            "streetAddress": "44568 N East Parkway",
            "locality": "Memphis",
            "region": "TN",
            "postalCode": "57842",
            "country": "USA"
        };

    beforeEach(function () {
        global.blackberry = {
            pim: {
                contacts: {
                    ContactAddress: jasmine.createSpy("new")
                }
            }
        };
        Object.defineProperty(global.blackberry.pim.contacts.ContactAddress, "HOME", { "value": "home" });
        Object.defineProperty(global.blackberry.pim.contacts.ContactAddress, "WORK", { "value": "work" });
        Object.defineProperty(global.blackberry.pim.contacts.ContactAddress, "OTHER", { "value": "other" });

        parms.type = global.blackberry.pim.contacts.ContactAddress.HOME;

        ContactAddress = require('cordova/plugin/qnx/ContactAddress');
    });

    afterEach(function () {
        global.blackberry = null;
    });

    describe("ctor", function () {
        it("calls webworks with the correct parameter format", function () {
            var address = new ContactAddress(false, parms.type, null, parms.streetAddress, parms.locality, parms.region, parms.postalCode, parms.country);

            expect(global.blackberry.pim.contacts.ContactAddress).toHaveBeenCalledWith(parms);
        });
    });
});