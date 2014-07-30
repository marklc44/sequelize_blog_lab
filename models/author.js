
function Author(sequelize, DataTypes) {
	var Author =  sequelize.define('author', {
		name: DataTypes.STRING
	},
	{
		// define your own static methods
		classMethods: {
			associate: function(db) {
				// hasMany association here
				Author.hasMany(db.post, {as: 'Posts'});
			}
		}
	});
	return Author;
}

module.exports = Author;