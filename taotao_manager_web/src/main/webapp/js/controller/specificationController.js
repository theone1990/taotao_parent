//规格控制层
app.controller('specificationController',function ($scope,$controller,specificationService) {
    $controller('baseController',{$scope:$scope});//继承,共享scope

    $scope.findAll=function () {
        specificationService.findAll().success(
            function(response){
                $scope.list=response;
            }
        )
    }

    //分页
    $scope.findPage=function (page,rows){
        specificationService.findPage(page,rows).success(
            function(response){
                $scope.list=response.rows;
                $scope.paginationConf.totalItems=response.total;//更新总记录
            }
        )
    }

    //添加/更新
    $scope.save=function () {
        var serviceObject;
        if($scope.entity.specification.id != null){
            serviceObject=specificationService.update($scope.entity);
        }else{
            serviceObject=specificationService.add($scope.entity);
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
        specificationService.findOne(id).success(
            function (response) {
                $scope.entity=response;
            }
        )
    }

    //批量删除
    $scope.dele=function () {
        specificationService.dele($scope.selectIds).success(
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
        specificationService.search(page,rows,$scope.searchEntity).success(
            function (response) {
                $scope.list=response.rows;
                $scope.paginationConf.totalItems=response.total;
            }
        )
    }

    //新增选项行
    $scope.entity={specificationOptionList:[],specification:{}};
    $scope.addTableRow=function () {
        $scope.entity.specificationOptionList.push({});
    }

    //删除选项行
    $scope.deleteTableRow=function (index) {
        $scope.entity.specificationOptionList.splice(index,1);
    }
})