#!/bin/bash
sudo cat /proc/meminfo | grep MemFree | awk '{print $2}'
