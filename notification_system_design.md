# Notification System Design & Logging Middleware

## Overview
This document outlines the architecture and implementation of the custom Logging Middleware built for our application. The goal is to capture the full lifecycle of application events—from successful operations to errors and debugging info. This allows us to track exactly what's happening under the hood.

## Architecture & Implementation
I designed the middleware as a standalone, reusable package. The main module (`logger.js`) exports a single `Log(stack, level, package, message)` function. 

Before firing off any network request, the function performs strict input validation to ensure the provided stack, log level, and package name match the system constraints. This saves bandwidth and catches coding errors early.

Once the payload is validated, the module retrieves the secure JWT access token from the environment variables (`.env`) and makes an authenticated POST request to the evaluation service API. I opted to use the native Node.js `fetch` API to keep the package lightweight and free of external dependencies like `axios`.

## Testing & Output
I set up a dedicated test script (`index.js` in the backend folder) to verify the integration. It triggers multiple mock logs, including expected failures to test the validation logic.

Here are the output screenshots showing successful logging calls and proper error handling for invalid packages:

![Terminal Output Screenshot 1](./screenshot1.png)

*(Note: Ensure your screenshots are saved in this folder as `screenshot1.png` etc. so they render properly here!)*
