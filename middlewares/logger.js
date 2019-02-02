const winston = require('winston');
const expressWinston = require('express-winston');

module.exports = (logLevel) => {
    return expressWinston.logger({
        level: logLevel,
        transports: [
            new winston.transports.Console()
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
        meta: false,
        msg: "HTTP {{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms"
    });
}