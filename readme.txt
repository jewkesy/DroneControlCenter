Need NodeJS v0.10.24+
	sudo apt-get update
	sudo apt-get install -y python-software-properties python g++ make
	sudo add-apt-repository ppa:chris-lea/node.js
	sudo apt-get update
	sudo apt-get install nodejs

Advanced chat app tutorial across http and net: -
	http://www.youtube.com/watch?v=ouI8CIuK2m4

npm install	##load package.json

sudo npm install -g nodemon           ##allows development as it is running
nodemon app.js 0.0.0.0 3366 8080      ##note the 0.0.0.0 is important so that external connections work

deploy to remotes: -  

scp -r . ubuntu@192.168.25.140:/home/ubuntu/fitBitTracker/      #192.168.25.199 is the wifi ip
scp -r . demo@192.168.25.106:/home/demo/fitBitTracker/

Or use deploy.sh

Use rsync to exclude .svn files
sudo apt-get install rsync (on both ends)

Useful guide to error handling: - http://machadogj.com/2013/4/error-handling-in-nodejs.html


For beacons, add to /etc/rc.local :-
sh '/home/ubuntu/fitBitTracker/startBeacon.sh'
exit 0