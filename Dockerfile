# pull the official base image
FROM node:alpine
# set working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies

COPY package.json ./
COPY package-lock.json ./

RUN npm config set unsafe-perm true

RUN npm install --force
# add app
COPY . ./

RUN chown -R node /app/node_modules

USER node
# start app
CMD ["npm", "start"]
