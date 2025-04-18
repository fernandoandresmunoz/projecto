pipeline {
  agent any
  stages {

        stage('Use NVM') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm install v16.20.2
                    nvm use v16.20.2
                    npm i -g  @angular/cli@11.0.0
                    npm i --force
                    npm test
                    
                '''
            }
        }


        stage('Use NVM - Step 2') {
            steps {
                sh '''
                  echo "test"
                '''
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
      }
    }
  }
}