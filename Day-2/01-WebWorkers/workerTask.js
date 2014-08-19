console.log("workertask loaded");
function doWork(){
		for(var i=0;i<10000;i++){
			for(var j=0;j<10000;j++)
				for(var k=0;k<100;k++){}
			if (i % 100 === 0){
				var response = {
					type : "progress",
					percentCompleted : i / 100
				};
				self.postMessage(response);
			}
		}
		console.log("doWork Completed");
}
doWork();
var response = {
	type : "completion", 
	message :"Worker completed at " + new Date().toString()
};
self.postMessage(response);
