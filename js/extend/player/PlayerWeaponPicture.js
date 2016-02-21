//=============================================================================
// PlayerWeaponPicture.js
//=============================================================================

function PlayerWeaponPictureManager() {
	throw new Error('This is a static class');
}

PlayerWeaponPictureManager.prefix = "";
PlayerWeaponPictureManager.fileId = "";
PlayerWeaponPictureManager.isDisp = false;

PlayerWeaponPictureManager.update = function() {
	if(!PlayerWeaponPictureManager.isDisp) return;
	if(PlayerWeaponPictureManager.fileId === "") return;

	var dispPictureName = PlayerWeaponPictureManager.prefix + PlayerWeaponPictureManager.fileId;
	var pictureX = $gamePlayer.screenX() - 96;
	var pictureY = $gamePlayer.screenY() - 96 - 24;

	// TODO id chache
	$gameScreen.erasePicture(1);
	$gameScreen.showPicture(
		1, dispPictureName, 0, pictureX, pictureY, 100, 100, 255, 0);
};

PlayerWeaponPictureManager.setPrefix = function(prefix) {
	PlayerWeaponPictureManager.prefix = prefix;
};

PlayerWeaponPictureManager.setFileId = function(num) {
	var idNum = ("000" + num).substr(-4);
	var direction = PlayerWeaponPictureManager._getPlayerDirection();
	PlayerWeaponPictureManager._setFileId("" + direction + "_" + idNum);
};

PlayerWeaponPictureManager._setFileId = function(fileId) {
	PlayerWeaponPictureManager.fileId = fileId;
};

PlayerWeaponPictureManager.startDisp = function() {
	PlayerWeaponPictureManager.isDisp = true;
};

PlayerWeaponPictureManager.erase = function() {
	$gameScreen.erasePicture(1);
	PlayerWeaponPictureManager.fileId = "";
	PlayerWeaponPictureManager.isDisp = false;
};

PlayerWeaponPictureManager._getPlayerDirection = function() {
	var direction = -1;
	switch ($gamePlayer._direction) {
		case 8:
			// top
			direction = 0;
			break;
		case 4:
			// left
			direction = 1;
			break;
		case 2:
			// bottom
			direction = 2;
			break;
		case 6:
			// right
			direction = 3;
			break;
	}

	if (direction == -1) {
		throw new Error('invalid direction');
	}

	return direction;
};
