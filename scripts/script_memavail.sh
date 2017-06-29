#!/bin/bash
sudo cat /proc/meminfo | grep MemAvailable | awk '{print $2}' > stringavail.log


for fn in `sudo cat stringavail.log`; do
    printf $fn
done
