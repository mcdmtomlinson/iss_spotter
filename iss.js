/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API

  request(`https://api.ipify.org?format=json`, (error, response, body) => {

  if (error) { // print error if not null
    callback(`error: ${error}`, null); // error/null for desc
    return;
  }
  if (response.statusCode !== 200) { // print status code if not successful
    callback(`statusCode: ${response.statusCode} when fetching IP: ${body}`, null);
    return;
  }
  const ip = JSON.parse(body).ip;
  callback(null, ip);
});
};

  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    if (error) { // print error if not null
      callback(`error: ${error}`, null); // error/null for desc
      return;
    }

    if (response.statusCode !== 200) { // print status code if not successful
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });



module.exports = { fetchMyIP, fetchCoordsByIP };