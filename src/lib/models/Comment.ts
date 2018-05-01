export default (sequelize: any, DataTypes: any) => {
	const Comment = sequelize.define('comment', {
		content: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: false
	});

	Comment.associate = (models: any) => {
		Comment.belongsTo(models.Post, {
			/* as: 'post' */
		});

		Comment.belongsTo(models.User, {
			as: 'author'
		});
	};

	return Comment;
}