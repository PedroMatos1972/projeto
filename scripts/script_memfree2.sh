#!/bin/bash
#printf  '[\x22' >  string.log

cat /proc/meminfo | grep MemFree | awk '{print $2}' >> string.log

for fn in `cat string.log`; do
    printf $fn
done
