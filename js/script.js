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
		$("div#addContent").hide();
		//showData();
		$.when( showData(), showDataDone() ).done(function() {
			alert( 'Deferred success' );
		})
		.fail(function() {
			alert( 'Deferred fail' );
		});
		console.log("hello");
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

          items.push('<li><div class="title"><a class="bookmrk" href="item.url">' + item.url + '</a><br/><a class="list-title list-title-with-icon"><img src="<?php echo \\OCP\\Util::imagePath(\'readlater\', \'star.png\');?>"></a><a class="list-title list-title-with-icon"><img src="<?php echo \OCP\Util::imagePath(\'readlater\', \'rename.png\');?>"> </a><a class="list-title list-title-with-icon"><img src="<?php echo \OCP\Util::imagePath(\'readlater\', \'delete.png\');?>"> </a></div>  </li>');
  alert(item.url);

   	});  // close each()
	
    });
}

function showDataDone(){


 	alert( "All items are displayed: " + msg );
	$('#listfeedUL').append( items.join('') );
}

})(jQuery, OC);
