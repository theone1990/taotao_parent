//品牌控制层
app.controller('sellerController',function ($scope,$controller,sellerService) {
    $controller('baseController',{$scope:$scope});//继承,共享scope

    $scope.findAll=function () {
        sellerService.findAll().success(
            function(response){
                $scope.list=response;
            }
        )
    }

    //分页
    $scope.findPage=function (pageNum,pageSize){
        sellerService.findPage(pageNum,pageSize).success(
            function(response){
                $scope.list=response.rows;
                $scope.paginationConf.totalItems=response.total;//更新总记录
            }
        )
    }

    //添加
    $scope.add=function () {
        sellerService.add($scope.entity).success(
            function (response) {
                if(response.success){
                    location.href='shoplogin.html';
                }else{
                    alert(response.message);
                }
            }
        )
    }

    //回显
    $scope.findOne=function (id) {
        sellerService.findOne(id).success(
            function (response) {
                $scope.entity=response;
            }
        )
    }

    //批量删除
    $scope.dele=function () {
        sellerService.dele($scope.selectIds).success(
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
        sellerService.search(pageNum,pageSize,$scope.searchEntity).success(
            function (response) {
                $scope.list=response.rows;
                $scope.paginationConf.totalItems=response.total;
            }
        )
    }
})