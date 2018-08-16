//基本控制层, 各个控制层通用的功能, 分页,重载,复选 被其他控制层继承
app.controller('baseController',function ($scope) {

    $scope.reloadList=function () {
        //切换页码
        $scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
    }

    //分页控件配置
    $scope.paginationConf={
        currentPage:1,
        totalItems: 10,
        itemsPerPage: 10,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange:function () {
            $scope.reloadList();
        }
    }

    //更新复选框
    $scope.selectIds=[];
    $scope.updateSelection=function ($event, id) {
        if($event.target.checked){
            $scope.selectIds.push(id);
        }else{
            var idx=$scope.selectIds.indexOf(id);
            $scope.selectIds.splice(idx,1);
        }
    }

    //提取json字符串中的某个属性, 返回拼接字符串, 逗号分隔
    $scope.jsonToString=function (jsonString, text) {
        var value="";
        var json=JSON.parse(jsonString);//json字符串转为json对象
        for(var i=0;i<json.length;i++){
            if(i>0){
                value+=",";
            }
            value+=json[i][text];
        }
        return value;
    }
})