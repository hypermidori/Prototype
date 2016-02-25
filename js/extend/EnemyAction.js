//=============================================================================
// EnemyAction.js
//=============================================================================

function EnemyAction() {
	throw new Error('This is a static class');
}

EnemyAction._makeBlowOffRouteList = function(enemy, moveDistance, route, stopFrame) {
	if(!stopFrame) stopFrame = 0;
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
	if(stopFrame){
		list.push({
			"code": Game_Character.ROUTE_WAIT,
			"parameters": [stopFrame]
		});
	}
	list.push({
		"code": Game_Character.ROUTE_DIR_FIX_OFF,
		"parameters": ""
	});

	list.push({
		"code": Game_Character.ROUTE_END
	});

	return list;
};

EnemyAction.blowOffTop = function(enemy, moveDistance, stopFrame) {
	var status = EnemyStatusManager.getEnemyStatus(enemy);
	if(status.superarmor) return;
	if(status.executingAttackTask) {
		status.executingAttackTask.interrupt();
	}

	var list = EnemyAction._makeBlowOffRouteList(enemy, moveDistance, Game_Character.ROUTE_MOVE_UP, stopFrame);

	var enemyMoveRoute = {
		"list": list,
		"repeat": false,
		"skippable": true,
		"wait": true
	};
	enemy.forceMoveRoute(enemyMoveRoute);
};

EnemyAction.blowOffBottom = function(enemy, moveDistance, stopFrame) {
	var status = EnemyStatusManager.getEnemyStatus(enemy);
	if(status.superarmor) return;
	if(status.executingAttackTask) {
		status.executingAttackTask.interrupt();
	}

	var list = EnemyAction._makeBlowOffRouteList(enemy, moveDistance, Game_Character.ROUTE_MOVE_DOWN, stopFrame);

	var enemyMoveRoute = {
		"list": list,
		"repeat": false,
		"skippable": true,
		"wait": true
	};
	enemy.forceMoveRoute(enemyMoveRoute);
};

EnemyAction.blowOffLeft = function(enemy, moveDistance, stopFrame) {
	var status = EnemyStatusManager.getEnemyStatus(enemy);
	if(status.superarmor) return;
	if(status.executingAttackTask) {
		status.executingAttackTask.interrupt();
	}

	var list = EnemyAction._makeBlowOffRouteList(enemy, moveDistance, Game_Character.ROUTE_MOVE_LEFT, stopFrame);

	var enemyMoveRoute = {
		"list": list,
		"repeat": false,
		"skippable": true,
		"wait": true
	};
	enemy.forceMoveRoute(enemyMoveRoute);
};

EnemyAction.blowOffRight = function(enemy, moveDistance, stopFrame) {
	var status = EnemyStatusManager.getEnemyStatus(enemy);
	if(status.superarmor) return;
	if(status.executingAttackTask) {
		status.executingAttackTask.interrupt();
	}

	var list = EnemyAction._makeBlowOffRouteList(enemy, moveDistance, Game_Character.ROUTE_MOVE_RIGHT, stopFrame);

	var enemyMoveRoute = {
		"list": list,
		"repeat": false,
		"skippable": true,
		"wait": true
	};
	enemy.forceMoveRoute(enemyMoveRoute);
};

EnemyAction.knockStop = function(enemy, stopFrame) {
	var status = EnemyStatusManager.getEnemyStatus(enemy);
	if(status.superarmor) return;
	if(status.executingAttackTask) {
		status.executingAttackTask.interrupt();
	}

	EnemyAction.stop(enemy, stopFrame);
};

EnemyAction.stop = function(enemy, stopFrame) {
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

EnemyAction.wakeUpEnemy = function(interpreter) {
	var enemy = $gameMap.event(interpreter._eventId);
	EnemyStatusManager.initEnemy(enemy);
};

// TODO delete
EnemyAction.doEnemyAttack = function(interpreter) {
	return EnemyAction.doAttackTouchDamage(interpreter);
};

// TODO move EnemyAttack class
EnemyAction.doAttackTouchDamage = function(interpreter) {
	// TODO evil. make ACTInputManager
	if (Input._latestButton === "ok" && Input._pressedTime === 1) {
		return false;
	}

	var enemy = $gameMap.event(interpreter._eventId);

	// judge touchdamage
	var status = EnemyStatusManager.getEnemyStatus(enemy);
	if(!status.touchdamage) return false;

	var taskList = new FrameTaskList();

	taskList.addTask(function() {
			$gamePlayer.requestAnimation(6);
		}.bind(this))
		.addWait(10)
		.addTask(function() {
			PlayerStatusManager.processPlayerDamage(enemy);
		}.bind(this));

	FrameTaskExecuter.execTask(taskList);

	return true;
};

// TODO move EnemyAttack class
EnemyAction.doAttackSlash = function(enemy, attackDelay, attackProbability, superarmor) {
	if(!attackDelay) attackDelay = 30;
	if(!attackProbability) attackProbability = 50;
	if(!superarmor) superarmor = false;

	// roll dice
	if(!EnemyAction._rollAttackDice(attackProbability)) return;

	// judge start attack
	var collisionRect = new CollisionRectangle(-1, 1, -2, 0);
	EnemyAction._rotateCollisionRectangle(collisionRect, enemy);
	if(!EnemyAttackColision.judgeCollision(enemy,collisionRect)){
		return;
	}

	// attack
	var status = EnemyStatusManager.getEnemyStatus(enemy);
	var tasks = new FrameTaskList();
	status.executingAttackTask = tasks;

	tasks.addTask(function() {
		status.superarmor = superarmor;					//start superarmor
		EnemyAction.stop(enemy, attackDelay + 12 + 30);
		enemy.requestAnimation(128);

	}.bind(this))
	.addWait(attackDelay)
	.addTask(function() {
		enemy.requestAnimation(EnemyAction._rotateAnimation(132, enemy));
	}.bind(this))
	.addWait(4)
	.addTask(function(){
		if(EnemyAttackColision.judgeCollision(enemy,collisionRect)){
			$gamePlayer.requestAnimation(6);
			PlayerStatusManager.processPlayerDamage(enemy);
		}
	}.bind(this))
	.addWait(8)
	.addTask(function(){
		status.superarmor = status.superarmorOrg;				//end superarmor
	}.bind(this))
	.addWait(30)
	.addTask(function(){
		status.executingAttackTask = null;
	}.bind(this))
	;

	FrameTaskExecuter.execTask(tasks);
};

EnemyAction._rollAttackDice = function(attackProbability) {
	var attackDice = Math.floor(Math.random() * 100 + 1);
	return attackProbability >= attackDice;
};

EnemyAction._rotateCollisionRectangle = function(topRectangle, enemy) {
	var enemyDirection = EnemyAction._getEnemyDirection(enemy);

	for (var i = 0; i < enemyDirection; i++) {
		topRectangle.rotateLeft();
	}
};

EnemyAction._rotateAnimation = function(topAnimationId, enemy) {
	return topAnimationId + EnemyAction._getEnemyDirection(enemy);
};

EnemyAction._getEnemyDirection = function(enemy) {
	var direction = -1;
	switch (enemy._direction) {
		case 8:
			direction = 0;
			break;
		case 4:
			direction = 1;
			break;
		case 2:
			direction = 2;
			break;
		case 6:
			direction = 3;
			break;
	}

	if (direction == -1) {
		throw new Error('invalid direction');
	}

	return direction;
};
