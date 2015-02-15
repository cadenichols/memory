/* global _, Tile */

'use strict';

$(document).ready(init);

var TIMER = 3;
var NUMROWS;
var NUMCOLS;
var NUMTILES = NUMROWS * NUMCOLS;

var intervalID = 0;
var tiles = [];
var $picked = [];
var flipped = [];

function init() {
  $('#start').on('click', startGame);
  $(document).on('click', '.flipper', clickTile);
}

function startGame() {
  if (!intervalID) {
    selectTime();
    selectSize();
    createTiles();
    drawTiles();
    startTimer();
  }
}

function selectTime() {
  switch ($('#timeselect').val()) {
    case '15 secs.': TIMER = 15; break;
    case '30 secs.': TIMER = 30; break;
    case '45 secs.': TIMER = 45; break;
    case '60 secs.': TIMER = 60; break;
    case '75 secs.': TIMER = 75; break;
  }
}

function selectSize() {
  switch ($('#sizeselect').val()) {
    case '2x4': NUMROWS = 2; NUMCOLS = 4; break;
    case '3x4': NUMROWS = 3; NUMCOLS = 4; break;
    case '4x4': NUMROWS = 4; NUMCOLS = 4; break;
    case '4x5': NUMROWS = 4; NUMCOLS = 5; break;
    case '4x6': NUMROWS = 4; NUMCOLS = 6; break;
  }
  NUMTILES = NUMROWS * NUMCOLS;
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
    alert('Great!  You won in ' + (TIMER - $('#timer').text()) + ' seconds!');
  }
}

function startTimer() {
  var clock;
  clock = TIMER;
  $('#timer').text(clock);
  intervalID = setInterval(function() {
    clock--;
    if (clock >= 0) {
      $('#timer').text(clock);
    }
    if (clock === 0) {
      alert('You LOSE!');
    }
  }, 1000);
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
