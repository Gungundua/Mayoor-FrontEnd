import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Firebase Admin SDK configuration
import serviceAccount from "./firebase-service-account.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

const allowedDomains = ["gitjaipur.com"]; // Allowed domains

app.post("/verifyToken", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;
    const domain = email.split("@")[1]; // Extract domain

    if (allowedDomains.includes(domain)) {
      res.status(200).send({ message: "User verified", user: decodedToken });
    } else {
      res.status(403).send({ message: "Access denied: Unauthorized domain." });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).send({ message: "Unauthorized" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});