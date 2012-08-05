<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Theme_transform extends Theme {

    public $name 				= 'Transform';
    public $author 				= 'Chris Franson';
    public $author_website 		= '';
    public $website 			= 'http://github.com/chrisfranson';
    public $description 		= 'Based on Twitter Bootstrap and jQuery UI';
    public $version 			= '0.4';
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

									'colors' => array(
										'title'         => 'Color Scheme',
										'description'   => 'What colors do you want?!',
										'default'       => 'default',
										'type'          => 'select',
										'options'       => 'default=Default|olive=Olive|tan=Tan|warm=Warm|retro=Retro|pink=Pink',
										'is_required'   => TRUE
									),

									'header_color' => array(
										'title'         => 'Header Color',
										'description'   => 'Override the theme\'s background color for the site header.',
										'default'       => '',
										'type'          => 'text',
										'options'       => '',
										'is_required'   => FALSE
									),

									'footer_color' => array(
										'title'         => 'Footer Color',
										'description'   => 'Override the theme\'s background color for the site footer.',
										'default'       => '',
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