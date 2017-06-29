#!/bin/bash

ss -s | grep Total: | awk '{print $2}'
