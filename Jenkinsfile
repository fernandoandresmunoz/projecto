pipeline {
  agent any
  stages {
    stage('stage') {
      steps {
        sh 'echo "test 1"'
      }
    }
    stage('test') {
      steps {
        sh "echo 'test'"
        
      }
    }
    stage('stage 2') {
      steps {
        sh 'nvm --version'
        sh "npm start"
        sh 'node --version'
      }
    }
  }
}