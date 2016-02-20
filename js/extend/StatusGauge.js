//=============================================================================
// StatusGauge.js
//=============================================================================


function StatusGaugeManager() {
	throw new Error('This is a static class');
}

StatusGaugeManager.window_gauge = null;

StatusGaugeManager.drawStart = function(window_gauge) {
	StatusGaugeManager.window_gauge = window_gauge;
	StatusGaugeManager.window_gauge.drawStatusGauge();
	SceneManager._scene.addWindow(window_gauge);
};


StatusGaugeManager.getWindowGauge = function() {
	return StatusGaugeManager.window_gauge;
};

function Window_Gauge() {
	this.initialize.apply(this, arguments);
}

Window_Gauge.prototype = Object.create(Window_Base.prototype);
Window_Gauge.prototype.constructor = Window_Gauge;

Window_Gauge.prototype.initialize = function() {
	var width = Graphics.boxWidth;
	var height = Graphics.boxHeight;
	Window_Base.prototype.initialize.call(this, 0, 0, 320, 100);

	this.playerStatus = PlayerStatusManager.getPlayerStatus();
	this.hideBackAndFrame();

	this.HP_COLOR_1 = this.hpGaugeColor1();
	this.HP_COLOR_2 = this.hpGaugeColor2();
	this.SP_COLOR_1 = this.textColor(1);
	this.SP_COLOR_2 = this.textColor(0);
	this.SP_COLOR_3 = this.textColor(11);
};

Window_Gauge.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drawStatusGauge();
};

Window_Gauge.prototype.drawStatusGauge = function() {
	this.contents.clearRect(0, 0, 320, 100);

	var hp = this.playerStatus.hp;
	var maxHp = this.playerStatus.maxHp;
	var hpX = 0;
	var hpY = 0;
	var hpWidth = 300;
	var hpRate = hp / maxHp;
	var hpColor1 = this.HP_COLOR_1;
	var hpColor2 = this.HP_COLOR_2;
	var hpStr = "HP " + hp + "/" + maxHp;

	this.drawGauge(hpX, hpY, hpWidth, hpRate, hpColor1, hpColor2);
	this.drawText(hpStr, hpX, hpY, hpWidth, 20);


	var sp = this.playerStatus.sp;
	var maxSp = this.playerStatus.maxSp;
	var spX = 0;
	var spY = 30;
	var spWidth = 300;
	var spRate = sp / maxSp;
	var spColor1 = this.getSpGaugeColor(spRate)[0];
	var spColor2 = this.getSpGaugeColor(spRate)[1];
	var spStr = "SP " + sp + "/" + maxSp;

	this.drawGauge(spX, spY, spWidth, spRate, spColor1, spColor2);
	this.drawText(spStr, spX, spY, spWidth, 20);
};

Window_Gauge.prototype.getSpGaugeColor = function(rate) {
	var color1 = this.SP_COLOR_1;
	var color2 = this.SP_COLOR_2;

	if (rate >= 0.5) {
		color1 = this.SP_COLOR_3;
	}

	return [color1, color2];
};

Window_Gauge.prototype.hideBackAndFrame = function() {
	if (this._windowBackSprite !== null && this._windowFrameSprite !== null) {
		this._windowBackSprite.visible = false;
		this._windowFrameSprite.visible = false;
	}
};
