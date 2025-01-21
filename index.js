const express = require("express");
const bodyParser = require("body-parser");
const generateRecord = require("./utils.js");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // Parse form submissions

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "/index.html"));
});

// Route to serve the form submission logic
app.post("/submit", (req, res) => {
  const formData = generateRecord();

  // Construct the redirect URL with query parameters
  try {
    const redirectUrl = new URL(req.body.callbackUrl);

    Object.entries(formData).forEach(([key, value]) => {
      redirectUrl.searchParams.append(key, value);
    });

    if (req.body.notes) {
      redirectUrl.searchParams.append("notes", req.body.notes);
    }

    // Redirect to the constructed URL
    res.redirect(redirectUrl.toString());
  } catch (error) {
    res.status(400).send("Invalid callback URL.");
  }
});

// Route to handle dynamic form rendering based on flow
app.post("/dynamicpe/flow", (req, res) => {
  const selectedFlow = req.query.flow;
  const { notes, callbackUrl } = req.body;

  if (selectedFlow === "unsubscribe") {
    return res.send("<h3>Unsubscribe functionality coming soon!</h3>");
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dynamic Form</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f8ff;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .form-container {
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          border: none;
          border-radius: 10px;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
          padding: 30px;
          width: 100%;
          max-width: 400px;
          color: #ffffff;
        }
        h2 {
          margin-bottom: 20px;
          color: #fff;
          text-align: center;
        }
        input[type="text"] {
          padding: 12px;
          margin-bottom: 20px;
          border: none;
          border-radius: 5px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          font-size: 16px;
        }
        input[type="text"]:focus {
          outline: none;
          border: 2px solid #fff;
        }
        button {
          background-color: #ff7f50;
          color: #fff;
          padding: 12px 18px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
        }
        button:hover {
          background-color: #e06a3f;
        }
      </style>
    </head>
    <body>
      <div class="form-container">
        <h2>Submit Your Details</h2>
        <form action="/submit" method="post">
          <input type="text" name="field1" placeholder="Enter Field 1" required />
          <input type="text" name="field2" placeholder="Enter Field 2" required />
          <input type="hidden" type="text" name="notes" value="${notes || ""}" placeholder="Notes" />
          <input type="hidden" name="timestamp" value="${Date.now()}" />
          <input type="hidden" name="callbackUrl" value="${callbackUrl}" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// Start the server
const port = process.env.PORT || 5600;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
