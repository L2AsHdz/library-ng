pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    environment {
        EMAIL = 'leonidasasael-hernandezlopez@cunoc.edu.gt'
        EC2_INSTANCE = 'ubuntu@ec2-52-14-187-50.us-east-2.compute.amazonaws.com'
        PATH_TO_DIST = '/var/lib/jenkins/workspace/cd_cd_frontend/'
        REMOTE_PATH = '/var/www/html/'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm build --prod'
            }
        }
    }
}
