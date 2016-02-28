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
		atk: 40,
		def: 30,
		superarmor: false,
		touchdamage: false,
		routeFunc: EnemyMoveRoute.getOakMoveRoute,
	},
	"slime": {
		name: "slime",
		hp: 50,
		atk: 40,
		def: 30,
		superarmor: false,
		touchdamage: false,
	},
	"minotaurus": {
		name: "minotaurus",
		hp: 200,
		atk: 60,
		def: 30,
		superarmor: true,
		touchdamage: false,
	},
	"default": {
		name: "default",
		hp: 30,
		atk: 1,
		def: 1,
		touchdamage: true,
	}
};
