sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"sap/f/library"
], function (Controller, MessageBox, JSONModel, fioriLibrary) {
	"use strict";
	return Controller.extend("FujiFilm.Batch_Data_Formulation.controller.Main", {
		_data: {
			"dtValue": new Date() //			"dtValue" : "08:15:32"
		},
		onInit: function () {
			var oModel = new JSONModel(this._data);
			this.getView().setModel(oModel);
			jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				url: "/FEBE-MII-DEV/XMII/IlluminatorOData/QueryTemplate?QueryTemplate=SANDPIT/XCUTE_TRX_TEST&$format=json",
				async: false,
				success: function (data, textStatus, jqXHR) {
					console.log(data);
				}
			});
		},
		onAdd: function () {
			MessageBox.information("This functionality is not ready yet.", {
				title: "Aw, Snap!"
			});
		},
		onListItemPress: function () {
			var oFCL = this.oView.getParent();
			oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
		},
		/**
		 *@memberOf FujiFilm.Batch_Data_Formulation.controller.Main
		 */
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
	});
});