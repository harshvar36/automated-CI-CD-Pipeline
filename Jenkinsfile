pipeline {
    // 'agent any' means this pipeline can run on any available Jenkins agent (our main server).
    agent any

    environment {
        // Define a variable for the image name to avoid repetition
        // This MUST match your Docker Hub username / repo name
        DOCKER_IMAGE_NAME = "harshvar36/automated-ci-cd-pipeline"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    
                    // This 'sh' (shell) command is run by Jenkins
                    // We now build it with the full Docker Hub name from the start
                    sh "docker build -t ${DOCKER_IMAGE_NAME}:latest ."
                    
                    echo "Docker image build complete."
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "Pushing image to Docker Hub..."
                    
                    // This 'withCredentials' block securely gets the credentials
                    // 'dockerhub-creds' is the ID we will create in Jenkins
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        
                        // Log in to Docker Hub using the credentials
                        sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}"
                        
                        // Push the image to the registry
                        sh "docker push ${DOCKER_IMAGE_NAME}:latest"
                    }
                    echo "Image push complete."
                }
            }
        }
        
        // --- IMPORTANT NOTE ---
        // We are NOT adding a 'Run' stage.
        // Your app uses 'inquirer', which requires an interactive terminal.
        // A Jenkins pipeline is non-interactive and cannot provide this.
        // This build-only pipeline proves the "CI" (Continuous Integration) part.
        //
        // If this were a web server, a 'Deploy' stage would look like this:
        //
        // stage('Deploy') {
        //     steps {
        //         sh 'docker stop automated-ci-cd-pipeline || true'
        //         sh 'docker rm automated-ci-cd-pipeline || true'
        //         sh 'docker run -d -p 80:3000 --name automated-ci-cd-pipeline automated-ci-cd-pipeline'
        //     }
        // }
    }
}