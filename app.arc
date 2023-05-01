@app
wp-to-git-drought-ca-gov

@http
get /

@scheduled
syncherweekend cron(*/59 * ? * SAT,SUN *)
syncherweekday cron(*/5 * ? * MON,TUE,WED,THU,FRI *)

@bucket
arc-lambda-artifacts-shared

@shared

@aws
profile ODI
timeout 900
region us-west-1
architecture arm64
