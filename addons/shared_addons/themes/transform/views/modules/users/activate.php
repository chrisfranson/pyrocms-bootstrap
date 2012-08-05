<h2 class="page-title" id="page_title"><?php echo lang('user_register_header') ?></h2>

<div class="workflow-steps">
	<span id="active_step"><?php echo lang('user_register_step1') ?></span> &gt;
	<span><?php echo lang('user_register_step2') ?></span>
</div>

<?php if(!empty($error_string)): ?>
<div class="error-box alert alert-error">
	<?php echo $error_string; ?>
</div>
<?php endif;?>
<?php echo form_open('users/activate', 'id="activate-user"'); ?>
<ul class="form_list">
	<li>
		<label for="email"><?php echo lang('user_email') ?></label>
		<?php echo form_input('email', isset($_user['email']) ? $_user['email'] : '', 'maxlength="40"');?>
	</li>

	<li>
		<label for="activation_code"><?php echo lang('user_activation_code') ?></label>
		<?php echo form_input('activation_code', '', 'maxlength="40"');?>
	</li>

	<li>
		<?php echo form_submit(array(
			'name' => 'btnSubmit',
			'class' => 'btn',
			'value' => lang('user_activate_btn')
		)); ?>
	</li>
</ul>
<?php echo form_close(); ?>