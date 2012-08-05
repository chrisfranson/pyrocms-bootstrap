<div class="container">

<div class="page-container">

<div class="row">

<div class="span3">&nbsp;</div>

<div class="span10">

<h2 class="page-title"><?php echo lang('user_reset_password_title');?></h2>

<?php if(!empty($error_string)):?>
	<div class="error-box">
		<?php echo $error_string;?>
	</div>
<?php endif;?>

<?php if(!empty($success_string)): ?>
	<div class="success-box">
		<?php echo $success_string; ?>
	</div>
<?php else: ?>

	<?php echo form_open('users/reset_pass', array('id'=>'reset-pass')); ?>
	
	<p><?php echo lang('user_reset_instructions'); ?></p>

	<ul class="form_list">
		<li>
			<label for="email"><?php echo lang('user_email') ?></label>
			<div class="input"><input type="text" name="email" maxlength="100" value="<?php echo set_value('email'); ?>" /></div>
		</li>
		<li>
			<label for="user_name"><?php echo lang('user_username') ?></label>
			<div class="input"><input type="text" name="user_name" maxlength="40" value="<?php echo set_value('user_name'); ?>" /></div>
		</li>
			
	</ul>
	
	<p class="indented"><?php echo form_submit('btnSubmit', lang('user_reset_password_title'), 'class="btn primary"') ?></p>
	
	<?php echo form_close(); ?>
	
<?php endif; ?>

</div>

<div class="span3"></div>

</div><!--.row-->

</div><!--.page-container.-->

</div><!--.container-->