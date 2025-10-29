import express from "express"
import cors from "cors"
import helmet from "helmet";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";


const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.disable("x-powered-by"); // Hide Express server information

// Define routes and corresponding microservices
const services = [
    {
        route: "/api/v1/auth",
        target: "http://localhost:5001",
    },
    {
        route: "/api/v1/users",
        target: "http://localhost:5002",
    },
    {
        route: "/api/v1/chats",
        target: "http://localhost:5003",
    },
];

// Define rate limit constants
const rateLimit = 20; // Max requests per minute
const interval = 60 * 1000; // Time window in milliseconds (1 minute)

// Object to store request counts for each IP address
const requestCounts = {};

// Reset request count for each IP address every 'interval' milliseconds
setInterval(() => {
    Object.keys(requestCounts).forEach((ip) => {
        requestCounts[ip] = 0; // Reset request count for each IP address
    });
}, interval);

function rateLimitAndTimeout(req, res, next) {
    const ip = req.ip;

    requestCounts[ip] = (requestCounts[ip] || 0) + 1;

    // Check if request count exceeds the rate limit
    if (requestCounts[ip] > rateLimit) {
        // Respond with a 429 Too Many Requests status code
        return res.status(429).json({
            code: 429,
            status: "Error",
            message: "Rate limit exceeded.",
            data: null,
        });
    }

    // Set timeout for each request (example: 10 seconds)
    req.setTimeout(15000, () => {
        // Handle timeout error
        res.status(504).json({
            code: 504,
            status: "Error",
            message: "Gateway timeout.",
            data: null,
        });
        req.abort(); // Abort the request
    });

    next(); // Continue to the next middleware
}

// Apply the rate limit and timeout middleware to the proxy
// app.use(rateLimitAndTimeout);

// Set up proxy middleware for each microservice
services.forEach(({ route, target }) => {
    // Proxy options
    const proxyOptions = {
        target,
        changeOrigin: true,
        pathRewrite: {
            [`^/${route}`]: ""
        },
    };

    // Apply rate limiting and timeout middleware before proxying
    app.use(route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Gateway is running on port ${PORT}`);
});