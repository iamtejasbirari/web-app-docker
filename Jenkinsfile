pipeline {
    agent any

    parameters { 
        booleanParam(name: 'FORCE_BUILD', defaultValue: false, description: 'Force rebuild images') 
    }

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
                        anyOf{
                            changeset "backend/**"
                            expression { params.FORCE_BUILD }
                        }
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
                        anyOf{
                            changeset "frontend/**"
                            expression { params.FORCE_BUILD }
                        }
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
