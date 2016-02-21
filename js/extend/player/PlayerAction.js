//=============================================================================
// PlayerAction.js
//=============================================================================

function PlayerAction() {
	throw new Error('This is a static class');
}

PlayerAction.DIRECTION_TOP = 0;
PlayerAction.DIRECTION_LEFT = 1;
PlayerAction.DIRECTION_BOTTOM = 2;
PlayerAction.DIRECTION_RIGHT = 3;

PlayerAction.isStopping = false;
PlayerAction.isCancelable = false;
PlayerAction.executingAttackTask = null;
PlayerAction.normalAttackNum = 0;
PlayerAction.cancelLevel = 0;

PlayerAction.skillMap = {};

PlayerAction.setExecutingAttackTask = function(task) {
	PlayerAction.executingAttackTask = task;
};
PlayerAction.setStopping = function(isStopping) {
	PlayerAction.isStopping = isStopping;
};
PlayerAction.setCancelable = function(isCancelable) {
	PlayerAction.isCancelable = isCancelable;
};
PlayerAction.setNormalAttackNum = function(normalAttackNum) {
	PlayerAction.normalAttackNum = normalAttackNum;
};
PlayerAction.setCancelLevel = function(cancelLevel) {
	PlayerAction.cancelLevel = cancelLevel;
};

PlayerAction.init = function() {
	PlayerAction.reset();

	PlayerAction.skillMap = {};
	var skill = PlayerStatusManager.getPlayerStatus().skill;

	PlayerAction.skillMap.normal =
		PlayerAction.skillMap.skill_1 =
		PlayerAction.skillMap.skill_2 =
		PlayerAction.skillMap.skill_3 =
		function() {};

	if (skill.normal) PlayerAction.skillMap.normal = skill.normal;
	if (skill.skill_1) PlayerAction.skillMap.skill_1 = skill.skill_1;
	if (skill.skill_2) PlayerAction.skillMap.skill_2 = skill.skill_2;
	if (skill.skill_3) PlayerAction.skillMap.skill_3 = skill.skill_3;
};

PlayerAction.reset = function() {
	PlayerAction.executingAttackTask = null;
	PlayerAction.setNormalAttackNum(0);
	PlayerAction.setCancelLevel(0);
	PlayerAction.moveReset();
	PlayerAction.isStopping = false;
	PlayerAction.isCancelable = false;
	PlayerStatusManager.getPlayerStatus().isAttacking = false;
	PlayerWeaponPictureManager.erase();
};

PlayerAction.prepareAttack = function() {
	if (PlayerAction.executingAttackTask) {
		// cancel
		PlayerAction.executingAttackTask.interrupt();
		PlayerAction.executingAttackTask = null;
	}

	PlayerAction.moveReset();
	PlayerAction.isStopping = false;
	PlayerAction.isCancelable = false;
	PlayerStatusManager.getPlayerStatus().isAttacking = true;
	PlayerWeaponPictureManager.erase();
};

PlayerAction.normalAttack = function() {
	if (PlayerAction.isStopping) {
		if (!PlayerAction.isCancelable) {
			return;
		}
		if (PlayerAction.cancelLevel > 0) {
			return;
		}
	}

	PlayerAction.prepareAttack();
	PlayerAction.skillMap.normal.func();
};

PlayerAction.skill_1 = function() {
	if (PlayerAction.isStopping) {
		if (!PlayerAction.isCancelable) {
			return;
		}
		if (PlayerAction.cancelLevel > 10) {
			return;
		}
	}
	if (!PlayerAction.judgeSp(PlayerAction.skillMap.skill_1.sp)) {
		$gamePlayer.requestAnimation(127);
		return;
	}
	PlayerAction.reduceSp(PlayerAction.skillMap.skill_1.sp);

	PlayerAction.prepareAttack();
	PlayerAction.skillMap.skill_1.func();
};

PlayerAction.skill_2 = function() {
	if (PlayerAction.isStopping) {
		if (!PlayerAction.isCancelable) {
			return;
		}
		if (PlayerAction.cancelLevel > 10) {
			return;
		}
	}
	if (!PlayerAction.judgeSp(PlayerAction.skillMap.skill_2.sp)) {
		$gamePlayer.requestAnimation(127);
		return;
	}
	PlayerAction.reduceSp(PlayerAction.skillMap.skill_2.sp);

	PlayerAction.prepareAttack();
	PlayerAction.skillMap.skill_2.func();
};

PlayerAction.skill_3 = function() {
	if (PlayerAction.isStopping) {
		if (!PlayerAction.isCancelable) {
			return;
		}
		if (PlayerAction.cancelLevel > 10) {
			return;
		}
	}
	if (!PlayerAction.judgeSp(PlayerAction.skillMap.skill_3.sp)) {
		$gamePlayer.requestAnimation(127);
		return;
	}
	PlayerAction.reduceSp(PlayerAction.skillMap.skill_3.sp);

	PlayerAction.prepareAttack();
	PlayerAction.skillMap.skill_3.func();
};

PlayerAction.step = function() {
	if (PlayerAction.isStopping) {
		if (!PlayerAction.isCancelable) {
			return;
		}
		if (PlayerAction.cancelLevel > 0) {
			return;
		}
	}
	PlayerAction.prepareAttack();

	var moveDirection = 0;
	if (ActionPartInput.isPressed(ActionPartInput.KEY_UP)) moveDirection = Game_Character.ROUTE_MOVE_UP;
	if (ActionPartInput.isPressed(ActionPartInput.KEY_DOWN)) moveDirection = Game_Character.ROUTE_MOVE_DOWN;
	if (ActionPartInput.isPressed(ActionPartInput.KEY_LEFT)) moveDirection = Game_Character.ROUTE_MOVE_LEFT;
	if (ActionPartInput.isPressed(ActionPartInput.KEY_RIGHT)) moveDirection = Game_Character.ROUTE_MOVE_RIGHT;

	var tasks = new FrameTaskList();
	tasks.addTask(function() {
			PlayerAction.setStopping(true);
			PlayerAction.stepMove(moveDirection);
		}.bind(this))
		.addWait(15)
		.addTask(function() {
			PlayerAction.setCancelable(true);
		}.bind(this))
		.addWait(10)
		.addTask(function() {
			PlayerAction.reset();
		}.bind(this));

	PlayerAction.setExecutingAttackTask(tasks);
	FrameTaskExecuter.execTask(tasks);
};

PlayerAction.judgeSp = function(needSp) {
	return PlayerStatusManager.getPlayerStatus().sp >= needSp;
};

PlayerAction.gainSp = function(gainSp) {
	PlayerStatusManager.getPlayerStatus().gainSp(gainSp);
};

PlayerAction.reduceSp = function(reduceSp) {
	PlayerStatusManager.getPlayerStatus().reduceSp(reduceSp);
};

PlayerAction._getPlayerDirection = function() {
	var direction = -1;
	switch ($gamePlayer._direction) {
		case 8:
			direction = PlayerAction.DIRECTION_TOP;
			break;
		case 4:
			direction = PlayerAction.DIRECTION_LEFT;
			break;
		case 2:
			direction = PlayerAction.DIRECTION_BOTTOM;
			break;
		case 6:
			direction = PlayerAction.DIRECTION_RIGHT;
			break;
	}

	if (direction == -1) {
		throw new Error('invalid direction');
	}

	return direction;
};

PlayerAction._rotateCollisionRectangle = function(topRectangle) {
	var playerDirection = PlayerAction._getPlayerDirection();

	for (var i = 0; i < playerDirection; i++) {
		topRectangle.rotateLeft();
	}
};

PlayerAction._rotateAnimation = function(topAnimationId) {
	return topAnimationId + PlayerAction._getPlayerDirection();
};

PlayerAction._blowOffEnemy = function(enemy, moveDistance) {
	var playerDirection = PlayerAction._getPlayerDirection();
	switch (playerDirection) {
		case PlayerAction.DIRECTION_TOP:
			EnemyUtil.blowOffTop(enemy, moveDistance);
			break;
		case PlayerAction.DIRECTION_LEFT:
			EnemyUtil.blowOffLeft(enemy, moveDistance);
			break;
		case PlayerAction.DIRECTION_BOTTOM:
			EnemyUtil.blowOffBottom(enemy, moveDistance);
			break;
		case PlayerAction.DIRECTION_RIGHT:
			EnemyUtil.blowOffRight(enemy, moveDistance);
			break;
	}

};

PlayerAction.stepMove = function(moveDirection, moveNum, stopFrame, moveSpeed) {
	if (!moveNum) moveNum = 2;
	if (!stopFrame) stopFrame = 9999;
	if (!moveSpeed) moveSpeed = 6;

	var list = [];
	var param = [];

	list.push({
		"code": Game_Character.ROUTE_DIR_FIX_ON,
		"parameters": ""
	});
	list.push({
		"code": Game_Character.ROUTE_CHANGE_SPEED,
		"parameters": [moveSpeed]
	});

	for (var i = 0; i < moveNum; i++) {
		list.push({
			"code": moveDirection,
		});
	}

	list.push({
		"code": Game_Character.ROUTE_DIR_FIX_OFF,
		"parameters": ""
	});
	list.push({
		"code": Game_Character.ROUTE_WAIT,
		"parameters": [stopFrame]
	});
	list.push({
		"code": Game_Character.ROUTE_END
	});

	var moveRoute = {
		"list": list,
		"repeat": false,
		"skippable": true,
		"wait": true
	};

	$gamePlayer.forceMoveRoute(moveRoute);
};

PlayerAction.forwardAndStop = function(forwardNum, stopFrame, moveSpeed) {
	if (!moveSpeed) moveSpeed = 4;

	var list = [];
	var param = [];
	param[0] = stopFrame;

	list.push({
		"code": Game_Character.ROUTE_CHANGE_SPEED,
		"parameters": [moveSpeed]
	});

	for (var i = 0; i < forwardNum; i++) {
		list.push({
			"code": Game_Character.ROUTE_MOVE_FORWARD
		});
	}

	list.push({
		"code": Game_Character.ROUTE_WAIT,
		"parameters": param
	});
	list.push({
		"code": Game_Character.ROUTE_END
	});

	var moveRoute = {
		"list": list,
		"repeat": false,
		"skippable": true,
		"wait": true
	};

	$gamePlayer.forceMoveRoute(moveRoute);
};

PlayerAction.backwardAndStop = function(backwardNum, stopFrame, moveSpeed) {
	if (!moveSpeed) moveSpeed = 4;

	var list = [];
	var param = [];
	param[0] = stopFrame;

	list.push({
		"code": Game_Character.ROUTE_CHANGE_SPEED,
		"parameters": [moveSpeed]
	});

	for (var i = 0; i < forwardNum; i++) {
		list.push({
			"code": Game_Character.ROUTE_MOVE_BACKWARD
		});
	}

	list.push({
		"code": Game_Character.ROUTE_WAIT,
		"parameters": param
	});
	list.push({
		"code": Game_Character.ROUTE_END
	});

	var moveRoute = {
		"list": list,
		"repeat": false,
		"skippable": true,
		"wait": true
	};

	$gamePlayer.forceMoveRoute(moveRoute);
};

PlayerAction.knockStop = function(stopFrame) {

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

	var moveRoute = {
		"list": list,
		"repeat": false,
		"skippable": true,
		"wait": true
	};

	$gamePlayer.forceMoveRoute(moveRoute);
};

PlayerAction.moveReset = function() {

	var list = [];
	var param = [];

	list.push({
		"code": Game_Character.ROUTE_CHANGE_SPEED,
		"parameters": [4]
	});
	list.push({
		"code": Game_Character.ROUTE_DIR_FIX_OFF,
		"parameters": ""
	});
	list.push({
		"code": Game_Character.ROUTE_END
	});

	var moveRoute = {
		"list": list,
		"repeat": false,
		"skippable": true,
		"wait": true
	};

	$gamePlayer.forceMoveRoute(moveRoute);
};
