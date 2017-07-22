angular.module('myApp', [])
    .controller('demoCtrl', ['$scope', function($scope) {
        
        // 如果localStorage没有数据,默认为空数组
        $scope.taskList = JSON.parse(localStorage.getItem("taskList")) || [];

        $scope.addTask = function() {
            if ($scope.task) {
                $scope.taskList.push({
                    id: new Date().getTime(),
                    time: new Date().toLocaleString(),
                    name: $scope.task,
                    isCompleted: false,
                    isEdit: false
                });
                localStorage.setItem("taskList", JSON.stringify($scope.taskList));
                $scope.task = '';
            } else {
                alert("请输入任务名称");
            }
        }


        // 删除单个任务
        // 1.给删除按钮添加点击事件
        // 2.在点击事件的处理函数中传入当前数据ID
        // 3.通过数据ID找到当前数据并删除
        $scope.deleteTask = function(id) {
            for (var i = 0; i < $scope.taskList.length; i++) {
                if ($scope.taskList[i].id === id) {
                    $scope.taskList.splice(i, 1);
                    localStorage.setItem("taskList", JSON.stringify($scope.taskList));
                }
            }
        }

        // 记录有多少任务没有完成
        // 1.循环数据找出isCompleted值为false的选项
        // 2.将计数器加一

        $scope.calcNumber = function() {
            var count = 0;
            for (var i = 0; i < $scope.taskList.length; i++) {
                if (!$scope.taskList[i].isCompleted) {
                    count++;
                }
            }
            return count;
        }

        //实现任务过滤的功能
        //1.给筛选功能添加点击事件
        //2.点击相应的按钮做对应的事件  All   Active  Completed

        $scope.condition = '';
        $scope.filterData = function(type) {
            switch (type) {
                case 'All':
                    $scope.condition = '';
                    break;
                case 'Active':
                    $scope.condition = false;
                    break;
                case 'Completed':
                    $scope.condition = true;
                    break;
            }
        }

        // 清除已完成任务的功能
        $scope.clearCompleted = function() {
            for (var i = 0; i < $scope.taskList.length; i++) {
                if ($scope.taskList[i].isCompleted) {
                    $scope.taskList.splice(i, 1);
                    i--;
                    localStorage.setItem("taskList", JSON.stringify($scope.taskList));
                }
            }
        }

        // 批量更改任务状态
        // 1.给全选按钮绑定数据
        // 2.根据按钮绑定的数据来决定任务列表的状态

        $scope.changeStatus = function() {
            for (var i = 0; i < $scope.taskList.length; i++) {
                $scope.taskList[i].isCompleted = $scope.status;
            }
        }

        $scope.alterStatus = function() {
            $scope.status = true;
            for (var i = 0; i < $scope.taskList.length; i++) {
                if (!$scope.taskList[i].isCompleted) {
                    $scope.status = false;
                }
            }
        }


        // 更改任务名称
        // 1.给label添加双击事件
        // 2.在事件处理函数中将ID传入
        // 3.根据ID找到当前点击的数据
        // 4.给当前数据添加editing类名
        $scope.modifyName = function(id) {
            for (var i = 0; i < $scope.taskList.length; i++) {
                if ($scope.taskList[i].id == id) {
                    $scope.taskList[i].isEdit = true;
                } else {
                    $scope.taskList[i].isEdit = false;
                }
            }
        }

        $scope.leaveIpt = function() {
            for (var i = 0; i < $scope.taskList.length; i++) {
                $scope.taskList[i].isEdit = false;
            }
        }

    }])