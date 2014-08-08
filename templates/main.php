<?php 

\OCP\Util::addScript('readlater', 'script');  
\OCP\Util::addScript('readlater', 'bootstrap');  
\OCP\Util::addScript('readlater', 'bootstrap.min'); 

\OCP\Util::addStyle('readlater', 'style'); 
\OCP\Util::addStyle('readlater', 'bootstrap');  
function readlaterAdd(){
	$l = new OC_l10n('readlater');
	
}
?>
<div id="app">
	<div id="app-navigation">
		<ul class="with-icon">
			<?php print_unescaped($this->inc('part.add')) ?>
			<?php print_unescaped($this->inc('part.feed.unread')) ?>
			<?php print_unescaped($this->inc('part.search')) ?>
			<?php print_unescaped($this->inc('part.allitems')) ?>
			<?php print_unescaped($this->inc('part.videos')) ?>
			<?php print_unescaped($this->inc('part.images')) ?>
			<?php print_unescaped($this->inc('part.articles')) ?>
			<?php print_unescaped($this->inc('part.liked')) ?>
			</ul>
		</div>
	<div id="app-content">
		<div id="firstrun">
			<?php print_unescaped($this->inc('part.firstrun')) ?>
		</div>
			<?php print_unescaped($this->inc('part.listfeed')) ?>
		<ul class="latestSharesUL" id="listfeedUL">

		</ul>
		 
	</div>
</div>
