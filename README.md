                                                            #Krishi Saarthii
## Introduction
- Overview of the Indian Farmer's App
- Purpose of the app
- Target audience

## Features

### 1. Seed Verification
- Farmers can verify the seeds directly from the Government data.
- As this is made on Blockchain technology in which only one user has power to add the Seeds ID.
- And, all the farmers can verify their seed by entering their Seed ID.
- We had made it using Solidity.

### 2. Crop Disease Check and giving some future precautions
- This model should be trained on a large dataset of crop images and have the capability to classify and identify various types of diseases affecting different crops.
- Image Input and Processing: Enable users to capture or upload images of crops affected by diseases within the app. Implement image processing techniques to enhance the image quality, crop the relevant area, and normalize the colors, which can improve the accuracy of disease detection.
- Disease Detection and Diagnosis: Utilize the integrated ML model to analyze the processed images and identify the crop diseases present. The ML model should provide real-time predictions and accurate diagnosis of the disease based on the visual symptoms exhibited by the crop.
- Precautionary Recommendations: After identifying the crop disease, provide users with precautionary recommendations to mitigate the disease and prevent further spread. These recommendations can include suitable pesticides, fungicides, or cultural practices specific to the identified disease. Incorporate a database of preventive measures for different crop diseases to offer a comprehensive range of precautions.

### 2. Weather Prediction
- Integration with weather API to provide accurate weather forecasts.
- Farmers can view weather information for their specific locality or area.
- Hourly, daily, and weekly weather forecasts.
- Severe weather alerts and warnings.

### 3. Nearest Research Center
- Integration with geolocation API to identify the farmer's current location.
- Display a list of nearby research centers or agricultural institutions.
- Information about the services offered by each center.
- Get all the Data from the https://data.gov.in/
- Contact details and directions to reach the centers.

### 4. Crop Management
- Farmers can input information about their ongoing grown crops.
- Suggestions and recommendations for improving crop yield and quality.
- Access to information about crop diseases, pests, and remedies.
- Tips for proper irrigation, fertilization, and crop protection.
- Still working.

### 5. Market Prices
- Farmers can access real-time market prices for various crops.
- Price trends and historical data to make informed decisions.
- Information on local marketplaces and wholesale buyers.

## Technology Stack
- React Native: A cross-platform framework for building mobile apps.
- Node.js: A server-side JavaScript runtime environment.
- Express.js: A web application framework for Node.js.
- MongoDB: A NoSQL database for storing app data.
- Weather API: Integration with a reliable weather forecasting API.
- Geolocation API: Integration with a geolocation service.
- Solidity
- ML models

## System Architecture
- High-level overview of the app's architecture.
- Client-server communication flow.
- Database structure and data models.

## Installation and Setup
- Fork the repository and tehn, do "yarn start"
- Then, start "npx expo start"
- Download the Expo Go app
- Then, Scan the QR code generated in the Laptop using Expo Go app.
