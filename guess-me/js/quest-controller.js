'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  
    
  $('.game-start').hide()
  renderQuest();
  $('.quest').show()
}

function renderQuest() {
  
  var currQuest = getCurrQuest()
  $('.quest h2').text(currQuest.txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!');
      // TODO: improve UX
    } else {
      alert('I dont know...teach me!');
      // TODO: hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {

    gLastRes = res
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();

  addGuess(newQuest,newGuess,gLastRes)

  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
  createQuestsTree()
}
