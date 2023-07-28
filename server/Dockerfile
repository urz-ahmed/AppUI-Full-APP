# Base image
FROM node:16-alpine3.11

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose the port on which your Node.js application will run
EXPOSE 5000

# Set environment variables
ENV PORT=5000
ENV JWT_SECRET='knhhkojijhjhoh9ug0u'
ENV MONGODB_URI='mongodb+srv://abhishekverman3459:Abhi3459@cluster0.nhp5ygu.mongodb.net/'

# Start the Node.js application
CMD [ "node", "index.js" ]
