pipeline {
  agent any
  
  environment {
    NODE_VERSION = 'v16.20.2'
    ANGULAR_CLI_VERSION = '11.0.0'
    DOCKER_REGISTRY = credentials('docker-registry')
    DOCKER_IMAGE = 'projecto'
    DOCKER_TAG = "${env.BUILD_NUMBER}"
  }
  
  options {
    timeout(time: 30, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '10'))
    disableConcurrentBuilds()
  }
  
  stages {
    stage('Setup Environment') {
      steps {
        sh '''
          export NVM_DIR="$HOME/.nvm"
          [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
          nvm install ${NODE_VERSION}
          nvm use ${NODE_VERSION}
          npm i -g @angular/cli@${ANGULAR_CLI_VERSION}
        '''
      }
    }

    stage('Build Angular Application') {
      steps {
        sh '''
          npm ci --force
          ng build --prod
        '''
        stash includes: 'dist/projecto/**', name: 'angular-dist'
      }
    }

    stage('Build and Deploy Docker') {
      steps {
        unstash 'angular-dist'
        sh '''
          docker build . -t ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG} || exit 1
          docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}
          
          # Cleanup old stack and containers
          docker stack rm projecto || true
          sleep 20
          
          # Remove old containers and images
          docker container prune -f
          docker image prune -f
          
          # Deploy new stack
          docker stack deploy -c stack.yaml projecto
        '''
      }
    }
  }
  
  post {
    always {
      // Cleanup workspace
      cleanWs()
      
      // Cleanup Docker resources
      sh '''
        docker container prune -f
        docker image prune -f
      '''
      
      // Archive artifacts
      archiveArtifacts artifacts: 'dist/projecto/**', fingerprint: true
    }
    success {
      echo 'Pipeline completed successfully!'
      // Add success notification here (e.g., Slack, email)
    }
    failure {
      echo 'Pipeline failed!'
      // Add failure notification here (e.g., Slack, email)
    }
    unstable {
      echo 'Pipeline marked as unstable!'
    }
  }
}