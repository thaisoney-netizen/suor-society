# Signup backup to a Google Sheet

This is an optional safety net. When it is on, every email signup (home form,
dispatch form, and the race-guide PDF gate) is also written as a row in a
Google Sheet you own. It runs alongside Buttondown and the notification email,
so an address survives even if the other layers fail.

No Google API keys or service accounts are stored in the site. The site only
knows one thing: a webhook URL. A small Google Apps Script attached to your
sheet receives the signup and appends the row.

## One-time setup (about 5 minutes)

1. Create a new Google Sheet (sheet.new). Name it something like
   `Suor Society signups`.
2. In the first row, add headers: `date`, `email`, `source`.
3. Go to **Extensions > Apps Script**. Delete whatever is there and paste this:

   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([data.date || new Date().toISOString(), data.email, data.source]);
     return ContentService
       .createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. Click **Deploy > New deployment**. Choose type **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**, authorize when prompted, and copy the **Web app URL**
     (it ends in `/exec`).
5. In Vercel > your project > Settings > Environment Variables, add:
   - `SIGNUP_SHEET_WEBHOOK` = the Web app URL you copied
   - Apply it to the Production environment, then redeploy.

## Test it

Submit your own email through a form on the live site. A new row should appear
in the sheet within a few seconds. If it does not, open the Apps Script project
and check **Executions** for errors, and confirm the deployment access is set
to "Anyone".

## Notes

- The webhook URL is a shared secret. Anyone who has it can append rows, so keep
  it in Vercel env vars only, not in the repo.
- To change the sheet later, redeploy the Apps Script (or make a new
  deployment) and update `SIGNUP_SHEET_WEBHOOK`.
