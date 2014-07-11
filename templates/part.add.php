<li>
        <a class="list-title list-title-with-icon"><img src="<?php\OCP\Util::imagePath('readlater', '../img/add.svg');?>">  <span><?php p($l->t('Add Content'))?></span></a>

        <div id="addContent" class="add-new-popup">

                <fieldset class="personalblock">

                        <form>

                                <input type="text" 
                                        placeholder="<?php p($l->t('Address')); ?>" 
                                        name="address"
                                        autofocus>
                               <button type="submit" id="addUrlBtn"><?php p($l->t('Add')); ?></button>

                        </form>
                        
                </fieldset>
        </div>
</li>
