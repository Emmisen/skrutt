<?php $title='HTML5 Canvas animation for Asteroids'; include(__DIR__ . '/header.php'); ?>

<div id='flash'>

<div style="float:right;" id="time">60</div>

<h1 id="head_text"></h1>
<h2 style="display:inline;"> <span id="under_text2"></span> <a  id="link" href='index.php'>Do you wanna try again?</a></h2>

<canvas id='canvas1' width='900' height='400'>
  Your browser does not support the element HTML5 Canvas.
</canvas>
</div>

<?php $path=__DIR__; include(__DIR__ . '/footer.php'); ?>
