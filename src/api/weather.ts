import axios, { AxiosRequestConfig } from "axios";

const apiKey = "efed7f0ac5b4488bab2162858230807";

interface Params {
  cityName: string;
  days: number;
}

const forecastEndpoint = (params: Params): string =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}`;

const locationsEndpoint = (params: Params): string =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiCall = async (endpoint: string): Promise<any> => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return {};
  }
};

export const fetchWeatherForecast = (params: Params): Promise<any> => {
  const forecastUrl = forecastEndpoint(params);
  return apiCall(forecastUrl);
};

export const fetchLocations = (params: Params): Promise<any> => {
  const locationsUrl = locationsEndpoint(params);
  return apiCall(locationsUrl);
};
