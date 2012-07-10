<h2 class="page-title" id="page_title"><?php echo lang('user_register_header') ?></h2>

<p>
	<span id="active_step"><?php echo lang('user_register_step1') ?></span> -&gt;
	<span><?php echo lang('user_register_step2') ?></span>
</p>

<?php if ( ! empty($error_string)):?>
<!-- Woops... -->
<div class="alert">
	<?php echo $error_string;?>
</div>
<?php endif;?>

<?php echo form_open('register', array('id' => 'register')); ?>

<p>In order to vote or fill out an application, you need an account.  You will be notified when there are major updates (not more than once per month).</p>

<ul class="fill_list">
	
	<?php if ( ! Settings::get('auto_username')): ?>
	<li>
		<label for="username"><?php echo lang('user_username') ?></label>
		<input type="text" name="username" maxlength="100" value="<?php echo $_user->username; ?>" />
	</li>
	<?php endif; ?>
	
	<li>
		<label for="email"><?php echo lang('user_email') ?></label>
		<input type="text" name="email" maxlength="100" value="<?php echo $_user->email; ?>" />
		<?php echo form_input('d0ntf1llth1s1n', ' ', 'class="default-form" style="display:none"'); ?>
	</li>
	
	<li>
		<label for="password"><?php echo lang('user_password') ?></label>
		<input type="password" name="password" maxlength="100" />
	</li>

	<?php foreach($profile_fields as $field) { if($field['field_slug'] === 'information_preferences' or $field['required'] and $field['field_slug'] != 'display_name') { ?>
	<li>
		<label for="<?php echo $field['field_slug']; ?>"><?php echo (lang($field['field_name'])) ? lang($field['field_name']) : $field['field_name'];  ?></label>
		<div class="input"><?php echo $field['input']; ?></div>
	</li>
	<?php } } ?>

	
	<li>
		<?php echo form_submit(array('name'=>'btnSubmit', 'value'=>lang('user_register_btn'), 'class'=>'btn')) ?>
	</li>
</ul>
<?php echo form_close(); ?>