function bakeTrans(trans) {
	var newTrans = [];
	for (var i = 0; i < trans.length; i++) {
		var tran = new trans[i];
		tran.bakeRotations();
		newTrans.push(tran);
	}
	return newTrans;
}