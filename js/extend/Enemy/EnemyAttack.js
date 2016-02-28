//=============================================================================
// EnemyAttack.js
//=============================================================================

function EnemyAttack() {
	throw new Error('This is a static class');
}

EnemyAttack.doAttackTouchDamage = function(interpreter) {
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
	status.touchdamage = status.touchdamageOrg;			// touchDamage end

	return true;
};


// TODO rename doAttackSlimeBubble
EnemyAttack.doAttackBlow = function(enemy, attackDelay, attackProbability, superarmor) {
	if(!attackDelay) attackDelay = 30;
	if(!attackProbability) attackProbability = 50;
	if(!superarmor) superarmor = false;

	// roll dice
	if(!EnemyAction._rollAttackDice(attackProbability)) return;

	// judge start attack
	var collisionRect = new CollisionRectangle(-1, 1, -1, 1);
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
//		enemy.requestAnimation(EnemyAction._rotateAnimation(132, enemy));	// TODO make blow effect
		enemy.requestAnimation(82);
	}.bind(this))
	.addWait(4)
	.addTask(function(){
		if(EnemyAttackColision.judgeCollision(enemy,collisionRect)){
			$gamePlayer.requestAnimation(1);
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

EnemyAttack.doAttackSlash = function(enemy, attackDelay, attackProbability, superarmor) {
	if(!attackDelay) attackDelay = 30;
	if(!attackProbability) attackProbability = 50;
	if(!superarmor) superarmor = false;		// TODO judge undefined

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
