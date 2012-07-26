<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Theme_transform extends Theme {

    public $name 				= 'Transform';
    public $author 				= 'Transform WI';
    public $author_website 		= '';
    public $website 			= 'transformwi.com';
    public $description 		= 'Based on Twitter Bootstrap and jQuery UI';
    public $version 			= '0.2';
	public $options 			= array(
									'header' => array(
										'title'         => 'Header',
										'description'   => 'Do you want a header above the nav?',
										'default'       => 'yes',
										'type'          => 'select',
										'options'       => 'yes=Yes|no=No',
										'is_required'   => TRUE
									));

}

/* End of file theme.php */