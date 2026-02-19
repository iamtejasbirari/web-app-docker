environment {
    FRONTEND_IMAGE = "tejasbi/frontend-images"
    BACKEND_IMAGE  = "tejasbi/backend-images"
    VERSION        = "v${env.BUILD_NUMBER}"
}

stages {

    stage("Checkout") {
        steps {
            checkout scm
        }
    }

    stage("Build Backend Image") {
        steps {
            dir('backend') {
                script {
                    docker.build("${BACKEND_IMAGE}:${VERSION}")
                }
            }
        }
    }

    stage("Build Frontend Image") {
        steps {
            dir('frontend') {
                script {
                    docker.build("${FRONTEND_IMAGE}:${VERSION}")
                }
            }
        }
    }

    stage("Push Images to Docker Hub") {
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
