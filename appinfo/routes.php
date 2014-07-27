<?php
/**
 * ownCloud - readlater
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Ruchita <ruchita@berkeley.edu>
 * @copyright Ruchita 2014
 */

namespace OCA\ReadLater;
use \OCA\ReadLater\AppInfo\Application;


/**
 * Create your routes in here. The name is the lowercase name of the controller
 * without the controller part, the stuff after the hash is the method.
 * e.g. page#index -> PageController->index()
 *
 * The controller class has to be registered in the application.php file since
 * it's instantiated in there
 */
$application = new Application();

$application->registerRoutes($this, array('routes' => array(
	array('name' => 'page#index', 'url' => '/', 'verb' => 'GET'),
    array('name' => 'page#do_echo', 'url' => '/echo', 'verb' => 'POST'),
	array('name' => 'item_api#add_url', 'url' => '/add/url', 'verb' => 'POST'),
	array('name' => 'item_api#get_all', 'url' => '/getall', 'verb' => 'GET'),
	
)));
