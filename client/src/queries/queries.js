import gpl from 'graphql-tag';

export const getProfileQuery = gpl`
    query getProfile($id: ID!) {
        user(id: $id) {
            name
            picture
        }
    }
`;

export const getStatisticsQuery = gpl`
    query getStatistics($id: ID!) {
        statistics(userID: $id) {
            completed
            incompleted
            total
        }
    }
`;

export const getIncompleteQuestsQuery = gpl`
    query getIncompleteQuests($id: ID!) {
        user(id: $id) {
            incompleteQuests {
                name
                type
                description
                completed
                id
            }
        }
    }
`;