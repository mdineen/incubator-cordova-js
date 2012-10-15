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

describe("ContactField", function () {
    var ContactField;

    beforeEach(function () {
        global.blackberry = {
            pim: {
                contacts: {
                    ContactField: jasmine.createSpy("new")
                }
            }
        };

        ContactField = require('cordova/plugin/qnx/ContactField');
    });
    afterEach(function () {
        global.blackberry = null;
    });

    describe("ctor", function () {
        it("calls webworks with the correct parameter format", function () {
            var field = new ContactField("work", "codeninja@cordova.io");

            expect(global.blackberry.pim.contacts.ContactField).toHaveBeenCalledWith("work", "codeninja@cordova.io");
        });
    });
});