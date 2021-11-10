FROM node:latest
WORKDIR /dashboard
#ENV SECRET_NAME=*****
# server port
EXPOSE 3000
# client port
EXPOSE 3001

# has git installed ?
# clone project
RUN git clone git@github.com:Nywes/B-DEV-500-NAN-5-1-dashboard-rivet.eliott.git && \
    cd B-DEV-500-NAN-5-1-dashboard-rivet.eliott

# install server dependencies and run server
RUN cd server && \
    npm install && \
    node_modules/.bin/nodemon index.js && \
    cd ..
# install client dependencies and start client
RUN cd client && \
    npm install && \
    npm start && \
    cd ..