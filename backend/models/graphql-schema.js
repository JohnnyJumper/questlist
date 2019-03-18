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
		picture: {type: GraphQLString},
		email: {type: GraphQLString},
		gender: {type: GraphQLString},
		quests: {
			type: new GraphQLList(QuestType),
			resolve(parent, args) {
				return Quests.find({userID: parent.id})
			}
		},
		incompleteQuests: {
			type: new GraphQLList(QuestType),
			resolve(parent, args) {
				return Quests.find({userID: parent.id, completed: false});
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
        id: {type: GraphQLID},
		user: {
			type: UserType,
			resolve(parent, args) {
				return Users.findById(parent.userID);
			}
		}
	})
})


const StatisticType = new GraphQLObjectType({
	name: 'statistic',
	fields: () => ({
		completed: { type: GraphQLInt },
		incompleted: { type: GraphQLInt },
		total: { type: GraphQLInt}
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
				id: {type: GraphQLID}
			},
			resolve(parent, args) {
				return Users.findById(args.id);
			}
		},
		quests: {
			type: new GraphQLList(QuestType),
			args: {
				id: {type: GraphQLID}
			},
			resolve(parent, args) {
				return Quests.find({userID: args.id})
			}
		},
		statistics: {
			type: StatisticType,
			args: {
                userID: {type: GraphQLID}
			},
			resolve(parent, args) {
				const {userID} = args;
				const incompleted = Quests.count({userID, completed: false});
				const completed = Quests.count({userID, completed:true});
				const total = Quests.count({userID});
				return {incompleted, completed, total};
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
        },
        updateQuestStatus: {
            type: QuestType,
            args: {
                completed: {type: GraphQLBoolean},
                questID: {type: GraphQLID}
            },
            resolve(parent, args) {
                const {completed, questID} = args;
                return Quests.findById(questID)
                .then(doc => {
                    doc.completed = completed;
                    return doc.save();
                })
                .catch(err => err);
            }
        },
        updateQuest: {
            type: QuestType,
            args: {
                questID: {type: new GraphQLNonNull(GraphQLID)},
                completed: {type: GraphQLBoolean},
                description: {type: GraphQLString},
            },
            resolve(parent, args) {
                const {completed, description, questID} = args;
                return Quests.findById(questID)
                .then(doc => {
                    if (typeof completed !== 'undefined') doc.completed = completed;
                    if (typeof description !== 'undefined') doc.description = description;
                    console.log(doc);
                    return doc.save();
                })
                .catch(err => err);
            }
        }
	}
})


module.exports = new GraphQLSchema({
	query: RootQueryType,
	mutation: Mutation
});