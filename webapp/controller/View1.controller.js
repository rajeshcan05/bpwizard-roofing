// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ],
//     function (Controller) {
//         "use strict";

//         return Controller.extend("bpwizard-roofing.controller.View1", {
//             onInit: function () {
//             },

//             onSelectionChange: function (oEvent) {
//                 // 1. Get the selected item
//                 var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
                
//                 // 2. Get the Business Partner ID from the context
//                 var sBpID = oItem.getBindingContext().getProperty("BusinessPartner");

//                 // 3. Navigate to the Wizard route, passing the ID
//                 var oRouter = this.getOwnerComponent().getRouter();
//                 oRouter.navTo("RouteWizard", {
//                     bpID: sBpID
//                 });
//             }
//         });
//     });


// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator"
// ], function (Controller, Filter, FilterOperator) {
//     "use strict";

//     return Controller.extend("bpwizard-roofing.controller.View1", {
//         onInit: function () {
//         },

//         onSearch: function () {
//             var aFilters = [];

//             // 1. Get the values typed into the specific FilterBar inputs
//             var sID = this.byId("filterID").getValue();
//             var sCategory = this.byId("filterCategory").getValue();
//             var sName = this.byId("filterName").getValue();

//             // 2. Build the filters conditionally (only if the user typed something)
//             if (sID) {
//                 aFilters.push(new Filter("BusinessPartner", FilterOperator.Contains, sID));
//             }
//             if (sCategory) {
//                 aFilters.push(new Filter("BusinessPartnerCategory", FilterOperator.Contains, sCategory));
//             }
//             if (sName) {
//                 aFilters.push(new Filter("BusinessPartnerFullName", FilterOperator.Contains, sName));
//             }

//             // 3. Apply the combined filters to the Table
//             var oTable = this.byId("bpTable");
//             var oBinding = oTable.getBinding("items");
            
//             // SAPUI5 automatically treats an array of filters as an "AND" condition
//             oBinding.filter(aFilters);
//         },

//         onClear: function () {
//             // 1. Clear the inputs in the UI
//             this.byId("filterID").setValue("");
//             this.byId("filterCategory").setValue("");
//             this.byId("filterName").setValue("");

//             // 2. Remove all filters from the table to load all data again
//             var oTable = this.byId("bpTable");
//             oTable.getBinding("items").filter([]);
//         },

//         onSelectionChange: function (oEvent) {
//             // 1. Get the selected item
//             var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
            
//             // 2. Get the Business Partner ID from the context
//             var sBpID = oItem.getBindingContext().getProperty("BusinessPartner");

//             // 3. Navigate to the Wizard route, passing the ID
//             var oRouter = this.getOwnerComponent().getRouter();
//             oRouter.navTo("RouteWizard", {
//                 bpID: sBpID
//             });
//         }
//     });
// });


// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator"
// ], function (Controller, Filter, FilterOperator) {
//     "use strict";

//     return Controller.extend("bpwizard-roofing.controller.View1", {

//         onInit: function () {
//         },

//         // ==========================================
//         // FORMATTER: Assigns colors to Role Badges
//         // ==========================================
//         formatRoleColor: function (sRole) {
//             if (!sRole) return "None";
            
//             // Create a simple number based on the text to assign a consistent color
//             var sum = 0;
//             for (var i = 0; i < sRole.length; i++) {
//                 sum += sRole.charCodeAt(i);
//             }

//             // Standard SAP Fiori Semantic Colors (Blue, Purple, Teal, Orange, etc.)
//             var aColors = ["Information", "Indication04", "Indication05", "Indication03", "Indication01"];
            
//             // Pick a color from the array
//             var iColorIndex = sum % aColors.length; 
            
//             return aColors[iColorIndex];
//         },

//         // ==========================================
//         // EVENT: Triggered when user clicks "Go"
//         // ==========================================
//         onSearch: function () {
//             var aFilters = [];

//             var sID = this.byId("filterID").getValue();
//             var sCategory = this.byId("filterCategory").getValue();
//             var sName = this.byId("filterName").getValue();
//             var sRole = this.byId("filterRole").getValue();

//             // 1. Build standard filters
//             if (sID) {
//                 aFilters.push(new Filter("BusinessPartner", FilterOperator.Contains, sID));
//             }
//             if (sCategory) {
//                 aFilters.push(new Filter("BusinessPartnerCategory", FilterOperator.Contains, sCategory));
//             }
//             if (sName) {
//                 aFilters.push(new Filter("BusinessPartnerFullName", FilterOperator.Contains, sName));
//             }
            
//             // 2. Build filter for the Navigation Property (Roles)
//             if (sRole) {
//                 aFilters.push(new Filter("to_BusinessPartnerRole/BusinessPartnerRole", FilterOperator.Contains, sRole));
//             }

//             // 3. Apply to Table
//             var oTable = this.byId("bpTable");
//             var oBinding = oTable.getBinding("items");
//             oBinding.filter(aFilters);
//         },

//         // ==========================================
//         // EVENT: Triggered when user clicks "Clear"
//         // ==========================================
//         onClear: function () {
//             this.byId("filterID").setValue("");
//             this.byId("filterCategory").setValue("");
//             this.byId("filterName").setValue("");
//             this.byId("filterRole").setValue("");

//             // Clear table filters
//             this.byId("bpTable").getBinding("items").filter([]);
//         },

//         // ==========================================
//         // EVENT: Triggered when user clicks a row
//         // ==========================================
//         onSelectionChange: function (oEvent) {
//             var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
//             var sBpID = oItem.getBindingContext().getProperty("BusinessPartner");

//             // Navigate to Wizard page
//             this.getOwnerComponent().getRouter().navTo("RouteWizard", {
//                 bpID: sBpID
//             });
//         }

//     });
// });


// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator"
// ], function (Controller, Filter, FilterOperator) {
//     "use strict";

//     return Controller.extend("bpwizard-roofing.controller.View1", {

//         onInit: function () {
//         },

//         // ==========================================
//         // FORMATTERS: UI Enhancements
//         // ==========================================
        
//         // Translates raw category number to descriptive text
//         formatCategoryText: function (sCategory) {
//             if (sCategory === "1") return "Person";
//             if (sCategory === "2") return "Organization";
//             if (sCategory === "3") return "Group";
//             return "Unknown (" + sCategory + ")";
//         },

//         // Assigns an icon based on the category
//         formatCategoryIcon: function (sCategory) {
//             if (sCategory === "1") return "sap-icon://person-placeholder";
//             if (sCategory === "2") return "sap-icon://building";
//             if (sCategory === "3") return "sap-icon://group";
//             return "sap-icon://factory";
//         },

//         // Consistently assigns a color to a specific role string
//         formatRoleColor: function (sRole) {
//             if (!sRole) return "None";
            
//             var sum = 0;
//             for (var i = 0; i < sRole.length; i++) {
//                 sum += sRole.charCodeAt(i);
//             }

//             var aColors = ["Information", "Indication04", "Indication05", "Indication03", "Indication01"];
//             var iColorIndex = sum % aColors.length; 
            
//             return aColors[iColorIndex];
//         },

//         // ==========================================
//         // EVENTS: Search, Clear, and Navigation
//         // ==========================================

//         onSearch: function () {
//             var aFilters = [];

//             var sID = this.byId("filterID").getValue();
//             var sCategory = this.byId("filterCategory").getValue();
//             var sName = this.byId("filterName").getValue();
//             var sRole = this.byId("filterRole").getValue();

//             // Apply standard property filters
//             if (sID) {
//                 aFilters.push(new Filter("BusinessPartner", FilterOperator.Contains, sID));
//             }
//             if (sCategory) {
//                 aFilters.push(new Filter("BusinessPartnerCategory", FilterOperator.Contains, sCategory));
//             }
//             if (sName) {
//                 aFilters.push(new Filter("BusinessPartnerFullName", FilterOperator.Contains, sName));
//             }
            
//             // Apply navigation property filter for Roles
//             if (sRole) {
//                 aFilters.push(new Filter("to_BusinessPartnerRole/BusinessPartnerRole", FilterOperator.Contains, sRole));
//             }

//             // Bind filters to the table
//             var oTable = this.byId("bpTable");
//             var oBinding = oTable.getBinding("items");
//             oBinding.filter(aFilters);
//         },

//         onClear: function () {
//             this.byId("filterID").setValue("");
//             this.byId("filterCategory").setValue("");
//             this.byId("filterName").setValue("");
//             this.byId("filterRole").setValue("");

//             // Clear table bindings
//             this.byId("bpTable").getBinding("items").filter([]);
//         },

//         onSelectionChange: function (oEvent) {
//             var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
//             var sBpID = oItem.getBindingContext().getProperty("BusinessPartner");

//             // Navigate to Wizard passing the BP ID
//             this.getOwnerComponent().getRouter().navTo("RouteWizard", {
//                 bpID: sBpID
//             });
//         }

//     });
// });


sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox" // <-- ADDED: Needed for the click action
], function (Controller, Filter, FilterOperator, MessageBox) {
    "use strict";

    return Controller.extend("bpwizard-roofing.controller.View1", {

        onInit: function () {
        },

        // ==========================================
        // NEW: Action when "Create Template" is clicked
        // ==========================================
        onCreateTemplate: function () {
            MessageBox.information("Create Template functionality ready to be built!");
        },

        // ==========================================
        // FORMATTERS: UI Enhancements
        // ==========================================
        
        formatCategoryText: function (sCategory) {
            if (sCategory === "1") return "Person";
            if (sCategory === "2") return "Organization";
            if (sCategory === "3") return "Group";
            return "Unknown (" + sCategory + ")";
        },

        formatCategoryIcon: function (sCategory) {
            if (sCategory === "1") return "sap-icon://person-placeholder";
            if (sCategory === "2") return "sap-icon://building";
            if (sCategory === "3") return "sap-icon://group";
            return "sap-icon://factory";
        },

        formatRoleColor: function (sRole) {
            if (!sRole) return "None";
            
            var sum = 0;
            for (var i = 0; i < sRole.length; i++) {
                sum += sRole.charCodeAt(i);
            }

            var aColors = ["Information", "Indication04", "Indication05", "Indication03", "Indication01"];
            var iColorIndex = sum % aColors.length; 
            
            return aColors[iColorIndex];
        },

        // ==========================================
        // EVENTS: Search, Clear, and Navigation
        // ==========================================

        onSearch: function () {
            var aFilters = [];

            var sID = this.byId("filterID").getValue();
            var sCategory = this.byId("filterCategory").getValue();
            var sName = this.byId("filterName").getValue();
            var sRole = this.byId("filterRole").getValue();

            if (sID) {
                aFilters.push(new Filter("BusinessPartner", FilterOperator.Contains, sID));
            }
            if (sCategory) {
                aFilters.push(new Filter("BusinessPartnerCategory", FilterOperator.Contains, sCategory));
            }
            if (sName) {
                aFilters.push(new Filter("BusinessPartnerFullName", FilterOperator.Contains, sName));
            }
            if (sRole) {
                aFilters.push(new Filter("to_BusinessPartnerRole/BusinessPartnerRole", FilterOperator.Contains, sRole));
            }

            var oTable = this.byId("bpTable");
            var oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        },

        onClear: function () {
            this.byId("filterID").setValue("");
            this.byId("filterCategory").setValue("");
            this.byId("filterName").setValue("");
            this.byId("filterRole").setValue("");

            this.byId("bpTable").getBinding("items").filter([]);
        },

        onSelectionChange: function (oEvent) {
            var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
            var sBpID = oItem.getBindingContext().getProperty("BusinessPartner");

            this.getOwnerComponent().getRouter().navTo("RouteWizard", {
                bpID: sBpID
            });
        }

    });
});