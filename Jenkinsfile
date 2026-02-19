pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "tejasbi/web-app-registry/frontend-images"
        BACKEND_IMAGE  = "tejasbi/web-app-registry/backend-images"
        VERSION        = "v${env.BUILD_NUMBER}"
    }

    stages {

        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("Build Backend") {
            steps {
                dir('backend') {
                    script {
                        docker.build("${BACKEND_IMAGE}:${VERSION}")
                    }
                }
            }
        }

        stage("Build Frontend") {
            steps {
                dir('frontend') {
                    script {
                        docker.build("${FRONTEND_IMAGE}:${VERSION}")
                    }
                }
            }
        }

        stage("Push Images") {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-credentials-id') {
                        docker.image("${BACKEND_IMAGE}:${VERSION}").push()
                        docker.image("${BACKEND_IMAGE}:${VERSION}").push('latest')
                        docker.image("${FRONTEND_IMAGE}:${VERSION}").push()
                        docker.image("${FRONTEND_IMAGE}:${VERSION}").push('latest')
                    }
                }
            }
        }
    }
}
