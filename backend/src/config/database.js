// import fs from "fs";
// import admin from "firebase-admin";

// const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
// if (!serviceAccountPath || !fs.existsSync(serviceAccountPath)) {
//   console.error("❌ Missing or invalid FIREBASE_SERVICE_ACCOUNT_PATH");
//   process.exit(1);
// }

// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// // Initialize Firebase Admin
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// // Test Firestore write
// (async () => {
//   try {
//     console.log("✅ Firestore connection OK");
//   } catch (err) {
//     console.error("❌ Firestore connection failed:", err);
//   }
// })();

// export default db;