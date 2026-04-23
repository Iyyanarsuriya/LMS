import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function initDB() {
  console.log("🚀 Connecting to MySQL...");
  console.log(`Config: User=${process.env.DB_USER}, Host=${process.env.DB_HOST}, DB=${process.env.DB_NAME}`);

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    multipleStatements: true // Allow multiple statements if needed
  });

  try {
    console.log("✅ Connected! Starting database initialization...");

    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || "lms_db"}\``);
    await connection.query(`USE \`${process.env.DB_NAME || "lms_db"}\``);

    // Read schema file
    const schemaPath = path.join(__dirname, "..", "database", "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    // Remove the CREATE DATABASE and USE lines from schema as we handled them
    const schemaWithoutDBInit = schema
      .split("\n")
      .filter(line => !line.startsWith("CREATE DATABASE") && !line.startsWith("USE"))
      .join("\n");

    const queries = schemaWithoutDBInit
      .split(";")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    for (const query of queries) {
      try {
        await connection.query(query);
        const lines = query.split("\n");
        const firstLine = (lines[0] || "").substring(0, 50);
        console.log(`✅ Executed: ${firstLine}...`);
      } catch (err: any) {
        console.error(`❌ Error executing query: ${err.message}`);
      }
    }

    console.log("✨ Database initialization completed successfully!");
  } catch (error) {
    console.error("💥 Failed to initialize database:", error);
  } finally {
    await connection.end();
  }
}

initDB();
