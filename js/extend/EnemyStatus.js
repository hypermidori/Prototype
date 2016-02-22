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

EnemyStatusManager.getEnemyStatus = function(enemy) {
	var status = EnemyStatusManager._list[enemy._eventId];
	if (!status) {
		// first read # TODO evil
		var newStatus = new EnemyStatus(enemy);
		EnemyStatusManager._list[enemy._eventId] = newStatus;

		status = newStatus;
	}

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

	taskList.addTask(function() {
			enemy.requestAnimation(125);
		}.bind(this))
		.addWait(10)
		.addTask(function() {
			$gameSelfSwitches.setValue([$gameMap.mapId(), enemy.eventId(), "D"], true); // destroy flag
			$gameMap.eraseEvent(enemy.eventId());
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
	this.superarmer = enemyStatusOrigin.superarmer;

	this.disableBlowOff = enemyStatusOrigin.disableBlowOff;
	this.selfSwitch = enemyStatusOrigin.selfSwitch;
}
