FROM node:8.1.2
EXPOSE 8080
COPY . /app
WORKDIR /app
ARG PORT
RUN npm install --production
ENTRYPOINT ["npm"]
CMD ["start"]