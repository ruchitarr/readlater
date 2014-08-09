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

class ItemApiController extends Controller
{
    private $userId;
    private $ItemBusinessLayer;
    public $request;
    
    public function __construct($appName, IRequest $request, ItemBusinessLayer $ItemBusinessLayer)
    {
        parent::__construct($appName, $request);
        $this->ItemBusinessLayer = $ItemBusinessLayer;
        $this->request           = $request;
        
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
    public function addURL()
    {
        $url = $this->params('url');
		
		if (strpos($url,'http://') === false && strpos($url,'https://') === false){
			#for the moment just use http, can be improved to see if https is avalible.
			$url = 'http://'.$url;
		}
		
		$isURL = (bool)parse_url($url);
		if($isURL){
			$html = $this->file_get_contents_curl($url);
			
			$doc = new \DOMDocument();
			@$doc->loadHTML($html);
			$nodes = $doc->getElementsByTagName('title');

			//get and display what you need:
			$title = $nodes->item(0)->nodeValue;

			$metas = $doc->getElementsByTagName('meta');

			for ($i = 0; $i < $metas->length; $i++)
			{
				$meta = $metas->item($i);
				if($meta->getAttribute('name') == 'description')
					$description = $meta->getAttribute('content');
				if($meta->getAttribute('name') == 'keywords')
					$keywords = $meta->getAttribute('content');
			}
			
			
			$item = array();
			$item['url'] = $url;
			$item['title'] = $title;
			$item['description'] = ($description) ? $description : '';
			$item['keywords'] = ($keywords) ? $keywords :'';
			
			$result['itemid'] = $this->ItemBusinessLayer->create($item);
			
		}
        return new JSONResponse($result);
    }
    
    /**
     * Simply method that posts back the payload of the request
     * @NoAdminRequired
     */
    public function getAll()
    {
        $result = $this->ItemBusinessLayer->getItems();
        return new JSONResponse($result);
    }
    
    /**
     * @NoAdminRequired
     */
    public function removeItem($id)
    {
        $errors   = array();
        $itemId   = $this->params('id');
       /* $findItem = $this->ItemBusinessLayer->get($itemId);
        if (empty($findItem)) {
            array_push($errors, 'Item not found');
        }*/
        if (empty($errors)) {
            $result['deleted'] = $this->ItemBusinessLayer->delete($itemId);
        } else {
            $result['errors'] = $errors;
        }
        return new JSONResponse($result['deleted']);
    }
    
    /**
     * Simply method that posts back the payload of the request
     * @NoAdminRequired
     */
    public function searchItem()
    {
        $search = $this->params('itemName');
        $result = $this->ItemBusinessLayer->searchItems($search);
        return new JSONResponse($result);
    }
    
    private function file_get_contents_curl($url)
    {
        $ch = curl_init();
        
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        
        $data = curl_exec($ch);
        curl_close($ch);
        
        return $data;
    }
    
    
}
