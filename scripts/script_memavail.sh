#!/bin/bash
cat /proc/meminfo | grep MemAvailable | awk '{print $2}' > stringavail.log


for fn in `cat stringavail.log`; do
    printf $fn
done
