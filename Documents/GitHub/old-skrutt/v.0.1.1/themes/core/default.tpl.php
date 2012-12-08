<!doctype html>
<html lang="sv"> 
<head>
  <meta charset="utf-8">
  <title><?=$title?></title>
  <link rel="stylesheet" href="<?=$stylesheet?>">
  <link rel="shortcut icon" href="<?=$favicon?>">
</head>
<body>
  <div id="wrapper">
	  <div id="header">
	    <?=$header?>
	  </div>
	  <div id="main" role="main">
	    <?=$main?>
	    <?=get_debug()?>
	  </div>
	  <div id="footer">
	    <?=$footer?>
	  </div>
  </div>
</body>
</html>
