#!/usr/bin/env node

const shelljs = require("shelljs");

shelljs.exec("terraform init");
shelljs.exec("terraform validate");

