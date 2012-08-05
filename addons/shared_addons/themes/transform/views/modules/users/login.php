<div class="container">

<div class="row">

<div class="span3">&nbsp;</div>

<div class="span10">

<h2 class="page-title" id="page_title"><?php echo lang('user_login_header') ?></h2>

<?php if (validation_errors()): ?>
<div class="alert-message block-message error alert alert-error">
	<?php echo validation_errors();?>
</div>
<?php endif; ?>

<?php echo form_open('users/login', array('id'=>'login'), array('redirect_to' => $redirect_to)); ?>
<ul class="form_list">

	<li>
		<label for="email"><?php echo lang('user_email'); ?></label>
		<div class="input"><input type="text" id="email" name="email" maxlength="120" /></div>
	</li>

	<li>
		<label for="password"><?php echo lang('user_password'); ?></label>
		<div class="input"><input type="password" id="password" name="password" maxlength="20" /></div>
	</li>

	<li>
		<label><?php echo form_checkbox(array('name'=>'remember', 'class'=>'inline'), '1', FALSE); ?> <?php echo lang('user_remember')?></label>
	</li>
	
	<li>
		<p><input type="submit" value="<?php echo lang('user_login_btn') ?>" name="btnLogin" class="btn primary" /></p>
	</li>
	
	<li>
		<p><?php echo anchor('users/reset_pass', lang('user_reset_password_link'));?></p>
	</li>
</ul>

<?php echo form_close(); ?>

</div>

<div class="span3"></div>

</div><!--.row-->

</div><!--.container-->