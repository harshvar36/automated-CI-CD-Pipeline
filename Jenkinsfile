pipeline {
    // 'agent any' means this pipeline can run on any available Jenkins agent (our main server).
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    
                    // This 'sh' (shell) command is run by Jenkins
                    // It uses the lowercase tag name, just like we did manually
                    sh 'docker build -t automated-ci-cd-pipeline .'
                    
                    echo "Docker image build complete."
                }
            }
        }
        
        // --- IMPORTANT NOTE ---
        // We are NOT adding a 'Run' stage.
        // Our app uses 'inquirer', which requires an interactive terminal.
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