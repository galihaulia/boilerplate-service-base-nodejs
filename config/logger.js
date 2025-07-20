const config = require('config');
const { format } = require('winston');
const winston = require('winston');

const filename = module.filename.split('/').slice(-1);
const options = {
    // file: {
    //     level: 'info',
    //     name: 'file',
    //     datePattern: 'YYYY-MM-DD',
    //     filename: path.join(appRoot, 'logs', 'log_file.log'),
    //     handleExceptions: true,
    //     json: true,
    //     maxsize: 5242880, // 5MB
    //     maxFiles: 5,
    //     colorize: false,
    //     format: format.combine(format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)),
    // },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
};

const logger = new winston.createLogger({
    format: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ level, message, timestamp, stack }) => {
            if (stack) {
                return `${timestamp} ${level}: ${stack}`;
            }
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        //new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

function info(message, payload) {
    //payload must be object
    logger.info(message, createDefaultPayload(payload));
}

function error(message, payload) {
    //payload must be object
    logger.error(message, createDefaultPayload(payload));
}

function warn(message, payload) {
    //payload must be object
    logger.warn(message, createDefaultPayload(payload));
}

function createDefaultPayload(payload) {
    let defaultP = {
        proccessed_service: config.get('SERVICE'),
    };

    // let curr = JSON.parse(JSON.stringify(apm.currentTransaction))
    // if (curr) {
    //     defaultP['transaction.id'] = curr.id
    //     defaultP['trace.id'] = curr.trace_id
    // }
    //add here

    return { ...payload, ...defaultP };
}

module.exports = {
    createDefaultPayload: createDefaultPayload,
    info: info,
    error: error,
    warn: warn,
    stream: logger.stream,
};
