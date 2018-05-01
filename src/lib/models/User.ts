export default (sequelize: any, DataTypes: any) => {
	const User = sequelize.define('user', {
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		token: {
			type: DataTypes.STRING,
		}
	}, {
		timestamps: false
	});

	// User.associate = (models: any) => {
	// 	User.belongsToMany(models.Post, {
	// 		through: 'post',
	// 		foreignKey: 'author'
	// 	});

	// 	User.belongsToMany(models.Comment, {
	// 		through: 'comment',
	// 		foreignKey: 'author'
	// 	});
	// };

	
	return User;
}