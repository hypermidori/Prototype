//=============================================================================
// PlayerStatus.js
//=============================================================================

function PlayerStatusManager() {
	throw new Error('This is a static class');
}

PlayerStatusManager.playerStatus = null;


PlayerStatusManager.getPlayerStatus = function() {
	return PlayerStatusManager.playerStatus;
};

PlayerStatusManager.setPlayerStatus = function(status) {
	PlayerStatusManager.playerStatus = status;
};

PlayerStatusManager.init = function(enemy) {
	PlayerStatusManager._initPlayerStatus();
};

PlayerStatusManager._initPlayerStatus = function() {
	var actor = $gameActors.actor(1);
	var status = new PlayerStatus();

	status.hp = actor.hp;
	status.maxHp = actor.mhp;
	status.sp = actor.mmp;
	status.maxSp = actor.mmp;

	status.atk = actor.atk;
	status.def = actor.def;

	status.skill = PlayerStatusManager._getWaponSkill(actor);

	PlayerStatusManager.playerStatus = status;
};

// TODO move SkillLoader class
PlayerStatusManager._getWaponSkill = function(actor) {
	var skill = {};

	var weapon = actor.weapons()[0];

	if (weapon) {
		var key = weapon.note;
		switch (weapon.wtypeId) {
			case 2:
				skill = SkillTableSword.get(key);
				break;

		}
	}

	return skill;
};

PlayerStatusManager.processPlayerDamage = function(enemy) {
	var enemyStatus = EnemyStatusManager.getEnemyStatus(enemy);
	var damage = DamageCalculator.calcAttackDamage(enemyStatus, this.playerStatus, 1);

	this.playerStatus.reduceHp(damage);

	// death TODO rewrite
	if (this.playerStatus.hp <= 0) {
		SceneManager.goto(Scene_Gameover);
	}
};

function PlayerStatus() {
	this.hp = 100;
	this.maxHp = 100;
	this.sp = 0;
	this.maxSp = 100;
	this.isAttacking = false;

	this.atk = 1;
	this.def = 1;

	this.skill = null;
}

PlayerStatus.prototype.reduceHp = function(reduceHp) {
	this.hp -= reduceHp;
	if (this.hp < 0) {
		this.hp = 0;
	}
};

PlayerStatus.prototype.gainHp = function(gainHp) {
	this.hp += gainHp;
	if (this.hp > this.maxHp) {
		this.hp = this.maxHp;
	}
};

PlayerStatus.prototype.reduceSp = function(reduceSp) {
	this.sp -= reduceSp;
	if (this.sp < 0) {
		this.sp = 0;
	}
};

PlayerStatus.prototype.gainSp = function(gainSp) {
	this.sp += gainSp;
	if (this.sp > this.maxSp) {
		this.sp = this.maxSp;
	}
};
