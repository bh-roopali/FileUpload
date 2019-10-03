sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.fu.fileUpload.controller.View1", {
		onInit: function () {
			//var oModel = new sap.ui.model.odata.ODataModel("https://lsftdc00.wdf.sap.corp:1443/sap/opu/odata/sap/ZFILE_UPLOAD_TEMP_SRV/");
		},

		handleUploadComplete: function () {
			alert("success");
		},

		onUpload: function () {
			var that = this;
					var oData = {
				"fileKey":"",
				"scenarioId":"",
				"requestNo":"900000141205",
				"url":"",
				"title":"image",
				"fileName":"10X10.png",
				"fileType":"image/png",
				"mimeType":"",
				"size":"",
				"description":"",
				"lang":"",
				"attachType":"",
				"format":"1",
				"roles":"",
				"rolesDesc":"4,5,38,39",
				"Filecontent": "AAABBCCC"
				};
				var oDataModel = that.getOwnerComponent().getModel();
				oDataModel.setUseBatch(true);
					oDataModel.create("/FileUploadSet", oData, {
				success: function (oResponse) {
					oDataModel.setUseBatch(false);
					sap.m.MessageToast.show("Upload Success");
				/*	that.getUploadedFile(oAttachType);
					that.getView().setBusy(false);
					that.onClearFileUrl(oAttachType);*/
				},
				error: function (oError) {
					that.getUploadedFile(oAttachType);
					that.getView().setBusy(false);
					var message = "";
					message = jQuery.parseJSON(oError.responseText).error.message.value;
					if (message) {
						sap.m.MessageToast.show(message);
					} else {
						sap.m.MessageToast.show("Upload Failed");
					}
				}
			});
			var oFileUploader = that.getView().byId("id_FileUploadSec");
			oFileUploader.removeAllHeaderParameters();
				/*var oModel = new sap.ui.model.odata.ODataModel("https://lsftdc00.wdf.sap.corp:1443/sap/opu/odata/sap/ZFILE_UPLOAD_TEMP_SRV/");*/
			this.getOwnerComponent().getModel("testModel").refreshSecurityToken(function () {

				console.log('Succesfully retrieved CSRF Token');

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