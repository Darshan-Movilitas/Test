/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"FujiFilm/Batch_Data_Formulation/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});