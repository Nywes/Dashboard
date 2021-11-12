FROM node:latest
WORKDIR /dashboard
#ENV SECRET_NAME=*****
# server port
EXPOSE 3000

# copy local files
COPY . .

# install server dependencies and run server
RUN npm install --silent

CMD ["npm", "start"]
