pipeline {
  agent any
  stages {
    stage('stage') {
      steps {
        sh 'echo "test 1"'
        sh '''export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf '%s/.nvm' "${HOME}" || printf '%s' "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm'''
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