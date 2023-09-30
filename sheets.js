const { google } = require('googleapis');

const {
    GOOGLE_CLIENT_ID: clientId,
    GOOGLE_CLIENT_SECRET: clientSecret,
    GOOGLE_REFRESH_TOKEN: refreshToken,
} = process.env;

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
oAuth2Client.setCredentials({ refresh_token: refreshToken });

module.exports = google.sheets({ version: 'v4', auth: oAuth2Client });
