window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

function toggleInstructions() {
  if (document.getElementById("instructions").style.display !== "inline-block") {
    document.getElementById("instructions").style.display = "inline-block"
  } else {
    document.getElementById("instructions").style.display = "none"
  }
}

function toggleLinks() {
  if (document.getElementById("helpfullinks").style.display !== "inline-block") {
    document.getElementById("helpfullinks").style.display = "inline-block"
  } else {
    document.getElementById("helpfullinks").style.display = "none"
  }
}

function toggleImport() {
  if (document.getElementById("import").style.display !== "inline-block") {
    document.getElementById("import").style.display = "inline-block"
  } else {
    document.getElementById("import").style.display = "none";
  }
}

var errormessage = "";

function importBuild() {
  errormessage = "";
  var code = document.getElementById("importfield").value;
  if (code.indexOf("|") === -1) {
    alert("Your build code is invalid");
    return;
  }

  document.getElementsByClassName("hpcontainer")[0].innerHTML = "<div class='displaycircle hp'><img src='https://i.ibb.co/3hY7zsS/heart-plus.png'></div><div>HP</div>";
  document.getElementsByClassName("movementcontainer")[0].innerHTML = "<div class='displaycircle move'><img src='https://i.ibb.co/dG2Bwwd/footsteps.png'></div><div>Movement</div>";

  document.getElementById("fortitudesave").innerHTML = "+";
  document.getElementById("willsave").innerHTML = "+";
  document.getElementById("reflexsave").innerHTML = "+";

  document.getElementById("skillknack").innerHTML = "+";
  document.getElementById("skillfitness").innerHTML = "+";
  document.getElementById("skillpresence").innerHTML = "+";
  document.getElementById("skillawareness").innerHTML = "+";
  document.getElementById("skillknowledge").innerHTML = "+";

  document.getElementsByClassName("weaponrankdisplay")[0].innerHTML = "<div class='displaycircle equipment'><img src='https://e-foead.github.io/Images/Weapon-Rank.png'></div><div>Weapon Rank</div>";
  document.getElementsByClassName("armorrankdisplay")[0].innerHTML = "<div class='displaycircle equipment'><img id='armordisplay'></div><div>Armor Rank</div>";
  document.getElementsByClassName("passivecontainer")[0].innerHTML = "<b>Armor Passive</b>";

  document.getElementById("masterydisplay").innerHTML = "";

  document.getElementsByClassName("card normal")[0].innerHTML = "<div><span class='cardtitle'>Normal Attack</span></div><div class='line'></div><div>A spell, physical, or combo attack flavored by your mastery.<br>On a natural 100, double your total after adding modifiers.</div><div class='line'></div><div>1d100 + modifiers</div><div class='line'></div><div><span class='rollcode'>?r attack <span class='masteryreplace'>MR</span> WR # character-name/thread-code</span></div>";
  document.getElementById("actionsdisplay").innerHTML = "";

  fortitude = reflex = will = 0;
  fitness = knack = awareness = presence = knowledge = 0;
  movement = 1;

  var firstdeli = code.indexOf("|");
  var masteryload = code.substring(0,firstdeli);

  var seconddeli = code.indexOf("|", firstdeli + 1);
  var masteryrankload = code.substring(firstdeli + 1, seconddeli);

  var thirddeli = code.indexOf("|", seconddeli + 1);
  armorweight = code.substring(seconddeli + 1, thirddeli);

  var fourthdeli = code.indexOf("|", thirddeli + 1);
  armorRank = code.substring(thirddeli + 1, fourthdeli);

  var fifthdeli = code.indexOf("|", fourthdeli + 1);
  weaponRank = code.substring(fourthdeli + 1, fifthdeli);

  var actionsload = code.substring(fifthdeli + 1);

  chosenMasteries = masteryload.split(",");
  chosenMasteriesRanks = masteryrankload.split(",");
  chosenActions = actionsload.split(",");

  chosenMasteriesRanksLetter = [];

  armorimg = "https://terrarp.com/db/wiki/armor-" + armorweight + ".png";

  for (var i = 0; i < chosenMasteriesRanks.length; i++) {
    if (chosenMasteriesRanks[i] === "1") {
      chosenMasteriesRanksLetter.push("D")
    } else if (chosenMasteriesRanks[i] === "2") {
      chosenMasteriesRanksLetter.push("C")
    } else if (chosenMasteriesRanks[i] === "3") {
      chosenMasteriesRanksLetter.push("B")
    } else if (chosenMasteriesRanks[i] === "4") {
      chosenMasteriesRanksLetter.push("A")
    } else if (chosenMasteriesRanks[i] === "5") {
      chosenMasteriesRanksLetter.push("S")
    } else {
      errormessage = "Your build code is invalid."
    }
  }

  if (armorRank === "1") {
    armorRankLetter = "D"
  } else if (armorRank === "2") {
    armorRankLetter = "C"
  } else if (armorRank === "3") {
    armorRankLetter = "B"
  } else if (armorRank === "4") {
    armorRankLetter = "A"
  } else if (armorRank === "5") {
    armorRankLetter = "S"
  } else {
    errormessage = "Your build code is invalid."
  }

  if (weaponRank === "1") {
    weaponRankLetter = "D"
  } else if (weaponRank === "2") {
    weaponRankLetter = "C"
  } else if (weaponRank === "3") {
    weaponRankLetter = "B"
  } else if (weaponRank === "4") {
    weaponRankLetter = "A"
  } else if (armorRank === "5") {
    weaponRankLetter = "S"
  } else {
    errormessage = "Your build code is invalid."
  }

  saveActions();
  displayMasteries();
  displayEquipment();
  populateNormal();
  displayActions();

  hpCalc();
  calcSaves();
  calcExpertise();

  getCode();

  if (errormessage.length > 0) {
    alert(errormessage);
    chosenMasteries = chosenMasteriesRanks = chosenMasteriesRanksLetter = [];
    chosenActions = [];
    fortitude = reflex = will = 0;
    fitness = knack = awareness = presence = knowledge = 0;
    movement = 1;

    document.getElementsByClassName("hpcontainer")[0].innerHTML = "<div class='displaycircle hp'><img src='https://i.ibb.co/3hY7zsS/heart-plus.png'></div><div>HP</div>";
    document.getElementsByClassName("movementcontainer")[0].innerHTML = "<div class='displaycircle move'><img src='https://i.ibb.co/dG2Bwwd/footsteps.png'></div><div>Movement</div>";

    document.getElementById("fortitudesave").innerHTML = "+";
    document.getElementById("willsave").innerHTML = "+";
    document.getElementById("reflexsave").innerHTML = "+";

    document.getElementById("skillknack").innerHTML = "+";
    document.getElementById("skillfitness").innerHTML = "+";
    document.getElementById("skillpresence").innerHTML = "+";
    document.getElementById("skillawareness").innerHTML = "+";
    document.getElementById("skillknowledge").innerHTML = "+";

    document.getElementsByClassName("weaponrankdisplay")[0].innerHTML = "<div class='displaycircle equipment'><img src='https://e-foead.github.io/Images/Weapon-Rank.png'></div><div>Weapon Rank</div>";
    document.getElementsByClassName("armorrankdisplay")[0].innerHTML = "<div class='displaycircle equipment'><img id='armordisplay'></div><div>Armor Rank</div>";
    document.getElementsByClassName("passivecontainer")[0].innerHTML = "<b>Armor Passive</b>";

    document.getElementById("masterydisplay").innerHTML = "";

    document.getElementsByClassName("card normal")[0].innerHTML = "<div><span class='cardtitle'>Normal Attack</span></div><div class='line'></div><div>A spell, physical, or combo attack flavored by your mastery.<br>On a natural 100, double your total after adding modifiers.</div><div class='line'></div><div>1d100 + modifiers</div><div class='line'></div><div><span class='rollcode'>?r attack <span class='masteryreplace'>MR</span> WR # character-name/thread-code</span></div>";
    document.getElementById("actionsdisplay").innerHTML = "";

    document.getElementById("builddisplay").style.display = "none";
    document.getElementById("masterycontainer").style.display = "block";
    document.getElementById("button1").style.display = "inline-block"

    return;
  }

  document.getElementById("masterycontainer").style.display = "none";
  document.getElementById("button1").style.display = "none";
  document.getElementById("builddisplay").style.display = "block";
  document.getElementById("import").style.display = "none";

  window.scrollTo(0,0);

}

function selectMastery(e) {
  var selectedlist = document.getElementsByClassName("selected");

  if (!e.classList.contains("armor")) {
    if (document.getElementsByClassName("mastery selected").length === 5 && !e.classList.contains("selected")) {
      alert("You may only select 5 masteries at maximum.")
      return;
    } else if (!e.classList.contains("alter")) {
      if (document.getElementsByClassName("mastery selected").length === 5 && !e.classList.contains("selected")) {
        alert("You may only select 5 masteries at maximum.")
        return;
      }
    }
  }

  if (e.classList.contains("alter")) {
    if (document.getElementsByClassName("alter selected").length > 0) {
      if (!e.classList.contains("selected")) {
        for (var i = 0; i < document.getElementsByClassName("alter").length; i++) {
          document.getElementsByClassName("alter")[i].classList.remove("selected")
        }
        e.classList.add("selected")
      } else {
        e.classList.remove("selected")
      }
    } else {
      e.classList.add("selected")
    }
    return;
  }

  if (e.classList.contains("armor")) {
    if (document.getElementsByClassName("armor selected").length > 0) {
      if (!e.classList.contains("selected")) {
        for (var i = 0; i < document.getElementsByClassName("armor").length; i++) {
          document.getElementsByClassName("armor")[i].classList.remove("selected")
        }
        e.classList.add("selected")
      } else {
        e.classList.remove("selected")
      }
    } else {
      e.classList.add("selected")
    }
    return;
  }

  if (e.classList.contains("selected")) {
    e.classList.remove("selected")
  } else {
    e.classList.add("selected")
  }
}

var weaponartscomp = ["beast-arts", "shadow-arts", "alchemy", "magitech"];
var evokecomp = ["arcanamancy", "astramancy", "geomancy", "hemomancy", "hydromancy", "illusion-magic", "aeromancy", "dark-magic", "pyromancy", "animancy", "chronomancy", "divine-magic", "harmonic-magic", "nature-magic", "spirit-magic"];

var compcheck = true;
var compcount = 0;

function compatabilityCheck() {
  if (chosenMasteries.includes("weapon-arts")) {
    for (var i = 0; i < chosenMasteries.length - 1; i++) {
      for (var j = 0; j < weaponartscomp.length; j++) {
        if (chosenMasteries[i] === weaponartscomp[j]) {
          compcount++;
        }
      }
    }
    if (compcount === chosenMasteries.length - 1) {
      compcheck = false;
    } else {
      compcheck = true;
    }
    if (compcheck === false) {
      alert("Weapon Arts is not compatible with your chosen masteries. It cannot be taken with Beast Arts, Shadow Arts, Alchemy, and Magitech. Please select at least one other mastery to use Weapon Arts.");
    }
  } else if (chosenMasteries.includes("evoke")) {
    for (var i = 0; i < chosenMasteries.length -1; i++) {
      for (var j = 0; j < evokecomp.length; j++) {
        if (chosenMasteries[i] === evokecomp[j]) {
          compcount++;
        }
      }
    }
    if (compcount === 0) {
      compcheck = false;
    } else {
      compcheck = true;
    }
    if (compcheck === false) {
      alert("Evoke is not compatible with your chosen masteries. Please select at least one magic mastery to use Evoke.");
    }
  }
}

var mcheck = false;

function checkMastery() {
  if (document.getElementsByClassName("mastery selected").length < 3) {
    alert("Please select at least three masteries.");
  } else if (document.getElementsByClassName("armor selected").length === 0) {
    alert("Please select an armor weight.")
  } else {
    mcheck = true;
  }
}

function nextButton1() {
  chosenMasteries = [];
  armorweight = "";

  checkMastery();
  if (mcheck === false) {
    return;
  }

  saveMasteries();
  armorweight = document.getElementsByClassName("armor selected")[0].id;
  armorimg = "https://terrarp.com/db/wiki/armor-" + armorweight + ".png";
  document.getElementById("armorimage").src = armorimg;

  compatabilityCheck();
  if (compcheck === false) {
    return;
  }

  document.getElementById("masteryrankpick").innerHTML = "";

  fillMasteriesRank();

  document.getElementById("masterycontainer").style.display = "none";
  document.getElementById("rankselector").style.display = "block";
  document.getElementById("button1").style.display = "none";
  document.getElementById("button2").style.display = "inline-block";
  document.getElementById("button2back").style.display = "inline-block";

  window.scrollTo(0,0);
}

function backPart1() {
  chosenMasteries = [];

  document.getElementById("masterycontainer").style.display = "block";
  document.getElementById("rankselector").style.display = "none";
  document.getElementById("button1").style.display = "inline-block";
  document.getElementById("button2").style.display = "none";
  document.getElementById("button2back").style.display = "none";

  window.scrollTo(0,0);
}

var armorweight = "";
var chosenMasteries = [];

function saveMasteries() {
  var x = document.getElementsByClassName("mastery selected")
  for (var i = 0; i < x.length; i++) {
    chosenMasteries.push(x[i].id)
  }
}

function fillMasteriesRank() {
  for (var i = 0; i < chosenMasteries.length; i++) {
    for (var j = 0; j < masterylist.length; j++) {
      if (chosenMasteries[i] === masterylist[j].lookup) {
        document.getElementById("masteryrankpick").innerHTML += "<div class='rankcontainer' id='rank" + i + "'><div id='mastery" + i + "' class='masterycircle'><img src=" + masterylist[j].image + "></div>" + masterylist[j].name + "<br><select id='masteryrank" + i + "' autocomplete='off'><option value='1' selected>D</option><option value='2'>C</option><option value='3'>B</option><option value='4'>A</option><option value='5'>S</option></select></div>";
        document.getElementById("mastery" + i).style.backgroundColor = masterylist[j].color;
        document.getElementById("rank" + i).style.marginBottom = "1vw";
      }
    }
  }
}

function nextButton2() {
  document.getElementById("rankselector").style.display = "none";
  document.getElementById("actionselector").style.display = "block";
  document.getElementById("button2").style.display = "none";
  document.getElementById("button2back").style.display = "none";
  document.getElementById("button3").style.display = "inline-block";
  document.getElementById("button3back").style.display = "inline-block";

  saveMasteryRanks();
  saveEquipmentRanks();

  getActions();
  getCards();

  window.scrollTo(0,0);
}

function backPart2() {

  chosenMasteriesRanks = [];
  chosenMasteriesRanksLetter = [];
  actionpool = [];
  singlearraypool = [];
  uniqueactionpool = [];
  uniqueactions = [];

  document.getElementById("pickactions").innerHTML = "";

  document.getElementById("rankselector").style.display = "block";
  document.getElementById("actionselector").style.display = "none";
  document.getElementById("button2").style.display = "inline-block";
  document.getElementById("button2back").style.display = "inline-block";
  document.getElementById("button3").style.display = "none";
  document.getElementById("button3back").style.display = "none";

  window.scrollTo(0,0);
}

var chosenMasteriesRanks = [];

function saveMasteryRanks() {
  for (var i = 0; i < chosenMasteries.length; i++) {
    var y = "masteryrank" + i;
    var choice = document.getElementById(y);
    chosenMasteriesRanks.push(document.getElementById(y).value);
    chosenMasteriesRanksLetter.push(choice.options[choice.selectedIndex].text);
  }
}

var chosenMasteriesRanksLetter = [];

var weaponRank = "";
var weaponRankLetter = "";
var armorRank = "";
var armorRankLetter = "";

function saveEquipmentRanks() {
  weaponRank = document.getElementById("weaponrank").value;
  armorRank = document.getElementById("armorrank").value;
  weaponRankLetter = document.getElementById("weaponrank").options[document.getElementById("weaponrank").selectedIndex].text;
  armorRankLetter = document.getElementById("armorrank").options[document.getElementById("armorrank").selectedIndex].text
}

var actionpool = [];
var singlearraypool = [];
var uniqueactionpool;
var uniqueactions;

function getActions() {
  for (var i = 0; i < chosenMasteries.length; i++) {
    var x = masterylist.findIndex(item => item.lookup === chosenMasteries[i]);
    actionpool.push(masterylist[x].actions)
  }

  for (var y = 0; y < actionpool.length; y++) {
    for (var z = 0; z < actionpool[y].length; z++) {
      singlearraypool.push(actionpool[y][z])
    }
  }
  uniqueactionpool = [...new Set(singlearraypool)];
  uniqueactions = uniqueactionpool.slice(3)
}

function getCards() {
  var actioncard;
  for (var i = 0; i < uniqueactions.length; i++) {
    var x = actionlist.findIndex(a => a.name === uniqueactions[i]);
    if (actionlist[x].category !== "passive") {
      actioncard = "<div class='card choice' id='" + actionlist[x].lookup + "' onclick='selectAction(this)'><div><span class='cardtitle'>" + actionlist[x].name + "</span></div><div class='line'></div><div>" + actionlist[x].description + "</div><div class='line'></div><div>" + actionlist[x].dice + "</div><div class='line'></div><div><span class='rollcode'>" + actionlist[x].roll + "</span></div></div>";
      document.getElementById("pickactions").innerHTML += actioncard;
      document.getElementById(actionlist[x].lookup).style.borderColor = actionlist[x].color
    } else {
      actioncard = "<div class='card choice' id='" + actionlist[x].lookup + "' onclick='selectAction(this)'><div><span class='cardtitle'>" + actionlist[x].name + "</span></div><div class='line'></div><div>" + actionlist[x].description + "</div></div>";
      document.getElementById("pickactions").innerHTML += actioncard;
      document.getElementById(actionlist[x].lookup).style.borderColor = actionlist[x].color
    }
  }
}


function selectAction(e) {
  var slots;
  if (armorweight === "light") {
    slots = 5
  } else {
    slots = 4
  }

  if (e.classList.contains("selected")) {
    e.classList.remove("selected")
  } else if (document.getElementsByClassName("card selected").length === slots + 3) {
    alert("You may only select " + slots + " additional actions.")
    return;
  } else {
    e.classList.add("selected")
  }
}

function nextButton3() {
  document.getElementById("actionselector").style.display = "none";
  document.getElementById("builddisplay").style.display = "block";
  document.getElementById("button3").style.display = "none";
  document.getElementById("button3back").style.display = "none";
  document.getElementById("button4back").style.display = "inline-block";

  saveActions();
  displayMasteries();
  displayEquipment();
  populateNormal();
  displayActions();

  hpCalc();
  calcSaves();
  calcExpertise();

  getCode();

  window.scrollTo(0,0);
}

function backPart3() {
  document.getElementById("actionselector").style.display = "block";
  document.getElementById("builddisplay").style.display = "none";
  document.getElementById("button3").style.display = "inline-block";
  document.getElementById("button3back").style.display = "inline-block";
  document.getElementById("button4back").style.display = "none";

  chosenActions = [];

  document.getElementsByClassName("hpcontainer")[0].innerHTML = "<div class='displaycircle hp'><img src='https://i.ibb.co/3hY7zsS/heart-plus.png'></div><div>HP</div>";

  document.getElementById("fortitudesave").innerHTML = "+";
  document.getElementById("willsave").innerHTML = "+";
  document.getElementById("reflexsave").innerHTML = "+";

  document.getElementById("skillknack").innerHTML = "+";
  document.getElementById("skillfitness").innerHTML = "+";
  document.getElementById("skillpresence").innerHTML = "+";
  document.getElementById("skillawareness").innerHTML = "+";
  document.getElementById("skillknowledge").innerHTML = "+";

  document.getElementsByClassName("weaponrankdisplay")[0].innerHTML = "<div class='displaycircle equipment'><img src='https://e-foead.github.io/Images/Weapon-Rank.png'></div><div>Weapon Rank</div>";
  document.getElementsByClassName("armorrankdisplay")[0].innerHTML = "<div class='displaycircle equipment'><img id='armordisplay'></div><div>Armor Rank</div>";
  document.getElementsByClassName("passivecontainer")[0].innerHTML = "<b>Armor Passive</b>";

  document.getElementById("masterydisplay").innerHTML = "";

  document.getElementsByClassName("card normal")[0].innerHTML = "<div><span class='cardtitle'>Normal Attack</span></div><div class='line'></div><div>A spell, physical, or combo attack flavored by your mastery.<br>On a natural 100, double your total after adding modifiers.</div><div class='line'></div><div>1d100 + modifiers</div><div class='line'></div><div><span class='rollcode'>?r attack <span class='masteryreplace'>MR</span> WR # character-name/thread-code</span></div>";
  document.getElementById("actionsdisplay").innerHTML = "";

  fortitude = 0;
  reflex = 0;
  will = 0;

  fitness = 0;
  knack = 0;
  awareness = 0;
  knowledge = 0;
  presence = 0;

  window.scrollTo(0,0);
}

var chosenActions = [];

function saveActions() {
  for (var i = 0; i < document.getElementsByClassName("choice selected").length; i++) {
    chosenActions.push(document.getElementsByClassName("choice selected")[i].id)
  }
}

function displayActions() {
  var displaycard;
  for (var i = 0; i < chosenActions.length; i++) {
    var validmastery = [];
    var x = actionlist.findIndex(a => a.lookup === chosenActions[i]);
    if (actionlist[x].category !== "passive") {
      displaycard = "<div class='card' id='" + actionlist[x].lookup + "final'><div><span class='cardtitle'>" + actionlist[x].name + "</span></div><div class='line'></div><div>" + actionlist[x].description + "</div><div class='line'></div><div>" + actionlist[x].dice + "</div><div class='line'></div><div><span class='rollcode " + actionlist[x].lookup + "'>" + actionlist[x].roll + "</span></div></div>";
      for (var a = 0; a < chosenMasteries.length; a++) {
        if (actionlist[x].masteries.includes(chosenMasteries[a])) {
          var z = masterylist.findIndex(q => q.lookup === chosenMasteries[a]);
          validmastery.push("<div class='display masterycircle " + chosenMasteries[a] + "'><img onclick='clickMastery(this)' class='" + masterylist[z].lookup + "' src=" + masterylist[z].image + "></div>")
        }
        if (!validmastery.length) {
          errormessage = "Your build code is invalid"
        }
      }
      displaycard = displaycard.substring(0, displaycard.length - 6);
      displaycard += "<div class='line'></div><div class='masteryicon'>" + validmastery.join("",) + "</div></div>"
      document.getElementById("actionsdisplay").innerHTML += displaycard;
      document.getElementById(actionlist[x].lookup + "final").style.borderColor = actionlist[x].color;
    } else {
      displaycard = "<div class='card' id='" + actionlist[x].lookup + "final'><div><span class='cardtitle'>" + actionlist[x].name + "</span></div><div class='line'></div><div>" + actionlist[x].description + "</div></div>";
      document.getElementById("actionsdisplay").innerHTML += displaycard;
      document.getElementById(actionlist[x].lookup + "final").style.borderColor = actionlist[x].color
    }
  }

  valueReplace();
  passiveBonus();
}

function displayMasteries() {
  var displaym;
  for (var i = 0; i < chosenMasteries.length; i++) {
    var x = masterylist.findIndex(a => a.lookup === chosenMasteries[i]);
    displaym = "<div class='masterydisplay'><div class='displaycircle " + masterylist[x].lookup + "'><img src='" + masterylist[x].image + "'></div><div>" + masterylist[x].name + "</div><div>" + chosenMasteriesRanksLetter[i] + "</div></div>"
    document.getElementById("masterydisplay").innerHTML += displaym;
  }
}

function populateNormal() {
  var normalm =[];
  for (var i = 0; i < chosenMasteries.length; i++) {
    var x = masterylist.findIndex(a => a.lookup === chosenMasteries[i])
    if (masterylist[x].actions.includes("Normal Attack")) {
      normalm.push("<div class='display masterycircle " + chosenMasteries[i] + "'><img onclick='clickMastery(this)' class='" + masterylist[x].lookup + "' src=" + masterylist[x].image + "></div>")
    }
  }

  document.getElementsByClassName("normal")[0].innerHTML = document.getElementsByClassName("normal")[0].innerHTML.substring(0, document.getElementsByClassName("normal")[0].innerHTML.length - 6);
  document.getElementsByClassName("normal")[0].innerHTML += "<div class='line'></div><div class='masteryicon'>" + normalm.join("",) + "</div></div>"
}

function displayEquipment() {
  document.getElementsByClassName("weaponrankdisplay")[0].innerHTML += "<div>" + weaponRankLetter + "</div>";
  document.getElementsByClassName("armorrankdisplay")[0].innerHTML += "<div>" + armorRankLetter + "</div>";
  document.getElementById("armordisplay").src = armorimg;

  if (armorweight === "light") {
    document.getElementsByClassName("passivecontainer")[0].innerHTML += " <b>(Light)</b><br><br>Once per thread, you may swap out your chosen actions for a new loadout that thread.";
  } else if (armorweight === "medium") {
    document.getElementsByClassName("passivecontainer")[0].innerHTML += " <b>(Medium)</b><br><br>Once per thread, you may add +20 per Armor Rank to any roll you make before multipliers.";
  } else {
    document.getElementsByClassName("passivecontainer")[0].innerHTML += " <b>(Heavy)</b><br><br>Once per thread, you may recover 20 HP per Armor Rank.";
  }
}

function clickMastery(e) {
  var x = chosenMasteries.indexOf(e.classList.toString())
  e.parentElement.parentElement.parentElement.getElementsByClassName("masteryreplace")[0].innerHTML = " " + chosenMasteriesRanksLetter[x] + " ";
}

function valueReplace() {
  document.getElementById("freeactiondisplay").innerHTML = document.getElementById("freeactiondisplay").innerHTML.replace(/WR/g, weaponRankLetter);
  document.getElementById("actionsdisplay").innerHTML = document.getElementById("actionsdisplay").innerHTML.replace(/WR/g, weaponRankLetter);
}

var totalhp;
var multiplier;
var armormod;
var passivehp = 0;

function hpCalc() {
  if (armorweight === "light") {
    multiplier = 10;
  } else if (armorweight === "medium") {
    multiplier = 20;
  } else {
    multiplier = 30;
  }

  var ar = parseInt(armorRank);

  var armormod = ar * multiplier;

  if (chosenActions.includes("defense-enhancement")) {
    passivehp = parseInt(chosenMasteriesRanks[chosenMasteriesRanks.length - 1]);
    passivehp = passivehp * 5;
  }

  totalhp = 100 + armormod + passivehp;

  document.getElementsByClassName("hpcontainer")[0].innerHTML += "<div>" + totalhp + "</div>"
}

var fortitude = 0;
var reflex = 0;
var will = 0;

function calcSaves() {
  for (var i = 0; i < chosenMasteries.length; i++) {
    var x = masterylist.findIndex(a => a.lookup === chosenMasteries[i]);
    if (masterylist[x].save === "fortitude") {
      fortitude += parseInt(chosenMasteriesRanks[i])
    } else if (masterylist[x].save === "reflex") {
      reflex += parseInt(chosenMasteriesRanks[i])
    } else if (masterylist[x].save === "will") {
      will += parseInt(chosenMasteriesRanks[i])
    }
  }

  if (armorweight === "light") {
    will += parseInt(armorRank)
  } else if (armorweight === "heavy") {
    fortitude += parseInt(armorRank)
  } else {
    reflex += parseInt(armorRank)
  }

  fortitude = fortitude * 5;
  reflex = reflex * 5;
  will = will * 5;

  document.getElementById("fortitudesave").innerHTML += fortitude;
  document.getElementById("reflexsave").innerHTML += reflex;
  document.getElementById("willsave").innerHTML += will;
}

var fitness = 0;
var awareness = 0;
var knack = 0;
var knowledge = 0;
var presence = 0;

function calcExpertise() {
  for (var i = 0; i < chosenMasteries.length; i++) {
    var x = masterylist.findIndex(a => a.lookup === chosenMasteries[i]);
    if (masterylist[x].expertise === "fitness") {
      fitness += parseInt(chosenMasteriesRanks[i])
    } else if (masterylist[x].expertise === "awareness") {
      awareness += parseInt(chosenMasteriesRanks[i])
    } else if (masterylist[x].expertise === "knack") {
      knack += parseInt(chosenMasteriesRanks[i])
    } else if (masterylist[x].expertise === "knowledge") {
      knowledge += parseInt(chosenMasteriesRanks[i])
    } else if (masterylist[x].expertise === "presence") {
      presence += parseInt(chosenMasteriesRanks[i])
    }
  }

  fitness = fitness * 5;
  awareness = awareness * 5;
  knack = knack * 5;
  knowledge = knowledge * 5;
  presence = presence * 5;

  document.getElementById("skillfitness").innerHTML += fitness;
  document.getElementById("skillawareness").innerHTML += awareness;
  document.getElementById("skillknack").innerHTML += knack;
  document.getElementById("skillknowledge").innerHTML += knowledge;
  document.getElementById("skillpresence").innerHTML += presence;
}

var movement = 1;

function passiveBonus() {

  if (document.querySelector("#defense-enhancementfinal")) {
    var y = parseInt(chosenMasteriesRanks[chosenMasteries.length - 1])
    y = y * 5;
    var x = document.getElementById("defense-enhancementfinal").innerHTML
    document.getElementById("defense-enhancementfinal").innerHTML = document.getElementById("defense-enhancementfinal").innerHTML.substring(0, x.length - 6)
    document.getElementById("defense-enhancementfinal").innerHTML += "<div class='line'></div><div>Your bonus is " + y + " extra HP</div></div>"
  }

  if (document.querySelector("#damage-enhancementfinal")) {
    var y = parseInt(chosenMasteriesRanks[chosenMasteries.length - 1])
    y = y * 3;
    var x = document.getElementById("damage-enhancementfinal").innerHTML
    document.getElementById("damage-enhancementfinal").innerHTML = document.getElementById("damage-enhancementfinal").innerHTML.substring(0, x.length - 6)
    document.getElementById("damage-enhancementfinal").innerHTML += "<div class='line'></div><div>Your bonus is +" + y + " extra damage</div></div>"
  }

  if (document.querySelector("#support-enhancementfinal")) {
    var y = parseInt(chosenMasteriesRanks[chosenMasteries.length - 1])
    y = y * 3;
    var x = document.getElementById("support-enhancementfinal").innerHTML
    document.getElementById("support-enhancementfinal").innerHTML = document.getElementById("support-enhancementfinal").innerHTML.substring(0, x.length - 6)
    document.getElementById("support-enhancementfinal").innerHTML += "<div class='line'></div><div>Your bonus is +" + y + " extra healing/buffing</div></div>"
  }

  if (document.querySelector("#dynamic-maneuverfinal")) {
    var y = parseInt(chosenMasteriesRanks[chosenMasteries.length - 1]);
    var message = "You may move 1 extra zone per post";
    movement += 1

    var x = document.getElementById("dynamic-maneuverfinal").innerHTML
    document.getElementById("dynamic-maneuverfinal").innerHTML = document.getElementById("dynamic-maneuverfinal").innerHTML.substring(0, x.length - 6)
    document.getElementById("dynamic-maneuverfinal").innerHTML += "<div class='line'></div><div>" + message + "</div></div>"
  }

  if (document.querySelector("#speed-enhancementfinal")) {
    var y = parseInt(chosenMasteriesRanks[chosenMasteries.length - 1]);
    var message;
    if (y === 1 || y === 2) {
      message = "You do not have additional zones of movement"
    } else {
      var z = y - 2
      message = "You may move " + z + " extra zone(s) per post"
      movement += z
    }
    var x = document.getElementById("speed-enhancementfinal").innerHTML
    document.getElementById("speed-enhancementfinal").innerHTML = document.getElementById("speed-enhancementfinal").innerHTML.substring(0, x.length - 6)
    document.getElementById("speed-enhancementfinal").innerHTML += "<div class='line'></div><div>" + message + "</div></div>"
  }

  if (document.querySelector("#dynamic-utilityfinal")) {
    var y = parseInt(chosenMasteriesRanks[chosenMasteries.length - 1]);
    var message;
    if (y === 1) {
      message = "You do not have additional zones of movement"
    } else {
      message = "You may move 1 extra zone per post"
      movement += 1
    }
    var x = document.getElementById("dynamic-utilityfinal").innerHTML
    document.getElementById("dynamic-utilityfinal").innerHTML = document.getElementById("dynamic-utilityfinal").innerHTML.substring(0, x.length - 6)
    document.getElementById("dynamic-utilityfinal").innerHTML += "<div class='line'></div><div>" + message + "</div></div>"
  }

  movementmessage = movement + " zones per post"
  document.getElementsByClassName("movementcontainer")[0].innerHTML += movementmessage
}

function getCode() {
  var generatemasterycode = chosenMasteries.join(",");
  var generatemasteryrankcode = chosenMasteriesRanks.join(",");
  var generateactioncode = chosenActions.join(",");

  var buildcode = generatemasterycode + "|" + generatemasteryrankcode + "|" + armorweight + "|" + armorRank.toString() + "|" + weaponRank.toString() + "|" + generateactioncode;

  document.getElementById("finalcode").value = buildcode;
}
