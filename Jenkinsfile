pipeline {
  agent any
  stages {
            stage('Install NVM') {
            steps {
                sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash'
                sh '. "$HOME/.nvm/nvm.sh"' // Carga NVM
                sh 'nvm --version' // Verifica la instalación
            }
        }
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
        sh 'pwd'
        sh 'whoami'
        sh 'nvm --version'
        sh "npm start"
        sh 'node --version'
      }
    }
  }
}