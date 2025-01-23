FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM node:18-alpine as production
WORKDIR /app
COPY --from=build /app/dist/ /app/dist/
RUN npm install -g @angular/cli
EXPOSE 4200
CMD ["npm", "start"]
