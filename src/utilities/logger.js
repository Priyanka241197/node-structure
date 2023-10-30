var winston = require('winston');

winston.loggers.add('logger', {
    transports: [
        new winston.transports.Console({ level: 'info', colorize:true }),
        new winston.transports.Console({ level:'error', colorize:true}),
        new winston.transports.File({ filename: 'logger_info.log' })
    ]
});
var logger = winston.loggers.get("logger");
exports.info = function(msg) {
    logger.info(msg);
};

exports.error = function(msg){
    logger.error(msg)
}
