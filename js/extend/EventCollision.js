//=============================================================================
// EnemyEventCollision.js
//=============================================================================

function EnemyEventCollision() {
	this.enemyEventList = [];
	this.enemyEventPrefix = "e:";
}

// 敵イベント判定用プレフィクスset
EnemyEventCollision.prototype.setEnemyEventPrefix = function(prefix) {
	this.enemyEventPrefix = prefix;
};


// マップ上のエネミーイベント抽出
EnemyEventCollision.prototype.updateEnemyEventList = function() {
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

EnemyEventCollision.prototype.judgeCollision = function(rect) {
	return this._judgeCollision(rect.left, rect.right, rect.top, rect.bottom);
};

// プレイヤー位置を基準点として当たり判定
EnemyEventCollision.prototype._judgeCollision = function(left, right, top, bottom) {
	var hitEnemyList = [];

	var hitLeft = $gamePlayer._realX + left;
	var hitRight = $gamePlayer._realX + right;
	var hitTop = $gamePlayer._realY + top;
	var hitBottom = $gamePlayer._realY + bottom;

	this.enemyEventList.forEach(function(event) {

		var isHit = true;
		if (event._realX < hitLeft || event._realX > hitRight) {
			isHit = false;
		}
		if (event._realY < hitTop || event._realY > hitBottom) {
			isHit = false;
		}

		if (isHit) {
			hitEnemyList.push(event);
		}

	}.bind(this));

	return hitEnemyList;
};

function CollisionRectangle(left, right, top, bottom) {
	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;
}

CollisionRectangle.prototype.rotateLeft = function() {
	var orig = new CollisionRectangle(this.left, this.right, this.top, this.bottom);

	this.left = orig.top;
	this.bottom = orig.left * -1;
	this.right = orig.bottom;
	this.top = orig.right * -1;

	return this;
};


$enemyEventCollision = new EnemyEventCollision();
