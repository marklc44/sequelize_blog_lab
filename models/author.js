var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);


function Author(sequelize, DataTypes) {
	var Author =  sequelize.define('author', {
		name: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
		username: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				len: [6, 30]
			}
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		}
	},
	{
		// define your own static methods
		classMethods: {
			associate: function(db) {
				// hasMany association here
				Author.hasMany(db.post);
			},
			encryptPass: function(password) {
				return bcrypt.hashSync(password, salt);
			},
			comparePass: function(userpass, dbpass) {
				return bcrypt.compareSync(userpass, dbpass);
			},
			createNewUser: function(username, password, name, err, success) {
				if (password.length < 6) {
					err({message: "Your password should be at least 6 characters long."});
				} else {
					Author.create({
						username: username,
						name: name,
						password: Author.encryptPass(password)
					}).error(function(error) {
						console.log(error);
						if(error.username) {
							err({message: "Your username should be at least 6 characters long.", username: username});
						} else {
							err({message: "That username already exists.", username: username});
						}
					}).success(function(author) {
						success({message: "Account created. Please login now.", author: author});
					});
				}
			},
			authorize: function(username, password, err, success) {
				Author.find({
					where: {
						username: username
					}
				}).done(function(error, author){
					if(error) {
						console.log(error);
						err({message: "Oops! Something went wrong"});
					} else if (author === null) {
						err({message: "Username does not exist"});
					} else if (Author.comparePass(password, author.password) === true) {
						success(author);
					} else {
						err({message: "Invalid password"});
					}

				});
			}
			
		}
	});
	return Author;
}

module.exports = Author;