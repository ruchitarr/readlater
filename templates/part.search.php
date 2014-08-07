<li>
	<a id="searchItem" class="list-title list-title-with-icon"><img src="<?php echo \OCP\Util::imagePath('readlater', 'search.svg');?>"/>
	   <?php p($l->t('Search'))?>
	</a>
	<div id="searchItem" class="add-new-popup hidden">

                <fieldset class="personalblock">


                                <input type="text" 
                                        placeholder="<?php p($l->t('Search Item')); ?>" 
                                        name="Search Items"
					id="searchUrl"
                                        autofocus>
                               <button  id="searchItemBtn"><?php p($l->t('Search')); ?></button>


                </fieldset>
        </div>
	
</li>
