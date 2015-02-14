/* global _, Tile */

'use strict';

$(document).ready(init);

var NUMROWS = 4;
var NUMCOLS = 5;
var NUMTILES = NUMROWS * NUMCOLS;

var tiles = [];
var counter;

function init() {
  createTiles();
  drawTiles();
  $('#start').on('click', startTimer);
  $('.square').on('click', flipIt);

}

function flipIt() {
  console.log('test');
}

function startTimer() {
  counter = 60;
  setInterval(function() {
    counter--;
    if (counter >= 0) {
      $('#timer').text(counter);
    }
    if (counter === 0) {
      alert('You LOSE!');
    }
  }, 1000);
}

function drawTiles() {
  for (var y = 0; y < NUMROWS; y++) {

    var $row = $('<div>');
    $row.addClass('row');
    $row.attr('id', 'row' + y);
    $('#gamecontainer').append($row);

    for (var x = 0; x < NUMCOLS; x++) {

      var $container = $('<div>');
      $container.addClass('flip-container');
      $container.attr('id', 'cont' + x + y);
      $('#row' + y).append($container);

      var $flipper = $('<div>');
      $flipper.addClass('flipper');
      $flipper.attr('id', 'flip' + x + y);
      $('#cont' + x + y).append($flipper);

      var $squareFront = $('<div>');
      var $squareBack = $('<div>');
      $squareFront.addClass('square front');
      $squareBack.addClass('square back');
      $squareFront.attr('id', 'front' + x + y);
      $squareBack.attr('id', 'back' + x + y);
      $('#flip' + x + y).append($squareFront);
      $('#flip' + x + y).append($squareBack);

      var tile = tiles.pop();

      var $imgFront = $('<img>');
      var $imgBack = $('<img>');
      $imgFront.attr('src', tile.front);
      $imgBack.attr('src', tile.back);
      $imgFront.addClass('image front');
      $imgBack.addClass('image back');
      $('#front' + x + y).append($imgFront);
      $('#back' + x + y).append($imgBack);

    }
  }
}

function createTiles() {
  var images = [];
  for (var i = 1; i < 25; i++) {
    images.push('/images/' + i + '.png');
  }
  images = _.shuffle(images);

  for (var j = 0; j < NUMTILES / 2; j++) {
    var tile = new Tile(images.pop());
    tiles.push(tile);
    tiles.push(tile);
  }
  tiles = _.shuffle(tiles);
}
