/**
 * ownCloud - readlater
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Ruchita <ruchita@berkeley.edu>
 * @copyright Ruchita 2014
 */

(function ($, OC) {
	var items = [];
	
	

	$(document).ready(function () {
		displayData();
	});

	//Add Item
	$(document).on('click','a#addUrl', function(){
		$( "div#addContent" ).removeClass('hidden').hide().slideDown();
		return false;
	});
	//Save Item
	$(document).on('click','#addUrlBtn', function(){
		alert($('#url').val());
		saveData();
		displayData();
		$( "div#addContent" ).addClass("hidden");
		return false;
	});
	
	//Remove item
	$(document).on('click','a.icon-delete', function(){
		alert('Delete item clicked');
		removeItem();
	});
	
	//Show all items
	$(document).on('click','#allItems', function(){
		displayData();
		return false;
	});
	//Search items
	$(document).on('click','a#searchItem', function(){
		$( "div#searchItem" ).removeClass("hidden");
		return false;
	});
	$(document).on('click','#searchItemBtn', function(){
			searchItem();
			$( "div#searchItem" ).addClass("hidden");
			return false;
		});


	//Show saved bookmarks
	function showData(){  
		$.ajax({
			type: "GET",
  			url: OC.generateUrl('/apps/readlater/getall'),
  			data: "",
  			contentType : "application/json; charset=utf-8",
  			dataType : 'json', 
		}).done(function( msg ) {

		
		$.each(msg, function(i, item) {
			items.push('<li><div class="title"><a class="bookmrk" href="item.url" id="item.id">' + item.url + '</a><br/><a class="list-title list-title-with-icon icon icon-star"></a>&nbsp;<a class="list-title list-title-with-icon icon icon-rename"></a><a class="list-title list-title-with-icon icon icon-delete"></a></div>  </li>');
 			console.log(item.url);
		});  // close each()
		$('#listfeedUL').append( items.join('') );
	 });
}
	
	function showDataDone(){
		$('#listfeedUL').append( items.join('') );
	}

	function displayData(){
		$('#listfeedUL').empty();
		items.length=0;
		showData();
		showDataDone();
		$.when( showData(), showDataDone() ).done(function() {
			console.log( 'Deferred success' );
		})
		.fail(function() {
			console.log( 'Deferred fail' );
		});

	}
	//remove item fn
	function removeItem(){  
		$.ajax({
			type: "DELETE",
  			url: OC.generateUrl('/apps/readlater/delete'),
  			data: {id: $('a.bookmrk').attr('id')}
    		}).done(function( msg ) {
		alert( "Your content was deleted: " + msg );
    		});
	}

	
	//Save Item
	function saveData(){ 
		$.ajax({
			type: "POST",
  			url: OC.generateUrl('/apps/readlater/add/url'),
  			data: {url: $('#url').val()}
    		}).done(function( msg ) {
				console.log(msg);
				$( "div#addContent" ).slideUp();
			});
	}
	
	//search item
	function searchItem(){
		$('#listfeedUL').empty();
		items.length=0;

		$.ajax({
			type: "GET",
  			url: OC.generateUrl('/apps/readlater/search'),
  			data: {itemName: $('#searchUrl').val()},
		}).done(function( msg ) {
		alert("search Url");
		alert($('#searchUrl').val());

		$.each(msg, function(i, item) {
			console.log(item);
			
			items.push('<li><div class="title"><a class="bookmrk" href="item.url" id="item.id">' + item.url + '</a><br/><a class="list-title list-title-with-icon icon icon-star">&nbsp; </a>&nbsp;<a class="list-title list-title-with-icon icon icon-rename">&nbsp;  </a><a class="list-title list-title-with-icon icon icon-delete" onclick="removeItem()">&nbsp;  </a></div>  </li>');
 			console.log(item.url);
			});  // close each()
		$('#listfeedUL').append( items.join('') );
	 	});

	}
	
	function file_get_contents_curl($url)
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


})(jQuery, OC);
