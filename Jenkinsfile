pipeline {
  agent any
  stages {
    stage('stage') {
      steps {
        sleep 32
      }
    }
    stage('test') {
      steps {
        sh "echo 'test'"
        
      }
    }
    stage('stage 2') {
      steps {
        sh "npm start"
      }
    }
  }
}