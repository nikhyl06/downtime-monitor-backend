const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: "https://downtime-monitor-frontend.onrender.com",
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;