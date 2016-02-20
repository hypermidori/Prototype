//=============================================================================
// SkillSword.js
//=============================================================================

function SkillSword() {
	throw new Error('This is a static class');
}

SkillSword.normalAttack = function() {
	switch (PlayerAction.normalAttackNum) {
		case 0:
			SkillSword.normalAttack1();
			break;
		case 1:
			SkillSword.normalAttack2();
			break;
		case 2:
			SkillSword.normalAttack3();
			break;
		case 3:
			SkillSword.normalAttack4();
			break;
	}
};

SkillSword.normalAttack1 = function() {
	var tasks = new FrameTaskList();
	var collisionRect = new CollisionRectangle(-1, 1, -2, 0);
	PlayerAction._rotateCollisionRectangle(collisionRect);
	PlayerAction.setNormalAttackNum(1);

	tasks.addTask(function() {
			$gamePlayer.requestAnimation(PlayerAction._rotateAnimation(132));
			PlayerAction.knockStop(9999);
			PlayerAction.setStopping(true);
		})
		.addWait(4)
		.addTask(function() {
			$enemyEventCollision.updateEnemyEventList();
			var hitEnemyList = $enemyEventCollision.judgeCollision(collisionRect);

			hitEnemyList.forEach(function(enemy) {
				PlayerAction.gainSp(3);
				enemy.requestAnimation(1);
				PlayerAction._blowOffEnemy(enemy, 1);
				EnemyStatusManager.processEnemyDamange(enemy, 1);
			}.bind(this));
		})
		.addWait(8)
		.addTask(function() {
			PlayerAction.setCancelable(true);
		})
		.addWait(12)
		.addTask(function() {
			PlayerAction.reset();
		});

	PlayerAction.setExecutingAttackTask(tasks);
	FrameTaskExecuter.execTask(tasks);
};

SkillSword.normalAttack2 = function() {
	var tasks = new FrameTaskList();
	var collisionRect = new CollisionRectangle(-1, 1, -2, 0);
	PlayerAction._rotateCollisionRectangle(collisionRect);
	PlayerAction.setNormalAttackNum(2);

	tasks.addTask(function() {
			$gamePlayer.requestAnimation(PlayerAction._rotateAnimation(136));
			PlayerAction.knockStop(9999);
			PlayerAction.setStopping(true);
		})
		.addWait(4)
		.addTask(function() {
			$enemyEventCollision.updateEnemyEventList();
			var hitEnemyList = $enemyEventCollision.judgeCollision(collisionRect);

			hitEnemyList.forEach(function(enemy) {
				PlayerAction.gainSp(3);
				enemy.requestAnimation(1);
				PlayerAction._blowOffEnemy(enemy, 1);
				EnemyStatusManager.processEnemyDamange(enemy, 1);
			}.bind(this));
		})
		.addWait(8)
		.addTask(function() {
			PlayerAction.setCancelable(true);
		})
		.addWait(12)
		.addTask(function() {
			PlayerAction.reset();
		});

	PlayerAction.setExecutingAttackTask(tasks);
	FrameTaskExecuter.execTask(tasks);
};

SkillSword.normalAttack3 = function() {
	var tasks = new FrameTaskList();
	var collisionRect = new CollisionRectangle(-1, 1, -2, 0);
	PlayerAction._rotateCollisionRectangle(collisionRect);
	PlayerAction.setNormalAttackNum(3);

	tasks.addTask(function() {
			$gamePlayer.requestAnimation(PlayerAction._rotateAnimation(140));
			PlayerAction.forwardAndStop(1, 9999, 5);
			PlayerAction.setStopping(true);
		})
		.addWait(4)
		.addTask(function() {
			$enemyEventCollision.updateEnemyEventList();
			var hitEnemyList = $enemyEventCollision.judgeCollision(collisionRect);

			hitEnemyList.forEach(function(enemy) {
				PlayerAction.gainSp(3);
				enemy.requestAnimation(1);
				PlayerAction._blowOffEnemy(enemy, 1);
				EnemyStatusManager.processEnemyDamange(enemy, 1);
			}.bind(this));
		})
		.addWait(8)
		.addTask(function() {
			PlayerAction.setCancelable(true);
		})
		.addWait(12)
		.addTask(function() {
			PlayerAction.reset();
		});

	PlayerAction.setExecutingAttackTask(tasks);
	FrameTaskExecuter.execTask(tasks);
};

SkillSword.normalAttack4 = function() {
	var tasks = new FrameTaskList();
	var collisionRect = new CollisionRectangle(-1, 1, -2, 0);
	PlayerAction._rotateCollisionRectangle(collisionRect);
	PlayerAction.setCancelLevel(1);
	PlayerAction.setNormalAttackNum(0); // end

	tasks.addTask(function() {
			$gamePlayer.requestAnimation(PlayerAction._rotateAnimation(144));
			PlayerAction.forwardAndStop(1, 9999, 5);
			PlayerAction.setStopping(true);
		})
		.addWait(4)
		.addTask(function() {
			$enemyEventCollision.updateEnemyEventList();
			var hitEnemyList = $enemyEventCollision.judgeCollision(collisionRect);

			hitEnemyList.forEach(function(enemy) {
				PlayerAction.gainSp(3);
				enemy.requestAnimation(1);
				PlayerAction._blowOffEnemy(enemy, 1);
				EnemyStatusManager.processEnemyDamange(enemy, 1);
			}.bind(this));
		})
		.addWait(8)
		.addTask(function() {
			PlayerAction.setCancelable(true);
		})
		.addWait(12)
		.addTask(function() {
			PlayerAction.reset();
		});

	PlayerAction.setExecutingAttackTask(tasks);
	FrameTaskExecuter.execTask(tasks);
};


SkillSword.powerAttack_1 = function() {
	var collisionRect = new CollisionRectangle(-2, 2, -4, 0);
	PlayerAction._rotateCollisionRectangle(collisionRect);

	var tasks = new FrameTaskList();

	tasks.addTask(function() {
			$gamePlayer.requestAnimation(PlayerAction._rotateAnimation(148));
			PlayerAction.knockStop(9999);
			PlayerAction.setStopping(true);
		})
		.addWait(4)
		.addTask(function() {
			$enemyEventCollision.updateEnemyEventList();
			var hitEnemyList = $enemyEventCollision.judgeCollision(collisionRect);

			hitEnemyList.forEach(function(enemy) {
				enemy.requestAnimation(126);
				EnemyUtil.knockStop(enemy, 20);
				EnemyStatusManager.processEnemyDamange(enemy, 1);
			}.bind(this));
		})
		.addWait(12)
		.addTask(function() {
			$enemyEventCollision.updateEnemyEventList();
			var hitEnemyList = $enemyEventCollision.judgeCollision(collisionRect);

			hitEnemyList.forEach(function(enemy) {
				enemy.requestAnimation(126);
				EnemyUtil.knockStop(enemy, 20);
				EnemyStatusManager.processEnemyDamange(enemy, 1);
			}.bind(this));
		})
		.addWait(12)
		.addTask(function() {
			$enemyEventCollision.updateEnemyEventList();
			var hitEnemyList = $enemyEventCollision.judgeCollision(collisionRect);

			hitEnemyList.forEach(function(enemy) {
				enemy.requestAnimation(126);
				EnemyUtil.knockStop(enemy, 20);
				EnemyStatusManager.processEnemyDamange(enemy, 1);
			}.bind(this));
		})
		.addWait(12)
		.addTask(function() {
			$enemyEventCollision.updateEnemyEventList();
			var hitEnemyList = $enemyEventCollision.judgeCollision(collisionRect);

			hitEnemyList.forEach(function(enemy) {
				enemy.requestAnimation(126);
				EnemyUtil.knockStop(enemy, 20);
				EnemyStatusManager.processEnemyDamange(enemy, 1);
			}.bind(this));
		})
		.addWait(12)
		.addTask(function() {
			$enemyEventCollision.updateEnemyEventList();
			var hitEnemyList = $enemyEventCollision.judgeCollision(collisionRect);

			hitEnemyList.forEach(function(enemy) {
				enemy.requestAnimation(126);
				PlayerAction._blowOffEnemy(enemy, 3);
				EnemyStatusManager.processEnemyDamange(enemy, 2);
			}.bind(this));
		})
		.addWait(16)
		.addTask(function() {
			PlayerAction.reset();
		});

	PlayerAction.setExecutingAttackTask(tasks);
	FrameTaskExecuter.execTask(tasks);
};

SkillSword.powerAttack_2 = function() {
	var tasks = new FrameTaskList();
	var collisionRect = new CollisionRectangle(-1, 1, -3, 0);
	PlayerAction._rotateCollisionRectangle(collisionRect);
	PlayerAction.setCancelLevel(0);
	PlayerAction.setNormalAttackNum(0); // end

	tasks.addTask(function() {
			PlayerAction.forwardAndStop(3, 9999, 6);
			PlayerAction.setStopping(true);
		})
		.addWait(3)
		.addTask(function() {
			$gamePlayer.requestAnimation(PlayerAction._rotateAnimation(152));
		})
		.addWait(3)
		.addTask(function() {
			$enemyEventCollision.updateEnemyEventList();
			var hitEnemyList = $enemyEventCollision.judgeCollision(collisionRect);

			hitEnemyList.forEach(function(enemy) {
				enemy.requestAnimation(1);
				PlayerAction._blowOffEnemy(enemy, 1);
				EnemyStatusManager.processEnemyDamange(enemy, 1.2);
			}.bind(this));
		})
		.addWait(8)
		.addTask(function() {
			PlayerAction.setCancelable(true);
		})
		.addWait(12)
		.addTask(function() {
			PlayerAction.reset();
		});

	PlayerAction.setExecutingAttackTask(tasks);
	FrameTaskExecuter.execTask(tasks);
};

SkillSword.powerAttack_3 = function() {
	var tasks = new FrameTaskList();
	var collisionRect = new CollisionRectangle(-1, 1, -3, 0);
	PlayerAction._rotateCollisionRectangle(collisionRect);
	PlayerAction.setCancelLevel(1);

	tasks.addTask(function() {
			PlayerAction.knockStop(9999);
			PlayerAction.setStopping(true);
		})
		.addWait(3)
		.addTask(function() {
			$gamePlayer.requestAnimation(PlayerAction._rotateAnimation(156));
		})
		.addTask(function() {
			$enemyEventCollision.updateEnemyEventList();
			var hitEnemyList = $enemyEventCollision.judgeCollision(collisionRect);

			hitEnemyList.forEach(function(enemy) {
				enemy.requestAnimation(126);
				EnemyUtil.knockStop(enemy, 12);
				EnemyStatusManager.processEnemyDamange(enemy, 0.5);
			}.bind(this));
		})
		.addWait(9)
		.addTask(function() {
			$enemyEventCollision.updateEnemyEventList();
			var hitEnemyList = $enemyEventCollision.judgeCollision(collisionRect);

			hitEnemyList.forEach(function(enemy) {
				enemy.requestAnimation(126);
				EnemyUtil.knockStop(enemy, 20);
				EnemyStatusManager.processEnemyDamange(enemy, 0.5);
			}.bind(this));
		})
		.addWait(20)
		.addTask(function() {
			$enemyEventCollision.updateEnemyEventList();
			var hitEnemyList = $enemyEventCollision.judgeCollision(collisionRect);

			hitEnemyList.forEach(function(enemy) {
				enemy.requestAnimation(126);
				PlayerAction._blowOffEnemy(enemy, 1);
				EnemyStatusManager.processEnemyDamange(enemy, 1);
			}.bind(this));
		})
		.addWait(12)
		.addTask(function() {
			PlayerAction.setCancelable(true);
		})
		.addWait(12)
		.addTask(function() {
			PlayerAction.reset();
		});

	PlayerAction.setExecutingAttackTask(tasks);
	FrameTaskExecuter.execTask(tasks);
};
