const graphql = require('graphql');

const Users = require('./users');
const Quests = require('./quests');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean,
} = graphql;

const UserType = new GraphQLObjectType({
	name: 'user',
	fields: () => ({
		name: {type: GraphQLString},
		id: {type: GraphQLID},
		quests: {
			type: new GraphQLList(QuestType),
			resolve(parent, args) {
				return Quests.find({userID: parent.id})
			}
		}
	})
});

const QuestType = new GraphQLObjectType({
	name: 'quest',
	fields: () => ({
		name: {type: GraphQLString},
		type: {type: GraphQLString},
		completed: {type: GraphQLBoolean},
		description: {type: GraphQLString},
		userID: {type: GraphQLID},
		user: {
			type: UserType,
			resolve(parent, args) {
				return Users.findById(parent.userID);
			}
		}
	})
})


const RootQueryType = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return Users.find({});
			}
		},
		user: {
			type: UserType,
			args: {
				id: {type: GraphQLString}
			},
			resolve(parent, args) {
				return Users.findById({id: args.id});
			}
		},
		quests: {
			type: new GraphQLList(QuestType),
			resolve(parent, args) {
				return Quests.find({})
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addQuest: {
			type: QuestType,
			args: {
				name: {type: new GraphQLNonNull(GraphQLString)},
				type: {type: new GraphQLNonNull(GraphQLString)},
				completed: {type: GraphQLBoolean},
				description: {type: new GraphQLNonNull(GraphQLString)},
				userID: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args) {
				const {name, type, completed, description, userID} = args;
				let quest = new Quests({name, type, completed, description, userID});
				return quest.save();
			}
		}
	}
})


module.exports = new GraphQLSchema({
	query: RootQueryType,
	mutation: Mutation
});