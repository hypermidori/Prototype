//=============================================================================
// FrameTaskExecuter.js
//=============================================================================

/*:
 * @plugindesc FrameTaskExecuter
 * @author midori
 *
 * @help This plugin does not provide plugin commands.
 */

function FrameTaskExecuter() {
	throw new Error('This is a static class');
}

FrameTaskExecuter.taskLists = [];

FrameTaskExecuter.update = function() {
	var completeTasks = [];
	FrameTaskExecuter.taskLists.forEach(function(task) {
		if (!task.update()) {
			completeTasks.push(task);
		}
	}.bind(this));

	//delete complete task
	completeTasks.forEach(function(task) {
		var idx = FrameTaskExecuter.taskLists.indexOf(task);
		FrameTaskExecuter.taskLists.splice(idx, 1);
	}.bind(this));
};

FrameTaskExecuter.execTask = function(taskList) {
	FrameTaskExecuter.taskLists.push(taskList);
};

// all tasks interrupt
FrameTaskExecuter.interrupt = function(){
	FrameTaskExecuter.taskLists.forEach(function(task) {
		task.interrupt();
	});
};

//------------------------------------------------------------------
function FrameTaskList() {
	this.tasks = [];
	this.completeListenerList = [];
	this.interruptListenerList = [];

	return this;
}

FrameTaskList.prototype.update = function() {
	if (this.tasks.length <= 0) {
		this.completeListenerList.forEach(function(listener) {
			listener();
		});
		return false; // tasks complete
	}

	task = this.tasks.shift();
	task();

	return true;
};

FrameTaskList.prototype.addTask = function(taskFunc) {
	this.tasks.push(taskFunc);

	return this;
};

FrameTaskList.prototype.addWait = function(waitFrame) {
	for (var i = 0; i < waitFrame; i++) {
		this.addTask(function() {}); // add empty frame
	}

	return this;
};

FrameTaskList.prototype.addCompleteListener = function(listener) {
	this.completeListenerList(listener);
};

FrameTaskList.prototype.interrupt = function() {
	this.tasks = [];

	this.interruptListenerList.forEach(function(listener) {
		listener();
	});
};

FrameTaskList.prototype.addInterruptListener = function(listener) {
	this.interruptListenerList.push(listener);
};

/*
;
(function () {
    var SceneManager_update_prototype = SceneManager.update;
    SceneManager.update = function () {
        FrameTaskExecuter.update();

        SceneManager_update_prototype.call(this);
    };
})();

*/
