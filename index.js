const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const {
    PORT: port,
    GOOGLE_SHEET_ID: googleSheetId,
} = process.env;

const express = require('express');
const cors = require('cors');
const googleSheetsClient = require('./sheets');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile('./form.html', { root: __dirname });
});

app.post('/save_form', async (req, res) => {
    try {
        const { name, mobile } = req.body;
        // Can validate the fields here if required
        await googleSheetsClient.spreadsheets.values.append({
            spreadsheetId: googleSheetId,
            range: 'Sheet1!A1:B',
            valueInputOption: 'RAW',
            resource: {
                values: [
                    [name, mobile],
                ]
            }
        });
    } catch (err) {
        console.log(err);
    }
    res.redirect('/');
});

app.use((req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
