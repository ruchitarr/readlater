<?php
/**
 * ownCloud - readlater
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Ruchita Rathi <ruchita@berkeley.edu>
 * @copyright Ruchita Rathi 2014
 */
namespace OCA\readlater\Db;

use \OCP\IDb;
use \OCP\DB\insertid;

class ItemManager {
	private $userid;
	private $db;
	public function __construct($db) {
		$this -> db = $db;

	}

	

	/**
	 * Insert item
	 */
	public function insert($item) {
		$sql = 'INSERT INTO `*PREFIX*readlater_items` (`url`)';
		$sql .= ' VALUES (?)';
		$query = $this -> db -> prepareQuery($sql);
		$result = $query -> execute(array($item['url']));
		return $this -> db -> getInsertId('`*PREFIX*readlater_items`');

	}
}
