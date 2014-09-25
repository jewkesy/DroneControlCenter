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





mbp:fitBitTracker Daryl$ npm list
DroneControlCenter@0.1.0 /Users/Daryl/Documents/Development/fitBitTracker
├─┬ express@3.5.1
│ ├── buffer-crc32@0.2.1
│ ├─┬ commander@1.3.2
│ │ └── keypress@0.1.0
│ ├─┬ connect@2.14.1
│ │ ├── basic-auth-connect@1.0.0
│ │ ├── bytes@0.2.1
│ │ ├─┬ compression@1.0.0
│ │ │ ├── compressible@1.0.0
│ │ │ └── negotiator@0.3.0
│ │ ├── connect-timeout@1.0.0
│ │ ├─┬ cookie-parser@1.0.1
│ │ │ └── cookie@0.1.0
│ │ ├─┬ csurf@1.0.0
│ │ │ └── uid2@0.0.3
│ │ ├── errorhandler@1.0.0
│ │ ├─┬ express-session@1.0.2
│ │ │ ├── cookie@0.1.0
│ │ │ ├── uid2@0.0.3
│ │ │ └── utils-merge@1.0.0
│ │ ├── method-override@1.0.0
│ │ ├── morgan@1.0.0
│ │ ├─┬ multiparty@2.2.0
│ │ │ ├─┬ readable-stream@1.1.11
│ │ │ │ ├── core-util-is@1.0.1
│ │ │ │ ├── debuglog@0.0.2
│ │ │ │ └── string_decoder@0.10.25-1
│ │ │ └── stream-counter@0.2.0
│ │ ├── pause@0.0.1
│ │ ├── qs@0.6.6
│ │ ├── raw-body@1.1.3
│ │ ├── response-time@1.0.0
│ │ ├─┬ serve-index@1.0.1
│ │ │ ├── batch@0.5.0
│ │ │ └── negotiator@0.4.2
│ │ ├── serve-static@1.0.2
│ │ ├── static-favicon@1.0.0
│ │ └── vhost@1.0.0
│ ├── cookie@0.1.1
│ ├── cookie-signature@1.0.3
│ ├── debug@0.7.4
│ ├── fresh@0.2.2
│ ├── merge-descriptors@0.0.2
│ ├── methods@0.1.0
│ ├── mkdirp@0.3.5
│ ├── range-parser@1.0.0
│ └─┬ send@0.2.0
│   ├── fresh@0.2.2
│   └── mime@1.2.11
├─┬ forever@0.10.11
│ ├─┬ cliff@0.1.8
│ │ ├── eyes@0.1.8
│ │ └─┬ winston@0.6.2
│ │   ├── async@0.1.22
│ │   ├── colors@0.6.2
│ │   ├── cycle@1.0.3
│ │   ├── pkginfo@0.2.3
│ │   ├── request@2.9.203
│ │   └── stack-trace@0.0.9
│ ├── colors@0.6.2
│ ├─┬ flatiron@0.3.11
│ │ ├─┬ broadway@0.2.9
│ │ │ ├── eventemitter2@0.4.12
│ │ │ └─┬ winston@0.7.2
│ │ │   ├── async@0.2.10
│ │ │   ├── cycle@1.0.3
│ │ │   ├── eyes@0.1.8
│ │ │   ├─┬ request@2.16.6
│ │ │   │ ├── aws-sign@0.2.0
│ │ │   │ ├── cookie-jar@0.2.0
│ │ │   │ ├── forever-agent@0.2.0
│ │ │   │ ├─┬ form-data@0.0.10
│ │ │   │ │ └─┬ combined-stream@0.0.4
│ │ │   │ │   └── delayed-stream@0.0.5
│ │ │   │ ├─┬ hawk@0.10.2
│ │ │   │ │ ├── boom@0.3.8
│ │ │   │ │ ├── cryptiles@0.1.3
│ │ │   │ │ ├── hoek@0.7.6
│ │ │   │ │ └── sntp@0.1.4
│ │ │   │ ├── json-stringify-safe@3.0.0
│ │ │   │ ├── mime@1.2.11
│ │ │   │ ├── node-uuid@1.4.1
│ │ │   │ ├── oauth-sign@0.2.0
│ │ │   │ ├── qs@0.5.6
│ │ │   │ └── tunnel-agent@0.2.0
│ │ │   └── stack-trace@0.0.9
│ │ ├── director@1.1.10
│ │ ├─┬ optimist@0.6.0
│ │ │ ├── minimist@0.0.8
│ │ │ └── wordwrap@0.0.2
│ │ └─┬ prompt@0.2.11
│ │   ├── pkginfo@0.3.0
│ │   ├─┬ read@1.0.5
│ │   │ └── mute-stream@0.0.4
│ │   ├── revalidator@0.1.6
│ │   ├─┬ utile@0.2.1
│ │   │ ├── async@0.2.10
│ │   │ ├── deep-equal@0.2.1
│ │   │ ├── i@0.3.2
│ │   │ ├── mkdirp@0.3.5
│ │   │ ├── ncp@0.4.2
│ │   │ └── rimraf@2.2.6
│ │   └─┬ winston@0.6.2
│ │     ├── async@0.1.22
│ │     ├── colors@0.6.2
│ │     ├── cycle@1.0.3
│ │     ├── eyes@0.1.8
│ │     ├── pkginfo@0.2.3
│ │     ├── request@2.9.203
│ │     └── stack-trace@0.0.9
│ ├─┬ forever-monitor@1.2.3
│ │ ├─┬ broadway@0.2.9
│ │ │ ├── eventemitter2@0.4.12
│ │ │ ├─┬ utile@0.2.1
│ │ │ │ ├── async@0.2.10
│ │ │ │ ├── deep-equal@0.2.1
│ │ │ │ ├── i@0.3.2
│ │ │ │ ├── mkdirp@0.3.5
│ │ │ │ ├── ncp@0.4.2
│ │ │ │ └── rimraf@2.2.6
│ │ │ └─┬ winston@0.7.2
│ │ │   ├── async@0.2.10
│ │ │   ├── cycle@1.0.3
│ │ │   ├── eyes@0.1.8
│ │ │   ├─┬ request@2.16.6
│ │ │   │ ├── aws-sign@0.2.0
│ │ │   │ ├── cookie-jar@0.2.0
│ │ │   │ ├── forever-agent@0.2.0
│ │ │   │ ├─┬ form-data@0.0.10
│ │ │   │ │ └─┬ combined-stream@0.0.4
│ │ │   │ │   └── delayed-stream@0.0.5
│ │ │   │ ├─┬ hawk@0.10.2
│ │ │   │ │ ├── boom@0.3.8
│ │ │   │ │ ├── cryptiles@0.1.3
│ │ │   │ │ ├── hoek@0.7.6
│ │ │   │ │ └── sntp@0.1.4
│ │ │   │ ├── json-stringify-safe@3.0.0
│ │ │   │ ├── mime@1.2.11
│ │ │   │ ├── node-uuid@1.4.1
│ │ │   │ ├── oauth-sign@0.2.0
│ │ │   │ ├── qs@0.5.6
│ │ │   │ └── tunnel-agent@0.2.0
│ │ │   └── stack-trace@0.0.9
│ │ ├─┬ minimatch@0.2.14
│ │ │ ├── lru-cache@2.5.0
│ │ │ └── sigmund@1.0.0
│ │ ├─┬ ps-tree@0.0.3
│ │ │ └─┬ event-stream@0.5.3
│ │ │   └─┬ optimist@0.2.8
│ │ │     └── wordwrap@0.0.2
│ │ ├─┬ utile@0.1.7
│ │ │ ├── async@0.1.22
│ │ │ ├── deep-equal@0.2.1
│ │ │ ├── i@0.3.2
│ │ │ ├── mkdirp@0.3.5
│ │ │ ├── ncp@0.2.7
│ │ │ └── rimraf@1.0.9
│ │ └── watch@0.5.1
│ ├─┬ nconf@0.6.9
│ │ ├── async@0.2.9
│ │ ├── ini@1.1.0
│ │ └─┬ optimist@0.6.0
│ │   ├── minimist@0.0.8
│ │   └── wordwrap@0.0.2
│ ├─┬ nssocket@0.5.1
│ │ ├── eventemitter2@0.4.13
│ │ └── lazy@1.0.11
│ ├── pkginfo@0.3.0
│ ├── timespan@2.3.0
│ ├─┬ utile@0.2.1
│ │ ├── async@0.2.10
│ │ ├── deep-equal@0.2.1
│ │ ├── i@0.3.2
│ │ ├── mkdirp@0.3.5
│ │ ├── ncp@0.4.2
│ │ └── rimraf@2.2.6
│ ├── watch@0.8.0
│ └─┬ winston@0.7.3
│   ├── async@0.2.10
│   ├── cycle@1.0.3
│   ├── eyes@0.1.8
│   ├─┬ request@2.16.6
│   │ ├── aws-sign@0.2.0
│   │ ├── cookie-jar@0.2.0
│   │ ├── forever-agent@0.2.0
│   │ ├─┬ form-data@0.0.10
│   │ │ └─┬ combined-stream@0.0.4
│   │ │   └── delayed-stream@0.0.5
│   │ ├─┬ hawk@0.10.2
│   │ │ ├── boom@0.3.8
│   │ │ ├── cryptiles@0.1.3
│   │ │ ├── hoek@0.7.6
│   │ │ └── sntp@0.1.4
│   │ ├── json-stringify-safe@3.0.0
│   │ ├── mime@1.2.11
│   │ ├── node-uuid@1.4.1
│   │ ├── oauth-sign@0.2.0
│   │ ├── qs@0.5.6
│   │ └── tunnel-agent@0.2.0
│   └── stack-trace@0.0.9
├─┬ jade@1.3.0
│ ├── character-parser@1.2.0
│ ├── commander@2.1.0
│ ├─┬ constantinople@2.0.0
│ │ └─┬ uglify-js@2.4.13
│ │   ├── async@0.2.10
│ │   ├─┬ optimist@0.3.7
│ │   │ └── wordwrap@0.0.2
│ │   ├─┬ source-map@0.1.33
│ │   │ └── amdefine@0.1.0
│ │   └── uglify-to-browserify@1.0.2
│ ├── mkdirp@0.3.5
│ ├─┬ monocle@1.1.51
│ │ └─┬ readdirp@0.2.5
│ │   └─┬ minimatch@0.2.14
│ │     ├── lru-cache@2.5.0
│ │     └── sigmund@1.0.0
│ ├─┬ transformers@2.1.0
│ │ ├─┬ css@1.0.8
│ │ │ ├── css-parse@1.0.4
│ │ │ └── css-stringify@1.0.5
│ │ ├─┬ promise@2.0.0
│ │ │ └── is-promise@1.0.0
│ │ └─┬ uglify-js@2.2.5
│ │   ├─┬ optimist@0.3.7
│ │   │ └── wordwrap@0.0.2
│ │   └─┬ source-map@0.1.33
│ │     └── amdefine@0.1.0
│ └─┬ with@3.0.0
│   └─┬ uglify-js@2.4.13
│     ├── async@0.2.10
│     ├─┬ optimist@0.3.7
│     │ └── wordwrap@0.0.2
│     ├─┬ source-map@0.1.33
│     │ └── amdefine@0.1.0
│     └── uglify-to-browserify@1.0.2
├─┬ mongodb@1.3.23
│ ├── bson@0.2.5
│ └── kerberos@0.0.3
├─┬ noble@0.3.0
│ ├── debug@0.7.4
│ ├─┬ ws@0.4.31
│ │ ├── commander@0.6.1
│ │ ├── nan@0.3.2
│ │ ├── options@0.0.5
│ │ └── tinycolor@0.0.1
│ └── xpc-connection@0.0.3
├─┬ optimist@0.6.1
│ ├── minimist@0.0.8
│ └── wordwrap@0.0.2
├─┬ socket.io@0.9.16
│ ├── base64id@0.1.0
│ ├── policyfile@0.0.4
│ ├── redis@0.7.3
│ └─┬ socket.io-client@0.9.16
│   ├─┬ active-x-obfuscator@0.0.1
│   │ └── zeparser@0.0.5
│   ├── uglify-js@1.2.5
│   ├─┬ ws@0.4.31
│   │ ├── commander@0.6.1
│   │ ├── nan@0.3.2
│   │ ├── options@0.0.5
│   │ └── tinycolor@0.0.1
│   └── xmlhttprequest@1.4.2
├─┬ stylus@0.42.3
│ ├── css-parse@1.7.0
│ ├── debug@0.7.4
│ ├─┬ glob@3.2.9
│ │ ├── inherits@2.0.1
│ │ └─┬ minimatch@0.2.14
│ │   ├── lru-cache@2.5.0
│ │   └── sigmund@1.0.0
│ ├── mkdirp@0.3.5
│ └── sax@0.5.8
└── underscore@1.6.0
