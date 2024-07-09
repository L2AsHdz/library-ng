pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build --prod'
            }
        }
        stage('Deploy') {
            steps {
                sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: 'frontend-aws',
                        transfers: [
                            sshTransfer(
                                sourceFiles: 'dist/**/*',
                                removePrefix: 'dist',
                                remoteDirectory: '',
                                execCommand: 'sudo systemctl restart nginx'  // O cualquier comando necesario después de la transferencia
                            )
                        ],
                        usePromotionTimestamp: false,
                        alwaysPublishFromMaster: false,
                        retry: [retries: 2, retryDelay: 120000]
                    )
                ])
            }
        }
    }
}
