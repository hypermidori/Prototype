//=============================================================================
// EnemyStatus.js
//=============================================================================

function EnemyStatusManager() {
	throw new Error('This is a static class');
}

EnemyStatusManager._list = {};

EnemyStatusManager.init = function() {
	EnemyStatusManager._list = {};
};

EnemyStatusManager.initEnemy = function(enemy) {
	// enemy init and add EnemyList
	var status = EnemyStatusManager._list[enemy._eventId];
	if (!status) {
		var newStatus = new EnemyStatus(enemy);
		EnemyStatusManager._list[enemy._eventId] = newStatus;

		status = newStatus;
	}

	return status;
};

EnemyStatusManager.getEnemyStatus = function(enemy) {
	var status = EnemyStatusManager._list[enemy._eventId];

	return status;
};

EnemyStatusManager.processEnemyDamange = function(enemy, rate) {
	var enemyStatus = EnemyStatusManager.getEnemyStatus(enemy);
	var playerStatus = PlayerStatusManager.getPlayerStatus();
	var damage = DamageCalculator.calcAttackDamage(playerStatus, enemyStatus, rate);

	enemyStatus.hp -= damage;

	if (enemyStatus.hp <= 0) {
		EnemyStatusManager.destroyEnemy(enemy);
	}
};

EnemyStatusManager.destroyEnemy = function(enemy) {
	var taskList = new FrameTaskList();
	var status = EnemyStatusManager.getEnemyStatus(enemy);

	taskList.addTask(function() {
			enemy.requestAnimation(125);
		}.bind(this))
		.addWait(10)
		.addTask(function() {
			if(status.executingAttackTask) status.executingAttackTask.interrupt();		// stop zonbie attack
			$gameSelfSwitches.setValue([$gameMap.mapId(), enemy.eventId(), "D"], true); // destroy flag
			$gameMap.eraseEvent(enemy.eventId());		// TODO add not erase flag
		}.bind(this));

	FrameTaskExecuter.execTask(taskList);
};

function EnemyStatus(enemy) {
	var key = "default";
	try {
		var eventData = enemy.event();
		key = eventData.name.split(":")[1];
	} catch (e) {
		console.log("enemy load failed");
		console.log(e);
	}

	var enemyStatusOrigin = EnemyData.enemyList[key];

	this.name = enemyStatusOrigin.name;
	this.hp = enemyStatusOrigin.hp;
	this.atk = enemyStatusOrigin.atk;
	this.def = enemyStatusOrigin.def;
	this.superarmor = enemyStatusOrigin.superarmor;
	this.superarmorOrg = enemyStatusOrigin.superarmor;
	this.touchdamage = enemyStatusOrigin.touchdamage;
	this.touchdamageOrg = enemyStatusOrigin.touchdamage;
	this.executingAttackTask = null;
	this.routeFunc = enemyStatusOrigin.routeFunc;

	this.setEnemyEventMoveRoute(enemy);
}

EnemyStatus.prototype.setEnemyEventMoveRoute = function(enemy){
	if(!this.routeFunc) return;
	var route = this.routeFunc();


	var tasks = new FrameTaskList();
	tasks.addWait(1)				// wait Event page change
	.addTask(function() {
		enemy._moveType = 3;					// moveTypeCustom
		enemy.setMoveRoute(route);
	});

	FrameTaskExecuter.execTask(tasks);
};
