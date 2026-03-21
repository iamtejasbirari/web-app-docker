pipeline {
    agent any

    parameters { 
        booleanParam(name: 'FORCE_BUILD', defaultValue: false, description: 'Force rebuild images') 
    }

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

        stage("Detect Changes") {
            steps {
                script {
                    def changedFiles = sh(
                        script: "git diff --name-only HEAD~1 HEAD || true",
                        returnStdout: true
                    ).trim()

                    echo "Changed files:\n${changedFiles}"

                    env.BUILD_BACKEND = "false"
                    env.BUILD_FRONTEND = "false"

                    if (params.FORCE_BUILD) {
                        env.BUILD_BACKEND = "true"
                        env.BUILD_FRONTEND = "true"
                    } else {
                        if (changedFiles.contains("backend/")) {
                            env.BUILD_BACKEND = "true"
                        }
                        if (changedFiles.contains("frontend/")) {
                            env.BUILD_FRONTEND = "true"
                        }
                    }

                    echo "BUILD_BACKEND=${env.BUILD_BACKEND}"
                    echo "BUILD_FRONTEND=${env.BUILD_FRONTEND}"
                }
            }
        }

        stage("Build Services") {
            parallel {

                stage("Build Backend") {
                    when {
                        expression { env.BUILD_BACKEND == "true" }
                    }
                    steps {
                        dir('backend') {
                            script {
                                docker.build("${BACKEND_IMAGE}:${VERSION}")
                            }
                        }
                    }
                }

                stage("Build Frontend") {
                    when {
                        expression { env.BUILD_FRONTEND == "true" }
                    }
                    steps {
                        dir('frontend') {
                            script {
                                docker.build("${FRONTEND_IMAGE}:${VERSION}")
                            }
                        }
                    }
                }
            }
        }

        stage("Push Images") {
            when {
                anyOf {
                    expression { env.BUILD_BACKEND == "true" }
                    expression { env.BUILD_FRONTEND == "true" }
                }
            }
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