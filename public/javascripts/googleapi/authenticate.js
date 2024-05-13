// Tutorial de credenciales
// https://www.youtube.com/watch?v=eqZyPYlp3nw&ab_channel=ToniDev

const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

var TOKEN_PATH = path.join(process.cwd(), 'public/user_data', 'USER/token.json');
var CREDENTIALS_PATH = path.join(process.cwd(), 'public/user_data', 'USER/credentials.json');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly',
                'https://www.googleapis.com/auth/contacts.readonly'
                ];

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist(user) {
    console.log(TOKEN_PATH.replace('/USER/', `/${user}/`))
    try {
        console.log(`TOKEN`)
        console.log(TOKEN_PATH)
        console.log('TOKEN')
        const content = await fs.readFile(TOKEN_PATH.replace('/USER/', `/${user}/`));
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(user, client) {
    const content = await fs.readFile(CREDENTIALS_PATH.replace('/USER/', `/${user}/`));
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
    await fs.writeFile(TOKEN_PATH.replace('/USER/', `/${user}/`), payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize(user) {
let client = await loadSavedCredentialsIfExist(user);
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH.replace('/USER/', `/${user}/`),
    });
    if (client.credentials) {
        await saveCredentials(user, client);
    }
    return client;
}

module.exports = { authorize }
