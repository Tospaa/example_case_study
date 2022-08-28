#!/bin/bash
touch /usr/src/ingester/ingester_cron_script.sh
echo '#!/bin/bash' > /usr/src/ingester/ingester_cron_script.sh
printenv | sed "s/^/export /g" >> /usr/src/ingester/ingester_cron_script.sh
echo '/usr/local/bin/python3 /usr/src/ingester/main.py' >> /usr/src/ingester/ingester_cron_script.sh
chmod 777 /usr/src/ingester/ingester_cron_script.sh
cron
bash -c "tail -f /usr/src/ingester/cron.log"
$@
