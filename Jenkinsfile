pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "tejasbi/frontend-images"
        BACKEND_IMAGE  = "tejasbi/backend-images"
        VERSION        = "v${env.BUILD_NUMBER}"
        BUILD_BACKEND  = "false"
        BUILD_FRONTEND = "false"
    }

    stages {

        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("Build Services") {
            parallel {

                stage("Build Backend") {
                    when {
                        changeset "backend/**"
                    }
                    steps {
                        dir('backend') {
                            script {
                                docker.build("${BACKEND_IMAGE}:${VERSION}")
                                env.BUILD_BACKEND = "true"
                            }
                        }
                    }
                }

                stage("Build Frontend") {
                    when {
                        changeset "frontend/**"
                    }
                    steps {
                        dir('frontend') {
                            script {
                                docker.build("${FRONTEND_IMAGE}:${VERSION}")
                                env.BUILD_FRONTEND = "true"
                            }
                        }
                    }
                }
            }
        }

        stage("Push Images") {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-credentials-id') {

                        if (env.BUILD_BACKEND == "true") {
                            docker.image("${BACKEND_IMAGE}:${VERSION}").push()
                            docker.image("${BACKEND_IMAGE}:${VERSION}").push('latest')
                        }

                        if (env.BUILD_FRONTEND == "true") {
                            docker.image("${FRONTEND_IMAGE}:${VERSION}").push()
                            docker.image("${FRONTEND_IMAGE}:${VERSION}").push('latest')
                        }
                    }
                }
            }
        }
    }
}
