/**
 * Logging Middleware Package
 * 
 * Provides a reusable function to log messages to the evaluation service.
 */

const VALID_STACKS = ['backend', 'frontend'];
const VALID_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'];

const VALID_PACKAGES_BACKEND = [
    'cache', 'controller', 'cron_job', 'db', 'domain',
    'handler', 'repository', 'route', 'service',
    'auth', 'config', 'middleware', 'utils'
];

const VALID_PACKAGES_FRONTEND = [
    'api', 'component', 'hook', 'page', 'state', 'style',
    'auth', 'config', 'middleware', 'utils'
];

/**
 * Log function to send logs to the evaluation server
 * 
 * @param {string} stack - 'backend' or 'frontend'
 * @param {string} level - 'debug', 'info', 'warn', 'error', 'fatal'
 * @param {string} pkg - The package name based on stack constraints
 * @param {string} message - The log message
 * @returns {Promise<any>} The response from the evaluation server
 */
async function Log(stack, level, pkg, message) {
    try {
        // Validation: Stack
        if (!VALID_STACKS.includes(stack)) {
            throw new Error(`Invalid stack: ${stack}. Expected one of: ${VALID_STACKS.join(', ')}`);
        }

        // Validation: Level
        if (!VALID_LEVELS.includes(level)) {
            throw new Error(`Invalid level: ${level}. Expected one of: ${VALID_LEVELS.join(', ')}`);
        }

        // Validation: Package
        if (stack === 'backend' && !VALID_PACKAGES_BACKEND.includes(pkg)) {
            throw new Error(`Invalid package for backend: ${pkg}.`);
        } else if (stack === 'frontend' && !VALID_PACKAGES_FRONTEND.includes(pkg)) {
            throw new Error(`Invalid package for frontend: ${pkg}.`);
        }

        const url = 'http://20.207.122.201/evaluation-service/logs';
        const token = process.env.ACCESS_TOKEN ? process.env.ACCESS_TOKEN.trim() : null;

        if (!token) {
            console.warn("WARNING: process.env.ACCESS_TOKEN is not set. Log will likely fail authentication.");
        }

        const body = {
            stack: stack,
            level: level,
            package: pkg,
            message: message
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Log API Error: ${response.status} - ${JSON.stringify(data)}`);
            throw new Error(`Failed to send log: ${response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error('Logging Middleware Error:', error.message);
        throw error;
    }
}

module.exports = { Log };
