#!/bin/bash
netstat -s | grep "requests sent out" | awk '{print $1}' > filessent.log
cat filessent.log;
