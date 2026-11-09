pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub-credentials'
        DOCKER_USER              = 'sayyadrajahmed'
        BACKEND_IMAGE            = "${DOCKER_USER}/emp-backend"
        FRONTEND_IMAGE           = "${DOCKER_USER}/emp-frontend"
        KUBECONFIG_CREDENTIAL_ID = 'k3s-kubeconfig'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Backend and Frontend Docker images...'
                sh '''
                    docker build -t ${BACKEND_IMAGE}:${BUILD_NUMBER} -t ${BACKEND_IMAGE}:latest ./backend
                    docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} -t ${FRONTEND_IMAGE}:latest ./frontend
                '''
            }
        }

        stage('Push Docker Images') {
            steps {
                echo 'Authenticating and pushing images to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}
                        docker push ${BACKEND_IMAGE}:latest
                        docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
                        docker push ${FRONTEND_IMAGE}:latest
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying application to K3s cluster...'
                withCredentials([file(credentialsId: "${KUBECONFIG_CREDENTIAL_ID}", variable: 'KUBECONFIG')]) {
                    sh '''
                        kubectl apply -f ./k8s/k8s.yaml
                        kubectl rollout restart deployment/backend
                        kubectl rollout restart deployment/frontend
                        kubectl rollout status deployment/db --timeout=90s
                        kubectl rollout status deployment/backend --timeout=90s
                        kubectl rollout status deployment/frontend --timeout=90s
                    '''
                }
            }
        }

        stage('Smoke Test') {
            steps {
                echo 'Verifying deployment health...'
                withCredentials([file(credentialsId: "${KUBECONFIG_CREDENTIAL_ID}", variable: 'KUBECONFIG')]) {
                    sh '''
                        kubectl get pods -o wide
                        kubectl get svc,ingress
                        curl -sf http://13.205.112.178/api/employees
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
            cleanWs()
        }
        success {
            echo "Pipeline succeeded! Application is live."
        }
        failure {
            echo "Pipeline failed. Check stage logs for details."
        }
    }
}

