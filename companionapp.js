function selectMastery(e) {
  if (e.classList.contains("select")) {
    e.classList.remove("select");
  } else if (document.getElementsByClassName("select").length > 4) {
    alert("You can only have up to 5 masteries total");
    return;
  } else if (e.classList.contains("alter") && document.getElementsByClassName("select alter").length > 0) {
    alert("You can only select one Alter Mastery");
    return;
  } else {
    e.classList.add("select");
  }
}

function goNextP2() {
  if (document.getElementsByClassName("select").length < 3) {
    alert("You must choose at least 3 masteries");
    return;
  }
  saveMasteries();
  document.getElementById("P1Builder").style.display = "none";
  document.getElementById("P2Builder").style.display = "flex";
  document.getElementById("P1Next").style.display = "none";
  document.getElementById("P2Next").style.display = "inline";
  showMasteries();
}

var savedMasteries = new Array;

function saveMasteries() {
  var chosen = document.getElementsByClassName("select");
  for (var i = 0; i < chosen.length; i++) {
    savedMasteries.push(chosen[i].id);
  }
}

function showMasteries() {
  for (var i = 0; i < savedMasteries.length; i++) {
    document.getElementById("masterybar").innerHTML += document.getElementById(savedMasteries[i]).innerHTML;
    document.getElementById("masterybar").innerHTML += "<select id='M" + i + "'><option value=1 selected='selected'>E</option><option value=2>D</option><option value=3>C</option><option value=4>B</option><option value=5>A</option>";
  }
}

var equipmentRank = new Array;
var masteryRank = new Array;

function saveRank() {
  equipmentRank.push(document.getElementById("WRank").value);
  equipmentRank.push(document.getElementById("AWeight").value);
  equipmentRank.push(document.getElementById("ARank").value);

  for (i = 0; i < savedMasteries.length; i++) {
    masteryRank.push(document.getElementById("M" + i).value);
  }
}

function goNextP3() {
  saveRank();
  document.getElementById("P2Builder").style.display = "none";
  document.getElementById("P2Next").style.display = "none";
  document.getElementById("P3Builder").style.display = "flex";
  document.getElementById("P3Next").style.display = "inline";
  searchPrereqs();
  showActions();
}

var actions = new Array;
var availableActions = new Array;

function searchPrereqs() {
  for (var i = 0; i < savedMasteries.length; i++) {
    for (var j = 0; j < ActionList.length; j++) {
      if (ActionList[j].prerequisite.includes(savedMasteries[i]) === true) {
        actions.push(ActionList[j].name);
      }
    }
  }
  availableActions = Array.from(new Set(actions));
}

function showActions() {
  searchRevive();
  createCards();
}

function searchRevive() {
  for (var i = 0; i < savedMasteries.length; i++) {
    if (Revive.prerequisite.includes(savedMasteries[i]) === true) {
      document.getElementById("StandardActions").innerHTML += "<div class='actioncard selectedcard standard' id='Revive'><div class='actionname'>" + Revive.name + "</div><div><hr></div><div>" + Revive.dice + "</div><div><hr></div><div>" + Revive.description + "</div><div><hr></div><div>" + Revive.restrictions + "</div><div><hr></div><div class='rollcode'>" + Revive.rollcode +"</div></div>";
      break;
    }
  }
}

function createCards() {
  for (var i = 0; i < availableActions.length; i++) {
    var lookup = ActionList.findIndex(x => x.name === availableActions[i]);
    document.getElementById("OtherActions").innerHTML +=
    "<div class='actioncard othercard " + ActionList[lookup].modifier +"' onclick='chooseCards(this)' id='" + ActionList[lookup].idname + "'><div class='actionname'>" + ActionList[lookup].name + "</div><div><hr></div><div>" + ActionList[lookup].dice + "</div><div><hr></div><div>" + ActionList[lookup].description + "</div><div><hr></div><div>" + ActionList[lookup].restrictions + "</div><div><hr></div><div class='rollcode'>" + ActionList[lookup].rollcode +"</div></div>"
  }
}

function chooseCards(a) {
  if (a.classList.contains("selectedcard")) {
    a.classList.remove("selectedcard");
  } else if (equipmentRank[1] === "light") {
    if (equipmentRank[2] === "3" || equipmentRank[2] === "4" || equipmentRank[2] === "5") {
      if (document.getElementsByClassName("othercard selectedcard").length === 5) {
        alert("You may not select any more actions");
      } else {
        a.classList.add("selectedcard");
      }
    } else if (document.getElementsByClassName("othercard selectedcard").length === 4) {
        alert("You may not select any more actions");
      } else {
        a.classList.add("selectedcard");
      }
    } else if (document.getElementsByClassName("othercard selectedcard").length === 3) {
    alert("You may not select any more actions");
  } else {
    a.classList.add("selectedcard");
  }
}

var selectedActions = new Array;

function saveActions() {
  selectedActions =[];
  for (var i = 0; i < document.getElementsByClassName("selectedcard").length; i++) {
    selectedActions.push(document.getElementsByClassName("selectedcard")[i].id);
  }
}

function goNextP4() {
  saveActions();
  if (document.getElementsByClassName("selectedcard othercard").length < 3) {
    alert("You must select more actions");
    return;
  }
  document.getElementById("P3Builder").style.display = "none";
  document.getElementById("P4Builder").style.display = "grid";
  document.getElementById("P3Next").style.display = "none";
  setupGrid();
  populateMasteryArea();
}

function setupGrid() {
  document.getElementById("P4Builder").style.gridTemplateRows = "1fr 2fr 2fr";
  document.getElementById("P4Builder").style.gridTemplatColumns = "auto";
  document.getElementById("P4Builder").style.gridGap = "15px";
}

function populateMasteryArea() {
  populateEquipment();
  populateMasteries();
  populateStandardActions();
  populateChosenActions();
  equipmentReplace();
  findQualifying();
  getChosenActionMasteries();
  savesAndChecks();
}

function populateEquipment() {
  var checkW, checkA;
  if (equipmentRank[0] === "1") {
    checkW = "E";
  } else if (equipmentRank[0] === "2") {
    checkW = "D";
  } else if (equipmentRank[0] === "3") {
    checkW = "C";
  } else if (equipmentRank[0] === "4") {
    checkW = "B";
  } else if (equipmentRank[0] === "5") {
    checkW = "A";
  }
  if (equipmentRank[2] === "1") {
    checkA = "E";
  } else if (equipmentRank[2] === "2") {
    checkA = "D";
  } else if (equipmentRank[2] === "3") {
    checkA = "C";
  } else if (equipmentRank[2] === "4") {
    checkA = "B";
  } else if (equipmentRank[2] === "5") {
    checkA = "A";
  }

  document.getElementById("weapontext").innerHTML += checkW;
  document.getElementById("armortext").innerHTML += equipmentRank[1].toString().charAt(0).toUpperCase() + equipmentRank[1].toString().slice(1) + ")<br>" + checkW;
}

var checkM = new Array;

function populateMasteries() {
  for (var i = 0; i < masteryRank.length; i++) {
    if (masteryRank[i] === "1") {
      checkM.push("E");
    } else if (masteryRank[i] === "2") {
      checkM.push("D");
    } else if (masteryRank[i] === "3") {
      checkM.push("C");
    } else if (masteryRank[i] === "4") {
      checkM.push("B");
    } else if (masteryRank[i] === "5") {
      checkM.push("A");
    }
  }

  document.getElementById("mastery1").innerHTML = "<img src='Images/" + savedMasteries[0] + ".png'>";
  document.getElementById("mastery1text").innerHTML = "<div class='masterytext'>" + savedMasteries[0].replace(/-/, ' ') + "<br>" + checkM[0] + "</div>";
  document.getElementById("mastery2").innerHTML = "<img src='Images/" + savedMasteries[1] + ".png'>";
  document.getElementById("mastery2text").innerHTML = "<div class='masterytext'>" + savedMasteries[1].replace(/-/, ' ') + "<br>" + checkM[1] + "</div>";
  document.getElementById("mastery3").innerHTML = "<img src='Images/" + savedMasteries[2] + ".png'>";
  document.getElementById("mastery3text").innerHTML = "<div class='masterytext'>" + savedMasteries[2].replace(/-/, ' ') + "<br>" + checkM[2] + "</div>";
  if (savedMasteries.length > 3) {
    document.getElementById("masteryspace").innerHTML += "<div class='mastery'><img src='Images/" + savedMasteries[3] + ".png'></div>";
    document.getElementById("masteryspace").innerHTML += "<div class='masterytext'>" + savedMasteries[3].replace(/-/, ' ') + "<br>" + checkM[3] + "</div>";
  }
  if (savedMasteries.length > 4) {
    document.getElementById("masteryspace").innerHTML += "<div class='mastery'><img src='Images/" + savedMasteries[4] + ".png'></div>";
    document.getElementById("masteryspace").innerHTML += "<div class='masterytext'>" + savedMasteries[4].replace(/-/, ' ') + "<br>" + checkM[4] + "</div>";
  }
}

function populateStandardActions() {
  if (selectedActions[2] === "Revive") {
    document.getElementById("standardactionspace").innerHTML += "<div class='actioncard final finalstandard NA'><div class='actionname'>" + Revive.name + "</div><div><hr></div><div>" + Revive.dice + "</div><div><hr></div><div>" + Revive.description + "</div><div><hr></div><div>" + Revive.restrictions + "</div><div><hr></div><div class='togglemastery' id='togglerevive'></div><div><hr></div><div class='rollcode'>" + Revive.rollcode +"</div></div>"
  }
}

function populateChosenActions() {
  if (selectedActions[2] === "Revive") {
    for (var i = 3; i < selectedActions.length; i++) {
      var lookup = ActionList.findIndex(x => x.idname === selectedActions[i]);
      document.getElementById("chosenactionspace").innerHTML += "<div class='actioncard final finalchosen " + ActionList[lookup].modifier + "'><div class='actionname'>" + ActionList[lookup].name + "</div><div><hr></div><div>" + ActionList[lookup].dice + "</div><div><hr></div><div>" + ActionList[lookup].description + "</div><div><hr></div><div>" + ActionList[lookup].restrictions + "</div><div><hr></div><div class='togglemastery' id='toggle" + (i - 3) + "'></div><div><hr></div><div class='rollcode'>" + ActionList[lookup].rollcode +"</div></div>";
    }
  } else {
    for (var i = 2; i < selectedActions.length; i++) {
      var lookup = ActionList.findIndex(x => x.idname === selectedActions[i]);
      document.getElementById("chosenactionspace").innerHTML += "<div class='actioncard final finalchosen " + ActionList[lookup].modifier + "'><div class='actionname'>" + ActionList[lookup].name + "</div><div><hr></div><div>" + ActionList[lookup].dice + "</div><div><hr></div><div>" + ActionList[lookup].description + "</div><div><hr></div><div>" + ActionList[lookup].restrictions + "</div><div><hr></div><div class='togglemastery' id='toggle" + (i - 2) + "'></div><div><hr></div><div class='rollcode'>" + ActionList[lookup].rollcode +"</div></div>";
    }
  }
}

function equipmentReplace() {
  var strong = document.getElementsByClassName("final strong");
  var strongmod = 5 * equipmentRank[0];
  for (i = 0; i < strong.length; i++) {
    strong[i].innerHTML = strong[i].innerHTML.replace("ER", strongmod.toString());
  }
  var weak = document.getElementsByClassName("final weak");
  var weakmod = 3 * equipmentRank[0];
  for (i = 0; i < weak.length; i++) {
    weak[i].innerHTML = weak[i].innerHTML.replace("ER", weakmod.toString());
  }
  var one = document.getElementsByClassName("final one");
  var onemod = equipmentRank[0];
  for (i = 0; i < one.length; i++) {
    one[i].innerHTML = one[i].innerHTML.replace("\[ER]", onemod.toString());
    one[i].innerHTML = one[i].innerHTML.replace("ER", onemod.toString());
  }
}

var revivecheck = new Array;

function findQualifying() {
  for (i = 0; i < savedMasteries.length; i++) {
    document.getElementById("togglenormalattack").innerHTML += "<img onclick='toggleModifier(this)' src='Images/" + savedMasteries[i] + ".png'>"
  }
  for (i = 0; i < savedMasteries.length; i++) {
    if (Revive.prerequisite.includes(savedMasteries[i])) {
      revivecheck.push(savedMasteries[i]);
    }
  }
  for (i = 0; i < revivecheck.length; i++) {
    document.getElementById("togglerevive").innerHTML += "<img onclick='toggleModifier(this)' src='Images/" + revivecheck[i] + ".png'>"
  }
}

function toggleModifier(o) {
  for (i = 0; i < savedMasteries.length; i++) {
    if (o.src.indexOf(savedMasteries[i]) !== -1) {
      if (o.parentElement.parentElement.classList.contains("strong")) {
        var strongmod = masteryRank[i] * 5;
        o.parentElement.parentElement.getElementsByClassName("MR")[0].innerHTML = strongmod;
        return;
      } else if (o.parentElement.parentElement.classList.contains("weak")) {
        var weakmod = masteryRank[i] * 3;
        o.parentElement.parentElement.getElementsByClassName("MR")[0].innerHTML = weakmod;
        return;
      } else if (o.parentElement.parentElement.classList.contains("one")) {
        var onemod = masteryRank[i];
        o.parentElement.parentElement.getElementsByClassName("MR")[0].innerHTML = onemod * 2;
        return;
      } else if (o.parentElement.parentElement.classList.contains("NA")) {
        o.parentElement.parentElement.getElementsByClassName("MR")[0].innerHTML = masteryRank[i];
      }
    }
  }
}

var chosenArray = new Array;;
var chosenactions = document.getElementsByClassName("finalchosen");

function getChosenActionMasteries() {
  if (selectedActions[2] === "Revive") {
    chosenArray = selectedActions.splice(0,3);
  } else {
    chosenArray = selectedActions.splice(0,2);
  }
  for (var i = 0; i < chosenactions.length; i++) {
    var x = "toggle" + i.toString();
    var lookup = ActionList.findIndex(a => a.idname === selectedActions[i]);
      for (var j = 0; j < savedMasteries.length; j++) {
        if (ActionList[lookup].prerequisite.includes(savedMasteries[j])) {
          document.getElementById(x).innerHTML += "<img onclick='toggleModifier(this)' src='Images/" + savedMasteries[j] + ".png'>";
      }
    }
  }
}

function toggleInstructions() {
  if (document.getElementById("P1Builder").style.display !== "none") {
    alert("You may select up to 5 masteries total, and must choose a minimum of 3.\r\nAlter Masteries have their names in italics; you can only have 1 Alter Mastery at maximum.");
  } else if (document.getElementById("P2Builder").style.display !== "none") {
    alert("Select the ranks for your masteries and equipment.");
  } else if (document.getElementById("P3Builder").style.display !== "none") {
    alert("Choose your actions. You may choose three actions, unless you have Light Armor Rank C or above, in which case you may choose four.\r\nIf you have Light Armor at any rank, you may select one additional action that can be swapped in and out during a thread.\r\nOptions in yellow are Standard actions available to all characters; they do not take up one of your limited slots.");
  } else {
    alert("Your final build is displayed here. Click on the mastery icons on each card in order to change the modifiers in the roll codes.");
  }
}

var fortitudeSaveMod = 0;
var willSaveMod = 0;
var reflexSaveMod = 0;
var fitnessCheckMod = 0;
var knowledgeCheckMod = 0;
var knackCheckMod = 0;
var presenceCheckMod = 0;
var awarenessCheckMod = 0;
var spiritualityCheckMod = 0;

function calcFortitudeSave() {
  for (var i = 0; i < savedMasteries.length; i++) {
    var lookup = AllMasteries.findIndex(x => x.idname === savedMasteries[i])
    if (AllMasteries[lookup].save === "Fortitude") {
      fortitudeSaveMod += masteryRank[i] * 5;
    }
  }
}

function calcWillSave() {
  for (var i = 0; i < savedMasteries.length; i++) {
    var lookup = AllMasteries.findIndex(x => x.idname === savedMasteries[i])
    if (AllMasteries[lookup].save === "Will") {
      willSaveMod += masteryRank[i] * 5;
    }
  }
}

function calcReflexSave() {
  for (var i = 0; i < savedMasteries.length; i++) {
    var lookup = AllMasteries.findIndex(x => x.idname === savedMasteries[i])
    if (AllMasteries[lookup].save === "Reflex") {
      reflexSaveMod += masteryRank[i] * 5;
    }
  }
}

function calcFitnessCheck() {
  for (var i = 0; i < savedMasteries.length; i++) {
    var lookup = AllMasteries.findIndex(x => x.idname === savedMasteries[i])
    if (AllMasteries[lookup].specialty === "Fitness") {
      fitnessCheckMod += masteryRank[i] * 5;
    }
  }
}

function calcKnowledgeCheck() {
  for (var i = 0; i < savedMasteries.length; i++) {
    var lookup = AllMasteries.findIndex(x => x.idname === savedMasteries[i])
    if (AllMasteries[lookup].specialty === "Knowledge") {
      knowledgeCheckMod += masteryRank[i] * 5;
    }
  }
}

function calcKnackCheck() {
  for (var i = 0; i < savedMasteries.length; i++) {
    var lookup = AllMasteries.findIndex(x => x.idname === savedMasteries[i])
    if (AllMasteries[lookup].specialty === "Knack") {
      knackCheckMod += masteryRank[i] * 5;
    }
  }
}

function calcPresenceCheck() {
  for (var i = 0; i < savedMasteries.length; i++) {
    var lookup = AllMasteries.findIndex(x => x.idname === savedMasteries[i])
    if (AllMasteries[lookup].specialty === "Presence") {
      presenceCheckMod += masteryRank[i] * 5;
    }
  }
}

function calcAwarenessCheck() {
  for (var i = 0; i < savedMasteries.length; i++) {
    var lookup = AllMasteries.findIndex(x => x.idname === savedMasteries[i])
    if (AllMasteries[lookup].specialty === "Awareness") {
      awarenessCheckMod += masteryRank[i] * 5;
    }
  }
}

function calcSpiritualityCheck() {
  for (var i = 0; i < savedMasteries.length; i++) {
    var lookup = AllMasteries.findIndex(x => x.idname === savedMasteries[i])
    if (AllMasteries[lookup].specialty === "Spirituality") {
      spiritualityCheckMod += masteryRank[i] * 5;
    }
  }
}

function calcSaves() {
  calcFortitudeSave();
  calcWillSave();
  calcReflexSave();
}

function calcChecks() {
  calcFitnessCheck();
  calcKnowledgeCheck();
  calcKnackCheck();
  calcPresenceCheck();
  calcAwarenessCheck();
  calcSpiritualityCheck();
}

function savesAndChecks() {
  calcSaves();
  calcChecks();

  populateSaves();
  populateChecks();
}


function populateSaves() {
  document.getElementById("fortitudesave").innerHTML = fortitudeSaveMod;
  document.getElementById("willsave").innerHTML = willSaveMod;
  document.getElementById("reflexsave").innerHTML = reflexSaveMod;
}

function populateChecks() {
  document.getElementById("fitnesscheck").innerHTML = fitnessCheckMod;
  document.getElementById("knowledgecheck").innerHTML = knowledgeCheckMod;
  document.getElementById("knackcheck").innerHTML = knackCheckMod;
  document.getElementById("presencecheck").innerHTML = presenceCheckMod;
  document.getElementById("awarenesscheck").innerHTML = awarenessCheckMod;
  document.getElementById("spiritualitycheck").innerHTML = spiritualityCheckMod;
}
