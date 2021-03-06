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
                    <a href="#"><i class="fas fa-home"></i> 공지사항</a>
                </li>
                <li class="sidebar-item">
                    <a href="/load.php?userid=<?php echo $id ?>"><i class="fas fa-user-clock"></i> 나의 예약</a>
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
        <div class="notice-panel center-horizontal" style="padding: 20px 0 0 0">
            <h2>공지사항</h2>
            </br>
            <div class="card">
                <div class="card-header">
                    급식 예약
                </div>
                <div class="card-body">
                    <!-- <h5 class="card-title">Lorem</h5> -->
                    <p class="card-text">1. 급식예약은 10일 전까지 가능합니다.</p>
                    <p class="card-text">2. 상단 메뉴에서 '나의 예약' 메뉴를 통해 예약해주세요!</p>
                </div>
            </div>
            </br>
            <div class="card">
                <div class="card-header">
                    2월 급식 정보
                </div>
                <div class="card-body">
                    <h5 class="card-title">식단표</h5>
                    <p class="card-text">여기서 다운로드</p>
                    <br/>
                    <h5 class="card-title">수정 사항</h5>
                    <p class="card-text">2.11(금)와 2.12(토) 점심 식사 상호교체 예정.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="bottom-bar" style="background: grey">
        <h4 style="padding: 20px">Copyright (c) AAOC. 2022. Jeong-HyunJun</h3>
    </div>
</body>

</html>