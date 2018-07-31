import gql from "graphql-tag";

const GET_MESSAGES_QUERY = gql`
query ($user_id: ID!) {
    user(where: {id: $user_id}) {
        id
        mobile
        email
        type
        name
        gender
        city
        state
        createdAt
        updatedAt
        channels {
            id
            title
            description
            segment
            owner {
                id
                name
                city
                state
            }
            createdAt
        }
        subscriptions {
            channel {
                id
                title
                description
                segment
                owner {
                    id
                    name
                    city
                    state
                }
                createdAt
            }
        }
    }
}`;

export {
    GET_MESSAGES_QUERY
}