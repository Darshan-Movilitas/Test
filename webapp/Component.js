sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"FujiFilm/Batch_Data_Formulation/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("FujiFilm.Batch_Data_Formulation.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			//Set user lanuage
			jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				url: "/FEBE-MII-DEV/XMII/Illuminator?service=admin&mode=UserAttribList&Content-Type=text/json",
				async: false,
				success: function (data, textStatus, jqXHR) {
					console.log(data);
					sap.ui.getCore().getConfiguration().setLanguage(data.Rowsets.Rowset[0].Row[0].Language);
				}

			});
			


		}
	});
});