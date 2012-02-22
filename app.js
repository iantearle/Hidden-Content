// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var HC = {
	ui: {
		offset: 214, 			// How much of an offset you would like.
		duration: 200, 			// Duration of the animation.
		handle: 'animate_hc', 	// The handle of the event listener. (Use in FireEvent)
		dragWidth: 22,			// Draggable handle width, increase if target is too small
		width: Ti.Platform.displayCaps.platformWidth,
		height: Ti.Platform.displayCaps.platformHeight
	}	
};

(function() {
	
	// Create your hidden window, and content as you wish.
	HC.ui.hiddenWindow = function () {
	
		var win = Ti.UI.createWindow({
			backgroundColor: '#32394a',
			width: HC.ui.offset,
			left: 0
		});
		
		// Add any thing you would like to add to the window here. For example a tableView
		var data = [{title:"Little Polar Apps", url: 'http://littlepolarapps.com', color: '#c4ccda'}];
		var tv = Ti.UI.createTableView({
			backgroundColor: '#32394a',
			separatorColor: '#3e4555',
			data: data
		});
		tv.addEventListener('click', function(e){
			Ti.Platform.openURL(e.row.url);
		});
		
		win.add(tv);
		win.open();
		
	};
	
	// Starting window. One or all of these will have a button to open the Hidden Window (if a TabGroup).
	// This could always be just a window.
	HC.ui.topMostWindow = function() {
	
		var tabGroup = Ti.UI.createTabGroup({
			width: HC.ui.width,
			left: 0,
			top: 0
		});
		
		var makeTab = function(/*Object*/ obj) {
			
			var tt = Ti.UI.createTab({
				title: obj.title,
				window: obj.window
			})
			tabGroup.addTab(tt);			
		};
		
		// ************************************************
		// This event listener opens the hidden window.
		// DO NOT EDIT
		var vis = false; 
		Ti.App.addEventListener(HC.ui.handle, function(e) {
		    if(vis == false) {
		        tabGroup.animate(Ti.UI.createAnimation({
		            duration: HC.ui.duration,
		            left: HC.ui.offset
		        }));
		        //HC.ui.dragHandle.show();
		        vis = true;
		    } else {
		        tabGroup.animate(Ti.UI.createAnimation({
		            duration: HC.ui.duration,
		            left: 0
		        }));
		        //HC.ui.dragHandle.hide();
		        vis = false; 
		    }
		});
		
		// Lets create a draggable handle to move the pane!
		var dragHandle = Ti.UI.createView({
			backgroundColor: 'transparent',
			width: HC.ui.dragWidth,
			height: HC.ui.height,
			left: 0,
			top: 44
		});
		tabGroup.add(dragHandle);

		// handle position before it has been animated
		var handlePosition = { top: tabGroup.top, left: tabGroup.left };
		
		// object to store last event position
		var touchMoveBase = {
		    set: function(point) {
		        this.x = point.x;
		        this.y = point.y;
		    }
		}
		touchMoveBase.set({"x": 0, "y": 0});
		
		dragHandle.addEventListener('touchstart', function(e) {
		    touchMoveBase.set(e.globalPoint);
		});
		 
		dragHandle.addEventListener('touchmove', function(e) {
		    if(handlePosition.left == HC.ui.offset) {
		    	handlePosition.left -= e.globalPoint.x - touchMoveBase.x; 
		    	tabGroup.animate({
			        left: handlePosition.left,
			        duration: 1 
			    });
			    touchMoveBase.set(e.globalPoint);
		    } else {
			    handlePosition.left += e.globalPoint.x - touchMoveBase.x; 
			    tabGroup.animate({
			        left: handlePosition.left,
			        duration: 1 
			    });
			    touchMoveBase.set(e.globalPoint);
			}
		});
		 
		dragHandle.addEventListener('touchend', function(e) {
		    if(handlePosition.left >= 0 && handlePosition.left <= 107) {
		    
		    	tabGroup.animate({
			        left:0,
			        duration: 100 
			    });
			    handlePosition = { top: 0, left: 0 }
			    
		    } else if(handlePosition.left >= 108 && handlePosition.left <= HC.ui.offset) {
		    
		    	tabGroup.animate({
			        left: HC.ui.offset,
			        duration: 50
			    });
			    handlePosition = { left: HC.ui.offset, top:0 }
			    
		    } else {
		    
		    	tabGroup.animate({
			        left: HC.ui.offset,
			        duration: 50
			    });
			    handlePosition = { left: HC.ui.offset, top:0 }
		    } 
		});
		
		// ************************************************
		
		
		// Add some tabs.
		makeTab({
			title: 'Inbox',
			icon: '',
			window: HC.ui.window1()
		});
		
		makeTab({
			title: 'Inbox',
			icon: '',
			window: HC.ui.window2()
		});
		
		tabGroup.open();
		
	};
	
	
	// Let's create some windows
	
	HC.ui.window1 = function() {
		
		var btnBack = Ti.UI.createButton({
		    width:80,
		    height:25
		});
			
		btnBack.addEventListener('click', function(e) {
			// ************************************************
			// Anything can fire the following event
			Ti.App.fireEvent(HC.ui.handle);
			// ************************************************
		});
		/*
		dragHandle.addEventListener('touchstart', function(e) {
			Ti.App.fireEvent(HC.ui.start);
		});
		dragHandle.addEventListener('touchmove', function(e) {
			Ti.App.fireEvent(HC.ui.move);
		});
		dragHandle.addEventListener('touchend', function(e) {
			Ti.App.fireEvent(HC.ui.end);
		});
		*/
		var win = Titanium.UI.createWindow({  
		    title:'Tab 1',
		    backgroundColor:'#fff',
		    leftNavButton: btnBack,
		    barColor: '#2e4b88',
		   	width: 320,
		   	left: 0,
		   	top: 0
		});
		
		var label = Titanium.UI.createLabel({
			color:'#999',
			text:'I am Window 1',
			font:{fontSize:20,fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:'auto'
		});
		
		win.add(label);
		
		return win;
	
	};
	
	HC.ui.window2 = function() {
	
		var win = Titanium.UI.createWindow({  
		    title:'Tab 2',
		    backgroundColor:'#fff',
		    barColor: '#2e4b88',
		   	width: 320
		});
		
		var label = Titanium.UI.createLabel({
			color:'#999',
			text:'I am Window 2',
			font:{fontSize:20,fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:'auto'
		});
		
		win.add(label);
		
		return win;
	
	};
	
})();

// The hidden window must be opened first. 
// This creates a stacking order, and gives 
// the appearance of a hidden window.
HC.ui.hiddenWindow();
HC.ui.topMostWindow();