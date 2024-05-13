const {google} = require('googleapis');

let contact_dict = {}

/**
 * Print the display name if available for 10 connections.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listConnectionNames(auth) {
    const service = google.people({version: 'v1', auth});
    // How to ask: https://developers.google.com/people/api/rest/v1/people.connections/list
    // personFields: https://developers.google.com/people/api/rest/v1/people.connections/list#query-parameters
    // sortOrder: https://developers.google.com/people/api/rest/v1/people.connections/list#sortorder
    const res = await service.people.connections.list({
        resourceName: 'people/me',
        pageSize: 10,
        personFields: 'names,phoneNumbers,memberships',
        sortOrder: 'LAST_MODIFIED_DESCENDING' // https://developers.google.com/people/api/rest/v1/people.connections/list#sortorder
        }
    );
    const connections = res.data.connections;
    if (!connections || connections.length === 0) {
        console.log('No connections found.');
        return;
    }
    // console.log('Connections:');
    // console.log(connections[1].memberships[0]);
    connections.forEach((person) => {
            if (person.names && person.names.length > 0) {
                contact_dict[person.names[0].displayName] = {}
            } else {
                console.log('No display name found for connection.');
            }
            let contact = contact_dict[person.names[0].displayName]
            if (person.phoneNumbers && person.phoneNumbers.length > 0) {
                contact['number'] = person.phoneNumbers[0].canonicalForm
            } else {
                console.log('No display phoneNumber found for connection.');
            }
            contact['groupId'] = person.memberships[0].contactGroupMembership.contactGroupId
        }
    );
}

module.exports = {listConnectionNames, contact_dict}
