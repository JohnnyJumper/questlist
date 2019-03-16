import gpl from 'graphql-tag';

export const getProfileQuery = gpl`
    query getProfile($id: ID!) {
        user(id: $id) {
            name
            picture
            incompleteQuests {
                name
                type
                description
            }
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