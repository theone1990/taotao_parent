//模板控制层
app.controller('typeTemplateController',function ($scope,$controller,typeTemplateService,brandService,specificationService) {
    $controller('baseController',{$scope:$scope});//继承,共享scope

    $scope.findAll=function () {
        typeTemplateService.findAll().success(
            function(response){
                $scope.list=response;
            }
        )
    }

    //分页
    $scope.findPage=function (page,rows){
        typeTemplateService.findPage(page,rows).success(
            function(response){
                $scope.list=response.rows;
                $scope.paginationConf.totalItems=response.total;//更新总记录
            }
        )
    }

    //添加/更新
    $scope.save=function () {
        var serviceObject;
        if($scope.entity.id != null){
            serviceObject=typeTemplateService.update($scope.entity);
        }else{
            serviceObject=typeTemplateService.add($scope.entity);
        }
        serviceObject.success(
            function (response) {
                if(response.success){
                    //重新加载
                    $scope.reloadList();
                }else{
                    alert(response.message);
                }
            }
        )
    }

    //回显
    $scope.findOne=function (id) {
        typeTemplateService.findOne(id).success(
            function (response) {
                $scope.entity=response;
                $scope.entity.brandIds=JSON.parse($scope.entity.brandIds);
                $scope.entity.specIds=JSON.parse($scope.entity.specIds);
                $scope.entity.customAttributeItems=JSON.parse($scope.entity.customAttributeItems);
            }
        )
    }

    //批量删除
    $scope.dele=function () {
        typeTemplateService.dele($scope.selectIds).success(
            function (response) {
                if(response.success){
                    $scope.reloadList();
                }else{
                    alert(response.message);
                }
            }
        )
    }

    //查询
    $scope.searchEntity={};
    $scope.search=function (page, rows) {
        typeTemplateService.search(page,rows,$scope.searchEntity).success(
            function (response) {
                $scope.list=response.rows;
                $scope.paginationConf.totalItems=response.total;
            }
        )
    }

    //新增行
    $scope.entity={customAttributeItems:[]};
    $scope.addTableRow=function () {
        $scope.entity.customAttributeItems.push({});
    }

    //删除行
    $scope.deleteTableRow=function (index) {
        $scope.entity.customAttributeItems.splice(index,1);
    }

    //查询品牌列表
    $scope.brandList={data:[]};
    $scope.findBrandList=function () {
        brandService.selectBrandList().success(
            function (response) {
                $scope.brandList.data=response;
            }
        )
    }

    //查询规格列表
    $scope.specList={data:[]};
    $scope.findSpecList=function () {
        specificationService.selectSpecList().success(
            function (response) {
                $scope.specList.data=response;
            }
        )
    }
})