module.exports = function (stream) {
	return new Promise(function (resolve, reject) {
		stream
			.on('finish', resolve)
			.on('error', reject)
	})
}
