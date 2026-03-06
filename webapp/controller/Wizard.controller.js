// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/m/MessageToast",
//     "sap/m/MessageBox"
// ], function (Controller, JSONModel, MessageToast, MessageBox) {
//     "use strict";

//     return Controller.extend("bpwizard-roofing.controller.Wizard", {

//         onInit: function () {
//             // Initialize local JSON model
//             var oViewModel = new JSONModel({
//                 BusinessPartner: "",
//                 BusinessPartnerCategory: "",
//                 BusinessPartnerFullName: "",
//                 BusinessPartnerGrouping: "",
//                 BusinessPartnerName: "",
//                 CreatedByUser: "",
//                 FirstName: "",
//                 Address: {}, // Object for single address
//                 Roles: []    // Array for multiple roles
//             });
//             this.getView().setModel(oViewModel, "wizardData");

//             // Router hook
//             this.getOwnerComponent().getRouter().getRoute("RouteWizard").attachPatternMatched(this._onObjectMatched, this);
//         },

//         _onObjectMatched: function (oEvent) {
//             var sBpID = oEvent.getParameter("arguments").bpID;
//             this._loadFullData(sBpID);
//         },

//         _loadFullData: function (sBpID) {
//             var oView = this.getView();
//             var oODataModel = oView.getModel(); // S/4HANA Model
//             var oWizardModel = oView.getModel("wizardData");

//             // Path with Expand
//             var sPath = "/A_BusinessPartner('" + sBpID + "')";
            
//             // ⚠️ CRITICAL: Use $expand to get nested data in one shot
//             var mParameters = {
//                 urlParameters: {
//                     "$expand": "to_BusinessPartnerAddress,to_BusinessPartnerRole"
//                 },
//                 success: function (oData) {
//                     // 1. Extract Address (Taking the first one found)
//                     var oAddressData = {};
//                     if (oData.to_BusinessPartnerAddress && oData.to_BusinessPartnerAddress.results.length > 0) {
//                         var firstAddr = oData.to_BusinessPartnerAddress.results[0];
//                         oAddressData = {
//                             AddressID: firstAddr.AddressID,
//                             AddressTimeZone: firstAddr.AddressTimeZone,
//                             CityCode: firstAddr.CityCode,
//                             CityName: firstAddr.CityName,
//                             CompanyPostalCode: firstAddr.CompanyPostalCode,
//                             Country: firstAddr.Country,
//                             Person: firstAddr.Person
//                         };
//                     }

//                     // 2. Extract Roles (Array)
//                     var aRolesData = [];
//                     if (oData.to_BusinessPartnerRole && oData.to_BusinessPartnerRole.results.length > 0) {
//                         oData.to_BusinessPartnerRole.results.forEach(function(role) {
//                             aRolesData.push({
//                                 BusinessPartner: role.BusinessPartner,
//                                 BusinessPartnerRole: role.BusinessPartnerRole
//                             });
//                         });
//                     }

//                     // 3. Set Data to Wizard Model (Merging all sections)
//                     var oTemplateData = {
//                         BusinessPartner: "", // Clear ID for new creation
//                         BusinessPartnerCategory: oData.BusinessPartnerCategory,
//                         BusinessPartnerFullName: oData.BusinessPartnerFullName,
//                         BusinessPartnerGrouping: oData.BusinessPartnerGrouping,
//                         BusinessPartnerName: oData.BusinessPartnerName,
//                         CreatedByUser: oData.CreatedByUser,
//                         FirstName: oData.FirstName,
//                         Address: oAddressData,
//                         Roles: aRolesData
//                     };

//                     oWizardModel.setData(oTemplateData);
//                     MessageToast.show("Template loaded from: " + sBpID);
//                 },
//                 error: function (oError) {
//                     MessageBox.error("Failed to load data: " + oError.message);
//                 }
//             };

//             oODataModel.read(sPath, mParameters);
//         },

//         onNavBack: function () {
//             this.getOwnerComponent().getRouter().navTo("RouteView1");
//         },

//         onWizardCompleted: function () {
//             var oData = this.getView().getModel("wizardData").getData();
            
//             // Example of how you structure the payload for Deep Insert (Creating BP + Address + Role at once)
//             var oPayload = {
//                 BusinessPartnerCategory: oData.BusinessPartnerCategory,
//                 FirstName: oData.FirstName,
//                 LastName: oData.BusinessPartnerName, // Mapping Name to Last Name usually
                
//                 // Deep Insert Navigation Properties
//                 to_BusinessPartnerRole: oData.Roles,
//                 to_BusinessPartnerAddress: [
//                     oData.Address // Wrap single address in array
//                 ]
//             };

//             console.log("Submitting Payload:", oPayload);
//             MessageBox.success("Ready to submit! Check console for payload.");
//             // To actually save: 
//             // this.getView().getModel().create("/A_BusinessPartner", oPayload, ...)
//         }
//     });
// });


// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/m/MessageToast",
//     "sap/m/MessageBox"
// ], function (Controller, JSONModel, MessageToast, MessageBox) {
//     "use strict";

//     return Controller.extend("bpwizard-roofing.controller.Wizard", {

//         onInit: function () {
//             var oViewModel = new JSONModel({
//                 BusinessPartner: "",
//                 BusinessPartnerCategory: "",
//                 BusinessPartnerFullName: "",
//                 BusinessPartnerGrouping: "",
//                 BusinessPartnerName: "",
//                 CreatedByUser: "",
//                 FirstName: "",
//                 Address: {},
//                 Roles: []
//             });
//             this.getView().setModel(oViewModel, "wizardData");

//             this.getOwnerComponent().getRouter().getRoute("RouteWizard").attachPatternMatched(this._onObjectMatched, this);
//         },

//         _onObjectMatched: function (oEvent) {
//             var sBpID = oEvent.getParameter("arguments").bpID;
//             this._loadFullData(sBpID);
//         },

//         _loadFullData: function (sBpID) {
//             var oView = this.getView();
//             var oODataModel = oView.getModel();
//             var oWizardModel = oView.getModel("wizardData");

//             var sPath = "/A_BusinessPartner('" + sBpID + "')";
            
//             var mParameters = {
//                 urlParameters: {
//                     "$expand": "to_BusinessPartnerAddress,to_BusinessPartnerRole"
//                 },
//                 success: function (oData) {
//                     var oAddressData = {};
//                     if (oData.to_BusinessPartnerAddress && oData.to_BusinessPartnerAddress.results.length > 0) {
//                         var firstAddr = oData.to_BusinessPartnerAddress.results[0];
//                         oAddressData = {
//                             AddressID: firstAddr.AddressID,
//                             AddressTimeZone: firstAddr.AddressTimeZone,
//                             CityCode: firstAddr.CityCode,
//                             CityName: firstAddr.CityName,
//                             CompanyPostalCode: firstAddr.CompanyPostalCode,
//                             Country: firstAddr.Country,
//                             Person: firstAddr.Person
//                         };
//                     }

//                     var aRolesData = [];
//                     if (oData.to_BusinessPartnerRole && oData.to_BusinessPartnerRole.results.length > 0) {
//                         oData.to_BusinessPartnerRole.results.forEach(function(role) {
//                             aRolesData.push({
//                                 BusinessPartner: role.BusinessPartner,
//                                 BusinessPartnerRole: role.BusinessPartnerRole
//                             });
//                         });
//                     }

//                     var oTemplateData = {
//                         BusinessPartner: "",
//                         BusinessPartnerCategory: oData.BusinessPartnerCategory,
//                         BusinessPartnerFullName: oData.BusinessPartnerFullName,
//                         BusinessPartnerGrouping: oData.BusinessPartnerGrouping,
//                         BusinessPartnerName: oData.BusinessPartnerName,
//                         CreatedByUser: oData.CreatedByUser,
//                         FirstName: oData.FirstName,
//                         Address: oAddressData,
//                         Roles: aRolesData
//                     };

//                     oWizardModel.setData(oTemplateData);
//                     MessageToast.show("Template loaded from: " + sBpID);
//                 },
//                 error: function (oError) {
//                     MessageBox.error("Failed to load data: " + oError.message);
//                 }
//             };

//             oODataModel.read(sPath, mParameters);
//         },

//         onNavBack: function () {
//             this.getOwnerComponent().getRouter().navTo("RouteView1");
//         },

//         onWizardCompleted: function () {
//             var oData = this.getView().getModel("wizardData").getData();
            
//             var oPayload = {
//                 BusinessPartnerCategory: oData.BusinessPartnerCategory,
//                 FirstName: oData.FirstName,
//                 LastName: oData.BusinessPartnerName,
//                 to_BusinessPartnerRole: oData.Roles,
//                 to_BusinessPartnerAddress: [
//                     oData.Address
//                 ]
//             };

//             console.log("Submitting Payload:", oPayload);
//             MessageBox.success("Ready to submit! Check console for payload.");
//         }
//     });
// });




sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/m/BusyDialog"
], function (Controller, JSONModel, MessageToast, MessageBox, BusyDialog) {
    "use strict";

    return Controller.extend("bpwizard-roofing.controller.Wizard", {

        onInit: function () {
            var oViewModel = new JSONModel({
                progress: 17, 
                TemplateID: "",
                BusinessPartner: "",
                BusinessPartnerCategory: "",
                BusinessPartnerFullName: "",
                BusinessPartnerGrouping: "",
                BusinessPartnerName: "",
                CreatedByUser: "",
                FirstName: "",
                Address: {},
                Roles: [],
                Customer: {},
                Company: [],
                SalesArea: []
            });
            this.getView().setModel(oViewModel, "wizardData");

            this._oBusyDialog = new BusyDialog({
                title: "Loading Template",
                text: "Fetching Business Partner data securely..."
            });
            this.getView().addDependent(this._oBusyDialog);

            this.getOwnerComponent().getRouter().getRoute("RouteWizard").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sBpID = oEvent.getParameter("arguments").bpID;
            var oWizard = this.byId("bpWizard");
            var oModel = this.getView().getModel("wizardData");
            
            // Force wizard back to step 1
            var oFirstStep = oWizard.getSteps()[0];
            oWizard.discardProgress(oFirstStep);
            
            // Reset state
            oModel.setProperty("/progress", 17);
            oModel.setProperty("/TemplateID", sBpID);
            
            this._oBusyDialog.open();
            this._loadFullData(sBpID);
        },

        _loadFullData: function (sBpID) {
            var oView = this.getView();
            var oODataModel = oView.getModel();
            var oWizardModel = oView.getModel("wizardData");
            var that = this; 

            var sPath = "/A_BusinessPartner('" + sBpID + "')";
            
            var mParameters = {
                urlParameters: {
                    "$expand": "to_BusinessPartnerAddress,to_BusinessPartnerRole,to_Customer,to_Customer/to_CustomerCompany,to_Customer/to_CustomerSalesArea"
                },
                success: function (oData) {
                    var oAddressData = {};
                    if (oData.to_BusinessPartnerAddress && oData.to_BusinessPartnerAddress.results.length > 0) {
                        var firstAddr = oData.to_BusinessPartnerAddress.results[0];
                        oAddressData = {
                            Country: firstAddr.Country,
                            CityName: firstAddr.CityName,
                            CompanyPostalCode: firstAddr.CompanyPostalCode,
                            CityCode: firstAddr.CityCode,
                            AddressTimeZone: firstAddr.AddressTimeZone,
                            Person: firstAddr.Person
                        };
                    }

                    var aRolesData = oData.to_BusinessPartnerRole ? oData.to_BusinessPartnerRole.results : [];
                    var oCustomerData = oData.to_Customer || {};
                    var aCompanyData = (oData.to_Customer && oData.to_Customer.to_CustomerCompany) ? oData.to_Customer.to_CustomerCompany.results : [];
                    var aSalesData = (oData.to_Customer && oData.to_Customer.to_CustomerSalesArea) ? oData.to_Customer.to_CustomerSalesArea.results : [];

                    var sCurrentTemplate = oWizardModel.getProperty("/TemplateID");
                    oWizardModel.setData({
                        progress: 17, 
                        TemplateID: sCurrentTemplate,
                        BusinessPartnerCategory: oData.BusinessPartnerCategory,
                        BusinessPartnerFullName: oData.BusinessPartnerFullName,
                        BusinessPartnerGrouping: oData.BusinessPartnerGrouping,
                        BusinessPartnerName: oData.BusinessPartnerName,
                        CreatedByUser: oData.CreatedByUser,
                        FirstName: oData.FirstName,
                        Address: oAddressData,
                        Roles: aRolesData,
                        Customer: oCustomerData,      
                        Company: aCompanyData,        
                        SalesArea: aSalesData         
                    });
                    
                    that._oBusyDialog.close();
                    MessageToast.show("Template loaded successfully.");
                },
                error: function (oError) {
                    that._oBusyDialog.close();
                    MessageBox.error("Failed to load data.");
                }
            };

            oODataModel.read(sPath, mParameters);
        },

        // =========================================================
        // NAVIGATION LOGIC for custom in-step buttons
        // =========================================================
        onPrevStep: function () {
            var oWizard = this.byId("bpWizard");
            oWizard.previousStep();
            this._updateProgressChart(); // Force chart update
        },

        onNextStep: function () {
            var oWizard = this.byId("bpWizard");
            oWizard.nextStep();
            this._updateProgressChart(); // Force chart update
        },

        onStepActivate: function (oEvent) {
            this._updateProgressChart(); // Fallback chart update
        },

        // =========================================================
        // FIXED PROGRESS CHART LOGIC: Uses endsWith to prevent UI5 ID bugs
        // =========================================================
        _updateProgressChart: function () {
            var oWizard = this.byId("bpWizard");
            var sCurrentStepId = oWizard.getCurrentStep(); // Gets the string ID
            var oModel = this.getView().getModel("wizardData");

            if (sCurrentStepId.endsWith("step1")) {
                oModel.setProperty("/progress", 17);
            } else if (sCurrentStepId.endsWith("step2")) {
                oModel.setProperty("/progress", 33);
            } else if (sCurrentStepId.endsWith("step3")) {
                oModel.setProperty("/progress", 50);
            } else if (sCurrentStepId.endsWith("step4")) {
                oModel.setProperty("/progress", 66);
            } else if (sCurrentStepId.endsWith("step5")) {
                oModel.setProperty("/progress", 83);
            } else if (sCurrentStepId.endsWith("step6")) {
                oModel.setProperty("/progress", 100);
            }
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },

        onWizardCompleted: function () {
            MessageBox.success("Workflow successfully initiated for approval.");
        }
    });
});