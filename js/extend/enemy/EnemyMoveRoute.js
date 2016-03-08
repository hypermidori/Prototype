function EnemyMoveRoute () {
	throw new Error('This is a static class');
}

EnemyMoveRoute.getOakMoveRoute = function() {
	var list = [
		{"code": Game_Character.ROUTE_WAIT, "parameters": [30]},
		{"code": Game_Character.ROUTE_MOVE_TOWARD},
		{"code": Game_Character.ROUTE_WAIT, "parameters": [30]},
		{"code": Game_Character.ROUTE_MOVE_TOWARD},
		{"code": Game_Character.ROUTE_WAIT, "parameters": [30]},
		{"code": Game_Character.ROUTE_TURN_TOWARD},
		{"code": Game_Character.ROUTE_SCRIPT, "parameters": ["EnemyAttack.doAttackSlash(this);"]},
		{ "code": Game_Character.ROUTE_END }
	];

	var route = {
		"list": list,
		"repeat": true,
		"skippable": true,
		"wait": true
	};

	return route;
};


EnemyMoveRoute.getSlimeMoveRoute = function() {
	var list = [
		{"code": Game_Character.ROUTE_WAIT, "parameters": [60]},
		{"code": Game_Character.ROUTE_MOVE_RANDOM},
		{"code": Game_Character.ROUTE_WAIT, "parameters": [60]},
		{"code": Game_Character.ROUTE_MOVE_TOWARD},
		{"code": Game_Character.ROUTE_WAIT, "parameters": [60]},
		{"code": Game_Character.ROUTE_MOVE_TOWARD},
		{"code": Game_Character.ROUTE_WAIT, "parameters": [60]},
		{"code": Game_Character.ROUTE_TURN_TOWARD},
		{"code": Game_Character.ROUTE_SCRIPT, "parameters": ["EnemyAttack.doAttackBlow(this);"]},
		{ "code": Game_Character.ROUTE_END }
	];

	var route = {
		"list": list,
		"repeat": true,
		"skippable": true,
		"wait": true
	};

	return route;
};


EnemyMoveRoute.getMinotaurusMoveRoute = function() {
	var list = [
		{"code": Game_Character.ROUTE_WAIT, "parameters": [30]},
		{"code": Game_Character.ROUTE_MOVE_TOWARD},
		{"code": Game_Character.ROUTE_WAIT, "parameters": [30]},
		{"code": Game_Character.ROUTE_MOVE_TOWARD},
		{"code": Game_Character.ROUTE_WAIT, "parameters": [30]},
		{"code": Game_Character.ROUTE_TURN_TOWARD},
		{"code": Game_Character.ROUTE_SCRIPT, "parameters": ["EnemyAttack.doAttackSlash(this, 30, 80, true);"]},

		{"code": Game_Character.ROUTE_WAIT, "parameters": [30]},
		{"code": Game_Character.ROUTE_MOVE_TOWARD},
		{"code": Game_Character.ROUTE_WAIT, "parameters": [30]},
		{"code": Game_Character.ROUTE_MOVE_TOWARD},
		{"code": Game_Character.ROUTE_WAIT, "parameters": [30]},
		{"code": Game_Character.ROUTE_TURN_TOWARD},
		{"code": Game_Character.ROUTE_SCRIPT, "parameters": ["EnemyAttack.doAttackSlash(this, 30, 80, true);"]},

		{"code": Game_Character.ROUTE_WAIT, "parameters": [30]},
		{"code": Game_Character.ROUTE_MOVE_TOWARD},
		{"code": Game_Character.ROUTE_WAIT, "parameters": [30]},
		{"code": Game_Character.ROUTE_MOVE_TOWARD},
		{"code": Game_Character.ROUTE_WAIT, "parameters": [30]},
		{"code": Game_Character.ROUTE_TURN_TOWARD},
		{"code": Game_Character.ROUTE_PLAY_SE, "parameters": [{"name":"Absorb2","volume":80,"pitch":100,"pan":0}]},
		{"code": Game_Character.ROUTE_WAIT, "parameters": [60]},
		{"code": Game_Character.ROUTE_SCRIPT, "parameters": ["EnemyStatusManager.getEnemyStatus(this).touchdamage=true;"]},
		{"code": Game_Character.ROUTE_PLAY_SE, "parameters": [{"name":"Monster1","volume":80,"pitch":100,"pan":0}]},
		{"code": Game_Character.ROUTE_CHANGE_SPEED, "parameters": [6]},
		{"code": Game_Character.ROUTE_MOVE_FORWARD},
		{"code": Game_Character.ROUTE_MOVE_FORWARD},
		{"code": Game_Character.ROUTE_MOVE_FORWARD},
		{"code": Game_Character.ROUTE_MOVE_FORWARD},
		{"code": Game_Character.ROUTE_MOVE_FORWARD},
		{"code": Game_Character.ROUTE_CHANGE_SPEED, "parameters": [4]},
		{"code": Game_Character.ROUTE_SCRIPT, "parameters": ["EnemyStatusManager.getEnemyStatus(this).touchdamage=false;"]},
		{"code": Game_Character.ROUTE_WAIT, "parameters": [120]},

		{ "code": Game_Character.ROUTE_END }
	];

	var route = {
		"list": list,
		"repeat": true,
		"skippable": true,
		"wait": true
	};

	return route;
};
