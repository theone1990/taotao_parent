//模板服务层
app.service('typeTemplateService',function ($http) {
    this.findAll=function () {
        return $http.get('/typeTemplate/findAll.do');
    }
    this.findPage=function (page,rows) {
        return $http.get('/typeTemplate/findPage.do?page='+page+'&rows='+rows);
    }
    this.add=function (entity) {
        return $http.post('/typeTemplate/add.do',entity);
    }
    this.update=function (entity) {
        return $http.post('/typeTemplate/update.do',entity);
    }
    this.findOne=function (id) {
        return $http.get('/typeTemplate/findOne.do?id='+id);
    }
    this.dele=function (selectIds) {
        return $http.get('/typeTemplate/delete.do?ids='+selectIds);
    }
    this.search=function (page,rows,searchEntity) {
        return $http.post('/typeTemplate/search.do?page='+page+'&rows='+rows,searchEntity);
    }
})