import { Pool } from "pg";

const createDatabase = async (dbName) => {
  try {
    // Change the connection to the `postgres` database or any other available DB
    const tempPool = new Pool({
      database: "postgres", // Connect to the default "postgres" database to create/drop other databases
    });

    // First, drop the database if it exists
    const dropDbQuery = `DROP DATABASE IF EXISTS ${dbName};`;
    await tempPool.query(dropDbQuery);

    // Now, create the database
    const createDbQuery = `CREATE DATABASE ${dbName};`;
    await tempPool.query(createDbQuery);

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
