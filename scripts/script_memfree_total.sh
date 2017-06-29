#!/bin/bash
#printf  '[\x22' >  string.log
sudo cat /proc/meminfo | grep MemTotal | awk '{print $2}' > string.log
printf  ',' >> string.log
sudo cat /proc/meminfo | grep MemFree | awk '{print $2}' >> string.log
printf  ',' >> string.log
sudo cat /proc/meminfo | grep MemAvailable | awk '{print $2}'>> string.log
printf  ',' >> string.log
sudo cat /proc/meminfo | grep Cached: | awk '{print $2}' | sed -n '1p'>> string.log
#printf  '\x22]' >>  string.log
#cat string.log

#echo "[" + $a + "," + $b + "," + $c + "," + $d + "]";
#printf '[\x22'$a'\x22,\x22'$b'\x22,\x22'$c'\x22,\x22'$d'\x22]';
#printf '[\x22'a'\x22,\x22'$a'\x22,\x22'c'\x22,\x22'd'\x22]'



for fn in `sudo cat string.log`; do
    printf $fn
done
