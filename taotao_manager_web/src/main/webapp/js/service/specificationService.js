//规格服务层
app.service('specificationService',function ($http) {
    this.findAll=function () {
        return $http.get('/specification/findAll.do');
    }
    this.findPage=function (page,rows) {
        return $http.get('/specification/findPage.do?page='+page+'&rows='+rows);
    }
    this.add=function (entity) {
        return $http.post('/specification/add.do',entity);
    }
    this.update=function (entity) {
        return $http.post('/specification/update.do',entity);
    }
    this.findOne=function (id) {
        return $http.get('/specification/findOne.do?id='+id);
    }
    this.dele=function (selectIds) {
        return $http.get('/specification/delete.do?ids='+selectIds);
    }
    this.search=function (page,rows,searchEntity) {
        return $http.post('/specification/search.do?page='+page+'&rows='+rows,searchEntity);
    }
    this.selectSpecList=function () {
        return $http.get('/specification/selectSpecList.do');
    }
})