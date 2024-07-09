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
                        verbose: true,
                        transfers: [
                            sshTransfer(
                                sourceFiles: 'dist/**/*',
                                removePrefix: 'dist/library-ng',
                                remoteDirectory: '',
                                execCommand: '''
                                    sudo rm -rf /var/www/html/*
                                    sudo cp -r /home/ubuntu/temp_dist/* /var/www/html/
                                    sudo systemctl restart nginx
                                '''
                            )
                        ],
                        usePromotionTimestamp: false,
                        sshRetry: [retries: 2, retryDelay: 30000]
                    )
                ])
            }
        }
    }
}
