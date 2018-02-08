function helper() {

	function compareDates(a, b) {
		var date1 = new Date(a.date_added);
		var date2 = new Date(b.date_added);
		return date1 > date2 ? -1 : date1 < date2  ? 1 : 0;
	}

}

module.exports = helper;
