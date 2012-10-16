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

var ContactUtils = require('cordova/plugin/qnx/ContactUtils'),
    allFields = [
    "id",
    "displayName",
    "name",
    "nickname",
    "phoneNumbers",
    "emails",
    "addresses",
    "ims",
    "organizations",
    "birthday",
    "note",
    "photos",
    "categories",
    "urls"];

function findMulti (fields, success, fail, options) {
    var ContactFindOptions = blackberry.pim.contacts.ContactFindOptions,
            filtertext = (options && options.filter) ? options.filter : "",
            filters,
            sort = [{ "fieldName": ContactFindOptions.SORT_FIELD_FAMILY_NAME, "desc": false }],
            limit = (!!options && options.multiple) ? -1 : 1,
            accum = [],
            foundContacts = [],
            bbfindoptions;

    if (fields.length == 1 && fields[0] === "*") {
        // Allow cordova ["*"].
        fields = allFields;
    }

    filters = ContactUtils.buildFilter(fields, filtertext)

    accum = filters.map(function () {
        return undefined;
    })

    filters.forEach(function (filter, index) {
        bbfindoptions = new ContactFindOptions([filter], sort, limit);
        blackberry.pim.contacts.find(fields,
            bbfindoptions,
            function (found) {
                accum[index] = found;
                if (accum.indexOf(undefined) === -1) {
                    accum.forEach(function (resultSet) {
                        resultSet.forEach(function (result) {
                            if (foundContacts.filter(function (f) {
                                return f.id === result.id;
                            }).length === 0 && (limit === -1 || foundContacts.length < limit)) {
                                foundContacts.push(result);
                            }
                        });
                    });
                    success(foundContacts);
                }
            },
            fail);
    });
}

//this version is temporary and allows searches by the first filter hit only.
function primativeFind(fields, success, fail, options) {
    var ContactFindOptions = blackberry.pim.contacts.ContactFindOptions,
            filtertext = (options && options.filter) ? options.filter : "",
            filter,
            sort = [{ "fieldName": ContactFindOptions.SORT_FIELD_FAMILY_NAME, "desc": false }],
            limit = (!!options && options.multiple) ? -1 : 1,
            bbfindoptions;

    if (fields.length == 1 && fields[0] === "*") {
        // Allow cordova ["*"].
        fields = allFields;
    }

    filter = ContactUtils.buildFilter(fields, filtertext);
    bbfindoptions = new ContactFindOptions([filter[0]], sort, limit);

    blackberry.pim.contacts.find(fields,
        bbfindoptions,
        success,
        fail);
}

module.exports = {
    find: findMulti,
    create: blackberry.pim.contacts.create
};
