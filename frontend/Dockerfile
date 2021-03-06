## Dev staging.
FROM node:current-buster AS dev
# Set node environment to dev to enforce installation of all dependencies, including devDependencies.
ENV NODE_ENV development
# Install git
RUN apt-get install git
# Install pnpm.
RUN npm install -g pnpm
# Expose port 3000 for SvelteKit and port 24678 for Vite's HMR needed during dev (default: 24678, configured in svelte.config.kit.vite.server.hmr.port).
EXPOSE 3000
EXPOSE 24678

## Build staging.
FROM dev AS build
# Set the working directory.
WORKDIR /app
# Copy package and lock files to the working directory root (./).
COPY package*.json .
# Install the package's deps.
RUN pnpm install
# Copy the rest of local files into the image, after the dependencies were installed. Keeping this step separated helps optimize the image's build process.
COPY . .
# Build the app, and prune de deps.
RUN pnpm build && pnpm prune --prod

## Dist staging.
FROM node:current-buster-slim
# Set node environment to dev to enforce installation of all dependencies, including devDependencies.
ENV NODE_ENV production
# Set to the non-root user included in the node image (principle of least privilege).
USER node
# Set the working directory.
WORKDIR /app
# Take the things we need.
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY package.json .
# Expose port 3000 for the SvelteKit app.
EXPOSE 3000
# Start that app!
CMD ["node", "build"]