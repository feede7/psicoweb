// QuickStart Calendar API
// https://developers.google.com/calendar/api/quickstart/nodejs?hl=es_419

const {google} = require('googleapis');

let event_list = []

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth) {
    const calendar = google.calendar({version: 'v3', auth});
    const res = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
        }
    );
    const events = res.data.items;
    if (!events || events.length === 0) {
        console.log('No upcoming events found.');
        return;
    }
    // console.log('Upcoming 10 events:');
    events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
            event_list.push(`${start} - ${event.summary}`)
        }
    );
}

module.exports = {listEvents, event_list}
