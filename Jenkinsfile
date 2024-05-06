pipeline:
  agent:
    docker:
      image: node:latest   // Use the Node.js Docker image

  environment:
    DOCKER_COMPOSE_VERSION: "1.29.2"  // Set the Docker Compose version

  stages:
    - stage: Build
      steps:
        - checkout       // Check out the source code from version control
        - sh 'npm install'  // Install Node.js dependencies
        - sh 'npm run build'  // Build the Node.js application

    - stage: Deploy
      steps:
        - sh 'docker-compose -f docker-compose.yml up -d'  // Deploy the application using Docker Compose
