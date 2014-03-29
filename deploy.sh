#!/bin/bash
echo ""
echo "Do you wish to deploy to the Beagle (192.168.25.199)?"
select ync in "Yes" "No" "Cancel"; do
	case $ync in
		Yes )
			echo "About to copy files to 192.168.25.199..."
			rsync -avrzh -e 'ssh' --rsync-path='sudo rsync' --exclude 'node_modules' --exclude=.svn --exclude deploy.sh . ubuntu@192.168.25.199:/var/fitBitTracker
			echo "Modifing last line of startBeacon.sh to match environment..."
			echo "/var/fitBitTracker/beacon-client.js beagle \"Wills Desk\"" | ssh ubuntu@192.168.25.199 'cat >> /var/fitBitTracker/startBeacon.sh'
			echo "Done"
			break;;
		No ) 
			echo "Skipping Beagle"
			break;;
		Cancel )
			exit;;
	esac
done
echo ""
echo "Do you wish to deploy to the Kiosk (192.168.25.106)?"
select ync in "Yes" "No" "Cancel"; do
	case $ync in
		Yes )
			echo "About to copy files to 192.168.25.106..."
			rsync -avrzh -e 'ssh' --rsync-path='sudo rsync' --exclude=.svn --exclude deploy.sh . demo@192.168.25.106:/var/fitBitTracker
			echo "Modifing last line of startBeacon.sh to match environment..."
			echo " /var/fitBitTracker/beacon-client.js kiosk Perk" | ssh demo@192.168.25.106 'cat >> /var/fitBitTracker/startBeacon.sh'
			echo ""
			echo "Done.  Please run npm install within /var/fitBitTracker to compile noble"
			break;;
		No ) 
			echo "Skipping Kiosk"
			break;;
		Cancel )
			exit;;
	esac
done
echo ""
echo "Do you wish to deploy to the BusDev (192.168.25.170)?"
select ync in "Yes" "No" "Cancel"; do
	case $ync in
		Yes )
			echo "About to copy files to 192.168.25.170..."
			rsync -avrzh -e 'ssh' --rsync-path='sudo rsync' --exclude=.svn --exclude deploy.sh . user2@192.168.25.170:/var/fitBitTracker
			echo "Modifing last line of startBeacon.sh to match environment..."
			echo " /var/fitBitTracker/beacon-client.js train2  \"Business Dev\"" | ssh user2@192.168.25.170 'cat >> /var/fitBitTracker/startBeacon.sh'
			echo "Done"
			break;;
		No ) 
			echo "Skipping BusDev"
			break;;
		Cancel )
			exit;;
	esac
done
echo ""
echo "Do you wish to deploy to the Reception (192.168.25.123)?"
select ync in "Yes" "No" "Cancel"; do
	case $ync in
		Yes )
			echo "About to copy files to 192.168.25.123..."
			rsync -avrzh -e 'ssh' --rsync-path='sudo rsync' --exclude=.svn --exclude deploy.sh . user6@192.168.25.123:/var/fitBitTracker
			echo "Modifing last line of startBeacon.sh to match environment..."
			echo " /var/fitBitTracker/beacon-client.js user6 reception" | ssh user6@192.168.25.123 'cat >> /var/fitBitTracker/startBeacon.sh'
			echo "Done"
			break;;
		No ) 
			echo "Skipping Reception"
			break;;
		Cancel )
			exit;;
	esac
done
echo ""
echo "First time here? Make the application auto-start: -"
echo "$ sudo cp startBeacon.sh /etc/init.d/"
echo "$ sudo update-rc.d /etc/init.d/startBeacon.sh defaults"
echo " -or- "
echo "Add to /etc/rc.local :-"
echo "sh '/home/ubuntu/fitBitTracker/startBeacon.sh'"
echo "exit 0"
echo "Note: the option 'defaults' puts a link to start your script in runlevels 2, 3, 4 and 5, and puts a link to stop in runlevels 0, 1 and 6."
echo ""