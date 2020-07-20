#!/bin/bash

REPOSITORY=/home/ec2-user/app/diq
MODULE_NAME=quant

echo "> Build 파일 및 python파일 복사"

cp $REPOSITORY/zip/*.jar $REPOSITORY/
cp $REPOSITORY/zip/*.py $REPOSITORY/
cp $REPOSITORY/zip/data/sangjang_jongmokCode.xlsx $REPOSITORY/

echo "> 현재 구동 중인 Application pid 확인"

CURRENT_PID=$(pgrep -fl ${MODULE_NAME} | grep jar | awk '{print $1}')

echo "현재 구동 중인 애플리케이션 pid: $CURRENT_PID"

if [ -z "$CURRENT_PID" ]; then
    echo "> 현재 구동 중인 Application이 없으므로 종료하지 않습니다."
else
    echo "> kill -15 $CURRENT_PID"
    kill -15 $CURRENT_PID
    sleep 5
fi

echo "> New Application Deploy"

JAR_NAME=$(ls -tr $REPOSITORY/*.jar | tail -n 1)

echo "> JAR Name: $JAR_NAME"

echo "> $JAR_NAME 에 실행권한 추가"

chmod +x $JAR_NAME

echo "> $JAR_NAME 실행"

nohup java -jar \
    -Dspring.config.location=/home/ec2-user/app/quant-aws.yml \
    -Dspring.profiles.active=real \
    $JAR_NAME > $REPOSITORY/nohup.out 2>&1 &