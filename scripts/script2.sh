#!/bin/bash
sudo lsof -i -P -n | grep "node" | awk '{print $9}' | sed -n '2p'
