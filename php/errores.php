<?php

header('Content-Type: application/xml; charset=utf-8');
readfile($_GET['url']);
