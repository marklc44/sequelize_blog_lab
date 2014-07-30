function Post(sequelize, DataTypes) {
	var Post = sequelize.define('post', {
		title: DataTypes.STRING,
		content: DataTypes.TEXT,
		authorId: {
			type: DataTypes.INTEGER,
			foreignKey: true
		}},
		{
			classMethods: {
				associate: function(db) {
					Post.belongsTo(db.author);
				}
			}
		
	});
	return Post;
};

module.exports = Post;
