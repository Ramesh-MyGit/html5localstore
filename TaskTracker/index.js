var TaskTracker = {
    requiredFIeldMessage: "Some required information is missing or incorrect. Please correct the fields below and try again.",
    tastCreatedSuccessfully: "Task has been created successfully.",
    tasks: null,

    initialize: function () {
        this.tasks = this.getTasks();
        this.createTasksGridView();        
        $('#btnSubmit').click(this.createTask);
        $("#txtTaskDate").datepicker();
    },

    getTasks: function () {
        if (localStorage.tasks === undefined) {
            localStorage.tasks = JSON.stringify([
	            { "name": "Test Task #1", "date": "12/01/2012", "assigned": "John Doe" },
	            { "name": "Test Task #2", "date": "12/02/2012", "assigned": "John Doe" },
	            { "name": "Test Task #3", "date": "12/03/2012", "assigned": "John Doe" },
	            { "name": "Test Task #4", "date": "12/04/2012", "assigned": "John Doe" },
	            { "name": "Test Task #5", "date": "12/05/2012", "assigned": "John Doe" },
	            { "name": "Test Task #6", "date": "12/06/2012", "assigned": "John Doe" },
	            { "name": "Test Task #7", "date": "12/07/2012", "assigned": "John Doe" }
            ]);
        }

        return JSON.parse(localStorage.tasks);
    },

    createTasksGridView: function () {
        var tasks = Array.prototype.slice.call(this.tasks);
        tasks.reverse();
        $('#gvExistingTasks').empty();

        tasks.forEach(function (task, index) {
            $('#gvExistingTasks').append(TaskTracker.createTaskRowLayout(index, task));
        });
    },

    createTaskRowLayout: function (index, task) {
        var rowType = 'rowOdd';

        if (index % 2 == 0) {
            rowType = 'rowEven';
        }

        var taskRow =
            "<tr class='" + rowType + "'>" +
                "<td>" + task.name + "</td>" +
                "<td>" + task.date + "</td>" +
                "<td>" + task.assigned + "</td>" +
            "</tr>";

        return taskRow;
    },

    addTask: function (task) {        
        this.tasks.push(task);        
        localStorage.tasks = JSON.stringify(this.tasks);
        TaskTracker.createTasksGridView();
    },

    createTask: function () {
        if (TaskTracker.validateTask()){
            TaskTracker.addTask({
                "name": $('#txtTaskName').val(),
                "date": $('#txtTaskDate').val(),
                "assigned": $('#txtAssignedTo').val()
            });

            TaskTracker.clearFields();
            TaskTracker.showStatus(TaskTracker.tastCreatedSuccessfully, true);
        }
    },

    clearFields: function(){
        $('#txtTaskName').val('');
        $('#txtTaskDate').val('');
        $('#txtAssignedTo').val('');
    },

    showStatus: function (message, isSuccess) {
        $('#valSummaryCreateTasks').empty();
        $('#valSummaryCreateTasks').removeClass('actionFailure');
        $('#valSummaryCreateTasks').removeClass('actionSuccess');

        if (isSuccess === true) {
            $('#valSummaryCreateTasks').addClass('actionSuccess');
        }
        else {
            $('#valSummaryCreateTasks').addClass('actionFailure');
        }
        $('#valSummaryCreateTasks').append(message);
    },

    validateTask: function () {
        $('#valSummaryCreateTasks').empty();
        var taskDate = $('#txtTaskDate').val();

        if ($('#txtTaskName').val() === "" ||
            taskDate === "" ||  isNaN(Date.parse(taskDate)) === true || 
            $('#txtAssignedTo').val() === "")
        {
            TaskTracker.showStatus(TaskTracker.requiredFIeldMessage, false);
            return false;
        }
        return true;
    }
}

window.onload = function () {
    TaskTracker.initialize();
}