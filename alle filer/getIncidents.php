<?php
$s = file_get_contents('./data/incidents.json');
header("Content-type: text/plain");
echo $s;