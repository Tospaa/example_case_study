#!/bin/bash
touch $APP_HOME/ingester_cron_script.sh
echo '#!/bin/bash' > $APP_HOME/ingester_cron_script.sh
printenv | sed "s/^/export /g" >> $APP_HOME/ingester_cron_script.sh
echo '/usr/local/bin/python3 $APP_HOME/main.py' >> $APP_HOME/ingester_cron_script.sh
chmod 777 $APP_HOME/ingester_cron_script.sh
cron
bash -c "tail -f $APP_HOME/cron.log"
$@
