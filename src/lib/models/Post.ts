export default (sequelize: any, DataTypes: any) => {
	const Post = sequelize.define('post', {
		title: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validator: {
				startsWithUpper: function(title: any) {
					const firstChar = title.charAt(0);
					if (firstChar !== firstChar.toUpperCase()) {
						throw new Error('First letter must be an uppercase letter.');
					} else {
						
					}
				} 
			}
		},
		content: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		}
	}, {
		timestamps: false
	});

	Post.associate = (models: any) => {
		Post.belongsTo(models.User, {
			as: 'author'
		});

		Post.hasMany(models.Comment, {
			as: 'comment'
		});
	};

	return Post;
}