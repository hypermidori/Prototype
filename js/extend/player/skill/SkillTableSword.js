//=============================================================================
// SkillTableSword.js
//=============================================================================

function SkillTableSword() {
	throw new Error('This is a static class');
}

SkillTableSword.get = function(key) {

	var table = null;

	switch (key) {
		case "s:sword1":
			table = {
				weaponPicturePrefix:"sword/sword1/sword1_",
				normal: {sp:0, func:SkillSword.normalAttack},
				skill_1: {sp:20, func:SkillSword.powerAttack_3},
				skill_2: {sp:15, func:SkillSword.powerAttack_2},
				skill_3: {sp:40, func:SkillSword.powerAttack_1},
			};
			break;

		case "s:sword2":
			table = {
				weaponPicturePrefix:"sword/sword1/sword1_",
				normal: {sp:0, func:SkillSword.normalAttack},
				skill_1: {sp:20, func:SkillSword.powerAttack_3},
				skill_2: {sp:15, func:SkillSword.powerAttack_2},
				skill_3: {sp:40, func:SkillSword.powerAttack_4},
			};
		break;

		case "s:debugsword":
			table = {
				weaponPicturePrefix:"sword/sword1/sword1_",
				normal: {sp:0, func:SkillSword.normalAttack},
				skill_1: {sp:20, func:SkillSword.powerAttack_3},
				skill_2: {sp:15, func:SkillSword.powerAttack_2},
				skill_3: {sp:0, func:SkillSword.powerAttack_4},
			};
		break;

		default:
			table = {
				weaponPicturePrefix:"sword/sword1/sword1_",
				normal: {sp:0, func:SkillSword.normalAttack},
				skill_1: {sp:20, func:SkillSword.powerAttack_3},
				skill_2: {sp:15, func:SkillSword.powerAttack_2},
				skill_3: {sp:40, func:SkillSword.powerAttack_3},
			};
			break;
	}

	return table;

};
