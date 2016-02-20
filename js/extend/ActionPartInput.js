//=============================================================================
// ActionPartInput.js
//=============================================================================

function ActionPartInput() {
	throw new Error('This is a static class');
}

ActionPartInput.KEY_SHIFT = "shift";
ActionPartInput.KEY_UP = "up";
ActionPartInput.KEY_DOWN = "down";
ActionPartInput.KEY_LEFT = "left";
ActionPartInput.KEY_RIGHT = "right";
ActionPartInput.KEY_OK = "ok";
ActionPartInput.KEY_CANCEL = "cancel";

ActionPartInput._keyMap = {};
ActionPartInput._keyMap[ActionPartInput.KEY_SHIFT] = {};
ActionPartInput._keyMap[ActionPartInput.KEY_UP] = {};
ActionPartInput._keyMap[ActionPartInput.KEY_DOWN] = {};
ActionPartInput._keyMap[ActionPartInput.KEY_LEFT] = {};
ActionPartInput._keyMap[ActionPartInput.KEY_RIGHT] = {};
ActionPartInput._keyMap[ActionPartInput.KEY_OK] = {};
ActionPartInput._keyMap[ActionPartInput.KEY_CANCEL] = {};

ActionPartInput.KEYS = [
	ActionPartInput.KEY_SHIFT,
	ActionPartInput.KEY_UP,
	ActionPartInput.KEY_DOWN,
	ActionPartInput.KEY_LEFT,
	ActionPartInput.KEY_RIGHT,
	ActionPartInput.KEY_OK,
	ActionPartInput.KEY_CANCEL
];

ActionPartInput._lastKey = {
	key: null,
	frame: 0
};

ActionPartInput.updateKeyState = function() {
	ActionPartInput.KEYS.forEach(function(key) {
		var state;
		if (Input.isPressed(key)) {
			state = ActionPartInput._keyMap[key];
			state.isPressed = true;
			state.pressFrame += 1;

			// update last input key
			if (state.pressFrame === 1) {
				ActionPartInput._lastKey.key = key;
				ActionPartInput._lastKey.frame = 0;
			}
		} else {
			state = ActionPartInput._keyMap[key];
			state.isPressed = false;
			state.pressFrame = 0;
		}
	}.bind(this));

	ActionPartInput._lastKey.frame++;
};

ActionPartInput.isPressed = function(key) {
	var state = ActionPartInput._keyMap[key];

	return state.isPressed;
};

ActionPartInput.isKeyDown = function(key) {
	var state = ActionPartInput._keyMap[key];

	return (state.isPressed === true && state.pressFrame === 1);
};

ActionPartInput.isLastKey = function(key) {
	return ActionPartInput._lastKey.key === key && ActionPartInput._lastKey.frame <= 10;
};
