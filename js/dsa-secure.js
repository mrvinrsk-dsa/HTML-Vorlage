$(document).ready(function () {
	$(".dsa-secure-plugin").each(function () {
		(dsaurl = $(this).data("dsa-secure-plugin-url")),
			(dsapolice = $(this).data("dsa-secure-police")),
			(dsaimage = $(this).data("dsa-secure-image")),
			(dsaname = "Plugin"),
			$(this).data("dsa-secure-name") && (dsaname = $(this).data("dsa-secure-name")),
			(dsawidth = "480"),
			$(this).data("dsa-secure-width") && (dsawidth = $(this).data("dsa-secure-width")),
			(dsaheight = "280"),
			$(this).data("dsa-secure-height") && (dsaheight = $(this).data("dsa-secure-height")),
			(appendContent =
				'<div class="dsa-secure-image" style="background: url(' +
				dsaimage +
				') no-repeat center center / cover;"></div><div class="check-slide"><div class="check-slide-content"><label class="dsa-switch"><input type="checkbox" class="dsa-secure-plugin-checkbox"><span class="dsa-slider round"></span></label><p class="undercheck">Aktivieren um ' +
				dsaname +
				' anzuzeigen</p><div class="dsa-buttons"><a class="dsa-datennutzung dsa-tooltip " href="#" >Hinweis zur Datennutzung<span class="tooltiptext">Ich habe die Datenschutzerklärung des Betreibers der vorliegenden Homepage aufmerksam gelesen.<br>Mit dem aktivieren der Checkbox willige ich darin ein, dass meine personenbezogenen Daten hinsichtlich des Einsatzes von "<b>' +
				dsaname +
				'</b>"<br>vom Seitenbetreiber und ggf. auch vom Anbieter des o.g. Dienstes in demjenigen Umfang und in derjenigen Weise verarbeitet werden, wie dies in der Datenschutzerklärung beschrieben ist.<br>Mir ist bewusst, dass ich berechtigt bin, die Einwilligungserklärung jederzeit mit Wirkung für die Zukunft gegenüber dem Seitenbetreiber zu widerrufen.<br>Dass ich die Leistungen des Seitenbetreibers unabhängig von der Erklärung meiner Einwilligung oder deren Widerrufs in Anspruch nehmen kann, ist mir ebenfalls bewusst.</span></a><a href="' +
				dsapolice +
				'" target="_blank">Datenschutzerkl&auml;rung</a></div>  </div>  </div>  </div>'),
			$(this).width(dsawidth).height(dsaheight).append(appendContent);
	}),
		$(".dsa-secure-plugin-checkbox").on("change", function () {
			(dsatarget = $(this).data("dsa-secure-plugin-target")),
				(dsaparent = $(this).parent().parent().parent().parent()),
				(dsahidetarget = $(this).parent().parent().parent()),
				(dsareplaceTarget = dsaparent.find(".dsa-secure-image")),
				(dsaiurl = dsaparent.data("dsa-secure-plugin-url")),
				(dsaiwidth = "480"),
				dsaparent.data("dsa-secure-width") && (dsaiwidth = dsaparent.data("dsa-secure-width")),
				(dsaiheight = "280"),
				dsaparent.data("dsa-secure-height") && (dsaiheight = dsaparent.data("dsa-secure-height")),
				this.checked &&
					setTimeout(function () {
						$.post("https://consent.dsa-secure.de/consent_logger.php", { target: dsaiurl }),
							dsahidetarget.addClass("hide"),
							dsareplaceTarget.replaceWith($('<iframe  src="' + dsaiurl + '" frameborder="0" width="' + dsaiwidth + '" height="' + dsaiheight + '"  encrypted-media" allowfullscreen></iframe>'));
					}, 400);
		}),
		$(".dsa-secure-plugin  .tooltip").on("click", function (e) {
			e.preventDefault(), $(this).toggleClass("active");
		}),
		$("#dsa-cookie-close").click(function (e) {
			e.preventDefault(), $(".dsa-cookie").addClass("hide"), $(".dsa-cookie").addClass("now-hiding");
			e = new Date();
			e.setTime(e.getTime() + 6e5), (document.cookie = "dsacookienotice=1; expires=" + e.toUTCString() + "; path=/");
		}),
		"" !=
			(function () {
				for (var e = "dsacookienotice=", a = decodeURIComponent(document.cookie).split(";"), s = 0; s < a.length; s++) {
					for (var i = a[s]; " " == i.charAt(0); ) i = i.substring(1);
					if (0 == i.indexOf(e)) return i.substring(e.length, i.length);
				}
				return "";
			})() && $(".dsa-cookie").addClass("hide"),
		$(".dsa-cookie").addClass("init");
});
