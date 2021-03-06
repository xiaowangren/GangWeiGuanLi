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
 
	   // // create a simple Input field
	    var oInput0 = new sap.ui.commons.TextField('input0',{width:"80px",enabled:false});
        oInput0.placeAt("textFieldForm0");
        var oInput1 = new sap.ui.commons.TextField('input1',{enabled:false});
        oInput1.placeAt("textFieldForm");
        //创建button
        
        var oButton1 = new sap.ui.commons.Button({
        	text : "选择组织单元",
        	press : function() {
        	    var oInput0 = sap.ui.getCore().byId("input0");
        	    var oInput1 = sap.ui.getCore().byId("input1");
        	    var oDialog1 = new sap.ui.commons.Dialog();
        	    oDialog1.setWidth("500px");
            	oDialog1.setTitle("选择组织单元");
            	var Column0 = new sap.ui.table.Column({ label : "ID", 
            	    template :new sap.ui.commons.TextView().bindProperty("text", "Id")
            	});
            	var Column = new sap.ui.table.Column({ label : "Name", 
            	    template :new sap.ui.commons.TextView().bindProperty("text", "Name")
            	});
            // 	var Column1 = new sap.ui.table.Column({ label : "Flag9100", 
            // 	    template :new sap.ui.commons.TextView().bindProperty("text", "Flag9100")
            // 	});
            	var oTreeTable = new sap.ui.table.TreeTable({  
                     columns : [ Column,Column0 ],  
                     selectionMode : sap.ui.table.SelectionMode.Single,  
                     enableColumnReordering : true, 
                     selectionBehavior:sap.ui.table.SelectionBehavior.RowOnly,
                     rowSelectionChange:function(oEvent){
                        var sPath = oEvent.getParameters().rowContext.sPath;
                        var data  = oModel.getProperty(sPath);
                        if(data.Flag9100 =="X"){
                            oInput0.setValue(data.Id);
                            oInput1.setValue(data.Name);
                            oDialog1.close(); 
                         }else{
                            sap.m.MessageToast.show("请选到单位层级"); 
                         }
                     }
                }); 
                oTreeTable.setColumnHeaderVisible(false);
                var sServiceUrl = "/sap/opu/odata/SAP/ZHRMAP_SRV/";//  /sap/opu/odata/sap/ZBILLYTREETABLE01_SRV/
                ///sap/opu/odata/SAP/ZHRMAP_SRV/
                var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, { useBatch : true });
                oTreeTable.setModel(oModel);  
                 oTreeTable.bindRows({  
                 path : "/OM_ORG_TREE_SET",  
                 parameters : {  
                 countMode: "Inline",  
                 numberOfExpandedLevels : 0  
                 }  
                 });
                
            	oDialog1.addContent(oTreeTable);
            	oDialog1.open();
            	
        	    
        	}
        });
        oButton1.placeAt("zuZhiDanYanBianMaForm");
	},
	_drawButton:function(){
	     var oButton1 = new sap.ui.commons.Button({
        	text : "查询",
        	tooltip : "查询",
        	width:"100px",
        	press : function() {
        	    var dateId = sap.ui.getCore().byId("dateQuery");
        	    var dateValue = dateId.getValue();
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
                        if(results.length!=0){
                            var htmls = '<div class="" style="display:inline-block;width: 450px;margin-top: 7px;padding: 5px;"><span id="nameHead"></span></div><div class="line-v" ><span></span></div><div class="strt-block" id="strt_block_table" ><div style="clear:both;"></div></div>';
                            $('#htmlstrtpart').html(htmls);
                            var depArray1 = eval('(' + results[0].Retstr + ')');
                            sap.ui.controller("sap.ui.company.view.master")._drawPanel(999,999,999,999,depArray1);
                            var num =25;
                            var depArray = depArray1.list;
                            var nums=0;
                            var len=1;
                            if(depArray!=null){
                                len =depArray.length;
                                for(var i=0;i<depArray.length;i++){
                                    if(depArray[i].list!=null){
                                        nums+=depArray[i].list.length;
                                    }else{
                                        nums = depArray.length;
                                    }
                                }
                            }
                            if(nums!=0){
                               len=len+nums+2; 
                            }
                            num = num*len;
                            var sty = num+"%";
                            document.getElementById('strt_block_table').style.width=sty;
                            $("#strt_block_table").empty(); 
                            if(depArray!=undefined){
                                sap.ui.controller("sap.ui.company.view.master")._drawDiv(depArray,'#strt_block_table');
                            }else{
                                $('#htmlstrtpart').empty(); 
                                $("#strt_block_table").empty();
                                sap.m.MessageToast.show("无数据显示");
                            }
                        }else{
                            $('#htmlstrtpart').empty(); 
                            $("#strt_block_table").empty();
                            sap.m.MessageToast.show("数据返回异常");
                        }
                }, this);
                mParameters['error'] = jQuery.proxy(function(data) {
                    sap.m.MessageToast.show("网络连接失败，请重试");
                }, this);
                dateId.setValue(dateValue);
                if(dateValue==""){
                    sap.m.MessageToast.show("查询日期必填");
                    return;
                }
                if(bianHao==""){
                    sap.m.MessageToast.show("组织单元必填");
                    return;
                }
                oModel.read("/OM_POST_MAP_SET/?$filter=Objid eq '"+bianHao+"' and Begda eq '"+dateNew+"'",mParameters);
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
        var len = obj.tables.length;
        if(len>10){
            len=10;
        }
        oTable = new sap.ui.table.Table({
            //   id:"test"+divIndex,
        	title: obj.name,
        	visibleRowCount: len
        });

        //Define the columns and the control templates to be used
        var oColumn = new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "岗位名称"}),
        	template: new sap.ui.commons.TextView().bindProperty("text", "gangwei"),
        	width: "15px"
        });

        oTable.addColumn(oColumn);
        oTable.addColumn(new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "职数"}),
        	template: new sap.ui.commons.TextField().bindProperty("value", "geshu"),
        	width: "12px"
        }));
        oTable.addColumn(new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "岗级"}),
        	template: new sap.ui.commons.TextField().bindProperty("value", "gangji"),
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
                $('#strt_block_table').html(html);
                for(var j=0;j<depArray.length;j++){
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
	} ,
	openDialog :function(){
	    
	}
	
});