FROM node:20 as build
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm install
EXPOSE 4200
CMD ["ng", "serve"]
