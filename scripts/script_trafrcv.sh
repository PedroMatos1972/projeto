#!/bin/bash
netstat -s | grep "total packets received" | awk '{print $1}' > filesrece.log
cat filesrece.log;
