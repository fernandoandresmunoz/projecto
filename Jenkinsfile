pipeline {
  agent any
  stages {

        stage('Use NVM') {
            steps {
                sh 'stage omitida'
                // sh '''
                //     export NVM_DIR="$HOME/.nvm"
                //     [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                //     nvm install v24
                //     nvm use v24
                //     npm i -g  @angular/cli@21
                //     npm install --legacy-peer-deps
                //     ng build --configuration production
                //     ls -l dist/projecto
                   
                    
                // '''
            }
        }

        stage('Build Docker Image Testing') {
            steps {
                script {
                    sh 'whoami'
                    sh 'docker build -f integration.Dockerfile -t projecto-test:latest .'
                    sh 'docker images '
                    // sh 'docker build -f tests-cypress.Dockerfile -t test-cypress:latest .'
                    // sh 'docker build . -f FullBuild.dockerfile -t test-cypress:latest'
                }
            }
        }


        stage('Jasmine/Karma Tests') {
            steps {
                script {
                    echo 'dummy jasmine/karma tests'
                    //sh 'docker system prune -f'
                    sh "docker compose -f docker-compose-testing.yaml down --remove-orphans"
                    // Usamos una imagen ligera para borrar las carpetas que están bloqueadas
                    sh "docker run --rm -v \$(pwd):/app busybox rm -rf /app/coverage /app/junit-report"
                    sh 'mkdir -p junit-report'
                    sh "mkdir -p coverage junit-report"
                    sh "chmod -R 777 coverage junit-report"
                    // def testResult = sh( script: 'docker compose -f docker-compose-testing.yaml run --user \$(id -u):\$(id -g) karma-tests', returnStatus: true )
                   def testResult = sh( script: 'docker compose -f docker-compose-testing.yaml run karma-tests', returnStatus: true )
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


        stage('BUILD STATICS ') {
            steps {
                sh '''
docker run -v ./dist:/app/dist projecto-test:latest /usr/local/bin/npx ng build   --configuration production
                    '''
                sh 'ls -la ./dist/projecto'
            }
        }


    stage('Deploy') {
      steps {

            sh 'docker build  -t projecto:latest .'
            sh 'docker stack rm projecto'
            sh 'sleep 20'
            sh ' docker stack deploy -c stack.yaml projecto --resolve-image always'

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