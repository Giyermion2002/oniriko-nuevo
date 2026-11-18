# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Define build arguments for Vite environment variables
ARG VITE_CURRENT_SEASON
ARG VITE_API_URL

# Make them available as environment variables during build
ENV VITE_CURRENT_SEASON=$VITE_CURRENT_SEASON
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm install

COPY . .

# FIX: Force execution permissions on node_modules bin folder
RUN chmod -R +x node_modules/.bin

RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config to handle React routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
