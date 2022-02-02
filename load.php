
<?php 
// ini_set('display_errors', '1');
// ini_set('display_startup_errors', '1');
// error_reporting(E_ALL);

$id = $_GET['userid'];

if ($id == "") {
    echo "missing 'userid' param";
    return;
}

if (strpos($id, '.') !== false || strpos($id, '/') !== false || strpos($id, '\b') !== false) {
    return;
}

$fn = './res/resdata' . $id . '.txt';

if (!file_exists($fn)) {
    // echo json_encode(array('code' => "-1", "msg" => "not found"));
    // return;
    $result = array();
    
} else {
    $file = file_get_contents($fn, true);

    // echo json_encode(array("code" => 1,"content" => $file));
    $result = $file;
}
?>

<!DOCTYPE html>
<html>

<head>
  <title>항공사 급식예약체계</title>
  <link rel="icon" type="image/x-icon" href="https://aws.amazon.com/favicon.ico" />
  <link rel="stylesheet" type="text/css" href="/home/html/style.css" />
  <meta charset="utf-8" />
  <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
  <script src="/home/html/data.holiday.js"></script>
  <script src="/home/html/data.dummy.js"></script>
  <script src="/home/html/main.script.js"></script>

  <script>
      var g_userid = "<?php echo $id ?>";
      var g_loadedData = <?php echo $result ?>;
  </script>
</head>

<body onload="init()">
  <div class="header">
    <h1 class="center">급식예약체계</h1>
  </div>
  <div class="article-body">
    <div class="article-left sidebar">
      <ul class="center-horizontal" style="padding: 0px 5px 0px 5px">
        <li class="sidebar-item">
            <a href="/notice.php?userid=<?php echo $id ?>"><i class="fas fa-home"></i> 공지사항</a>
        </li>
        <li class="sidebar-item">
            <a href="#"><i class="fas fa-user-clock"></i> 나의 예약</a>
        </li>
        <li class="sidebar-item">
          <a href="#"><i class="fas fa-user-friends"></i> 전체 예약 현황</a>
        </li>
        <li class="sidebar-item">
          <a href="/setting.php?userid=<?php echo $id ?>"><i class="fas fa-cog"></i> 설정</a>
        </li>
      </ul>
    </div>
    <!-- <div class="article-right">
        <h2>Second</h2>
      </div> -->
    <div class="user-info" style="padding: 5px 0 5px 0">
      <div class="center-horizontal">
        <p>
          <span>사용자: </span>
          <span id="txt-username" style="font-weight: bold;">정현준 </span>
          (<span id="txt-userid"><?php echo $id ?></span>)
        </p>
      </div>
    </div>
    <div class="article-right center-horizontal" style="padding: 20px 0 0 0">
      <h2>예약</h2>
      </br>
      <h3>저번주</h3>
      <table id="res-table0"></table>
      <pre id="res-sum0" class="res-sum"></pre>
      </br>
      <h3>이번주</h3>
      <table id="res-table"></table>
      <pre id="res-sum1" class="res-sum"></pre>
      </br>
      <h3>다음주</h3>
      <table id="res-table2"></table>
      <pre id="res-sum2" class="res-sum"></pre>
      </br>
      <h3>다다음주</h3>
      <table id="res-table3"></table>
      <pre id="res-sum3" class="res-sum"></pre>
      </br>
      </br>
      <div style="display: block; text-align: end;">
        <button onclick="save()">저장</button>
      </div>
    </div>
  </div>
  <div class="bottom-bar" style="background: grey">
    <h4 style="padding: 20px">Copyright (c) AAOC. 2022. Jeong-HyunJun</h3>
  </div>
  
  <form name="saveForm" action="/save.php" method="post">
    <input type="hidden" name="content" id="save-form-content">
    <input type="hidden" name="userid" id="save-form-userid">
  </form>
</body>

</html>
