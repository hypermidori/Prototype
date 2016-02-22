//=============================================================================
// EnemyUtil.js
//=============================================================================

function EnemyUtil() {
	throw new Error('This is a static class');
}

EnemyUtil._makeBlowOffRouteList = function(enemy, moveDistance, route) {
	var originMoveSpeed = enemy._moveSpeed;

	var list = [];
	list.push({
		"code": Game_Character.ROUTE_DIR_FIX_ON,
		"parameters": ""
	});
	list.push({
		"code": Game_Character.ROUTE_CHANGE_SPEED,
		"parameters": [5]
	});
	for (var i = 0; i < moveDistance; i++) {
		list.push({
			"code": route,
			"parameters": ""
		});
	}
	list.push({
		"code": Game_Character.ROUTE_CHANGE_SPEED,
		"parameters": [originMoveSpeed]
	});
	list.push({
		"code": Game_Character.ROUTE_DIR_FIX_OFF,
		"parameters": ""
	});
	list.push({
		"code": Game_Character.ROUTE_END
	});

	return list;
};

EnemyUtil.blowOffTop = function(enemy, moveDistance) {
	console.log(EnemyStatusManager.getEnemyStatus(enemy));
	if(EnemyStatusManager.getEnemyStatus(enemy).superarmer) return;
	var list = EnemyUtil._makeBlowOffRouteList(enemy, moveDistance, Game_Character.ROUTE_MOVE_UP);

	var enemyMoveRoute = {
		"list": list,
		"repeat": false,
		"skippable": true,
		"wait": true
	};
	enemy.forceMoveRoute(enemyMoveRoute);
};

EnemyUtil.blowOffBottom = function(enemy, moveDistance) {
	if(EnemyStatusManager.getEnemyStatus(enemy).superarmer) return;
	var list = EnemyUtil._makeBlowOffRouteList(enemy, moveDistance, Game_Character.ROUTE_MOVE_DOWN);

	var enemyMoveRoute = {
		"list": list,
		"repeat": false,
		"skippable": true,
		"wait": true
	};
	enemy.forceMoveRoute(enemyMoveRoute);
};

EnemyUtil.blowOffLeft = function(enemy, moveDistance) {
	if(EnemyStatusManager.getEnemyStatus(enemy).superarmer) return;
	var list = EnemyUtil._makeBlowOffRouteList(enemy, moveDistance, Game_Character.ROUTE_MOVE_LEFT);

	var enemyMoveRoute = {
		"list": list,
		"repeat": false,
		"skippable": true,
		"wait": true
	};
	enemy.forceMoveRoute(enemyMoveRoute);
};

EnemyUtil.blowOffRight = function(enemy, moveDistance) {
	if(EnemyStatusManager.getEnemyStatus(enemy).superarmer) return;
	var list = EnemyUtil._makeBlowOffRouteList(enemy, moveDistance, Game_Character.ROUTE_MOVE_RIGHT);

	var enemyMoveRoute = {
		"list": list,
		"repeat": false,
		"skippable": true,
		"wait": true
	};
	enemy.forceMoveRoute(enemyMoveRoute);
};

EnemyUtil.knockStop = function(enemy, stopFrame) {
	if(EnemyStatusManager.getEnemyStatus(enemy).superarmer) return;

	var list = [];
	var param = [];
	param[0] = stopFrame;
	list.push({
		"code": Game_Character.ROUTE_WAIT,
		"parameters": param
	});
	list.push({
		"code": Game_Character.ROUTE_END
	});

	var enemyMoveRoute = {
		"list": list,
		"repeat": false,
		"skippable": true,
		"wait": true
	};

	enemy.forceMoveRoute(enemyMoveRoute);
};

EnemyUtil.doEnemyAttack = function(interpreter) {
	// TODO evil. make ACTInputManager
	if (Input._latestButton === "ok" && Input._pressedTime === 1) {
		return;
	}

	var enemy = $gameMap.event(interpreter._eventId);
	var taskList = new FrameTaskList();

	taskList.addTask(function() {
			$gamePlayer.requestAnimation(6);
		}.bind(this))
		.addWait(10)
		.addTask(function() {
			PlayerStatusManager.processPlayerDamage(enemy);
		}.bind(this));

	FrameTaskExecuter.execTask(taskList);

};
