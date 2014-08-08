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
		$sql = 'INSERT INTO `*PREFIX*readlater_items` (`url`,`title`,`description`,`keywords`)';
		$sql .= ' VALUES (?,?,?,?)';
		$query = $this -> db -> prepareQuery($sql);
		$query -> bindParam(1, $item['url'], \PDO::PARAM_INT);
		$query -> bindParam(2, $item['title'], \PDO::PARAM_STR);
		$query -> bindParam(3, $item['description'], \PDO::PARAM_STR);
		$query -> bindParam(4, $item['keywords'], \PDO::PARAM_STR);
		$result = $query -> execute();
		return $this -> db -> getInsertId('`*PREFIX*readlater_items`');

	}
	/**
	* show item
	*/
	public function getItems() {
	$i=0;
	$sql = 'SELECT * FROM `*PREFIX*readlater_items`';
	$query = $this -> db -> prepareQuery($sql);
	$result = $query -> execute();
	$rows = array();
	while ($row = $result -> fetchRow()) {
	$rows[$i] = $row;
	$i++;
	}
	return $rows;
	}
	
	/**
	* Search Item
	*/
	public function search($itemName) {
	$sql = 'SELECT * FROM `*PREFIX*readlater_items` AS item WHERE item.url LIKE  ?';
	$query = $this -> db -> prepareQuery($sql);
	$result = $query -> execute(array('%'.$itemName . '%'));
	$rows = array();
        while ($row = $result -> fetchRow()) {
        $rows[$i] = $row;
        $i++;
        }
	return $rows;
	}

	/**
	* Delete item
	*/
	public function delete($itemId) {
	$sql = 'DELETE FROM `*PREFIX*readlater_items` WHERE `id`=?';
	$query = $this -> db -> prepareQuery($sql);
	$query -> bindParam(1, $itemId, \PDO::PARAM_INT);
	$result = $query -> execute();
	return array('deleted' => $itemId);
	}
}
