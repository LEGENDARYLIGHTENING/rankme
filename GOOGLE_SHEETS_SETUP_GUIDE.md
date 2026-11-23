# GMB Review Tracker Setup (Google Sheets + Apps Script)

This system provides **two dedicated sheets**:
1. **Indian Reviews** (50 Clean, natural reviews for Indian friends and network)
2. **Foreign Reviews** (50 High-impact SEO reviews for friends in Finland, Mauritius, Europe, UK, US, Global)

Both sheets include:
- An **interactive checkbox toggle** in Column A (`Done?`) to track what is posted.
- When you or a friend checks the box, the entire row turns **light green** automatically.
- Direct copy-paste review text in Column C.
- The direct GMB Review link in Column D.
- Rating: 5 Stars.
- Zero em or en dashes.

---

## 30-Second Setup in Google Sheets

1. Open a new Google Sheet: Go to **[sheets.new](https://sheets.new)** in your browser.
2. In the top menu, click **Extensions** -> **Apps Script**.
3. Clear out whatever code is inside `Code.gs`.
4. Open [google_apps_script_gmb_sheets.js](file:///Users/mokshparjapati/Desktop/FREELANCE%20WEBSITE/prototype/google_apps_script_gmb_sheets.js) and copy the whole code.
5. Paste it into the Apps Script editor.
6. The script is already pre-configured with your exact Google review link (`https://share.google/CNLAjQV1rH1I9zvLT`).
7. Click the **Save** icon, then click the **Run** button at the top.
8. If Google asks for authorization, click **Review Permissions** -> Choose your Google Account -> **Advanced** -> **Go to Untitled project (unsafe)** -> **Allow**.
9. Switch back to your Google Sheet: Both **Indian Reviews** and **Foreign Reviews** tabs are created, formatted with checkboxes, styling, and text wrapping!

---

## Direct CSV Files (Can be opened in Excel or imported directly)

* **Indian Reviews CSV**: [GMB_REVIEWS_INDIAN.csv](file:///Users/mokshparjapati/Desktop/FREELANCE%20WEBSITE/prototype/GMB_REVIEWS_INDIAN.csv)
* **Foreign Reviews CSV**: [GMB_REVIEWS_FOREIGN.csv](file:///Users/mokshparjapati/Desktop/FREELANCE%20WEBSITE/prototype/GMB_REVIEWS_FOREIGN.csv)
* **Google Apps Script File**: [google_apps_script_gmb_sheets.js](file:///Users/mokshparjapati/Desktop/FREELANCE%20WEBSITE/prototype/google_apps_script_gmb_sheets.js)
