pipeline{
    agent any

    environment {
        FRONTEND_IMAGE = "tejasbi/web-app-registry/frontend-images",
        BACKEND_IMAGE = "tejasbi/web-app-registry/backend-images",
        DOCKER_CREDS = credentials("dockerhub-credentials-id"),
        VERSION = "${env.BUILD_NUMBER}"
    }

    stage("Checkout"){
        steps {
            checkout scm
        }
    }

    stage("Build Backend Image"){
        steps {
            dir('backend') {
                script {
                    docker.build("${BACKEND_IMAGE}:v${VERSION}")
                }
            }
        }
    }

    stage("Build Frontend Image"){
        steps {
            dir('frontend') {
                script {
                    docker.build("${FRONTEND_IMAGE}:v${VERSION}")
                }
            }
        }
    }

    stage("Push Image Docker Hub"){
        steps {
            script {
                docker.withRegistry('', "dockerhub-credentials-id") {

                    docker.image("${BACKEND_IMAGE}:${VERSION}").push()
                    docker.image("${BACKEND_IMAGE}:${VERSION}").push('latest')

                    docker.image("${FRONTEND_IMAGE}:${VERSION}").push()
                    docker.image("${FRONTEND_IMAGE}:${VERSION}").push('latest')

                }
            }
        }
    }
}