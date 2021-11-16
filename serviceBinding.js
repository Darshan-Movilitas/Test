function initModel() {
	var sUrl = "/FEBE-MII-DEV/XMII/MIIODataV2/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}