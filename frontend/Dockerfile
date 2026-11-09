FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG REACT_APP_SERVER_URL=/api/employees
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL
RUN npm run build

FROM nginx:alpine
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/build /usr/share/nginx/html
ENV BACKEND_HOST=backend
ENV NGINX_ENTRYPOINT_LOCAL_RESOLVERS=1
EXPOSE 80