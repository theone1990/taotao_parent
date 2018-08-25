 //控制层 
app.controller('goodsController' ,function($scope,$controller,$location, goodsService,uploadService,itemCatService1,typeTemplateService1){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){
		var id=$location.search()['id'];//获取参数值
		if(id==null){
			return;
		}
		goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;
				//向富文本编辑器添加商品介绍
				editor.html($scope.entity.goodsDesc.introduction);
				//显示图片列表
				$scope.entity.goodsDesc.itemImages=JSON.parse($scope.entity.goodsDesc.itemImages);
				//显示扩展属性
				$scope.entity.goodsDesc.customAttributeItems=JSON.parse($scope.entity.goodsDesc.customAttributeItems);
				//规格
				$scope.entity.goodsDesc.specificationItems=JSON.parse($scope.entity.goodsDesc.specificationItems);
				//sku列表
				for(var i=0;i<$scope.entity.itemList.length;i++){
					$scope.entity.itemList[i].spec=JSON.parse($scope.entity.itemList[i].spec);
				}
			}
		);				
	}

	//根据规格名称和选项名称返回是否被勾选
	$scope.checkAttributeValue=function (specName,optionName) {
		var items=$scope.entity.goodsDesc.specificationItems;
		var object=$scope.searchObjectByKey(items,'attributeName',specName);
		if(object==null){
			return false;
		}else{
			if(object.attributeValue.indexOf(optionName)>=0){
				return true;
			}else{
				return false;
			}
		}
    }

	//保存 
	$scope.save1=function(){
		$scope.entity.goodsDesc.introduction=editor.html();
		var serviceObject;//服务层对象  				
		if($scope.entity.goods.id!=null){//如果有ID
			serviceObject=goodsService.update( $scope.entity ); //修改  
		}else{
			serviceObject=goodsService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
                    alert(response.message);
                    $scope.entity={};
                    editor.html('');//清空富文本编辑器
					location.href="goods.html";//保存成功跳转到商品列表
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}

	//保存
	$scope.add1=function () {
		$scope.entity.goodsDesc.introduction=editor.html();
		goodsService.add($scope.entity).success(
			function (response) {
				alert(response.message);
				$scope.entity={};
				editor.html('');//清空富文本编辑器
            }
		)
    }

    //上传图片
	$scope.uploadFile=function () {
		uploadService.uploadFile().success(
			function (response) {
				if(response.success){
					//上传成功, 取出url,设置文件地址
					$scope.image_entity.url=response.message;
				}else{
					alert(response.message);
				}
            }
		)
    }

    //添加图片列表
	$scope.entity={goods:{},goodsDesc:{itemImages:[],specificationItems:[]}};
	$scope.add_image_entity=function () {
		$scope.entity.goodsDesc.itemImages.push($scope.image_entity);
    }

    //移除图片
	$scope.remove_image_entity=function (index) {
        $scope.entity.goodsDesc.itemImages.splice(index,1);
    }

    //读取一级分类列表
	$scope.selectItemCat1List=function () {
		itemCatService1.findByParentId(0).success(
			function (response) {
				$scope.itemCat1List=response;
            }
		)
    }

    //读取二级分类
	$scope.$watch('entity.goods.category1Id',function (newValue,oldValue){
		itemCatService1.findByParentId(newValue).success(
			function (response) {
                $scope.itemCat2List=response;
            }
		)
	} )

	//读取三级分类
	$scope.$watch('entity.goods.category2Id',function (newValue,oldValue) {
		itemCatService1.findByParentId(newValue).success(
			function (response) {
				$scope.itemCat3List=response;
            }
		)
	})

	//读取模板id
    $scope.$watch('entity.goods.category3Id',function (newValue,oldValue) {
        itemCatService1.findOne(newValue).success(
            function (response) {
                $scope.entity.goods.typeTemplateId=response.typeId;
            }
        )
    })

	//根据模板id, 更新品牌列表
    $scope.$watch('entity.goods.typeTemplateId',function (newValue,oldValue) {
        typeTemplateService1.findOne(newValue).success(
            function (response) {
                $scope.typeTemplate=response;//获取类型模板
				$scope.typeTemplate.brandIds=angular.fromJson($scope.typeTemplate.brandIds);//品牌列表
				//扩展属性
				if($location.search()['id']==null){
					$scope.entity.goodsDesc.customAttributeItems=angular.fromJson($scope.typeTemplate.customAttributeItems);
				}
            }
        )

		//查询规格列表
		typeTemplateService1.findSpecList(newValue).success(
			function (response) {
				$scope.specList=response;
            }
		)
    })

	//保存选中的规格选项
	$scope.updateSpecAttribute=function ($event, name, value) {
		var object = $scope.searchObjectByKey($scope.entity.goodsDesc.specificationItems,'attributeName',name);
		if(object!=null){
			//有这个规格名称, 则添加选中的规格选项
			if($event.target.checked){
				object.attributeValue.push(value);
			}else{
				object.attributeValue.splice(object.attributeValue.indexOf(value),1);
			}
			//如果选项都取消了, 则移除此记录
			if(object.attributeValue.length==0){
				$scope.entity.goodsDesc.specificationItems.splice($scope.entity.goodsDesc.specificationItems.indexOf(object),1);
			}
		}else{
            $scope.entity.goodsDesc.specificationItems.push({"attributeName":name,"attributeValue":[value]});
		}
    }

    //创建sku列表
	$scope.createItemList=function () {
		$scope.entity.itemList=[{spec:{},price:0,num:99999,status:'0',isDefault:'0'}]; //初始化选项表格
		var items=$scope.entity.goodsDesc.specificationItems; //遍历规格和选项,深克隆生成表格
		for(var i=0; i<items.length; i++){
			$scope.entity.itemList=addColumn($scope.entity.itemList,items[i].attributeName,items[i].attributeValue);
		}
    }

    //添加列值
	addColumn=function (list, columnName, columnValues) {
		var newList=[];
		for(var i=0;i<list.length;i++){
			var oldRow=list[i];
			for(var j=0;j<columnValues.length;j++){
				var newRow=JSON.parse(JSON.stringify(oldRow));//深克隆
				newRow.spec[columnName]=columnValues[j];
				newList.push(newRow);
			}
		}
		return newList;
    }

    $scope.status=['未审核','已审核','审核未通过','关闭'];

	//加载商品分类列表
	$scope.itemCatList=[];
	$scope.findItemCatList=function () {
		itemCatService1.findAll().success(
			function (response) {
				for(var i=0;i<response.length;i++){
					$scope.itemCatList[response[i].id]=response[i].name;
				}
            }
		)
    }
});	
