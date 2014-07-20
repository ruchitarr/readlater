<li>
        <a class="list-title list-title-with-icon"><img src="<?php echo \OCP\Util::imagePath('readlater', 'add.png');?>">  <span><?php p($l->t('Add Content'))?></span></a>

        <div id="addContent" class="add-new-popup">

                <fieldset class="personalblock">

                        <form method="post" name="new_item" id="editNewItem">

                                <input type="text" 
                                        placeholder="<?php p($l->t('Address')); ?>" 
                                        name="address"
					id="url"
                                        autofocus>
                               <button type="submit" id="addUrlBtn"><?php p($l->t('Add')); ?></button>

                        </form>
                        
                </fieldset>
        </div>
</li>
