#!/bin/bash
sudo cat /proc/meminfo | grep MemFree | awk '{print $2}' > stringfree.log

for fn in `cat stringfree.log`; do
    printf $fn
done
