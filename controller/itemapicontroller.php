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


namespace OCA\ReadLater\Controller;

use \OCA\ReadLater\BusinessLayer\ItemBusinessLayer;
use \OCP\IRequest;
use \OCP\AppFramework\Http\TemplateResponse;
use \OCP\AppFramework\Controller;
use \OCP\AppFramework\Http;
use \OCP\AppFramework\Http\JSONResponse;

class ItemApiController extends Controller {
    private $userId;
	private $ItemBusinessLayer;
	public $request; 

    public function __construct($appName, IRequest $request,  ItemBusinessLayer $ItemBusinessLayer){
        parent::__construct($appName, $request);
		$this->ItemBusinessLayer = $ItemBusinessLayer;
		$this->request = $request;

    }


    /**
     * CAUTION: the @Stuff turn off security checks, for this page no admin is
     *          required and no CSRF check. If you don't know what CSRF is, read
     *          it up in the docs or you might create a security hole. This is
     *          basically the only required method to add this exemption, don't
     *          add it to any other method if you don't exactly know what it does
     * @NoAdminRequired
	 * @CORS
     */

	/**
	 * Create item function
	 *
	 *
	 * @NoAdminRequired
	 */
	public function addURL() {
		$url = $this->params('url');
		return array('itemid' => $this->ItemBusinessLayer->create($url));
	}
	
	/**
     	 * Simply method that posts back the payload of the request
     	 * @NoAdminRequired
     	 */
	public function getAll() {
	$result = $this->ItemBusinessLayer->getItems();
	return new JSONResponse($result);
	}

	/**
	* @NoAdminRequired
	*/
	public function removeItem($id) {
	$errors = array();
	$itemId = $this->params('id');
	$findItem = $this->ItemBusinessLayer->get($itemId);
	if(empty($findItem)){
	array_push($errors,'Item not found');
	}
	if(empty($errors)){
	$result['deleted']	=$this->ItemBusinessLayer->delete($itemId);
	}else {
	$result['errors'] = $errors;
	}
	return new JSONResponse($result['deleted']); 
	}

	


}
