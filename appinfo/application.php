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

namespace OCA\ReadLater\AppInfo;


use \OCP\AppFramework\App;

use \OCA\ReadLater\Controller\PageController;
use \OCA\ReadLater\Db\ItemManager;
use \OCA\ReadLater\Controller\ItemApiController;
use \OCA\ReadLater\BusinessLayer\ItemBusinessLayer;



class Application extends App {


	public function __construct (array $urlParams=array()) {
		parent::__construct('readlater', $urlParams);

		$container = $this->getContainer();

		/**
		 * Controllers
		 */
		$container->registerService('PageController', function($c) {
			return new PageController(
				$c->query('AppName'), 
				$c->query('Request'),
				$c->query('UserId')
			);
		});
		/** Register ItemAPIController
		*/
		$container->registerService('ItemApiController', function($c) {
			return new ItemApiController(
				$c->query('AppName'), 
				$c->query('Request'),
				$c->query('ItemBusinessLayer')
			);
		
		/**
		* Business Layer
		*/

		$container->registerService('ItemBusinessLayer', function($c) {
			return new ItemBusinessLayer(
				$c->query('ItemManager')
			);
		});
		
		/**
		 * Mappers
		 */
		$container->registerService('ItemManager', function($c) {
			return new ItemManager(
				$c->query('ServerContainer')->getDb()
			);
		});


		/**
		 * Core
		 */
		$container->registerService('UserId', function($c) {
			return \OCP\User::getUser();
		});	
		
			
		
	}


}
