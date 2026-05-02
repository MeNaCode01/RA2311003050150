require('dotenv').config({ path: '../.env' });
const { Log } = require('../logging_middleware/logger');

async function runTests() {
    console.log("Starting tests from notification_app_be...");
    
    try {
        // Test 1: Valid backend log
        console.log("\n--- Test 1: Valid Backend Log ---");
        const res1 = await Log("backend", "error", "handler", "received string, expected bool");
        console.log("Response:", res1);

        // Test 2: Valid backend log with different package
        console.log("\n--- Test 2: Valid Backend Log (fatal) ---");
        const res2 = await Log("backend", "fatal", "db", "Critical database connection failure.");
        console.log("Response:", res2);

        // Test 3: Invalid stack
        console.log("\n--- Test 3: Invalid Stack ---");
        try {
            await Log("mobile", "info", "api", "testing");
        } catch (e) {
            console.log("Caught expected error:", e.message);
        }

        // Test 4: Invalid package for backend
        console.log("\n--- Test 4: Invalid Package for Backend ---");
        try {
            await Log("backend", "info", "component", "testing");
        } catch (e) {
            console.log("Caught expected error:", e.message);
        }

    } catch (err) {
        console.error("Test execution failed:", err);
    }
}

runTests();
