pipeline {
  agent {
    kubernetes {
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: playwright
    image: mcr.microsoft.com/playwright:v1.43.0-jammy
    command: ["cat"]
    tty: true
'''
    }
  }

  environment {
    PROJECT_NAME = "Stromae Devis/Commande Integ"
    FIREFOX_REPORT_NAME = "Rapport-de-test-firefox"
    CHROME_REPORT_NAME = "Rapport-de-test-chrome"
    EDGE_REPORT_NAME = "Rapport-de-test-edge"
  }

  stages {
    stage('Install Dependencies') {
      steps {
        container('playwright') {
          sh 'npm ci'
          sh 'npx playwright install --with-deps'
        }
      }
    }

    stage('Run Playwright Tests') {
      parallel {
        stage('Run with Firefox') {
          steps {
            container('playwright') {
              sh 'npx playwright test --project=firefox'
            }
          }
        }
        stage('Run with Chrome') {
          steps {
            container('playwright') {
              sh 'npx playwright test --project=chromium'
            }
          }
        }
        stage('Run with Edge') {
          steps {
            container('playwright') {
              sh 'npx playwright test --project=edge'
            }
          }
        }
      }
    }

    stage('Generate Allure Report') {
      steps {
        container('playwright') {
          sh 'npm run allure:generate'
        }
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
            allowMissing: true,
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
