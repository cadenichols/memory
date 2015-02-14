/* global _, Tile */

'use strict';

$(document).ready(init);

var TIMER = 60;
var NUMROWS = 4;
var NUMCOLS = 5;
var NUMTILES = NUMROWS * NUMCOLS;

var tiles = [];
var $picked = [];
var flipped = [];

var counter;

function init() {
  createTiles();
  drawTiles();
  $('#start').on('click', startTimer);
  $(document).on('click', '.flipper', clickTile);

}

function clickTile() {
  if ($('#timer').text() === '0') { alert('Click Start Timer to begin!');}

  if ($('#timer').text() > 0 && !$(this).hasClass('picked')) {

    var $clicked = $(this);
    document.querySelector('#' + $clicked.parent().attr('id')).classList.toggle('flip');
    $clicked.addClass('picked');
    $picked.push($clicked);
    if ($picked.length === 2) {

      setTimeout(function() {

        if ($picked[0].find('.imgBack').attr('src') === $picked[1].find('.imgBack').attr('src')) {
          flipped.push($picked[0], $picked[1]);
          checkWin();
        } else {
          $picked[0].removeClass('picked');
          $picked[1].removeClass('picked');
          document.querySelector('#' + $picked[0].parent().attr('id')).classList.toggle('flip');
          document.querySelector('#' + $picked[1].parent().attr('id')).classList.toggle('flip');
        }
        $picked = [];
      }, 400);
    }
  }
}

function checkWin() {
  if (flipped.length === NUMTILES) {
    alert('You WIN!');
  }
}

function startTimer() {
  if ($('#timer').text() === '0') {
    counter = TIMER;
    $('#timer').text(counter);
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
      $imgFront.addClass('image imgFront');
      $imgBack.addClass('image imgBack');
      $('#front' + x + y).append($imgFront);
      $('#back' + x + y).append($imgBack);

    }
  }
}
