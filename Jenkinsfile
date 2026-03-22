pipeline {
  agent any
  stages {

        stage('Use NVM') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm install v18
                    nvm use v18
                    npm i -g  @angular/cli@18
                    npm install --legacy-peer-deps
                    ng build --configuration production
                    ls -l dist/projecto
                   
                    
                '''
            }
        }

        stage('Build Docker Image Testing') {
            steps {
                script {
                    sh 'whoami'
                    sh 'docker build -f integration.Dockerfile -t projecto-test:latest .'
                    // sh 'docker build -f tests-cypress.Dockerfile -t test-cypress:latest .'
                    // sh 'docker build . -f FullBuild.dockerfile -t test-cypress:latest'
                }
            }
        }


        stage('Build &  docker image for projecto ') {
            steps {
              sh ' docker build . -t projecto:latest'
              sh ' docker stack rm projecto'
              sh   'sleep 20'
            }
        }

        stage('Jasmine/Karma Tests') {
            steps {
                script {
                    echo 'dummy jasmine/karma tests'
                    //sh 'docker system prune -f'
                    sh 'mkdir -p junit-report'
                    def testResult = sh( script: 'docker compose -f docker-compose-testing.yaml run --user \$(id -u):\$(id -g) karma-tests', returnStatus: true )
                    if (testResult != 0) {
                        echo "Jasmine/Karma tests completed with exit code: ${testResult}"
                    } else {
                        echo "Jasime/Karma tests passed successfully"
                    }
                    sh 'ls -lhtr' 
                    sh 'ls -lhtrs ./junit-report/'
                    sh 'ls -lhtrs ./coverage/'

                }
            }
            post {
                always {
                    script {
                        echo 'dummy post execution'
                        // Archive Jasmine/Karma test results
                        // junit 'jasmine-karma-report/test-results.xml' // Adjust path as necessary
                        junit 'junit-report/test-results.xml' // Or '**/junit-report/test-results.xml' if structure varies

                    }
                }
            }
        }

        stage('Publish HTML Coverage Report') {
            steps {
                script {
                    echo 'publish coverage'
                    // TODO:
                    publishHTML(
                      [allowMissing: false,
                      alwaysLinkToLastBuild: false,
                      keepAll: false,
                      reportDir: 'coverage/projecto',
                      // reportDir: './coverage/report-html',
                      reportFiles: 'index.html',
                      reportName: 'Coverage Report',
                      reportTitles: 'Coverage Report']
                    )



                }
            }
        }
    stage('Deploy') {
      steps {
              sh ' docker stack deploy -c stack.yaml projecto'
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