import dotenv from "dotenv";
dotenv.config();

// Import and run express server
import "./shared/infra/http/app";

// Setup Postgres SQL connection
import "./shared/infra/database/createConnection";
