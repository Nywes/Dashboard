FROM node:16
WORKDIR /dashboard
#ENV SECRET_NAME=*****
# client port
EXPOSE 3001

# copy local files
COPY . .

RUN npm install --silent

CMD ["npm", "start"]
