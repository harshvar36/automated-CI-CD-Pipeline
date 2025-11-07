# Step 1: Start from an official Node.js base image.
# We use 'alpine' because it's very lightweight and secure.
FROM node:20-alpine

# Step 2: Set the working directory inside the container.
# This is where our app's files will live.
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first.
# This is a key optimization. Docker will only re-run 'npm install'
# if these files change, not every time we change our code.
COPY package*.json ./

# Step 4: Install the application's dependencies.
RUN npm install

# Step 5: Copy the rest of your application's source code
# (in this case, just index.js) into the working directory.
COPY . .

# Step 6: Specify the command to run when the container starts.
# This is the same command you used to run it locally.
CMD ["node", "index.js"]