#!/bin/bash
grep 'cpu ' /proc/stat | awk '{usage=(($2+$4)*100/($2+$4+$5)*1000000)} END {print usage}'
