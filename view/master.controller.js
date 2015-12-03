sap.ui.controller("sap.ui.company.view.master", {
	onInit: function() {
	    this.getView().addEventDelegate({
			onAfterShow: jQuery.proxy(function() {
			    this._query();
			 //   var comp_name = {compName:"浙江能源",compDate:"20150927",comp_pnum:"56"};
			 //   $('#comp_name').html(comp_name.compName);
			 //   $('#comp_date').html(comp_name.compDate);
    //             $('#com_content_title').html(comp_name.comp_pnum);
                // var html = "";
                // var depArray = [
                // 	{deptName:"总经理工作部",num:"1"},
                // 	{deptName:"人力资源部",num:"2"},
                // 	{deptName:"物资供应部",num:"3"},
                // 	{deptName:"财务部",num:"4"},
                // 	{deptName:"计划合同部",num:"5"},
                // 	{deptName:"安质部",num:"6"},
                // 	{deptName:"工程部",num:"7"},
                // 	{deptName:"安质部",num:"8"},
                // 	{deptName:"工程部",num:"9"},
                // 	{deptName:"总经理工作部",num:"10"},
                // 	{deptName:"人力资源部",num:"11"},
                // 	{deptName:"物资供应部",num:"12"},
                // 	{deptName:"财务部",num:"13"},
                // 	{deptName:"计划合同部",num:"14"},
                // 	{deptName:"安质部",num:"15"},
                // 	{deptName:"工程部",num:"16"},
                // 	{deptName:"安质部",num:"17"},
                // 	{deptName:"工程部",num:"18"},
                // 	{deptName:"燃料部",num:"99"}
                // ];
                // var num =20;
                // var len = depArray.length;
                //     if(len>5){
                //       num = num* len;
                //       var sty = num+"%";
                //       document.getElementById('strt_block_table').style.width=sty;
                //     }
                // for(var i=0;i<depArray.length;i++){
                    
                //     if(i==0){
                //         html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'"></div></div>';
                //     }else if(i==depArray.length-1){
                //         html+='<div class="strt-part"><span class="line-h line-h-l"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'"></div></div>';
                //     }else{
                //         html+='<div class="strt-part"><span class="line-h line-h-c"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'"></div></div>';
                //     }
                // }
                // $('#strt_block_table').html(html);
                // for(var j=0;j<depArray.length;j++){
                //     this._drawTable(j,depArray[j]);
                // }
			}, this)
		});
	},
	_query:function(){
	    //create date
	    this._drawDatePickers();
        //create input
        this._drawTree();
        // create a simple button with some text and a tooltip only
       this._drawButton();
	},
	_drawDatePickers:function(){
		// create DatePickers and bind to model
	    var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData({
        	dateValue: new Date()
        });
        sap.ui.getCore().setModel(oModel);
        (new sap.ui.commons.DatePicker("dateQuery",{
        	width: "12em",
        	value:{ 
                path: "/dateValue",
        		type: new sap.ui.model.type.Date({pattern: "yyyy-MM-dd", strictParsing: true})
        	}
        })).placeAt("dataForm");    
	},
	_drawTree:function(){
	    // create a simple Input field
	    var oInput0 = new sap.ui.commons.TextField('input0',{width:"80px",enabled:false});
        oInput0.placeAt("textFieldForm0");
        var oInput1 = new sap.ui.commons.TextField('input1',{enabled:false});
        oInput1.placeAt("textFieldForm");
	    //Create a MenuButton Control
        var oMenuButton = new sap.ui.commons.MenuButton("menuButton",{text: "选择组织单元"}); 
        //Create the menu
        // var oMenu1 = new sap.ui.commons.Menu("menu1");

        var oMenu1 = new sap.ui.commons.Menu();
        //Create the items and add them to the menu
        var oMenuItem1 = new sap.ui.commons.MenuItem({text: "New",tooltip: "1001",select:this.handleMenuItemPress}); //Icon must be not larger than 16x16 px
        oMenu1.addItem(oMenuItem1);
        var oMenuItem2 = new sap.ui.commons.MenuItem({text: "Delete",tooltip: "1002",select:this.handleMenuItemPress});
        oMenu1.addItem(oMenuItem2);
        var oMenuItem3 = new sap.ui.commons.MenuItem({text: "Properties",tooltip: "1003",select:this.handleMenuItemPress});
        oMenu1.addItem(oMenuItem3);
        //Create a sub menu for item 1
        var oMenu2 = new sap.ui.commons.Menu();
        oMenuItem1.setSubmenu(oMenu2);
        //Create the items and add them to the sub menu
        var oMenuItem4 = new sap.ui.commons.MenuItem({text: "TXT",tooltip: "1004"});
        oMenu2.addItem(oMenuItem4);
        var oMenuItem5 = new sap.ui.commons.MenuItem({text: "RAR",tooltip: "1005"});
        oMenu2.addItem(oMenuItem5);
        
        //Create a sub menu for item 1
        var oMenu3 = new sap.ui.commons.Menu();
        oMenuItem2.setSubmenu(oMenu3);
        //Create the items and add them to the sub menu
        var oMenuItem6 = new sap.ui.commons.MenuItem({text: "ABC"});
        oMenu3.addItem(oMenuItem6);
        var oMenuItem7 = new sap.ui.commons.MenuItem({text: "DEF"});
        oMenu3.addItem(oMenuItem7);
        
        
        //Attach the Menu to the MenuButton
        oMenuButton.setMenu(oMenu1);
        //Attach an event to raise an alert when an item is selected.
        // oMenuButton.attachItemSelected(function (oEvent){
        //     sap.ui.getCore().byId("input1").setValue(oEvent.getParameter("item").getText() );
        // });
        
        //Attach the MenuButton to the page
        oMenuButton.placeAt("zuZhiDanYanBianMaForm");
	},
	_drawButton:function(){
	     var oButton1 = new sap.ui.commons.Button({
        	text : "查询",
        	tooltip : "查询",
        	width:"100px",
        	press : function() {
        	    var dateValue = sap.ui.getCore().byId("dateQuery").getValue();
        	    var year = dateValue.substring(0,4);
        	    var month = dateValue.substring(5,7);
        	    var day = dateValue.substring(8,10);
        	    var dateNew = year+month+day;
        	    var bianHao = sap.ui.getCore().byId("input0").getValue();
        	    
                var depArray = [
                	{name:"总经理工作部",list:[{name:"二级部门"},{name:"三级部门"}]},
                	{name:"人力资源部",list:[{name:"二级部门"},{name:"三级部门"}]},
                	{name:"燃料部",list:[{name:"二级部门"},{name:"三级部门"}]}
                ];
                var htmls = '<div class="strt-name-div" style="margin-top: 7px;padding: 5px;"><span>公司领导</span><span style="padding-left:20px" id="com_content_title"></span></div><div class="line-v" ><span></span></div><div class="strt-block" id="strt_block_table" ><div style="clear:both;"></div></div>';
                $('#htmlstrtpart').html(htmls);                
                var num =20;
                var len = depArray.length;
                if(len>5){
                    num = num* len;
                    var sty = num+"%";
                    document.getElementById('strt_block_table').style.width=sty;
                }    
                sap.ui.controller("sap.ui.company.view.master")._drawDiv(depArray,'#strt_block_table');

        	}
        });
        // attach it to some element in the page
        oButton1.placeAt("queryButton");
	},
	handleMenuItemPress:function(oEvent){
	     sap.ui.getCore().byId("input0").setValue(oEvent.getParameter("item").getTooltip());
	     sap.ui.getCore().byId("input1").setValue(oEvent.getParameter("item").getText() );
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
        	visibleRowCount: 12
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
	},
	_drawDiv:function(depArray,div){
	    var html = "";
                var depArray = [
                	{deptName:"总经理工作部",num:"1"},
                	{deptName:"人力资源部",num:"2"},
                	{deptName:"物资供应部",num:"3"},
                	{deptName:"财务部",num:"4"},
                	{deptName:"计划合同部",num:"5"},
                	{deptName:"安质部",num:"6"},
                	{deptName:"工程部",num:"7"},
                	{deptName:"安质部",num:"8"},
                	{deptName:"工程部",num:"9"},
                	{deptName:"总经理工作部",num:"10"},
                	{deptName:"人力资源部",num:"11"},
                	{deptName:"物资供应部",num:"12"},
                	{deptName:"财务部",num:"13"},
                	{deptName:"计划合同部",num:"14"},
                	{deptName:"安质部",num:"15"},
                	{deptName:"工程部",num:"16"},
                	{deptName:"安质部",num:"17"},
                	{deptName:"工程部",num:"18"},
                	{deptName:"燃料部",num:"99"}
                ];
                var num =20;
                var len = depArray.length;
                    if(len>5){
                      num = num* len;
                      var sty = num+"%";
                      document.getElementById('strt_block_table').style.width=sty;
                    }
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
	}
	
});