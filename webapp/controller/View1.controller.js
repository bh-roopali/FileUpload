sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.fu.fileUpload.controller.View1", {
		onInit: function () {
			//var oModel = new sap.ui.model.odata.ODataModel("https://lsftdc00.wdf.sap.corp:1443/sap/opu/odata/sap/ZFILE_UPLOAD_TEMP_SRV/");
		},
		
		handleUploadComplete: function(){
		//	alert("success");
		},

		onUpload: function () {
			var that = this;
			/*var oModel = new sap.ui.model.odata.ODataModel("https://lsftdc00.wdf.sap.corp:1443/sap/opu/odata/sap/ZFILE_UPLOAD_TEMP_SRV/");*/
			this.getOwnerComponent().getModel("testModel").refreshSecurityToken(function () {

				console.log('Succesfully retrieved CSRF Token');

				var oFileUploader = that.getView().byId("id_FileUpload");
				oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
					name: "SLUG",
					value: oFileUploader.getValue()
				}));
				oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
					name: "x-csrf-token",
					value: that.getOwnerComponent().getModel("testModel").getSecurityToken()
				}));
				//	If set to "true", the request will be sent as XHR request instead of a form submit.This property is not supported by Internet Explorer 9.
				oFileUploader.setSendXHR(true);

				oFileUploader.upload();

			}, function () {

				console.log('Error retrieving CSRF Token');

			}, false);

			/*var oFileUploader = this.getView().byId("id_FileUpload");
			oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
					name: "SLUG",
			value: oFileUploader.getValue()
			}));
			 oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                name: "x-csrf-token",
                value: "WByYwsbMSboy7nL60s9S7g=="
            }));
			//	If set to "true", the request will be sent as XHR request instead of a form submit.This property is not supported by Internet Explorer 9.
			oFileUploader.setSendXHR(true);

			oFileUploader.upload();*/

			//2nd solution
			/*	var that = this;
					var	oDataModel = new sap.ui.model.odata.v2.ODataModel("/int_pc/sap/opu/odata/SAP/ZFILE_UPLOAD_TEMP_SRV/");
				oDataModel.setUseBatch(false);
				var oDataNew = {
					Sid: "0000013909",
					Fdata: ""
				};
				oDataModel.create("/FileSet", oDataNew, {
					success: function (oResponse) {
					},
					error: function (oError) {
					}


				// 1st solution
			/*	var oFile = this.getView().byId('id_FileUpload').FUEl.files[0];
				var oFileUploader = this.getView().byId("id_FileUpload");
				var domRef = oFileUploader.getFocusDomRef();
				var uploadUrl = "/delfi/order/uploadManyFiles";
				var form = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];

				var oFormData = new FormData();
				oFormData.append("file", form);
				jQuery.ajax({
					type: "POST",
					contentType: "application/json",
					url: "/sap/fiori/ysmt4fioriforms/int_pc/sap/opu/odata/sap/YDSM_SRV/FileUploadSet",
					//dataType: "json",
					data: oFormData,
					async: false,
					success: function (data, textStatus, jqXHR) {
						console.log("Success");
					},
					error: function (data) {
						console.log("error");
					}
				});*/
		},
	});
});