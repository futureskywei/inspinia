'use strict';

angular.module('inspinia')
    .controller('ArchController',archController);

// archController.$inject = ['DTOptionsBuilder'];

function archController($scope, $http, DTOptionsBuilder, toaster, SweetAlert) {

    $scope.newPost = {};
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'}
        ]).withLanguage({
            "sProcessing": "<img src='../../../img/loading.gif'>  努力加载数据中.",
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
            "sInfoEmpty": "没有数据",
            "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
            "sZeroRecords": "没有检索到数据",
            "sSearch": "搜索:  ",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            }
        }).withOption('autoWidth', false);

    loadClients = function () {
        $http.get('/api/v1/clients')
            .success(function (data) {
                if (data.res != 1) {
                    toaster.pop({
                        type: 'error',
                        body: data.resMsg,
                        showCloseButton: true,
                        timeout: 3000
                    });
                }
                $scope.clients = data.obj.list.results;
            });
    };
    loadClients();

    $scope.add = function () {
        $scope.submitType = "add";
        $scope.newPost = {};
        $scope.title = "添加App";
        $('#modal-form').modal('show');
        $http.get('/api/v1/clients/default').success(function (data) {
            if (data.res != 1) {
                toaster.pop({
                    type: "error",
                    body: data.resMsg,
                    showCloseButton: true,
                    timeout: 3000
                });
            } else {
                $scope.newPost.id = data.obj.id;
                $scope.newPost.appKey = data.obj.appKey;
                $scope.newPost.appSecret = data.obj.appSecret;
                $scope.newPost.scope = data.obj.scope;
            }
        });
    };
    $scope.edit = function (id) {
        $scope.submitType = "edit";
        $scope.newPost = {};
        $scope.title = "编辑App";
        $('#modal-form').modal('show');
        $http.get('/api/v1/clients/' + id).success(function (data) {
            if (data.res != 1) {
                toaster.pop({
                    type: "error",
                    body: data.resMsg,
                    showCloseButton: true,
                    timeout: 3000
                });
            } else {
                $scope.newPost.id = data.obj.id;
                $scope.newPost.appKey = data.obj.appKey;
                $scope.newPost.appSecret = data.obj.appSecret;
                $scope.newPost.appName = data.obj.appName;
                $scope.newPost.redirectUri = data.obj.redirectUri;
                $scope.newPost.scope = data.obj.scope;
            }
        });
    };
    $scope.del = function (id) {
        SweetAlert.swal({
                title: "确定删除?",
                text: "删除将不可恢复!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "是",
                cancelButtonText: "否",
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    $http.delete('/api/v1/clients/' + id).success(function (data) {
                        var type = "info";
                        if (data.res != 1) {
                            type = "error";
                        }
                        toaster.pop({
                            type: type,
                            body: data.resMsg,
                            showCloseButton: true,
                            timeout: 3000
                        });
                        loadClients();
                    })
                }
            }
        );

    };
    $scope.cancel = function () {
        $('#modal-form').modal('hide');
    };
    $scope.ok = function () {
        if ($scope.postForm.$valid) {
            var sucFunc = function (data) {
                var type = "info";
                if (data.res != 1) {
                    type = "error";
                }
                toaster.pop({
                    type: type,
                    body: data.resMsg,
                    showCloseButton: true,
                    timeout: 3000
                });
                loadClients();
            };
            var submitFunc = function (url, scope, header) {
                $http.post(url, scope, header).success(sucFunc);
            }
            if ($scope.submitType == "edit") {
                submitFunc = function (url, scope, header) {
                    submitFunc = $http.put(url, scope, header).success(sucFunc);
                }
            }
            $('#modal-form').modal('hide');
            submitFunc('/api/v1/clients', $scope.newPost, {headers: {'Content-Type': 'application/json'}});
        } else {
            $scope.postForm.submitted = true;
        }
    };
}