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

var utils = require('cordova/utils'),
    Contact = require('cordova/plugin/Contact'),
    searchFieldMapping = {
        "ims": ["SEARCH_FIELD_BBMPIN"],
        "emails": ["SEARCH_FIELD_EMAIL"],
        "displayName": ["SEARCH_FIELD_FAMILY_NAME", "SEARCH_FIELD_GIVEN_NAME"],
        "name": ["SEARCH_FIELD_FAMILY_NAME", "SEARCH_FIELD_GIVEN_NAME"],
        "organizations": ["SEARCH_FIELD_ORGANIZATION_NAME"],
        "phoneNumbers": ["SEARCH_FIELD_PHONE"]
    };

module.exports = {
    /**
     * Builds a WebWorks BB10 filter object for contact search using the
     * contact fields and search filter provided.
     *
     * @param {String[]}
     *            fields Array of Contact fields to search
     * @param {String}
     *            filter Filter, or search string
     * @return filter expression or null if fields is empty or filter is null or
     *         empty
     */
    buildFilter: function (fields, filter) {
        var rtn = [];
        if (filter && filter !== "" && fields && utils.isArray(fields)) {
            fields.filter(function (f) {
                return !!searchFieldMapping[f];
            }).forEach(function (f) {
                searchFieldMapping[f].forEach(function (bbf) {
                    var tmpfilter = {
                        "fieldName": blackberry.pim.contacts.ContactFindOptions[bbf],
                        "fieldValue": filter
                    };
                    if (jQuery.grep(rtn, function(compare) {
                        return tmpfilter.fieldName === compare.fieldName && tmpfilter.fieldValue === compare.fieldValue;
                    }).length === 0) {
                        rtn.push(tmpfilter);
                    }
                });
            });
        }

        return rtn;
    }};
