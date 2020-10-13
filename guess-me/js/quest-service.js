const DB_KEY = 'questions-db'
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = loadFromStorage(DB_KEY)
    if (!gQuestsTree) {

        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi?');
        gQuestsTree.no = createQuest('Rita?');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
saveToStorage(DB_KEY,gQuestsTree)
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest
    gCurrQuest = (res === 'yes') ? gCurrQuest.yes : gCurrQuest.no
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    var newQuest = createQuest(newQuestTxt)
    newQuest.yes = createQuest(newGuessTxt)
    newQuest.no = gCurrQuest
    gPrevQuest[lastRes] = newQuest
    saveToStorage(DB_KEY, gQuestsTree)


}

function getCurrQuest() {
    return gCurrQuest
}


