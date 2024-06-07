// corsOptions.js
import allowedOrigins from "./allowedOrigins";

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the incoming origin is in the allowedOrigins array
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // If it is, allow the request
      callback(null, true);
    } else {
      // Otherwise, reject it
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

export default corsOptions;
