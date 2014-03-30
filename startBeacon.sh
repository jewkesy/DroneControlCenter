#!/bin/bash

# For start on boot, add to /etc/rc.local :-
#sh '/home/ubuntu/fitBitTracker/startBeacon.sh'
#exit 0

# ENSURE THERE IS A SINGLE, EMPTY LINE AT THE BOTTOM - LINE WILL BE INJECTEC BY deploy.sh
#/home/ubuntu/fitBitTracker/beacon-client.js beagle "Wills Desk"

# Invoke the Forever module
sudo forever \
start \
-l forever.log \
-o out.log \
-ae err.log \
