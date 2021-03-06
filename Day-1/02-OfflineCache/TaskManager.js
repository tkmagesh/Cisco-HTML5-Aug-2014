	/*
	Local Storage => window.localStorage
	
	key & value => string

	void setItem(key,value)
	value getItem(key)
	void removeIte(key)
	clear()
	key key(index)
	length 

	*/
	var storage = window.localStorage;
	window.addEventListener("DOMContentLoaded", init);
	function init(){
		document.getElementById("btnAdd").addEventListener("click", onBtnAddClick);
		document.getElementById("btnRemoveCompleted").addEventListener("click", onBtnRemoveCompletedClick);
		window.addEventListener("storage", onStorageChange);
		loadTasksFromStorage();
	}
	function onStorageChange(evtArg){
		var action = "";
		if (evtArg.oldValue && evtArg.newValue){
			ation = "updated";
		} else if (!evtArg.oldValue && evtArg.newValue){
			action = "added";
		} else {
			action = "removed";
		}

		var key = evtArg.key;
		if (action === "added"){
			addTaskToList(key, evtArg.newValue)
		}
		if (action === "removed"){
			removeItemFromList(key);
		}
		if (action === "updated"){
			var taskItem = document.querySelector("li[task-id='" + key + "']");
			taskItem.innerHTML = evtArg.newValue;
		}

	}
	function loadTasksFromStorage(){
		for(var i=0;i<storage.length;i++){
			var taskId = storage.key(i);
			var taskName = storage.getItem(taskId);
			addTaskToList(taskId,taskName);
		}
	}
	function onBtnAddClick(){
		var task = document.getElementById("txtTask").value;
		// persist in storage
		var newTaskId = new Date().getTime().toString();
		storage.setItem(newTaskId, task);
		addTaskToList(newTaskId,task);
	}
	function addTaskToList(taskId, taskName){
		var newTaskItem = document.createElement("li");
		newTaskItem.setAttribute("task-id", taskId);
		newTaskItem.innerHTML = taskName;
		newTaskItem.addEventListener("click", onTaskItemClick);
		document.getElementById("olTaskList").appendChild(newTaskItem);
	}
	function onTaskItemClick(){
		this.classList.toggle("completed");
	}
	function onBtnRemoveCompletedClick(){
		var taskList = document.getElementById("olTaskList");
		var taskItems = taskList.children;
		for(var i=taskItems.length-1;i>=0;i--){
			if (taskItems[i].classList.contains("completed")){
				storage.removeItem(taskItems[i].getAttribute("task-id"));
				taskList.removeChild(taskItems[i]);
			}
		}
	}

	function removeItemFromList(taskId){
		var taskItem = document.querySelector("li[task-id='" + taskId + "']");
		taskItem.parentElement.removeChild(taskItem);	
	}
