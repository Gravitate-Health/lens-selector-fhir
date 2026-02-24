import express from "express";
import { FocusingRouter } from "./routes/lenses";

var bodyParser = require('body-parser');

const PORT = parseInt(process.env.SERVER_PORT as string) || 3000;
export const FHIR_URL = process.env.FHIR_URL;

const app = express();
app.use(express.json({ limit: '10mb' }))

app.use((req, res, next) => {
    console.log(`\n\n${new Date().toLocaleString()} | Method: ${req.method} | URL: ${req.originalUrl}`);
    next()
})

app.use("/", FocusingRouter);
// exit if FHIR_URL is not defined or is not a valid http URL
try {
    if (!FHIR_URL || !new URL(FHIR_URL).protocol.startsWith("http")) {
        console.error("FHIR_URL environment variable is not defined or is not a valid http URL. Exiting...");
        process.exit(1);
    }
} catch (error) {
    console.error("Error validating FHIR_URL environment variable. Exiting...");
    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`Focusing service TEST listening on port ${PORT}`);
    console.log(`FHIR server URL: ${FHIR_URL}`);
});
