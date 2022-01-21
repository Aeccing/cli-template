#! /usr/bin/env node

const update = require("../lib/helper/update").default;

update().then((bool) => {
  if (!bool) return;

  const cli = require("../lib/cli").default;
  cli();
});
