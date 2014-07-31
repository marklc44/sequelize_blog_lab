module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
    		'authors',
    		'username', {
    			type: DataTypes.STRING,
    			allowNull: false
    		}
    		
    	).complete(done);
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.removeColumn('authors', 'username').complete(done);
  }
}
