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
