sap.ui.controller("sap.ui.company.view.master", {
	onInit: function() {
	    this.getView().addEventDelegate({
			onAfterShow: jQuery.proxy(function() {
			 //   var comp_name = {compName:"浙江能源",compDate:"20150927",comp_pnum:"56"};
			 //   $('#comp_name').html(comp_name.compName);
			 //   $('#comp_date').html(comp_name.compDate);
    //             $('#com_content_title').html(comp_name.comp_pnum);
                var html = "";
                var depArray = [
                	{deptName:"总经理工作部",num:"57"},
                	{deptName:"人力资源部",num:"7"},
                	{deptName:"物资供应部",num:"9"},
                	{deptName:"财务部",num:"12"},
                	{deptName:"计划合同部",num:"6"},
                	{deptName:"安质部",num:"6"}//,
                // 	{deptName:"工程部",num:"6"},
                // 	{deptName:"燃料部",num:"6"}
                ];
                for(var i=0;i<depArray.length;i++){
                    if(i==0){
                        html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'"></div></div>';
                    }else if(i==depArray.length-1){
                        html+='<div class="strt-part"><span class="line-h line-h-l"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'"></div></div>';
                    }else{
                        html+='<div class="strt-part"><span class="line-h line-h-c"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'"></div></div>';
                    }
                }
                $('#strt_block_table').html(html);
                for(var j=0;j<depArray.length;j++){
                    this._drawTable(j,depArray[j]);
                }
			}, this)
		});
	},
	_drawTable:function(divIndex,obj){
	    var aData = [
        	{lastName: "Dente", num1: "23", num2: "15"},
        	{lastName: "Friese", num1: "2", num2: "23"},
        	{lastName: "Mann", num1: "43", num2: "4"},
        	{lastName: "Schutt", num1: "5", num2: "3"},
        	{lastName: "Open", num1: "66", num2: "6"},
        	{lastName: "Dewit", num1: "4",num2: "3"},
        	{lastName: "Zar", num1: "78",num2: "9"},
        	{lastName: "Dewit", num1: "4",num2: "3"},
        	{lastName: "Zar", num1: "78",num2: "9"},
        	{lastName: "Dewit", num1: "4",num2: "3"},
        	{lastName: "Zar", num1: "78",num2: "9"},
        	{lastName: "Dewit", num1: "4",num2: "3"},
        	{lastName: "Zar", num1: "78",num2: "9"},
        	{lastName: "Dewit", num1: "4",num2: "3"},
        	{lastName: "Zar", num1: "78",num2: "9"},
        	{lastName: "Turner", num1: "9", num2: "3"}
        ];
        
        //Create an instance of the table control
        var oTable = new sap.ui.table.Table({
        	title: obj.deptName+" "+obj.num,
        	visibleRowCount: 10
        });
        //Define the columns and the control templates to be used
        var oColumn = new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "岗位名称"}),
        	template: new sap.ui.commons.TextView().bindProperty("text", "lastName"),
        	width: "15px"
        });

        oTable.addColumn(oColumn);
        oTable.addColumn(new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "职位"}),
        	template: new sap.ui.commons.TextField().bindProperty("value", "num1"),
        	width: "12px"
        }));
        oTable.addColumn(new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "岗级"}),
        	template: new sap.ui.commons.TextField().bindProperty("value", "num2"),
        	width: "12px"
        }));
        
        //Create a model and bind the table rows to this model
        var oModel = new sap.ui.model.json.JSONModel();
        // if(divIndex===1){
        //   aData=  [
        // 	{lastName: "Dente", num1: "21", num2: "6"},
        // 	{lastName: "Zar", num1: "78",num2: "9"},
        // 	{lastName: "Dewit", num1: "4",num2: "3"},
        // 	{lastName: "Zar", num1: "78",num2: "9"},
        // 	{lastName: "Dewit", num1: "4",num2: "3"},
        // 	{lastName: "Zar", num1: "78",num2: "9"},
        // 	{lastName: "Dewit", num1: "4",num2: "3"},
        // 	{lastName: "Turner", num1: "24", num2: "4"}
        // ];
        // }
        oModel.setData({modelData: aData});
        oTable.setModel(oModel);
        oTable.bindRows("/modelData");
        oTable.placeAt("com_content_table_"+divIndex);
	}
	
});