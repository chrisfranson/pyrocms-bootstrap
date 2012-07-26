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
									),

									'brand_font' => array(
										'title'         => 'Brand Font',
										'description'   => 'The font for the site name in the header. Must be on Google Web Fonts.',
										'default'       => '',
										'type'          => 'text',
										'options'       => '',
										'is_required'   => FALSE
								   	),

									'header_color' => array(
										'title'         => 'Header Color',
										'description'   => 'The background color for the site header.',
										'default'       => '#000',
										'type'          => 'text',
										'options'       => '',
										'is_required'   => FALSE
								   	),

									'sitewide_css' => array(
										'title'         => 'Site-wide CSS',
										'description'   => 'Custom CSS that will be applied to every page on the site.',
										'default'       => '',
										'type'          => 'textarea',
										'options'       => '',
										'is_required'   => FALSE
								   	)
								);

}

/* End of file theme.php */