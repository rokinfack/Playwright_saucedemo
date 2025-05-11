pipeline {
    agent any

    environment {
        PROJECT_NAME = "Stromae Devis/Commande Integ"
        NPM_CONFIG_CACHE = "${WORKSPACE}/npm-cache"
        DOCKER_IMAGE = "playwright-tests:latest"
        BROWSERS_PATH = "/opt/appli/jenkinsSlave/workspace/playwright-browsers/browsers"
        FIREFOX_REPORT_NAME = "Rapport-de-test-firefox"
        CHROME_REPORT_NAME = "Rapport-de-test-chrome"
        EDGE_REPORT_NAME = "Rapport-de-test-edge"
    }

    stages {
        stage('Remove Docker Images') {
            steps {
                sh 'docker images'
                sh 'docker rmi "${DOCKER_IMAGE}" || true'
                sh 'yes | docker buildx prune -a'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build --no-cache -t "${DOCKER_IMAGE}" .'
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    docker.image("${DOCKER_IMAGE}").inside('-u root') {
                        sh 'npm ci'
                    }
                }
            }
        }

        stage('Run Playwright Tests') {
            parallel {
                stage('Run with Firefox') {
                    steps {
                        script {
                            docker.image("${DOCKER_IMAGE}").inside("-u root") {
                                sh 'npm test'
                            }
                        }
                    }
                }
                // Tu peux ajouter ici d'autres navigateurs comme Chrome ou Edge en parallèle si nécessaire.
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npm run allure:generate'
                publishHTML target: [
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Allure Report',
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true
                ]
            }
        }
    }

    post {
        always {
            script {
                def reports = [
                    [dir: 'reports/chrome', name: CHROME_REPORT_NAME, title: 'Rapport de test chrome'],
                    [dir: 'reports/firefox', name: FIREFOX_REPORT_NAME, title: 'Rapport de test firefox'],
                    [dir: 'reports/edge', name: EDGE_REPORT_NAME, title: 'Rapport de test edge']
                ]

                for (rep in reports) {
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: rep.dir,
                        reportFiles: 'results.html',
                        reportName: rep.name,
                        reportTitles: rep.title
                    ]
                }
            }
        }
    }
}
