require('dotenv').config()

const PORT = process.env.PORT || 9000;
const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || "";
const targetCity = process.env.TARGET_CITY || "Helsinki,fi";

module.exports = {
    PORT,
    appId,
    mapURI,
    targetCity
}