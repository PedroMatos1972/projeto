#!/bin/bash
sudo ls /etc/nginx/conf.d > ficheiros.log
i=1;
for fn in `sudo cat ficheiros.log`; do
    i=$((i+1));
done
x=1;
printf '[' > files.log;
for fn in `sudo cat ficheiros.log`; do
    #printf $fn + " X" + "\n";
    #echo $i;
    x=$((x+1));
    if [ $i != $x ];
    then
      #printf "\x22file\x22:" >> files.log
      printf "\x22" >> files.log
      printf $fn >> files.log
      printf "\x22" >> files.log
      printf "\x2c " >> files.log
    fi
    if [ $i == $x ];
    then
      #printf "\x22file\x22:" >> files.log
      printf "\x22" >> files.log
      printf $fn >> files.log
      printf "\x22" >> files.log
    fi
done
printf ']' >> files.log
sudo cat files.log;
#cat ficheiros.log
