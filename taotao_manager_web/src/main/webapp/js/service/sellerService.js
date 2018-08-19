//服务层
app.service('sellerService',function ($http) {
    this.findAll=function () {
        return $http.get('/seller/findAll.do');
    }
    this.findPage=function (pageNum,pageSize) {
        return $http.get('/seller/findPage.do?pageNum='+pageNum+'&pageSize='+pageSize);
    }
    this.add=function (entity) {
        return $http.post('/seller/add.do',entity);
    }
    this.update=function (entity) {
        return $http.post('/seller/update.do',entity);
    }
    this.findOne=function (id) {
        return $http.get('/seller/findOne.do?id='+id);
    }
    this.dele=function (selectIds) {
        return $http.get('/seller/delete.do?ids='+selectIds);
    }
    this.search=function (pageNum,pageSize,searchEntity) {
        return $http.post('/seller/search.do?pageNum='+pageNum+'&pageSize='+pageSize,searchEntity);
    }
    this.selectBrandList=function () {
        return $http.get('/seller/selectBrandList.do');
    }
    this.updateStatus=function (sellerId, status) {
        return $http.get('/seller/updateStatus.do?sellerId='+sellerId+'&status='+status);
    }
})