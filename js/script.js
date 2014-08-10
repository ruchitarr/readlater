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
	$(document).on('click','a.icon-delete', function(e){
		removeItem($(this).parent().parent().attr('data-itemId'));
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
			items.push('<li data-itemId="'+ item.id +'"><div class="title"><a class="bookmrk" href="'+ item.url +'" target="_blank" id="" title="'+ item.url +'">' + item.title +  '</a> <div class="itemDesc">'+ item.description+ '</div><br/><a class="list-title list-title-with-icon icon icon-star"></a>&nbsp;<a class="list-title list-title-with-icon icon icon-rename"></a><a class="list-title list-title-with-icon icon icon-delete"></a></div>  </li>');
 			console.log(item);
		});  // close each()
		$('#listfeedUL').append( items.join('') );
		if(items.length > 0){
			$('#firstrun').hide();
		}
	 });
}
	
	function showDataDone(){
		//$('#listfeedUL').append( items.join('') );
	}

	function displayData(){
		$('#listfeedUL').empty();
		items.length=0;
		showData();
		showDataDone();
		

	}
	//remove item fn
	function removeItem(id){  
	console.log(id);
	$.ajax({
			type: "GET",
  			url: OC.generateUrl('/apps/readlater/deleteitem'),
  			data: {'id': id},
		}).done(function( msg ) {
		alert("delete this Url");
		alert(id);
		$('li[data-itemId="'+ id +'"]').slideUp();
		displayData();
	
	/*	$.get(OC.generateUrl('/apps/readlater/deleteitem'),{'id': id},function(){
			//$('li[data-itemId="'+ id +'"]').slideUp();*/
		})
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
				displayData();
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
})(jQuery, OC);
