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
		$("div#addContent").hide();
		showData();
		showDataDone();
		$.when( showData(), showDataDone() ).done(function() {
			console.log( 'Deferred success' );
		})
		.fail(function() {
			console.log( 'Deferred fail' );
		});
		$('a').click(function () {
			alert('Hello from your script file');

			$("div#addContent").show();
			console.log("hello");
		});
		//Save Content
		$('#addUrlBtn').click(function(){
		alert("Add button clicked");
		alert($('#url').val());
		saveData();
		showData();
		showDataDone();
		$("div#addContent").hide();
		});

		$('#echo').click(function () {
			var url = OC.generateUrl('/apps/readlater/echo');
			var data = {
				echo: $('#echo-content').val()
			};

			$.post(url, data).success(function (response) {
				$('#echo-result').text(response.echo);
			});

		});
	});


$('#addUrl').click(function () {
	event.preventDefault(); 
	alert('Hello from your script file');
	$("div#addContent").show();
	console.log("hello");
	return false;
	});
//Save Content
$('#addUrlBtn').click(function(){
	event.preventDefault(); 
	alert("Add button clicked");
	alert($('#url').val());
	saveData();
	showData();
	showDataDone();
	$("div#addContent").hide();
	return false;
});


//Function to save Content
function saveData(){  

$.ajax({
	type: "POST",
  	url: OC.generateUrl('/apps/readlater/add/url'),
  	data: {url: $('#url').val()}
    }).done(function( msg ) {
	
 alert( "Your content was saved: " + msg );
    });
}

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

          items.push('<li><div class="title"><a class="bookmrk" href="item.url" id="item.id">' + item.url + '</a><br/><a class="list-title list-title-with-icon icon icon-star">&nbsp; </a>&nbsp;<a class="list-title list-title-with-icon icon icon-rename">&nbsp;  </a><a class="list-title list-title-with-icon icon icon-delete">&nbsp;  </a></div>  </li>');

  alert(item.url);
	

   	});  // close each()
		$('#listfeedUL').append( items.join('') );

	
    });
}

function showDataDone(){


 	alert( "All items are displayed: " + msg );
	$('#listfeedUL').append( items.join('') );
}


//remove item
$('a .icon-delete').click(function(){
	alert('I was clicked');
	
	
	

});


//remove item fn
function removeItem(){  

$.ajax({
	type: "DELETE",
  	url: OC.generateUrl('/apps/readlater/delete'),
  	data: {id: $('a.bookmrk').attr('id');}
    }).done(function( msg ) {
	
 alert( "Your content was deleted: " + msg );
    });
}



})(jQuery, OC);
