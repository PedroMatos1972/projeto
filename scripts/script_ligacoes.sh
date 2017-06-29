#!/bin/bash

sudo ss -s | grep Total: | awk '{print $2}'
