window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', function() {
  if (window.location.href.toString().includes("#")) {
    var hash = new URL(window.location.href).hash;
    var importstats = hash.slice(1).split(".");
    var errormessage = "";

    chosenMasteries = [];
    chosenMasteriesRanks = [];
    chosenMasteriesRanksLetter = [];
    chosenActions = [];

    fortitude = reflex = will = 0;
    fitness = knack = awareness = knowledge = presence = 0;
    hp = 0;
    movement = 1;
    targeting = 0;
    name = threadcode = "";

    dmgmods = [];
    supportmods = [];
    dispelmods = [];
    inspiremods = [];

    document.getElementsByClassName("hpcontainer")[0].innerHTML = "<div class='hp'><div class='stat-text'>Health</div><img src='https://terrarp.com/db/tool/health.png'></div>";
    document.getElementsByClassName("movementcontainer")[0].innerHTML = "<div class='move'><div class='stat-text'>Movement</div><img src='https://terrarp.com/db/tool/movement.png'></div>";
    document.getElementsByClassName("rangecontainer")[0].innerHTML = "<div class='range'><div class='stat-text'>Range</div><img src='https://terrarp.com/db/tool/range.png'></div>";
    document.getElementsByClassName("rangecontainer")[0].style.dislay = "none";
    document.getElementsByClassName("rangecontainer")[0].style.visibility = "hidden";

    document.getElementsByClassName("charname")[0].innerHTML = "";

    document.getElementById("fortitudesave").innerHTML = "+";
    document.getElementById("willsave").innerHTML = "+";
    document.getElementById("reflexsave").innerHTML = "+";

    document.getElementById("skillknack").innerHTML = "+";
    document.getElementById("skillfitness").innerHTML = "+";
    document.getElementById("skillpresence").innerHTML = "+";
    document.getElementById("skillawareness").innerHTML = "+";
    document.getElementById("skillknowledge").innerHTML = "+";

    document.getElementsByClassName("expertisereplace")[0].innerHTML = "Type";
    document.getElementsByClassName("expertisebonusreplace")[0].innerHTML = "X";
    document.getElementsByClassName("expertisereplace")[0].innerHTML = "Type";
    document.getElementsByClassName("expertisebonusreplace")[0].innerHTML = "X";
    document.getElementsByClassName("mnamereplace")[0].innerHTML = "Type";
    document.getElementsByClassName("masteryreplace")[0].innerHTML = "MR";

    document.getElementsByClassName("weaponrankdisplay")[0].innerHTML = "<div class='displaycircle equipment'><img src='https://terrarp.com/db/tool/weapon-rank.png'></div><div class='displaytitle'>Weapon Rank</div>";
    document.getElementsByClassName("armorrankdisplay")[0].innerHTML = "<div class='displaycircle equipment'><img id='armordisplay'></div><div class='displaytitle'>Armor Rank</div>";
    document.getElementsByClassName("passivecontainer")[0].innerHTML = "<span class='armorpassive'></span>";

    document.getElementById("masterydisplay").innerHTML = "";
    document.getElementById("masterycheckicons").innerHTML = "";

    document.getElementsByClassName("card normal")[0].innerHTML = "<div class='cardicon aci-attack'></div><div class='cardtitle'>Attack</div><div class='cardinfo'><p>Perform a basic attack. </p><p><i>You can flavor this action as a spell, a weapon attack, or a damaging ability flavored by your mastery.</i></p></div><div class='cardroll'><b>Roll:</b> 1d100 + modifiers</div><div class='rollcode'>?r attack <span class='masteryreplace'>MR</span> WR <span class='damagepassivemod'></span># <span class='mnamereplace'>Mastery</span> | Character Name | <span class='thrcode'>Thread Code</span></div>";
    document.getElementsByClassName("card recover")[0].innerHTML = "<div class='cardicon aci-recover'></div><div class='cardtitle'>Recover</div><div class='cardinfo'><p>Recover your HP by 1d20. This roll cannot be modified by any passive or bonus action.</p><p><i>You can flavor this action as taking a breather, patching up a wound, drinking a potion, calming down, etc.</i></p></div><div class='cardroll'><b>Roll:</b> 1d20</div><div class='rollcode'>?r recover # Character Name | <span class='thrcode'>Thread Code</span></div>";
    document.getElementById("actionsdisplay").innerHTML = "";

    var checkMasteries = importstats[0].split(",");
    if (checkMasteries[0] === "") {
      errormessage = "You have not selected any masteries."
    }

    if (errormessage.length > 0) {
      alert(errormessage);
      return;
    }

    for (var i = 0; i < checkMasteries.length; i++) {
      var z = 0;
      var x = masterylist.findIndex(item => item.lookup === checkMasteries[i]);
      if (x === -1) {
        errormessage = "Your chosen masteries are invalid."
      }
      if (masterylist[x].save === "-") {
        z++;
      }
      if (z > 1) {
        errormessage = "You have selected more than 1 Alter Mastery."
      }
    }
    if (checkMasteries.length > 5) {
      errormessage = "You have too many masteries."
    }
    if (errormessage.length > 0) {
      alert(errormessage);
      return;
    } else {
      chosenMasteries = checkMasteries;
    }

    var checkMasteryRanks = importstats[1].split(",");
    for (var i = 0; i < checkMasteryRanks.length; i++) {
      if (checkMasteryRanks[i] !== "1" && checkMasteryRanks[i] !== "2" && checkMasteryRanks[i] !== "3" && checkMasteryRanks[i] !== "3" && checkMasteryRanks[i] !== "4" && checkMasteryRanks[i] !== "5") {
        errormessage = "Your mastery ranks are invalid."
      }
    }

    if (checkMasteryRanks.length > 5) {
      errormessage = "You have too many masteries."
    }

    if (errormessage.length > 0) {
      alert(errormessage);
      chosenMasteries = [];
      return;
    } else {
      for (var i = 0; i < checkMasteryRanks.length; i++) {
        chosenMasteriesRanks.push(parseInt(checkMasteryRanks[i]))
        if (checkMasteryRanks[i] === "1") {
          chosenMasteriesRanksLetter.push("D")
        } else if (checkMasteryRanks[i] === "2") {
          chosenMasteriesRanksLetter.push("C")
        } else if (checkMasteryRanks[i] === "3") {
          chosenMasteriesRanksLetter.push("B")
        } else if (checkMasteryRanks[i] === "4") {
          chosenMasteriesRanksLetter.push("A")
        } else if (checkMasteryRanks[i] === "5") {
          chosenMasteriesRanksLetter.push("S")
        }
      }
    }

    var checkweight = importstats[2];
    if (checkweight !== "light" && checkweight !== "medium" && checkweight !== "heavy") {
      errormessage = "Your armor weight is invalid."
    }
    if (errormessage.length > 0) {
      alert(errormessage);
      chosenMasteries = [];
      chosenMasteriesRanks = [];
      chosenMasteriesRanksLetter = [];
      return;
    } else {
      armorweight = checkweight;
      armorimg = "https://terrarp.com/db/wiki/armor-" + armorweight + ".png";
    }

    var checkarank = importstats[3];
    if (checkarank !== "1" && checkarank !== "2" && checkarank !== "3" && checkarank !== "4" && checkarank !== "5") {
      errormessage = "Your armor rank is invalid."
    }
    if (errormessage.length > 0) {
      alert(errormessage)
      chosenMasteries = [];
      chosenMasteriesRanks = [];
      chosenMasteriesRanksLetter = [];
      return;
    } else {
      armorRank = parseInt(checkarank)
      if (checkarank === "1") {
        armorRankLetter = "D"
      } else if (checkarank === "2") {
        armorRankLetter = "C"
      } else if (checkarank === "3") {
        armorRankLetter = "B"
      } else if (checkarank === "4") {
        armorRankLetter = "A"
      } else if (checkarank === "5") {
        armorRankLetter = "S"
      }
    }

    var checkwrank = importstats[4];
    if (checkwrank !== "1" && checkwrank !== "2" && checkwrank !== "3" && checkwrank !== "4" && checkwrank !== "5") {
      errormessage = "Your weapon rank is invalid."
    }
    if (errormessage.length > 0) {
      alert(errormessage);
      chosenMasteries = [];
      chosenMasteriesRanks = [];
      chosenMasteriesRanksLetter = [];
      return;
    } else {
      weaponRank = parseInt(checkwrank)
      if (checkwrank === "1") {
        weaponRankLetter = "D"
      } else if (checkwrank === "2") {
        weaponRankLetter = "C"
      } else if (checkwrank === "3") {
        weaponRankLetter = "B"
      } else if (checkwrank === "4") {
        weaponRankLetter = "A"
      } else if (checkwrank === "5") {
        weaponRankLetter = "S"
      }
    }

    var checkactions = importstats[5].split(",");

    if (checkactions[0] === "") {
      errormessage = "You have not selected any actions."
    }

    if (errormessage.length > 0) {
      alert(errormessage);
      chosenMasteries = [];
      chosenMasteriesRanks = [];
      chosenMasteriesRanksLetter = [];
      return;
    }

    for (var i = 0; i < checkactions.length; i++) {
      var x = 0;
      for (var j = 0; j < chosenMasteries.length; j++) {
        var z = actionlist.findIndex(item => item.lookup === checkactions[i]);
        if (actionlist[z].masteries.indexOf(chosenMasteries[j]) !== -1) {
          x++
        }
      }
      if (x === 0) {
        errormessage = "Your actions are not compatible with your chosen masteries."
      }
    }

    if (checkactions.length > 5) {
      errormessage = "You have too many actions."
    }

    if (parseInt(checkarank) < 3 && checkactions.length > 5) {
      errormessage = "You have too many actions for your armor rank";
    } else if (parseInt(checkarank) === 2 && checkactions.length > 4) {
      errormessage = "You have too many actions for your armor rank"
    } else if (parseInt(checkarank) === 1 && checkactions.length > 3) {
      errormessage = "You have too many actions for your armor rank"
    }

    if (errormessage.length > 0) {
      alert(errormessage);
      chosenMasteries = [];
      chosenMasteriesRanks = [];
      chosenMasteriesRanksLetter = [];
      return;
    } else {
      for (var i = 0; i < checkactions.length; i++) {
        chosenActions.push(checkactions[i])
      }
    }

    if (!importstats[6]) {
      name = "";
    } else {
      var getname = importstats[6];
      if (getname === "") {
        name = "";
      } else {
        name = getname.replace(/_/g, " ")
      }
      for (var i = 0; i < charlist.length; i++) {
        var unsafe = new RegExp(charlist[i].text,'gi');
        name = name.replace(unsafe, charlist[i].character);
      }
    }

    if (!importstats[7]) {
      threadcode = "";
    } else {
      var getcode = importstats[7];
      if (getcode === "") {
        threadcode = "";
      } else {
        threadcode = getcode;
      }
    }

    document.getElementById("builddisplay").style.display = "block";
    document.getElementById("masterycontainer").style.display = "none";
    document.getElementById("rankselector").style.display = "none";
    document.getElementById("actionselector").style.display = "none";
    for (var i = 0; i < document.getElementsByClassName("button").length; i++) {
      document.getElementsByClassName("button")[i].style.display = "none";
    }
    document.getElementById("buildcodedisplay").style.display = "none";
    document.getElementById("nameinput").style.display = "none";
    document.getElementById("threadcodeinput").style.display = "block";
    document.getElementById("threadcodebutton").style.display = "block";

    fortitude = reflex = will = 0;
    fitness = knack = awareness = knowledge = presence = 0;
    hp = 0;
    movement = 1;
    targeting = 0;

    savesChecks();

    displayMasteries();
    displayEquipment();
    populateNormal();
    displayActions();

    hpCalc();
    calcSaves();
    calcExpertise();

    if (targeting !== 0) {
      document.getElementsByClassName("rangecontainer")[0].style.display = "inline-block";
      document.getElementsByClassName("rangecontainer")[0].style.visibility = "visible";
    } else {
      document.getElementsByClassName("rangecontainer")[0].style.display = "none";
      document.getElementsByClassName("rangecontainer")[0].style.visibility = "hidden";
    }

    window.scrollTo(0,0)
  }
});

var hash;
var importstats;
var errormessage;

window.onload = function() {
  if (window.location.href.toString().includes("#")) {
    hash = new URL(window.location.href).hash;
    importstats = hash.slice(1).split(".");
    errormessage = "";

    chosenMasteries = [];
    chosenMasteriesRanks = [];
    chosenMasteriesRanksLetter = [];
    chosenActions = [];

    fortitude = reflex = will = 0;
    fitness = knack = awareness = knowledge = presence = 0;
    hp = 0;
    movement = 1;
    targeting = 0;

    dmgmods = [];
    supportmods = [];
    dispelmods = [];
    inspiremods = [];

    name = threadcode = "";

    document.getElementsByClassName("hpcontainer")[0].innerHTML = "<div class='hp'><div class='stat-text'>Health</div><img src='https://terrarp.com/db/tool/health.png'></div>";
    document.getElementsByClassName("movementcontainer")[0].innerHTML = "<div class='move'><div class='stat-text'>Movement</div><img src='https://terrarp.com/db/tool/movement.png'></div>";
    document.getElementsByClassName("rangecontainer")[0].innerHTML = "<div class='range'><div class='stat-text'>Range</div><img src='https://terrarp.com/db/tool/range.png'></div>";
    document.getElementsByClassName("rangecontainer")[0].style.dislay = "none";
    document.getElementsByClassName("rangecontainer")[0].style.visibility = "hidden";

    document.getElementsByClassName("charname")[0].innerHTML = "";

    document.getElementById("fortitudesave").innerHTML = "+";
    document.getElementById("willsave").innerHTML = "+";
    document.getElementById("reflexsave").innerHTML = "+";

    document.getElementById("skillknack").innerHTML = "+";
    document.getElementById("skillfitness").innerHTML = "+";
    document.getElementById("skillpresence").innerHTML = "+";
    document.getElementById("skillawareness").innerHTML = "+";
    document.getElementById("skillknowledge").innerHTML = "+";

    document.getElementsByClassName("expertisereplace")[0].innerHTML = "Type";
    document.getElementsByClassName("expertisebonusreplace")[0].innerHTML = "X";
    document.getElementsByClassName("expertisereplace")[0].innerHTML = "Type";
    document.getElementsByClassName("expertisebonusreplace")[0].innerHTML = "X";
    document.getElementsByClassName("mnamereplace")[0].innerHTML = "Type";
    document.getElementsByClassName("masteryreplace")[0].innerHTML = "MR";

    document.getElementsByClassName("weaponrankdisplay")[0].innerHTML = "<div class='displaycircle equipment'><img src='https://terrarp.com/db/tool/weapon-rank.png'></div><div class='displaytitle'>Weapon Rank</div>";
    document.getElementsByClassName("armorrankdisplay")[0].innerHTML = "<div class='displaycircle equipment'><img id='armordisplay'></div><div class='displaytitle'>Armor Rank</div>";
    document.getElementsByClassName("passivecontainer")[0].innerHTML = "<span class='armorpassive'></span>";

    document.getElementById("masterydisplay").innerHTML = "";
    document.getElementById("masterycheckicons").innerHTML = "";

    document.getElementsByClassName("card normal")[0].innerHTML = "<div class='cardicon aci-attack'></div><div class='cardtitle'>Attack</div><div class='cardinfo'><p>Perform a basic attack. </p><p><i>You can flavor this action as a spell, a weapon attack, or a damaging ability flavored by your mastery.</i></p></div><div class='cardroll'><b>Roll:</b> 1d100 + modifiers</div><div class='rollcode'>?r attack <span class='masteryreplace'>MR</span> WR <span class='damagepassivemod'></span># <span class='mnamereplace'>Mastery</span> | Character Name | <span class='thrcode'>Thread Code</span></div>";
    document.getElementsByClassName("card recover")[0].innerHTML = "<div class='cardicon aci-recover'></div><div class='cardtitle'>Recover</div><div class='cardinfo'><p>Recover your HP by 1d20. This roll cannot be modified by any passive or bonus action.</p><p><i>You can flavor this action as taking a breather, patching up a wound, drinking a potion, calming down, etc.</i></p></div><div class='cardroll'><b>Roll:</b> 1d20</div><div class='rollcode'>?r recover # Character Name | <span class='thrcode'>Thread Code</span></div>";
    document.getElementById("actionsdisplay").innerHTML = "";

    var checkMasteries = importstats[0].split(",");
    if (checkMasteries[0] === "") {
      errormessage = "You have not selected any masteries."
    }

    if (errormessage.length > 0) {
      alert(errormessage);
      return;
    }

    for (var i = 0; i < checkMasteries.length; i++) {
      var z = 0;
      var x = masterylist.findIndex(item => item.lookup === checkMasteries[i]);
      if (x === -1) {
        errormessage = "Your chosen masteries are invalid."
      }
      if (masterylist[x].save === "-") {
        z++;
      }
      if (z > 1) {
        errormessage = "You have selected more than 1 Alter Mastery."
      }
    }
    if (checkMasteries.length > 5) {
      errormessage = "You have too many masteries."
    }
    if (errormessage.length > 0) {
      alert(errormessage);
      return;
    } else {
      chosenMasteries = checkMasteries;
    }

    var checkMasteryRanks = importstats[1].split(",");
    for (var i = 0; i < checkMasteryRanks.length; i++) {
      if (checkMasteryRanks[i] !== "1" && checkMasteryRanks[i] !== "2" && checkMasteryRanks[i] !== "3" && checkMasteryRanks[i] !== "3" && checkMasteryRanks[i] !== "4" && checkMasteryRanks[i] !== "5") {
        errormessage = "Your mastery ranks are invalid."
      }
    }

    if (checkMasteryRanks.length > 5) {
      errormessage = "You have too many masteries."
    }

    if (errormessage.length > 0) {
      alert(errormessage);
      chosenMasteries = [];
      return;
    } else {
      for (var i = 0; i < checkMasteryRanks.length; i++) {
        chosenMasteriesRanks.push(parseInt(checkMasteryRanks[i]))
        if (checkMasteryRanks[i] === "1") {
          chosenMasteriesRanksLetter.push("D")
        } else if (checkMasteryRanks[i] === "2") {
          chosenMasteriesRanksLetter.push("C")
        } else if (checkMasteryRanks[i] === "3") {
          chosenMasteriesRanksLetter.push("B")
        } else if (checkMasteryRanks[i] === "4") {
          chosenMasteriesRanksLetter.push("A")
        } else if (checkMasteryRanks[i] === "5") {
          chosenMasteriesRanksLetter.push("S")
        }
      }
    }

    var checkweight = importstats[2];
    if (checkweight !== "light" && checkweight !== "medium" && checkweight !== "heavy") {
      errormessage = "Your armor weight is invalid."
    }
    if (errormessage.length > 0) {
      alert(errormessage);
      chosenMasteries = [];
      chosenMasteriesRanks = [];
      chosenMasteriesRanksLetter = [];
      return;
    } else {
      armorweight = checkweight;
      armorimg = "https://terrarp.com/db/wiki/armor-" + armorweight + ".png";
    }

    var checkarank = importstats[3];
    if (checkarank !== "1" && checkarank !== "2" && checkarank !== "3" && checkarank !== "4" && checkarank !== "5") {
      errormessage = "Your armor rank is invalid."
    }
    if (errormessage.length > 0) {
      alert(errormessage)
      chosenMasteries = [];
      chosenMasteriesRanks = [];
      chosenMasteriesRanksLetter = [];
      return;
    } else {
      armorRank = parseInt(checkarank)
      if (checkarank === "1") {
        armorRankLetter = "D"
      } else if (checkarank === "2") {
        armorRankLetter = "C"
      } else if (checkarank === "3") {
        armorRankLetter = "B"
      } else if (checkarank === "4") {
        armorRankLetter = "A"
      } else if (checkarank === "5") {
        armorRankLetter = "S"
      }
    }

    var checkwrank = importstats[4];
    if (checkwrank !== "1" && checkwrank !== "2" && checkwrank !== "3" && checkwrank !== "4" && checkwrank !== "5") {
      errormessage = "Your weapon rank is invalid."
    }
    if (errormessage.length > 0) {
      alert(errormessage);
      chosenMasteries = [];
      chosenMasteriesRanks = [];
      chosenMasteriesRanksLetter = [];
      return;
    } else {
      weaponRank = parseInt(checkwrank)
      if (checkwrank === "1") {
        weaponRankLetter = "D"
      } else if (checkwrank === "2") {
        weaponRankLetter = "C"
      } else if (checkwrank === "3") {
        weaponRankLetter = "B"
      } else if (checkwrank === "4") {
        weaponRankLetter = "A"
      } else if (checkwrank === "5") {
        weaponRankLetter = "S"
      }
    }

    var checkactions = importstats[5].split(",");

    if (checkactions[0] === "") {
      errormessage = "You have not selected any actions."
    }

    if (errormessage.length > 0) {
      alert(errormessage);
      chosenMasteries = [];
      chosenMasteriesRanks = [];
      chosenMasteriesRanksLetter = [];
      return;
    }

    for (var i = 0; i < checkactions.length; i++) {
      var x = 0;
      for (var j = 0; j < chosenMasteries.length; j++) {
        var z = actionlist.findIndex(item => item.lookup === checkactions[i]);
        if (actionlist[z].masteries.indexOf(chosenMasteries[j]) !== -1) {
          x++
        }
      }
      if (x === 0) {
        errormessage = "Your actions are not compatible with your chosen masteries."
      }
    }

    if (checkactions.length > 5) {
      errormessage = "You have too many actions."
    }

    if (parseInt(checkarank) < 3 && checkactions.length > 5) {
      errormessage = "You have too many actions for your armor rank";
    } else if (parseInt(checkarank) === 2 && checkactions.length > 4) {
      errormessage = "You have too many actions for your armor rank"
    } else if (parseInt(checkarank) === 1 && checkactions.length > 3) {
      errormessage = "You have too many actions for your armor rank"
    }

    if (errormessage.length > 0) {
      alert(errormessage);
      chosenMasteries = [];
      chosenMasteriesRanks = [];
      chosenMasteriesRanksLetter = [];
      return;
    } else {
      for (var i = 0; i < checkactions.length; i++) {
        chosenActions.push(checkactions[i])
      }
    }

    if (!importstats[6]) {
      name = "";
    } else {
      var getname = importstats[6];
      if (getname === "") {
        name = "";
      } else {
        name = getname.replace(/_/g, " ")
      }
      for (var i = 0; i < charlist.length; i++) {
        var unsafe = new RegExp(charlist[i].text,'gi');
        name = name.replace(unsafe, charlist[i].character);
      }
    }

    if (!importstats[7]) {
      threadcode = "";
    } else {
      var getcode = importstats[7];
      if (getcode === "") {
        threadcode = "";
      } else {
        threadcode = getcode;
      }
    }

    document.getElementById("builddisplay").style.display = "block";
    document.getElementById("masterycontainer").style.display = "none";
    document.getElementById("rankselector").style.display = "none";
    document.getElementById("actionselector").style.display = "none";
    for (var i = 0; i < document.getElementsByClassName("button").length; i++) {
      document.getElementsByClassName("button")[i].style.display = "none";
    }
    document.getElementById("buildcodedisplay").style.display = "none";
    document.getElementById("nameinput").style.display = "none";
    document.getElementById("threadcodeinput").style.display = "block";
    document.getElementById("threadcodebutton").style.display = "block";

    fortitude = reflex = will = 0;
    fitness = knack = awareness = knowledge = presence = 0;
    hp = 0;
    movement = 1;
    targeting = 0;

    savesChecks();

    displayMasteries();
    displayEquipment();
    populateNormal();
    displayActions();

    hpCalc();
    calcSaves();
    calcExpertise();

    if (targeting !== 0) {
      document.getElementsByClassName("rangecontainer")[0].style.display = "inline-block";
      document.getElementsByClassName("rangecontainer")[0].style.visibility = "visible";
    } else {
      document.getElementsByClassName("rangecontainer")[0].style.display = "none";
      document.getElementsByClassName("rangecontainer")[0].style.visibility = "hidden";
    }

    window.scrollTo(0,0)
  }
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
  armorimg = "https://terrarp.com/db/tool/armor-" + armorweight + ".png";
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
        document.getElementById("masteryrankpick").innerHTML += "<div class='rankcontainer' id='rank" + i + "'><div id='mastery" + i + "' class='masterycircle'><img src=" + masterylist[j].image + "></div>" + masterylist[j].name + "<br><select class='droplist' id='masteryrank" + i + "' autocomplete='off'><option value='1' selected>D</option><option value='2'>C</option><option value='3'>B</option><option value='4'>A</option><option value='5'>S</option></select></div>";
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
    if (actionlist[x].roll !== "-") {
      actioncard = "<div class='card choice' id='" + actionlist[x].lookup + "' onclick='selectAction(this)'><div class='cardicon aci-" + actionlist[x].lookup + "'></div><div class='cardtitle'>" + actionlist[x].name + "</div><div class='cardinfo'>" + actionlist[x].description + "</div><div class='cardroll'><b>Roll:</b> " + actionlist[x].dice + "</div><div class='rollcode'>" + actionlist[x].roll + "</div></div>";
      document.getElementById("pickactions").innerHTML += actioncard;
      document.getElementById(actionlist[x].lookup).style.borderColor = actionlist[x].color;
      document.getElementsByClassName("aci-" + actionlist[x].lookup)[0].style.backgroundColor = actionlist[x].color;
    } else {
      actioncard = "<div class='card choice' id='" + actionlist[x].lookup + "' onclick='selectAction(this)'><div class='cardicon aci-" + actionlist[x].lookup + "'></div><div class='cardtitle'>" + actionlist[x].name + "</div><div class='cardinfo'>" + actionlist[x].description + "</div></div>";
      document.getElementById("pickactions").innerHTML += actioncard;
      document.getElementById(actionlist[x].lookup).style.borderColor = actionlist[x].color;
      document.getElementsByClassName("aci-" + actionlist[x].lookup)[0].style.backgroundColor = actionlist[x].color;
    }
  }
}


function selectAction(e) {
  var slots;
  if (armorRank === "1") {
    slots = 3
  } else if (armorRank === "2") {
    slots = 4
  } else {
    slots = 5
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

  document.getElementsByClassName("rangecontainer")[0].style.display = "none";
  document.getElementsByClassName("rangecontainer")[0].style.visibility = "hidden";
  document.getElementById("inputbox").style.display = "none";

  name = document.getElementById("charnamereplace").value;
  threadcode = document.getElementById("threadcodereplace").value;

  saveActions();
  displayMasteries();
  displayEquipment();
  populateNormal();
  displayActions();

  hpCalc();
  calcSaves();
  calcExpertise();

  savesChecks();
  namesReplace();
  valueReplace();

  getCode();

  window.scrollTo(0,0);
}

function backPart3() {
  document.getElementById("actionselector").style.display = "block";
  document.getElementById("builddisplay").style.display = "none";
  document.getElementById("button3").style.display = "inline-block";
  document.getElementById("button3back").style.display = "inline-block";
  document.getElementById("button4back").style.display = "none";
  document.getElementById("inputbox").style.display = "block";

  chosenActions = [];

  document.getElementsByClassName("hpcontainer")[0].innerHTML = "<div class='hp'><div class='stat-text'>Health</div><img src='https://terrarp.com/db/tool/health.png'></div>";
  document.getElementsByClassName("movementcontainer")[0].innerHTML = "<div class='move'><div class='stat-text'>Movement</div><img src='https://terrarp.com/db/tool/movement.png'></div>";
  document.getElementsByClassName("rangecontainer")[0].innerHTML = "<div class='range'><div class='stat-text'>Range</div><img src='https://terrarp.com/db/tool/range.png'></div>";
  document.getElementsByClassName("rangecontainer")[0].style.dislay = "none";
  document.getElementsByClassName("rangecontainer")[0].style.display = "hidden";

  document.getElementsByClassName("charname")[0].innerHTML = "";

  document.getElementById("fortitudesave").innerHTML = "+";
  document.getElementById("willsave").innerHTML = "+";
  document.getElementById("reflexsave").innerHTML = "+";

  document.getElementById("skillknack").innerHTML = "+";
  document.getElementById("skillfitness").innerHTML = "+";
  document.getElementById("skillpresence").innerHTML = "+";
  document.getElementById("skillawareness").innerHTML = "+";
  document.getElementById("skillknowledge").innerHTML = "+";

  document.getElementsByClassName("expertisereplace")[0].innerHTML = "Type";
  document.getElementsByClassName("expertisebonusreplace")[0].innerHTML = "X";
  document.getElementsByClassName("expertisereplace")[0].innerHTML = "Type";
  document.getElementsByClassName("expertisebonusreplace")[0].innerHTML = "X";
  document.getElementsByClassName("mnamereplace")[0].innerHTML = "Type";
  document.getElementsByClassName("masteryreplace")[0].innerHTML = "MR";

  document.getElementsByClassName("weaponrankdisplay")[0].innerHTML = "<div class='displaycircle equipment'><img src='https://terrarp.com/db/tool/weapon-rank.png'></div><div class='displaytitle'>Weapon Rank</div>";
  document.getElementsByClassName("armorrankdisplay")[0].innerHTML = "<div class='displaycircle equipment'><img id='armordisplay'></div><div class='displaytitle'>Armor Rank</div>";
  document.getElementsByClassName("passivecontainer")[0].innerHTML = "<span class='armorpassive'></span>";

  document.getElementById("masterydisplay").innerHTML = "";
  document.getElementById("masterycheckicons").innerHTML = "";

  document.getElementsByClassName("card normal")[0].innerHTML = "<div class='cardicon aci-attack'></div><div class='cardtitle'>Attack</div><div class='cardinfo'><p>Perform a basic attack. </p><p><i>You can flavor this action as a spell, a weapon attack, or a damaging ability flavored by your mastery.</i></p></div><div class='cardroll'><b>Roll:</b> 1d100 + modifiers</div><div class='rollcode'>?r attack <span class='masteryreplace'>MR</span> WR <span class='damagepassivemod'></span># <span class='mnamereplace'>Mastery</span> | Character Name | <span class='thrcode'>Thread Code</span></div>";
  document.getElementsByClassName("card recover")[0].innerHTML = "<div class='cardicon aci-recover'></div><div class='cardtitle'>Recover</div><div class='cardinfo'><p>Recover your HP by 1d20. This roll cannot be modified by any passive or bonus action.</p><p><i>You can flavor this action as taking a breather, patching up a wound, drinking a potion, calming down, etc.</i></p></div><div class='cardroll'><b>Roll:</b> 1d20</div><div class='rollcode'>?r recover # Character Name | <span class='thrcode'>Thread Code</span></div>";
  document.getElementById("actionsdisplay").innerHTML = "";

  fortitude = 0;
  reflex = 0;
  will = 0;

  fitness = 0;
  knack = 0;
  awareness = 0;
  knowledge = 0;
  presence = 0;

  movement = 1;
  targeting = 0;

  passivehp = 0;
  tauntbonus = 0;

  dmgmods = [];
  supportmods = [];
  dispelmods = [];
  inspiremods = [];

  window.scrollTo(0,0);
}

var chosenActions = [];

function saveActions() {
  for (var i = 0; i < document.getElementsByClassName("choice selected").length; i++) {
    chosenActions.push(document.getElementsByClassName("choice selected")[i].id)
  }
}

function exceedReplace5() {
  document.getElementsByClassName("exceedvalue")[0].innerHTML = "5";
  document.getElementsByClassName("exceedvalue")[1].innerHTML = "5"
}

function exceedReplace10() {
  document.getElementsByClassName("exceedvalue")[0].innerHTML = "10";
  document.getElementsByClassName("exceedvalue")[1].innerHTML = "10";
}

function exceedReplace15() {
  document.getElementsByClassName("exceedvalue")[0].innerHTML = "15";
  document.getElementsByClassName("exceedvalue")[1].innerHTML = "15";
}

function exceedReplace20() {
  document.getElementsByClassName("exceedvalue")[0].innerHTML = "20";
  document.getElementsByClassName("exceedvalue")[1].innerHTML = "20";
}

function exceedReplace25() {
  document.getElementsByClassName("exceedvalue")[0].innerHTML = "25";
  document.getElementsByClassName("exceedvalue")[1].innerHTML = "25";
}

function displayActions() {
  var displaycard;
  for (var i = 0; i < chosenActions.length; i++) {
    var validmastery = [];
    var x = actionlist.findIndex(a => a.lookup === chosenActions[i]);
    if (actionlist[x].name === "Taunt") {
      displaycard = "<div class='card' id='" + actionlist[x].lookup + "final'><div class='cardicon aci-" + actionlist[x].lookup + "'></div><div class='cardtitle'>" + actionlist[x].name + "</div><div class='cardinfo'>" + actionlist[x].description + "</div><div class='rollcode'>" + actionlist[x].roll + "</div></div>";
      document.getElementById("actionsdisplay").innerHTML += displaycard;
      document.getElementById(actionlist[x].lookup + "final").style.borderColor = actionlist[x].color;
      document.getElementsByClassName("aci-" + actionlist[x].lookup)[0].style.backgroundColor = actionlist[x].color;
      if (document.getElementsByClassName("aci-" + actionlist[x].lookup).length !== 1) {
        document.getElementsByClassName("aci-" + actionlist[x].lookup)[1].style.backgroundColor = actionlist[x].color;
      }
    } else if (actionlist[x].name === "Exceed") {
      displaycard = "<div class='card' id='" + actionlist[x].lookup + "final'><div class='cardicon aci-" + actionlist[x].lookup + "'></div><div class='cardtitle'>" + actionlist[x].name + "</div><div class='cardinfo'>" + actionlist[x].description + "</div><div>Select an amount below:</div><div class='exceedcontainer'><div class='exceedbutton' onclick='exceedReplace5()'>5</div><div class='exceedbutton' onclick='exceedReplace10()'>10</div><div class='exceedbutton' onclick='exceedReplace15()'>15</div><div class='exceedbutton' onclick='exceedReplace20()'>20</div><div class='exceedbutton' onclick='exceedReplace25()'>25</div></div><div>Add the following code to the end of your roll code: </div><div class='rollcode'>" + actionlist[x].roll + "</div></div>";
      document.getElementById("actionsdisplay").innerHTML += displaycard;
      document.getElementById(actionlist[x].lookup + "final").style.borderColor = actionlist[x].color;
      document.getElementsByClassName("aci-" + actionlist[x].lookup)[0].style.backgroundColor = actionlist[x].color;
      if (document.getElementsByClassName("aci-" + actionlist[x].lookup).length !== 1) {
        document.getElementsByClassName("aci-" + actionlist[x].lookup)[1].style.backgroundColor = actionlist[x].color;
      }
    } else if (actionlist[x].name === "Alter Inspire") {
      displaycard = "<div class='card' id='" + actionlist[x].lookup + "final'><div class='cardicon aci-" + actionlist[x].lookup + "'></div><div class='cardtitle'>" + actionlist[x].name + "</div><div class='cardinfo'>" + actionlist[x].description + "</div><div class='cardroll'><b>Roll:</b> " + actionlist[x].dice + "</div><div class='rollcode'>" + actionlist[x].roll + "</div></div>";
      for (var a = 0; a < chosenMasteries.length; a++) {
        if (actionlist[x].masteries.includes(chosenMasteries[a])) {
          var z = masterylist.findIndex(q => q.lookup === chosenMasteries[a]);
          validmastery.push("<div class='display masterycircle " + chosenMasteries[a] + "'><img onclick='clickMastery(this)' class='" + masterylist[z].lookup + "' src=" + masterylist[z].image + "></div>")
        }
      }

      displaycard = displaycard.substring(0, displaycard.length - 6);
      displaycard += "<div class='line'></div><div class='masteryicon'>" + validmastery.join("",) + "</div></div>"
      document.getElementById("actionsdisplay").innerHTML += displaycard;
      document.getElementById(actionlist[x].lookup + "final").style.borderColor = actionlist[x].color;
      document.getElementsByClassName("aci-" + actionlist[x].lookup)[0].style.backgroundColor = actionlist[x].color;
      if (document.getElementsByClassName("aci-" + actionlist[x].lookup).length !== 1) {
        document.getElementsByClassName("aci-" + actionlist[x].lookup)[1].style.backgroundColor = actionlist[x].color;
    }
  } else if (actionlist[x].category !== "passive") {
      displaycard = "<div class='card' id='" + actionlist[x].lookup + "final'><div class='cardicon aci-" + actionlist[x].lookup + "'></div><div class='cardtitle'>" + actionlist[x].name + "</div><div class='cardinfo'>" + actionlist[x].description + "</div><div class='cardroll'><b>Roll:</b> " + actionlist[x].dice + "</div><div class='rollcode'>" + actionlist[x].roll + "</div></div>";
      for (var a = 0; a < chosenMasteries.length; a++) {
        if (actionlist[x].masteries.includes(chosenMasteries[a])) {
          var z = masterylist.findIndex(q => q.lookup === chosenMasteries[a]);
          validmastery.push("<div class='display masterycircle " + chosenMasteries[a] + "'><img onclick='clickMastery(this)' class='" + masterylist[z].lookup + "' src=" + masterylist[z].image + "></div>")
        }
      }
      displaycard = displaycard.substring(0, displaycard.length - 6);
      displaycard += "<div class='line'></div><div class='masteryicon'>" + validmastery.join("",) + "</div></div>"
      document.getElementById("actionsdisplay").innerHTML += displaycard;
      document.getElementById(actionlist[x].lookup + "final").style.borderColor = actionlist[x].color;
      document.getElementsByClassName("aci-" + actionlist[x].lookup)[0].style.backgroundColor = actionlist[x].color;
      if (document.getElementsByClassName("aci-" + actionlist[x].lookup).length !== 1) {
        document.getElementsByClassName("aci-" + actionlist[x].lookup)[1].style.backgroundColor = actionlist[x].color;
      }
    } else {
      displaycard = "<div class='card' id='" + actionlist[x].lookup + "final'><div class='cardicon aci-" + actionlist[x].lookup + "'></div><div class='cardtitle'>" + actionlist[x].name + "</div><div class='cardinfo'>" + actionlist[x].description + "</div></div>";
      document.getElementById("actionsdisplay").innerHTML += displaycard;
      document.getElementById(actionlist[x].lookup + "final").style.borderColor = actionlist[x].color;
      document.getElementsByClassName("aci-" + actionlist[x].lookup)[0].style.backgroundColor = actionlist[x].color;
      if (document.getElementsByClassName("aci-" + actionlist[x].lookup).length !== 1) {
        document.getElementsByClassName("aci-" + actionlist[x].lookup)[1].style.backgroundColor = actionlist[x].color;
      }
    }
  }

  valueReplace();
  passiveBonus();
}

function savesChecks() {
  masteryChecks();
}

function clickFortitude() {
  document.getElementsByClassName("savereplace")[0].innerHTML = "Fortitude";
  document.getElementsByClassName("savebonusreplace")[0].innerHTML = fortitude;
}

function clickReflex() {
  document.getElementsByClassName("savereplace")[0].innerHTML = "Reflex";
  document.getElementsByClassName("savebonusreplace")[0].innerHTML = reflex;
}

function clickWill() {
  document.getElementsByClassName("savereplace")[0].innerHTML = "Will";
  document.getElementsByClassName("savebonusreplace")[0].innerHTML = will;
}

function clickFitness() {
  document.getElementsByClassName("expertisereplace")[0].innerHTML = "Fitness";
  document.getElementsByClassName("expertisebonusreplace")[0].innerHTML = fitness;
}

function clickKnack() {
  document.getElementsByClassName("expertisereplace")[0].innerHTML = "Knack";
  document.getElementsByClassName("expertisebonusreplace")[0].innerHTML = knack;
}

function clickAwareness() {
  document.getElementsByClassName("expertisereplace")[0].innerHTML = "Awareness";
  document.getElementsByClassName("expertisebonusreplace")[0].innerHTML = awareness;
}

function clickKnowledge() {
  document.getElementsByClassName("expertisereplace")[0].innerHTML = "Knowledge";
  document.getElementsByClassName("expertisebonusreplace")[0].innerHTML = knowledge;
}

function clickPresence() {
  document.getElementsByClassName("expertisereplace")[0].innerHTML = "Presence";
  document.getElementsByClassName("expertisebonusreplace")[0].innerHTML = presence;
}

function masteryChecks() {
  for (var i = 0; i < chosenMasteries.length; i++) {
    var z = masterylist.findIndex(q => q.lookup === chosenMasteries[i])
    document.getElementById("masterycheckicons").innerHTML += "<div class='display masterycircle " + chosenMasteries[i] + "'><img onclick='clickMastery(this)' class='" + masterylist[z].lookup + "' src=" + masterylist[z].image + "></div>"
  }
}

function displayMasteries() {
  var displaym;
  for (var i = 0; i < chosenMasteries.length; i++) {
    var x = masterylist.findIndex(a => a.lookup === chosenMasteries[i]);
    displaym = "<div class='masterydisplay'><div class='displaycircle " + masterylist[x].lookup + "'><img src='" + masterylist[x].image + "'></div><div class='displaytitle'>" + masterylist[x].name + "</div><div class='displayrank'>" + chosenMasteriesRanksLetter[i] + "</div></div>"
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
  document.getElementsByClassName("normal")[0].innerHTML += "<div class='masteryicon'>" + normalm.join("",) + "</div></div>"
}

function displayEquipment() {
  document.getElementsByClassName("weaponrankdisplay")[0].innerHTML += "<div class='displayrank'>" + weaponRankLetter + "</div>";
  document.getElementsByClassName("armorrankdisplay")[0].innerHTML += "<div class='displayrank'>" + armorRankLetter + "</div>";
  document.getElementById("armordisplay").src = armorimg;

  if (armorweight === "light") {
    var surge = parseInt(armorRank)
    var surgebonus = surge * 20
    document.getElementsByClassName("armorpassive")[0].innerHTML = "<h4>Surge</h4>";
    document.getElementsByClassName("passivecontainer")[0].innerHTML += "<b>Light Armor</b><p><b>Surge.</b> Once per thread, you may add  " + surgebonus + " to a roll you make (before multipliers). Surging Revive gives you " + surge + " additional revive target(s). Dispel and Inspire cannot be surged.</p>";
  } else if (armorweight === "medium") {
    document.getElementsByClassName("armorpassive")[0].innerHTML = "<h4>Haste</h4>";
    document.getElementsByClassName("passivecontainer")[0].innerHTML += "<b>Haste.</b><p> Once per thread, you may perform 2 actions instead of 1: Standard + Standard or Standard + Special.</p>";
  } else {
    var swind = parseInt(armorRank)
    var swindbonus = swind * 15;
    document.getElementsByClassName("armorpassive")[0].innerHTML = "<h4>Second Wind</h4>";
    document.getElementsByClassName("passivecontainer")[0].innerHTML += "<b>Second Wind.</b><p> Once per thread, regain " + swindbonus + " HP.</p>";
  }
}

function clickMastery(e) {
  var x = chosenMasteries.indexOf(e.classList.toString())
  e.parentElement.parentElement.parentElement.getElementsByClassName("masteryreplace")[0].innerHTML = " " + chosenMasteriesRanksLetter[x] + " ";
  var y = masterylist.findIndex(a => a.lookup === e.classList.toString());
  e.parentElement.parentElement.parentElement.getElementsByClassName("mnamereplace")[0].innerHTML = masterylist[y].name;
}

function valueReplace() {
  document.getElementById("freeactiondisplay").innerHTML = document.getElementById("freeactiondisplay").innerHTML.replace(/WR/g, weaponRankLetter);
  document.getElementById("actionsdisplay").innerHTML = document.getElementById("actionsdisplay").innerHTML.replace(/WR/g, weaponRankLetter);
  document.getElementById("saveschecks").innerHTML = document.getElementById("saveschecks").innerHTML.replace(/WR/g, weaponRankLetter);

  if (document.getElementById("alter-dispelfinal")) {
    document.getElementById("actionsdisplay").innerHTML = document.getElementById("actionsdisplay").innerHTML.replace(/r dispel/g, "r alterdispel");
    document.getElementById("actionsdisplay").innerHTML = document.getElementById("actionsdisplay").innerHTML.replace(/1d4/g, "2d4");
  }

  namesReplace();
}

function targetReplaceSingle(e) {
  e.parentElement.parentElement.getElementsByClassName("targetreplace")[0].innerHTML = "single";
}

function targetReplaceAOE(e) {
  e.parentElement.parentElement.getElementsByClassName("targetreplace")[0].innerHTML = "aoe";
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

  if (chosenActions.includes("defense")) {
    passivehp = parseInt(chosenMasteriesRanks[chosenMasteriesRanks.length - 1]);
    passivehp = passivehp * 10;
  }

  if (chosenActions.includes("taunt")) {
    tauntbonus = 20
  } else {
    tauntbonus = 0
  }

  totalhp = 100 + armormod + passivehp + tauntbonus;

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
var targeting = 0;

var dmgmods = [];
var supportmods = [];
var dispelmods = [];
var inspiremods = [];

function passiveBonus() {

  if (document.querySelector("#defensefinal")) {
    var y = parseInt(chosenMasteriesRanks[chosenMasteries.length - 1])
    y = y * 10;
    var x = document.getElementById("defensefinal").innerHTML
    document.getElementById("defensefinal").innerHTML = document.getElementById("defensefinal").innerHTML.substring(0, x.length - 6)
    document.getElementById("defensefinal").innerHTML += "<div class='cardinfo'>Your bonus is " + y + " extra HP, which has already been accounted for in your stats</div></div>"
  }

  if (document.querySelector("#damagefinal")) {
    var y = parseInt(chosenMasteriesRanks[chosenMasteries.length - 1])
    y = y * 3;
    dmgmods.push(y);
    var x = document.getElementById("damagefinal").innerHTML
    document.getElementById("damagefinal").innerHTML = document.getElementById("damagefinal").innerHTML.substring(0, x.length - 6)
    document.getElementById("damagefinal").innerHTML += "<div class='cardinfo'>Your bonus is +" + y + " extra damage, which has already been applied to your roll codes.</p></div></div>"
  }

  if (document.querySelector("#supportfinal")) {
    var y = parseInt(chosenMasteriesRanks[chosenMasteries.length - 1])
    y = y * 5;
    supportmods.push(y)
    var x = document.getElementById("supportfinal").innerHTML
    document.getElementById("supportfinal").innerHTML = document.getElementById("supportfinal").innerHTML.substring(0, x.length - 6)

    if (y > 0) {
      dispelmods.push(5)
      inspiremods.push(5)
      document.getElementById("supportfinal").innerHTML += "<div class='cardinfo'><p>Your bonus is +" + y + " extra healing/buffing, which has already been applied to your roll codes.</p><p>You may add 5 to your Dispel and Inspire rolls, which has already been applied to your roll codes</p></div></div>"
    } else {
    document.getElementById("supportfinal").innerHTML += "<div class='cardinfo'>Your bonus is +" + y + " extra healing/buffing, which has already been applied to your roll codes.</p></div></div>"
  }
}

  if (document.querySelector("#maneuverfinal")) {
    var y = parseInt(chosenMasteriesRanks[chosenMasteries.length - 1]);
    var message = "You may move 1 extra zone per post, which has already been accounted for in your stats";
    movement += 1

    var x = document.getElementById("maneuverfinal").innerHTML
    document.getElementById("maneuverfinal").innerHTML = document.getElementById("maneuverfinal").innerHTML.substring(0, x.length - 6)
    document.getElementById("maneuverfinal").innerHTML += "<div class='cardinfo'>" + message + "</div></div>"
  }

  if (document.querySelector("#speedfinal")) {
    var y = parseInt(chosenMasteriesRanks[chosenMasteries.length - 1]);
    var message;
    if (y === 1 || y === 2) {
      message = "You do not have additional zones of movement"
    } else {
      var z = y - 2
      message = "You may move " + z + " extra zone(s) per post, which has already been accounted for in your stats"
      movement += z
    }
    var x = document.getElementById("speedfinal").innerHTML
    document.getElementById("speedfinal").innerHTML = document.getElementById("speedfinal").innerHTML.substring(0, x.length - 6)
    document.getElementById("speedfinal").innerHTML += "<div class='cardinfo'>" + message + "</div></div>"
  }

  if (document.querySelector("#carryfinal")) {
    var y = parseInt(chosenMasteriesRanks[chosenMasteries.length - 1]);
    var message;
    if (y >= 1) {
      message = "You may move 1 extra zone per post, which has already been accounted for in your stats";
      movement += 1
    } else {
      message = "You do not have additional zones of movement"
    }

    var x = document.getElementById("carryfinal").innerHTML
    document.getElementById("carryfinal").innerHTML = document.getElementById("carryfinal").innerHTML.substring(0, x.length - 6)
    document.getElementById("carryfinal").innerHTML += "<div class='cardinfo'>" + message + "</div></div>"
  }

  if (document.querySelector("#extra-movementfinal")) {
    var offense = [];
    for (var i = 0; i < chosenMasteries.length; i++) {
      var y = masterylist.findIndex(item => item.lookup === chosenMasteries[i]);
      if (masterylist[y].role === "offense") {
        offense.push(chosenMasteries[i])
      }
    }

    var movecheck = false;
    for (var i = 0; i < offense.length; i++) {
      if (chosenMasteriesRanks[chosenMasteries.indexOf(offense[i])] > 0) {
        movecheck = true;
      }
    }

    if (movecheck === true) {
      movement += 1
      message = "You may move 1 extra zone per post, which has already been accounted for in your stats"
    } else {
      message = "You do not have additional zones of movement"
    }

    var x = document.getElementById("extra-movementfinal").innerHTML;
    document.getElementById("extra-movementfinal").innerHTML = document.getElementById("extra-movementfinal").innerHTML.substring(0, x.length - 6)
    document.getElementById("extra-movementfinal").innerHTML += "<div class='cardinfo'>" + message + "</div></div>"
  }

  if (document.querySelector("#ferrierfinal")) {
    var y = parseInt(chosenMasteriesRanks[chosenMasteries.length - 1]);
    var message;
    if (y === 1) {
      message = "You do not have additional zones of movement"
    } else {
      message = "You may move 1 extra zone per post, which has already been accounted for in your stats"
      movement += 1
    }
    var x = document.getElementById("ferrierfinal").innerHTML
    document.getElementById("ferrierfinal").innerHTML = document.getElementById("ferrierfinal").innerHTML.substring(0, x.length - 6)
    document.getElementById("ferrierfinal").innerHTML += "<div class='cardinfo'>" + message + "</div></div>"
  }

  if (document.querySelector("#extensionfinal")) {

    targeting = 1;

    if (targeting === 2) {
      document.getElementsByClassName("rangecontainer")[0].style.display = "inline-block";
      document.getElementsByClassName("rangecontainer")[0].style.visibility = "visible";
      document.getElementsByClassName("rangecontainer")[0].innerHTML += "Up to 2 zones away"
    } else if (targeting === 1) {
      document.getElementsByClassName("rangecontainer")[0].style.display = "inline-block";
      document.getElementsByClassName("rangecontainer")[0].style.visibility = "visible";
      document.getElementsByClassName("rangecontainer")[0].innerHTML += "Up to 1 zone away"
    } else {
      document.getElementsByClassName("rangecontainer")[0].style.display = "none";
      document.getElementsByClassName("rangecontainer")[0].style.visibility = "hidden";
    }
  }

  if (document.querySelector("#momentumfinal")) {
    y = movement * 5;
    dmgmods.push(y);
    message = "You can add " + y + " additional damage to your attacks"

    var z = document.getElementById("momentumfinal").innerHTML
    document.getElementById("momentumfinal").innerHTML = document.getElementById("momentumfinal").innerHTML.substring(0, z.length - 6)
    document.getElementById("momentumfinal").innerHTML += "<div class='cardinfo'>Your bonus is +" + y + " extra damage, which has already been applied to your roll codes.</p></div></div>"
  }

  movementmessage = movement + " zone(s) per post"
  document.getElementsByClassName("movementcontainer")[0].innerHTML += movementmessage

  for (var i = 0; i < document.getElementsByClassName("damagepassivemod").length; i++) {
    document.getElementsByClassName("damagepassivemod")[i].innerHTML = dmgmods.join(" ") + " ";
  }

  for (var i = 0; i < document.getElementsByClassName("supportpassivemod").length; i++) {
    document.getElementsByClassName("supportpassivemod")[i].innerHTML = supportmods + " ";
  }

  for (var i = 0; i < document.getElementsByClassName("dispelpassivemod").length; i++) {
    document.getElementsByClassName("dispelpassivemod")[i].innerHTML = dispelmods + " ";
  }

  for (var i = 0; i < document.getElementsByClassName("inspirepassivemod").length; i++) {
    document.getElementsByClassName("inspirepassivemod")[i].innerHTML = inspiremods + " ";
  }
}


var name = "";
var threadcode = "";

function namesReplace() {

  if (name !== "") {
    document.getElementById("freeactiondisplay").innerHTML = document.getElementById("freeactiondisplay").innerHTML.replace(/Character Name/g, name);
    document.getElementById("actionsdisplay").innerHTML = document.getElementById("actionsdisplay").innerHTML.replace(/Character Name/g, name);
    document.getElementById("saveschecks").innerHTML = document.getElementById("saveschecks").innerHTML.replace(/Character Name/g, name);
    document.getElementsByClassName("charname")[0].innerHTML = name + "'s ";
  }
}

function getCode() {
  var generatemasterycode = chosenMasteries.join(",");
  var generatemasteryrankcode = chosenMasteriesRanks.join(",");
  var generateactioncode = chosenActions.join(",");

  if (name !== "") {
    var generatecharname = name.replace(/ /g, "_");
  } else {
    var generatecharname = name
  }

  var buildcode = "https://e-foead.github.io/app.html#" + generatemasterycode + "." + generatemasteryrankcode + "." + armorweight + "." + armorRank.toString() + "." + weaponRank.toString() + "." + generateactioncode + "." + generatecharname;

  document.getElementById("finalcode").value = buildcode;
}

function clickUpdateCode() {
  var newcode = document.getElementById("threadcodereplace").value;
  if (newcode === "") {
    for (var i = 0; i < document.getElementsByClassName("thrcode").length; i++) {
      document.getElementsByClassName("thrcode")[i].innerHTML = "Thread Code"
    }
  } else {
    for (var i = 0; i < document.getElementsByClassName("thrcode").length; i++) {
      document.getElementsByClassName("thrcode")[i].innerHTML = newcode;
    }
  }
}
