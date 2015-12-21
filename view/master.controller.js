sap.ui.controller("sap.ui.company.view.master", {
	onInit: function() {
	    this.getView().addEventDelegate({
			onAfterShow: jQuery.proxy(function() {
			    this._query();
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
             //   配置服务器
				var sServiceUrl = "/sap/opu/odata/SAP/ZHRMAP_SRV/";
                var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
                sap.ui.getCore().setModel(oModel);
                var jModel = new sap.ui.model.json.JSONModel();
                var mParameters = {};
                mParameters['async'] = true;
                    mParameters['success'] = jQuery.proxy(function(data) {
                        var results = data.results;
                        var depArray1 = eval('(' + results[0].Retstr + ')');
                        var htmls = '<div class="" style="display:inline-block;width: 250px;margin-top: 7px;padding: 5px;"><span id="nameHead"></span></div><div class="line-v" ><span></span></div><div class="strt-block" id="strt_block_table" ><div style="clear:both;"></div></div>';
                        $('#htmlstrtpart').html(htmls);
                        sap.ui.controller("sap.ui.company.view.master")._drawPanel(999,999,999,999,depArray1);
                        var num =20;
                        var depArray = depArray1.list;
                        var len =depArray.length;
                        
                        var nums=0;
                        if(depArray!=null){
                            for(var i=0;i<depArray.length;i++){
                                if(depArray[i].list!=null){
                                    nums+=depArray[i].list.length;
                                }
                            }
                        }
                        if(nums!=0){
                           len=len+nums; 
                        }
                        num = num* len;
                        var sty = num+"%";
                        console.log(sty);
                        document.getElementById('strt_block_table').style.width=sty;
                        console.log(document.getElementById('strt_block_table').style.width);

                        $("#strt_block_table").empty(); 
                        sap.ui.controller("sap.ui.company.view.master")._drawDiv(depArray,'#strt_block_table');

                }, this);
                mParameters['error'] = jQuery.proxy(function(data) {
                    sap.m.MessageToast.show("网络连接失败，请重试");
                }, this);
        	        
                oModel.read("/OM_POST_MAP_SET/?$filter=Objid eq '10003001'",mParameters);
                

        	}
        });
        // attach it to some element in the page
        oButton1.placeAt("queryButton");
	},
	handleMenuItemPress:function(oEvent){
	     sap.ui.getCore().byId("input0").setValue(oEvent.getParameter("item").getTooltip());
	     sap.ui.getCore().byId("input1").setValue(oEvent.getParameter("item").getText() );
	},
	
	_drawTable:function(divIndex2,divIndex3,divIndex4,divIndex5,obj){
        var oTable = null;
        oTable = new sap.ui.table.Table({
            //   id:"test"+divIndex,
        	title: obj.name,
        	visibleRowCount: 10
        });

        //Define the columns and the control templates to be used
        var oColumn = new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "岗位名称"}),
        	template: new sap.ui.commons.TextView().bindProperty("text", "gangwei"),
        	width: "15px"
        });

        oTable.addColumn(oColumn);
        oTable.addColumn(new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "职位"}),
        	template: new sap.ui.commons.TextField().bindProperty("value", "geShu"),
        	width: "12px"
        }));
        oTable.addColumn(new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "岗级"}),
        	template: new sap.ui.commons.TextField().bindProperty("value", "num2"),
        	width: "12px"
        }));
        
        //Create a model and bind the table rows to this model
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData({modelData: obj.tables});
        oTable.setModel(oModel);
        oTable.bindRows("/modelData");
        if(divIndex3==999&&divIndex4==999&&divIndex5==999){
            oTable.placeAt("com_content_table_"+divIndex2,"only");
	    }
	    if(divIndex4==999&&divIndex5==999&&divIndex3!=999){
            oTable.placeAt("com_content_table_"+divIndex2+"_"+divIndex3,"only");
	    }
	    if(divIndex4!=999&&divIndex5==999&&divIndex3!=999){
	        oTable.placeAt("com_content_table_"+divIndex2+"_"+divIndex3+"_"+divIndex4,"only");
	    }
        if(divIndex4!=999&&divIndex5!=999&&divIndex3!=999){
	        oTable.placeAt("com_content_table_"+divIndex2+"_"+divIndex3+"_"+divIndex4+"_"+divIndex5,"only");
	    } 
	},
	_drawDiv:function(depArray,div){
	            var html = "";
                for(var i=0;i<depArray.length;i++){
                    html+='<div class="strt-part">';
                    if(i==0){
                        // console.log(depArray[i].list.length);
                        if(depArray.length==1){
                            html+='<span class="line-h">';
                        }else{
                            html+='<span class="line-h line-h-r">';
                        }
                        
                    }else if(i==depArray.length-1){
                        html+='<span class="line-h line-h-l">';
                    }else{
                        html+='<span class="line-h line-h-c">';
                    }
                    html+='</span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'"></div>';
                    var list = depArray[i].list;
                    if(i==0){
                        if(list!=undefined){
                            html+='<div class="line-v"><span></span></div><div class="strt-block" >';
                            for(var k=0;k<list.length;k++){
                                if(k==0){
                                    if(list.length==1){
                                        html+='<div class="strt-part"><span class="line-h"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                    }else{
                                        html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                    }
                                    // var list3 = list[k].list;
                                    // if(list3!=undefined){
                                    //     html+='<div class="line-v"><span></span></div><div class="strt-block" >';
                                    //     if(list3.length==1){
                                    //         for(var m=0;m<list3.length;m++){
                                    //             if(m==0){
                                    //                 if(list3.length==1){
                                    //                     html+='<div class="strt-part"><span class="line-h"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'_'+m+'"></div></div>';
                                    //                 }else{
                                    //                     html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'_'+m+'"></div></div>';
                                    //                 }
                                    //             }
                                    //         }
                                            
                                    //     }
                                    //     html+='</div>';
                                    // }
                                    // console.log(html);
                                }else if(k==list.length-1){
                                        html+='<div class="strt-part"><span class="line-h line-h-l"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }else{
                                        html+='<div class="strt-part"><span class="line-h line-h-c"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }
                                
                            }
                            html+='</div>';
                        }
                    }
                    else if(i==depArray.length-1){
                        if(list!=undefined){
                            html+='<div class="line-v"><span></span></div><div class="strt-block" >';
                            for(var k=0;k<list.length;k++){
                                if(k==0){
                                    if(list.length==1){
                                        html+='<div class="strt-part"><span class="line-h"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                    }else{
                                        html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                    }
                                   // html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }else if(k==list.length-1){
                                        html+='<div class="strt-part"><span class="line-h line-h-l"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }else{
                                        html+='<div class="strt-part"><span class="line-h line-h-c"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }
                            }
                            html+='</div>';
                        }
                    }else{
                        if(list!=undefined){
                            html+='<div class="line-v"><span></span></div><div class="strt-block" >';
                            for(var k=0;k<list.length;k++){
                                if(k==0){
                                    if(list.length==1){
                                        html+='<div class="strt-part"><span class="line-h"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                    }else{
                                        html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                    }
                                //html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }else if(k==list.length-1){
                                        html+='<div class="strt-part"><span class="line-h line-h-l"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }else{
                                        html+='<div class="strt-part"><span class="line-h line-h-c"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'"></div></div>';
                                }
                            }
                            html+='</div>';
                        }
                    }
                    html+='</div>';
                    
                }
                // console.log(html);
                $('#strt_block_table').html(html);
                // console.log(html);
                for(var j=0;j<depArray.length;j++){
                    // console.log(depArray[j].tables);
                    if(depArray[j].tables==undefined){
                        this._drawPanel(j,999,999,999,depArray[j]);
                    }else{
                        this._drawTable(j,999,999,999,depArray[j]);
                    }
                    var list3 = depArray[j].list;
                    if(list3!=undefined){
                        for(var l=0;l<list3.length;l++){
                            if(list3[l].tables==undefined){
                                this._drawPanel(j,l,999,999,list3[l]);
                            }else{
                                this._drawTable(j,l,999,999,list3[l]);
                            }
                            var list4 = list3[l].list;
                            // for(var m=0;m<list4.length;m++){
                            //     if(list4[m].tables==undefined){
                            //         this._drawPanel(j,l,m,999,list4[m]);
                            //     }else{
                            //         this._drawTable(j,l,m,999,list4[m]);
                            //     }
                            // }
                        }
                    }
                }        
	},
	drawList3:function(html,list3,i,k){
	    console.log(list3);
	    if(list3!=undefined){
            html+='<div class="line-v"><span></span></div><div class="strt-block" >';
            for(var m=0;m<list3.length;m++){
                if(m==0){
                    if(list3.length==1){
                            html+='<div class="strt-part"><span class="line-h"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'_'+m+'"></div></div>';
                    }else{
                        html+='<div class="strt-part"><span class="line-h line-h-r"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'_'+m+'"></div></div>';
                                            
                    }
                }else if(m==list3.length-1){
                    html+='<div class="strt-part"><span class="line-h line-h-l"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'_'+m+'"></div></div>';
                }else{
                    html+='<div class="strt-part"><span class="line-h line-h-c"></span><div class="line-v"><span></span></div><div class="strt-name-div" id="com_content_table_'+i+'_'+k+'_'+m+'"></div></div>';
 
                                            // }
                }
                                        
            }   
            html+='</div>';
	    }
        	    
	},
	_drawPanel:function(divIndex2,divIndex3,divIndex4,divIndex5,obj){
	    var standardListItem = new sap.m.StandardListItem({title:obj.name});
	    if(divIndex2==999&&divIndex3==999&&divIndex4==999&&divIndex5==999){
	        standardListItem.placeAt("nameHead","only");
	    }
	    if(divIndex2!=999&&divIndex3==999&&divIndex4==999&&divIndex5==999){
            standardListItem.placeAt("com_content_table_"+divIndex2,"only");
	    }
	    if(divIndex2!=999&&divIndex4==999&&divIndex5==999&&divIndex3!=999){
            standardListItem.placeAt("com_content_table_"+divIndex2+"_"+divIndex3,"only");
	    }
	    if(divIndex2!=999&&divIndex4!=999&&divIndex5==999&&divIndex3!=999){
	        standardListItem.placeAt("com_content_table_"+divIndex2+"_"+divIndex3+"_"+divIndex4,"only");
	    }
        if(divIndex2!=999&&divIndex4!=999&&divIndex5!=999&&divIndex3!=999){
	        standardListItem.placeAt("com_content_table_"+divIndex2+"_"+divIndex3+"_"+divIndex4+"_"+divIndex5,"only");
	    }    
	}    
	
});