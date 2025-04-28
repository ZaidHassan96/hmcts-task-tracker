import { Pool } from "pg";

const createDatabase = async (dbName) => {
  try {
    // Change the connection to the `postgres` database or any other available DB
    const tempPool = new Pool({
      database: "postgres", // Connect to the default "postgres" database to create/drop other databases
    });

    // Check if the database already exists
    const checkDbQuery = `SELECT 1 FROM pg_database WHERE datname = '${dbName}';`;
    const result = await tempPool.query(checkDbQuery);

    if (result.rows.length === 0) {
      // Database doesn't exist, so create it
      const createDbQuery = `CREATE DATABASE ${dbName};`;
      await tempPool.query(createDbQuery);
      console.log(`✅ Database '${dbName}' created successfully.`);
    } else {
      console.log(`✅ Database '${dbName}' already exists.`);
    }

    // Close the temporary connection
    await tempPool.end();
  } catch (err) {
    console.error("Error creating database:", err.message);
    console.error(
      "If you face an error here, please adjust the tempPool configuration in setup.js to ensure it connects to your default 'postgres' database."
    );

    process.exit(1); // Exit with an error code
  }
};

export default createDatabase;
