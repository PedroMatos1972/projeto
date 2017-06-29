#!/bin/bash
sudo cat /proc/meminfo | grep MemTotal | awk '{print $2}' > stringtotal.log


for fn in `cat stringtotal.log`; do
    printf $fn
done
