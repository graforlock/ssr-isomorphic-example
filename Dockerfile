FROM node:8.1.2
EXPOSE 8080
COPY . /app
WORKDIR /app
ARG PORT
RUN npm install && npm run bundle && npm install --prune
ENTRYPOINT ["npm"]
CMD ["start"]