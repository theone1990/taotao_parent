//品牌控制层
app.controller('brandController',function ($scope,$controller,brandService) {
    $controller('baseController',{$scope:$scope});//继承,共享scope

    $scope.findAll=function () {
        brandService.findAll().success(
            function(response){
                $scope.list=response;
            }
        )
    }

    //分页
    $scope.findPage=function (pageNum,pageSize){
        brandService.findPage(pageNum,pageSize).success(
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
            serviceObject=brandService.update($scope.entity);
        }else{
            serviceObject=brandService.add($scope.entity);
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
        brandService.findOne(id).success(
            function (response) {
                $scope.entity=response;
            }
        )
    }

    //批量删除
    $scope.dele=function () {
        brandService.dele($scope.selectIds).success(
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
    $scope.search=function (pageNum, pageSize) {
        brandService.search(pageNum,pageSize,$scope.searchEntity).success(
            function (response) {
                $scope.list=response.rows;
                $scope.paginationConf.totalItems=response.total;
            }
        )
    }
})