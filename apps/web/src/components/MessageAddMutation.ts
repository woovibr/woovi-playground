import { graphql } from 'react-relay';

export const MessageAdd = graphql`
  mutation MessageAddMutation($input: MessageAddInput!) {
    MessageAdd(input: $input) {
      message {
        id
        content
        createdAt
      }
    }
  }
`;
