# Build images in this repository
kafkaClient(){
    cd kafka
    ls
    docker build -f Dockerfile.kafka_admin.prod -t kafka_admin_client . --no-cache 
    docker image tag kafka_admin_client alazidis/kafka_admin_client:latest
    docker image tag kafka_admin_client alazidis/kafka_admin_client:v1.0.3
    docker image push alazidis/kafka_admin_client:v1.0.3
    docker image push alazidis/kafka_admin_client:latest
}

main(){
    # cd "$1"
    if [ "$1" = "kafka" ]; then
        kafkaClient
    elif [ "$1" = "comments" ]; then  # TODO add valid functions
        echo "comments"
    elif [ "$1" = "posts" ]; then
        echo "posts"
    elif [ "$1" = "client" ]; then
        echo "client"
    else
        echo "query-posts-service"
    fi
}

ENV_PARAMS="[kafka, comments, posts, client, query-posts-service]"
VALID_ARRAY=("kafka" "comments" "posts" "client" "query-posts-service")
if [ $# -eq 0 ]; then 
    echo "Invalid syntax"
    echo "Valid syntax is ./$(basename $0) following by one of the following values $ENV_PARAMS"
    exit 1
else
    found=0
    for item in "${VALID_ARRAY[@]}"; do
        if [ "$item" = "$1" ]; then 
            found=1
            break
        fi
    done
    if [ $found -eq 1 ]; then 
        main $1  
    else
        echo -e "Valid env parameters = $ENV_PARAMS"
        exit 1
    fi
fi

