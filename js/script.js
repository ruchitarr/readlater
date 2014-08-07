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
	var imgStarUrl = OC.generateUrl('/apps/readlater/img/star.png');

	$(document).ready(function () {
		displayData();
	});

	//Add Item
	$(document).on('click','a#addUrl', function(){
		$( "div#addContent" ).removeClass("hidden");
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
	
	//remove item
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
		$(document).on('click','#searchItemBtn', function(){
			alert($('#searchUrl').val());
			searchItem();
			$( "div#searchItem" ).addClass("hidden");
			return false;
		});
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
			items.push('<li><div class="title"><a class="bookmrk" href="item.url" id="item.id">' + item.url + '</a><br/><a class="list-title list-title-with-icon icon icon-star">&nbsp; </a>&nbsp;<a class="list-title list-title-with-icon icon icon-rename">&nbsp;  </a><a class="list-title list-title-with-icon icon icon-delete" onclick="removeItem()">&nbsp;  </a></div>  </li>');
 			console.log(item.url);
		});  // close each()
		$('#listfeedUL').append( items.join('') );
	 });
}
	
	function showDataDone(){
		console.log( "All items are displayed: " + msg );
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
	
 		alert( "Your content was saved: " + msg );
    		});
	}
	
	//search item
	function searchItem(){
		$('#listfeedUL').empty();
		items.length=0;
		alert("search item");
		$.ajax({
			type: "GET",
  			url: OC.generateUrl('/apps/readlater/search'),
  			data: {itemName: $('#searchUrl').val()},
		}).done(function( msg ) {

		$.each(msg, function(i, item) {
			console.log(item);
			
			items.push('<li><div class="title"><a class="bookmrk" href="item.url" id="item.id">' + item.url + '</a><br/><a class="list-title list-title-with-icon icon icon-star">&nbsp; </a>&nbsp;<a class="list-title list-title-with-icon icon icon-rename">&nbsp;  </a><a class="list-title list-title-with-icon icon icon-delete" onclick="removeItem()">&nbsp;  </a></div>  </li>');
 			console.log(item.url);
			});  // close each()
		$('#listfeedUL').append( items.join('') );
	 	});

	}
	
	


})(jQuery, OC);
