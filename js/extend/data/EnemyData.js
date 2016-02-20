//=============================================================================
// EnemyData.js
//=============================================================================


function EnemyData() {
	throw new Error('This is a static class');
}

EnemyData.enemyList = {
	"master": {
		name: "master",
		hp: 100,
		atk: 30,
		def: 30,
	},
	"hyperMaster": {
		name: "hyperMaster",
		hp: 30,
		atk: 10,
		def: 10,
		disableBlowOff: true
	},
	"eventMaster": {
		name: "hyperMaster",
		hp: 30,
		atk: 10,
		def: 10,
		selfSwitch: "D"
	},

	"default": {
		name: "default",
		hp: 30,
		atk: 1,
		def: 1,
	}
};
