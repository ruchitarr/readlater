<?php

// Look up other security checks in the docs!
\OCP\User::checkLoggedIn();
\OCP\App::checkAppEnabled('readlater');

$tpl = new OCP\Template("readlater", "main", "user");
$tpl->assign('msg', 'Hello World');
$tpl->printPage();
