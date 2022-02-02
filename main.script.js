// Meal Reservation System
//
//  main.script.js - render screen
//
// Copyright rollrat. 2022. All rights reserved.

// add day count to base date
function addToDate(base, date) {
  var lastWeek = new Date(
    base.getFullYear(),
    base.getMonth(),
    base.getDate() + date
  );
  return lastWeek;
}

// check given date is out of current date
function checkPast(date, offset) {
  var td = addToDate(new Date(), offset);
  if (date.getFullYear() < td.getFullYear()) return true;
  if (date.getFullYear() == td.getFullYear() && date.getMonth() < td.getMonth())
    return true;
  if (
    date.getFullYear() == td.getFullYear() &&
    date.getMonth() == td.getMonth() &&
    date.getDate() < td.getDate()
  )
    return true;
  return false;
}

function tryGetLoadedData(y, m, d, i) {
  if (g_loadedData[y] === undefined) return 0;
  if (g_loadedData[y][m] === undefined) return 0;
  if (g_loadedData[y][m][d] === undefined) return 0;
  if (g_loadedData[y][m][d][i] === undefined) return 0;
  return g_loadedData[y][m][d][i];
}

//
//  -- Create Check Panel --
//
function createCheckPanel(baseId, d, summaryId) {
  const checkerItemWidth = 80;
  const checkerItemHeight = 40;

  var table = document.createElement("table");
  table.id = `checker-${baseId}`;

  var baseDate = addToDate(d, -d.getDay());

  //
  //    -- Create Header --
  //
  function _createHeader() {
    var tr = document.createElement("tr");
    tr.appendChild(document.createElement("th"));

    function _th(className, style, txt, isPast) {
      var th = document.createElement("th");
      th.classList.add(className);
      th.style.cssText = style;
      th.append(txt);
      return th;
    }

    var week = ["일", "월", "화", "수", "목", "금", "토"];
    var wcolor = ["red", "black", "black", "black", "black", "black", "blue"];

    for (var i = 0; i < 7; i++) {
      var dd = addToDate(baseDate, i);
      var holiday = tryGetHoliday(
        dd.getFullYear(),
        dd.getMonth() + 1,
        dd.getDate()
      );
      var th = _th(
        "res-header-week",
        "color: " +
          (checkPast(dd, 10) ? "grey" : holiday != null ? "red" : wcolor[i]),
        `${dd.getMonth() + 1}-${dd.getDate()} (${week[i]})`
      );
      th.tag = { base: baseId, week: i, date: dd };
      // th.onclick = checkerColumnClick;
      tr.appendChild(th);
    }

    return tr;
  }

  //
  //    -- Create Checker --
  //
  function _createChecker(checkerName, checkerId) {
    var tr = document.createElement("tr");

    var nameItem = document.createElement("td");
    nameItem.append(checkerName);
    // nameItem.onclick = checkerRowClick;
    nameItem.tag = { base: baseId, checker: checkerId };
    nameItem.style.width = checkerItemWidth + "px";
    nameItem.style.height = checkerItemHeight + "px";
    tr.appendChild(nameItem);

    function _td(className, id, style, txt) {
      var td = document.createElement("td");
      td.classList.add(className);
      td.id = id;
      td.style.cssText = style;
      td.style.verticalAlign = "top";
      td.style.textAlign = "center";
      td.style.color = "grey";
      td.style.fontSize = "9px";
      if (txt != null)
        for (var mi in txt) {
          td.append(txt[mi]);
          if (mi != txt.length - 1)
            td.appendChild(document.createElement("br"));
        }

      // var cb = document.createElement("input");
      // cb.type = "checkbox";
      // td.appendChild(cb);
      return td;
    }

    for (var i = 0; i < 7; i++) {
      var dd = addToDate(baseDate, i);
      var meal = tryGetMealPlan(
        dd.getFullYear(),
        dd.getMonth() + 1,
        dd.getDate()
      );
      var td = _td(
        "res-hoverable",
        `checker-${baseId}-${checkerId}-${i}`,
        "",
        meal != null ? meal.p[checkerId] : ""
      );
      td.style.width = checkerItemWidth + "px";
      td.style.height = checkerItemHeight + "px";
      td.tag = {
        base: baseId,
        checker: checkerId,
        week: i,
        date: dd,
        summaryId: summaryId,
      };
      if (
        tryGetLoadedData(
          dd.getFullYear(),
          dd.getMonth() + 1,
          dd.getDate(),
          checkerId
        )
      ) {
        td.onOff = 1;
        td.style.background = "black";
      } else {
        td.onOff = 0;
      }
      td.onclick = checkerItemClick;
      tr.appendChild(td);
    }

    return tr;
  }

  table.appendChild(_createHeader());
  table.appendChild(_createChecker("조식", 0));
  table.appendChild(_createChecker("중식", 1));
  table.appendChild(_createChecker("석식", 2));

  return table;
}

function writeSummary(baseId, summaryId) {
  var summaryText = "";

  for (var j = 0; j < 7; j++) {
    var dayText = "";
    var condText = "";
    var shouldAppend = false;
    for (var i = 0; i < 3; i++) {
      var e = document.getElementById(`checker-${baseId}-${i}-${j}`);

      if (e.onOff == 1) {
        if (dayText == "")
          dayText = `${e.tag.date.getMonth() + 1}-${e.tag.date.getDate()}`;
        shouldAppend = true;

        if (condText != "") condText += "/";
        condText += `${["조식", "중식", "석식"][i]}`;
      }
    }
    if (shouldAppend) {
      if (summaryText != "") summaryText += ", ";
      summaryText += `${dayText} (${condText})`;
    }
  }

  document.getElementById(summaryId).textContent = summaryText;
}

function checkerItemClick(e) {
  var date = e.target.tag.date;

  if (checkPast(date, 0)) {
    alert("입력할 수 없습니다!");
    return;
  }

  if (checkPast(date, 10)) {
    alert("최소 10일전에 입력가능합니다!");
    return;
  }

  // If off
  if (e.target.onOff == 0) e.target.style.background = "black";
  // If on
  else e.target.style.background = null;

  // Flip Settings
  e.target.onOff = 1 - e.target.onOff;

  var summaryId = e.target.tag.summaryId;
  var baseId = e.target.tag.base;
  writeSummary(baseId, summaryId);
}

function checkerColumnClick(e) {
  var base = e.target.tag.base;
  var week = e.target.tag.week;

  for (var i = 0; i < 3; i++)
    document.getElementById(`checker-${base}-${i}-${week}`).click();
}

function checkerRowClick(e) {
  var base = e.target.tag.base;
  var checker = e.target.tag.checker;

  for (var i = 0; i < 7; i++)
    document.getElementById(`checker-${base}-${checker}-${i}`).click();
}

function init() {
  var p0 = createCheckPanel(0, addToDate(new Date(), -7), "res-sum0");
  document.getElementById("res-table0").replaceWith(p0);
  var p1 = createCheckPanel(1, new Date(), "res-sum1");
  document.getElementById("res-table").replaceWith(p1);
  var p2 = createCheckPanel(2, addToDate(new Date(), 7), "res-sum2");
  document.getElementById("res-table2").replaceWith(p2);
  var p3 = createCheckPanel(3, addToDate(new Date(), 14), "res-sum3");
  document.getElementById("res-table3").replaceWith(p3);
}

function save() {
  var resultData = {};

  // k = base
  for (var k = 0; k < 4; k++) {
    // j = checker
    for (var j = 0; j < 7; j++) {
      // i = meal time
      for (var i = 0; i < 3; i++) {
        var e = document.getElementById(`checker-${k}-${i}-${j}`);

        var onOff = e.onOff;

        if (onOff == 0) continue;

        var date = e.tag.date;

        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();

        // alert(JSON.stringify(e.tag));
        if (!(y in resultData)) resultData[y] = {};
        if (!(m in resultData[y])) resultData[y][m] = {};
        if (!(d in resultData[y][m])) resultData[y][m][d] = {};

        resultData[y][m][d][i] = onOff;
      }
    }
  }

  // var xhr = new XMLHttpRequest();
  // xhr.open("POST", "http://54.180.82.83/save.php", true);
  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.send(JSON.stringify({ userid: "test-id", data: resultData }));
  // xhr.onload = function () {
  //   if (this.responseText == 0 || this.responseText == "0")
  //     alert("성공적으로 저장되었습니다!");
  //   else alert("저장을 실패했습니다! 관리자에게 문의하세요");
  // };

  document.getElementById("save-form-content").value =
    JSON.stringify(resultData);
  document.getElementById("save-form-userid").value = g_userid;

  var form = document.saveForm;
  form.submit();
}
