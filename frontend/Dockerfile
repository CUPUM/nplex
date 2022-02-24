# Start from a base image
FROM node:current-alpine

# Set node environment to dev to enforce installation of all dependencies, including devDependencies
ENV NODE_ENV development

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /usr/src/app

# Copy package and lock files to the working directory root (./)
COPY ["package.json", "pnpm-lock.yaml", "./"]

# Install the package's dependencies
RUN pnpm install

# Copy the rest of local files into the image, after the dependencies were installed. Keeping this step separated helps optimize the image's build process.
COPY . .

# Expose port 3000 for SvelteKit and port 24678 for Vite's HMR needed during dev (default: 24678, configured in svelte.config.kit.vite.server.hmr.port)
EXPOSE 3000
EXPOSE 24678

# Start the dev server when the image is launched and set the host to 0.0.0.0 to make the app accessible from outside
CMD ["pnpm", "dev", "--host", "0.0.0.0"]