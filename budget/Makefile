app=fin-app
container=fin-container
port=3001

build-s:
	docker build -t ${app} .

create:
	docker run --name ${container} -p ${port}:${port} -d --rm -v /home/nathan/Documents/Projects/fin-node/users:/app -v /app/node_modules ${app}

start-s:
	docker start ${container}

stop-s:
	docker stop ${container}

remove:
	docker container rm ${container} -f 

ps: 
	docker ps
