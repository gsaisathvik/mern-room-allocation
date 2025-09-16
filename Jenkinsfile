pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/gsaisathvik/mern-room-allocation.git'
            }
        }

        stage('Backend Install & Test') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
    }
}