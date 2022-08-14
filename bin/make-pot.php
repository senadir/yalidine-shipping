<?php

foreach(glob('playground/*.po') as $index => $file) {
	$filename = pathinfo($file);
	$dirname = $filename['dirname'];
	$name = $filename['filename'];
	$files = glob('playground/*.po');
	unset($files[$index]);
	$subtract = implode(',', $files);
	shell_exec("wp i18n make-pot . $file --domain=yalidine-shipping --merge=source.po --exclude=node_modules,bin --subtract=$subtract");
}

