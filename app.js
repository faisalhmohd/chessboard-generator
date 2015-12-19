#! /usr/bin/env node

var async = require('async');
var argv = require('yargs').argv;

var board, x, y, size, position;

function serve(err, thething) {
  console.log(thething);
}

function prepare(callback) {
  async.series([
    function (callback) {
      if(argv.x && argv.y){
        callback(null);
      }
      else {
        console.log('Please provide the necessary parameters!');
        process.exit();
      }
    },
    function (callback) {
      board = "";
      x = argv.x;
      y = argv.y;
      size = x*y;
      position = 0;
      callback(null)
    }
  ],
    function () {
      callback(null)
  });
}

function construct(callback) {
    for (var i = 0; i <= y; i++) {
      for (var j = 0; j < x; j++) {
        if (position % 2 == 0) {
          board += '#';
        }
        else {
          board += ' ';
        }
        if (x-1 != j) {
          position++;
        }
      }
      board += '\n';
      position++;
      if (i == y) {
        callback(null, board);
      }
    }
}

async.waterfall([
  prepare,
  construct
], serve);
