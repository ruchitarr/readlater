<li>
        <a id ="addUrl" class="list-title list-title-with-icon"><img src="<?php echo \OCP\Util::imagePath('readlater', 'add.png');?>">  <span><?php p($l->t('Add Content'))?></span></a>

        <div id="addContent" class="add-new-popup">

                <fieldset class="personalblock">


                                <input type="text" 
                                        placeholder="<?php p($l->t('Address')); ?>" 
                                        name="address"
					id="url"
                                        autofocus>
                               <button  id="addUrlBtn"><?php p($l->t('Add')); ?></button>


                </fieldset>
        </div>
</li>
