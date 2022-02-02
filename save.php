
<?php
// ini_set('display_errors', '1');
// ini_set('display_startup_errors', '1');
// error_reporting(E_ALL);

$id = $_POST['userid'];
$content = $_POST['content'];

if (strpos($id, '.') !== false || strpos($id, '/') !== false || strpos($id, '\b') !== false) {
    return;
}

$fn = './res/resdata' . $id . '.txt';

$f = file_put_contents($fn, $content);

if ($f == false) $status = "1";
else $status = "0";
?>

<html>
    <script>
        if (<?php echo $status ?> == "0")
            alert("성공적으로 입력되었습니다!");
        else
            alert("입력에 실패했습니다! 다시시도해주세요!");
        window.location.href = "load.php?userid=<?php echo $id ?>"; 
        // window.history.back();
    </script>
</html>