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

describe("ContactOrganization", function () {
    var ContactOrganization,
        parms = {
            "name": "Apache Software Foundation",
            "department": "Cordova Development",
            "title": "Contributor"
        };

    beforeEach(function () {
        global.blackberry = {
            pim: {
                contacts: {
                    ContactOrganization: jasmine.createSpy("new")
                }
            }
        };

        ContactOrganization = require('cordova/plugin/qnx/ContactOrganization');
    });

    afterEach(function () {
        global.blackberry = null;
    });

    describe("ctor", function () {
        it("calls webworks with the correct parameter format", function () {
            var organization = new ContactOrganization(false, "", parms.name, parms.department, parms.title);

            expect(global.blackberry.pim.contacts.ContactOrganization).toHaveBeenCalledWith(parms);
        });
    });
});