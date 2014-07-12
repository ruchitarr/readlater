<?php
/**
 * ownCloud - readlater
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Ruchita Rathi <ruchita@berkeley.edu	>
 * @copyright Ruchita Rathi 2014
 */

namespace OCA\readlater\BusinessLayer;

use \OCA\readlater\Db\ItemManagerManager;
use \OCA\readlater\Utility\Config;

class ItemBusinessLayer {
	private $ItemManager;
	public function __construct($ItemManager) {
		$this -> ItemManager = $ItemManager;
	}

	public function create($url) {
		$item = array();
		$item['url'] = $url;
		return $this -> ItemManager -> insert($item);
	}

	
}
?>
