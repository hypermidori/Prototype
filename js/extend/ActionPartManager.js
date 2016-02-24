//=============================================================================
// ActionPartManager.js
//=============================================================================

function ActionPartManager() {
	throw new Error('This is a static class');
}

ActionPartManager.isActionPart = false;
ActionPartManager.spGainCount = 0;
ActionPartManager.passedDungeonMaps = {}; // pretend unique_array
ActionPartManager.isGameOver = false;

ActionPartManager.start = function() {
	// GameOverFlg reset
	ActionPartManager.isGameOver = false;

	// status manager init
	if (PlayerStatusManager.getPlayerStatus() === null) {
		PlayerStatusManager.init();
	}
	EnemyStatusManager.init();

	// gauge init
	var gauge = new Window_Gauge();
	StatusGaugeManager.drawStart(gauge);

	// playerAction init
	PlayerAction.init();

	// delete enemy wakeup selfSwitch
	var switchKeys = $gameSelfSwitches.getKeysWithMapIdAndSwitchId($gameMap.mapId(), "C");
	switchKeys.forEach(function(key) {
		$gameSelfSwitches.setValue(key); 	//delete selfSwitch
	});

	// ActionPartManager init
	ActionPartManager.passedDungeonMaps[$gameMap.mapId()] = true;
	ActionPartManager.isActionPart = true;
};

ActionPartManager.stop = function() {
	PlayerAction.reset();
	ActionPartManager.isActionPart = false;
	PlayerStatusManager.setPlayerStatus(null);

	// delete stage switch
	for(var i = 101; i <= 200; i++) {
		$gameSwitches.setValue(i, false);
	}

	// delete enemy selfSwitch
	Object.keys(ActionPartManager.passedDungeonMaps).forEach(function(mapId) {
		var switchKeys = $gameSelfSwitches.getKeysWithMapId(mapId);

		switchKeys.forEach(function(key) {
			$gameSelfSwitches.setValue(key); //delete selfSwitch
		});
	});
	ActionPartManager.passedDungeonMaps = {};
	FrameTaskExecuter.interrupt();
};

// ActionPart main loop
ActionPartManager.update = function() {
	if (!ActionPartManager.isActionPart) {
		return;
	}

	// auto spGain
	ActionPartManager.autoSpGain();

	// input
	ActionPartInput.updateKeyState();
	ActionPartManager.processInputKey();

	// Draw weapon
	PlayerWeaponPictureManager.update();
};

ActionPartManager.processInputKey = function() {
	var keyCheckFunc = ActionPartInput.isKeyDown;
	if(PlayerAction.isCancelable) keyCheckFunc = ActionPartInput.isLastKey;

	// normal attack key
	if (keyCheckFunc(ActionPartInput.KEY_OK)) {
		PlayerAction.normalAttack();
		return;
	}

	// skill key
	if (keyCheckFunc(ActionPartInput.KEY_CANCEL)) {
		// with arrow
		if (
			ActionPartInput.isPressed(ActionPartInput.KEY_UP) ||
			ActionPartInput.isPressed(ActionPartInput.KEY_DOWN) ||
			ActionPartInput.isPressed(ActionPartInput.KEY_LEFT) ||
			ActionPartInput.isPressed(ActionPartInput.KEY_RIGHT)
		) {
			PlayerAction.skill_2();
			return;
		}

		// with shift
		if(ActionPartInput.isPressed(ActionPartInput.KEY_SHIFT)) {
			PlayerAction.skill_3();
			return;
		}

		PlayerAction.skill_1();
		return;
	}

	// step key
	if (ActionPartInput.isPressed(ActionPartInput.KEY_SHIFT)) {
		if (
			keyCheckFunc(ActionPartInput.KEY_UP) ||
			keyCheckFunc(ActionPartInput.KEY_DOWN) ||
			keyCheckFunc(ActionPartInput.KEY_LEFT) ||
			keyCheckFunc(ActionPartInput.KEY_RIGHT)
		) {
			PlayerAction.step();
			return;
		}
	}
	// step arrowkey start
	if (
		ActionPartInput.isPressed(ActionPartInput.KEY_UP) ||
		ActionPartInput.isPressed(ActionPartInput.KEY_DOWN) ||
		ActionPartInput.isPressed(ActionPartInput.KEY_LEFT) ||
		ActionPartInput.isPressed(ActionPartInput.KEY_RIGHT)
	) {
		if(ActionPartInput.isKeyDown(ActionPartInput.KEY_SHIFT)){
			PlayerAction.step();
			return;
		}
	}

};

ActionPartManager.autoSpGain = function() {
	if (PlayerStatusManager.getPlayerStatus().isAttacking) return;

	ActionPartManager.spGainCount++;
	if (ActionPartManager.spGainCount >= 12) {
		ActionPartManager.spGainCount = 0;
		PlayerStatusManager.getPlayerStatus().gainSp(1);
	}

};

(function() {
	// add mainLoop sequence
	var SceneManager_update_prototype = SceneManager.update;
	SceneManager.update = function() {
		ActionPartManager.update();
		FrameTaskExecuter.update();

		SceneManager_update_prototype.call(this);
	};

	Game_Player.prototype.isDashButtonPressed = function() {
		// always dash
		return true;
	};

	Game_Player.prototype.checkEventTriggerTouch = function(x, y) {
		// not call TouchEvent in actionPart
		if (ActionPartManager.isActionPart) {
			return;
		}

		if (this.canStartLocalEvents()) {
			this.startMapEvent(x, y, [1, 2], true);
		}
	};

	Game_SelfSwitches.prototype.getKeysWithMapId = function(mapId) {
		keys = Object.keys(this._data);
		var result = keys.filter(function(key) {
			keyMapId = key.split(",")[0];

			return keyMapId == mapId;
		});

		return result;
	};

	Game_SelfSwitches.prototype.getKeysWithMapIdAndSwitchId = function(mapId, switchId) {
		keys = Object.keys(this._data);
		var result = keys.filter(function(key) {
			keyMapId = key.split(",")[0];
			keySwitchId = key.split(",")[2];

			return keyMapId == mapId && keySwitchId == switchId;
		});

		return result;
	};

})();
