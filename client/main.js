/* global _, Tile */

'use strict';

$(document).ready(init);

var NUMROWS = 4;
var NUMCOLS = 5;
var NUMTILES = NUMROWS * NUMCOLS;

var tiles = [];

function init() {
  createTiles();
  drawTiles();
}

function drawTiles() {
  for (var y = 0; y < NUMROWS; y++) {

    var $row = $('<div>');
    $row.addClass('row');
    $row.attr('id', 'row' + y);
    $('#gamecontainer').append($row);

    for (var x = 0; x < NUMCOLS; x++) {
      var tile = tiles.pop();
      var $square = $('<div>');
      $square.css('background-image', 'url("' + tile.image + '")');
      $square.addClass('square');
      $square.attr('id', 'col' + x);
      $('#row' + y).append($square);
    }

  }
  // debugger;
}

function createTiles() {
  var images = [];
  for (var i = 1; i < 25; i++) {
    images.push('/images/' + i + '.png');
  }
  images = _.shuffle(images);

  for (var j = 0; j < NUMTILES / 2; i++) {
    var tile = new Tile(images.pop());
    tiles.push(tile);
    tiles.push(tile);
  }
  tiles = _.shuffle(tiles);
}
