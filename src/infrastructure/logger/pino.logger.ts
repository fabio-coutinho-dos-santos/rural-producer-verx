import pino from 'pino';

const customLevels = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

const customLogger = pino({
  customLevels,
  level: 'trace',
  useOnlyCustomLevels: true,
  formatters: {
    level: (label) => ({ level: label }), // Add levelLabel field to log messages
  },
});

export default customLogger;
