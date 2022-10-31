const log4js = require('log4js');
const path = require('path')
log4js.configure({
  appenders: {
    sql: {
      //定义一个sql日志出口
      type: "dateFile",
      filename: path.resolve(__dirname, "logs", "logging.log"),
      maxLogSize: 1024 * 1024, //配置文件的最大字节数
      keepFileExt: true,
      layout: {
        type: "pattern",
        pattern: "%c [%d{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n",
      },
    },
  },
  categories: {
    default: {
      appenders: ["sql"],
      level: "debug"
    }
  },
});

process.on("exit", () => {
  log4js.shutdown();
});

const sqlLogger = log4js.getLogger("sql");

exports.sqlLogger = sqlLogger;