//=============================================================================
// PlayerAttackCollision.js
//=============================================================================

function PlayerAttackCollision() {
	// TODO change to static class
	this.enemyEventList = [];
	this.enemyEventPrefix = "e:";
}

// 敵イベント判定用プレフィクスset
PlayerAttackCollision.prototype.setEnemyEventPrefix = function(prefix) {
	this.enemyEventPrefix = prefix;
};


// マップ上のエネミーイベント抽出
PlayerAttackCollision.prototype.updateEnemyEventList = function() {
	this.enemyEventList = [];
	$gameMap._events.forEach(function(event) {
		if ($gameSelfSwitches.value([$gameMap.mapId(), event.eventId(), "D"])) {
			return; // 消去済みのエネミーは最初で弾く
		}

		// 敵イベントをプレフィクスで引っ掛ける
		if (event.event().name.lastIndexOf(this.enemyEventPrefix, 0) === 0) {
			this.enemyEventList.push(event);
		}
	}.bind(this));
};

PlayerAttackCollision.prototype.judgeCollision = function(rect) {
	return this._judgeCollision(rect);
};

PlayerAttackCollision.prototype._judgeCollision = function(rect) {
	var hitEnemyList = [];

	this.enemyEventList.forEach(function(event) {
		var isHit = rect.judge($gamePlayer, event);

		if (isHit) {
			hitEnemyList.push(event);
		}

	}.bind(this));

	return hitEnemyList;
};

function EnemyAttackColision(){
	throw new Error('This is a static class');
}

/**
 * [function description]
 * @param  {Game_CharacterBase} enemy
 * @param  {CollisionRectangle} rect
 * @return {boolean} judge result
 */
EnemyAttackColision.judgeCollision = function(enemy, rect) {
	return rect.judge(enemy, $gamePlayer);
};

/**
 * [CollisionRectangle description]
 * @constructor
 * @param {Number} left
 * @param {Number} right
 * @param {Number} top
 * @param {Number} bottom
 */
function CollisionRectangle(left, right, top, bottom) {
	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;
}

/**
 * [function description]
 * @return {CollisionRectangle} rotate rectangle
 */
CollisionRectangle.prototype.rotateLeft = function() {
	var orig = new CollisionRectangle(this.left, this.right, this.top, this.bottom);

	this.left = orig.top;
	this.bottom = orig.left * -1;
	this.right = orig.bottom;
	this.top = orig.right * -1;

	return this;
};

/**
 * [function description]
 * @param  {Game_CharacterBase} attacker
 * @param  {Game_CharacterBase} defender
 * @return {boolean} judge result
 */
CollisionRectangle.prototype.judge = function(attacker, defender) {
	var rect = this;

	var hitLeft = attacker._realX + rect.left;
	var hitRight = attacker._realX + rect.right;
	var hitTop = attacker._realY + rect.top;
	var hitBottom = attacker._realY + rect.bottom;

	var isHit = true;
	if (defender._realX < hitLeft || defender._realX > hitRight) {
		isHit = false;
	}
	if (defender._realY < hitTop || defender._realY > hitBottom) {
		isHit = false;
	}

	return isHit;
};

$enemyEventCollision = new PlayerAttackCollision();
