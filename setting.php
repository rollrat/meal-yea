<?php
$id = $_GET['userid'];

if ($id == "") {
  echo "missing 'userid' param";
  return;
}

if (strpos($id, '.') !== false || strpos($id, '/') !== false || strpos($id, '\b') !== false) {
    return;
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
                    <a href="/load.php?userid=<?php echo $id ?>"><i class="fas fa-user-clock"></i> 나의 예약</a>
                </li>
                <li class="sidebar-item">
                    <a href="#"><i class="fas fa-user-friends"></i> 전체 예약 현황</a>
                </li>
                <li class="sidebar-item">
                    <a href="#"><i class="fas fa-cog"></i> 설정</a>
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
        <div class="notice-panel center-horizontal" style="padding: 20px 0 0 0">
            <h2>설정</h2>
            </br>
        </div>
    </div>
    <div class="bottom-bar" style="background: grey">
        <h4 style="padding: 20px">Copyright (c) AAOC. 2022. Jeong-HyunJun</h3>
    </div>
</body>

</html>