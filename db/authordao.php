<?php
namespace OCA\MyApp\AppInfo;

use \OCP\AppFramework\App;

use \OCA\MyApp\Db\AuthorDAO;


class Application extends App {

    public function __construct(array $urlParams=array()){
        parent::__construct('readlater', $urlParams);

        $container = $this->getContainer();

        /**
         * Database Layer
         */
        $container->registerService('AuthorDAO', function($c) {
            return new AuthorDAO($c->query('ServerContainer')->getDb());
        });
    }
}
?>
