import axios from 'axios';

const baseURL = 'https://test-service-1.3eo5s7qoieics.eu-north-1.cs.amazonlightsail.com/api';

const getWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${baseURL}/weather?latitude=${latitude}&longitude=${longitude}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const getForecast = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${baseURL}/forecast?latitude=${latitude}&longitude=${longitude}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const weatherService = {
  getWeather, getForecast,
};
export default weatherService;
