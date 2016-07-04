jQuery(document).ready(function () {
	jQuery('a[href="/#/lightbox-close"]').click(function (e) {
		jQuery('section.lightbox').addClass('disabled');

		setTimeout(function () {jQuery('section.lightbox').addClass('disabled-z');}, 500);

		create_cookie('lineasmart', false, 30, "/");

		e.preventDefault();
	});

	jQuery('section.lightbox').on('click', 'a.add', function (e) {
		var email = jQuery('input[name="addEmail"]').val(),
			patron=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

			if(email === '') {
				jQuery('section.lightbox p.error').html('Debes ingresar email').addClass('enabled');

				setTimeout(function () {jQuery('section.lightbox p.error').removeClass('enabled');}, 3000);
				return false;
			}else if(!patron.test(email)) {
				jQuery('section.lightbox p.error').html('Debes ingresar email válido').addClass('enabled');

				setTimeout(function () {jQuery('section.lightbox p.error').removeClass('enabled');}, 3000);
				return false;
			}

			jQuery.get('/wp-content/plugins/emailing/addEmail.php?email='+ email + '', function(msg) {

				console.log(msg);
				if(msg === '200') {
					jQuery('section.lightbox').addClass('success');
					jQuery('input[name="addEmail"]').val('');

					setTimeout(function () {jQuery('section.lightbox').addClass('disabled');}, 3000);
					setTimeout(function () {jQuery('section.lightbox').addClass('disabled-z');}, 3500);

					create_cookie('lineasmart', false, 30, "/");
				}
			});

			e.preventDefault();
	});

	function create_cookie(name, value, days2expire, path) {
		var date = new Date();
		date.setTime(date.getTime() + (days2expire * 24 * 60 * 60 * 1000));
		var expires = date.toUTCString();
		document.cookie = name + '=' + value + ';' +
					   'expires=' + expires + ';' +
					   'path=' + path + ';';
	}

	function retrieve_cookie(name) {
	  var cookie_value = "",
		current_cookie = "",
		name_expr = name + "=",
		all_cookies = document.cookie.split(';'),
		n = all_cookies.length;

	  for(var i = 0; i < n; i++) {
		current_cookie = all_cookies[i].trim();
		if(current_cookie.indexOf(name_expr) == 0) {
		  cookie_value = current_cookie.substring(name_expr.length, current_cookie.length);
		  break;
		}
	  }
	  return cookie_value;
	}

	var lightboxShow = retrieve_cookie('lineasmart');

	if(lightboxShow === '' || lightboxShow === 'true') {
		create_cookie('lineasmart', true, 7, "/");

		jQuery('section.lightbox').removeClass('disabled-z');
		setTimeout(function () {jQuery('section.lightbox').removeClass('disabled');}, 500);
	}
});
