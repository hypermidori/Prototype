//=============================================================================
// SkillTableSword.js
//=============================================================================

function SkillTableSword() {
	throw new Error('This is a static class');
}

SkillTableSword.get = function(key) {

	var table = null;

	switch (key) {
		case "s:sword":
			table = {
				normal: {sp:0, func:SkillSword.normalAttack},
				skill_1: {sp:20, func:SkillSword.powerAttack_3},
				skill_2: {sp:15, func:SkillSword.powerAttack_2},
				skill_3: {sp:40, func:SkillSword.powerAttack_1},
			};
			break;

		default:
			table = {
				normal: {sp:0, func:SkillSword.normalAttack},
				skill_1: {sp:20, func:SkillSword.powerAttack_3},
				skill_2: {sp:15, func:SkillSword.powerAttack_2},
				skill_3: {sp:40, func:SkillSword.powerAttack_3},
			};
			break;
	}

	return table;

};
