# Student Portfolio Management System

A responsive student portfolio website with three sections:
- **Home:** welcome message and portfolio introduction.
- **About:** education, skills, interests and achievements.
- **Feedback:** validated feedback form connected to a SQLite database.

## Technology used
HTML5, CSS3, JavaScript, Node.js, Express.js and SQLite (`better-sqlite3`).

## Requirements
- Node.js 18 or later
- npm
- VS Code (recommended)

## Run the project
1. Extract this ZIP file.
2. Open the extracted `student-portfolio-management-system` folder in VS Code.
3. Open the VS Code terminal in that folder.
4. Run:

   ```bash
   npm install
   npm start
   ```

5. Open `http://localhost:3000` in your browser.

The SQLite database is created automatically at `database/portfolio.db` the first time the server starts.

## Test feedback storage
1. Open the Feedback section in the browser.
2. Enter a name, valid email, rating and message.
3. Submit the form.
4. A success message appears after the server saves the record.
5. The feedback record is stored in `database/portfolio.db`.

## Customize before submission
In `public/index.html`, replace:
- `Your Name` and `YN` with your name and initials.
- The location, course and university details if needed.
- The sample education, skills, interests and achievements with your actual information.

You can add your own profile photo in `public/images/` and replace the initials-based avatar in the Home section if desired.

## API
- `GET /api/health` — checks whether the server is running.
- `POST /api/feedback` — validates and stores feedback.

Example JSON for `POST /api/feedback`:

```json
{
  "visitorName": "Sample Visitor",
  "email": "visitor@example.com",
  "rating": 5,
  "message": "The portfolio is clear and easy to use."
}
```

## Project notes
This is a starter academic project. Review and understand the code, personalize the portfolio, test it on your computer, and follow your instructor's requirements before submitting. Do not put real visitor information into a public demo without appropriate permission and privacy safeguards.
