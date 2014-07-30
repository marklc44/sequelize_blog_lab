
function Author(sequelize, DataTypes) {
	var Author =  sequelize.define('author', {
		name: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	},
	{
		// define your own static methods
		classMethods: {
			associate: function(db) {
				// hasMany association here
				Author.hasMany(db.post);
			}
		}
	});
	return Author;
}

module.exports = Author;