//=============================================================================
// DamageCalculator.js
//=============================================================================
function DamageCalculator() {
	throw new Error('This is a static class');
}

DamageCalculator.calcAttackDamage = function(attackerStatus, defenderStatus, rate) {
	var damage = attackerStatus.atk / 2 - defenderStatus.def / 4;
	damage *= rate;
	damage = Math.round(damage);
	if (damage <= 0) damage = 1;

	return damage;
};
