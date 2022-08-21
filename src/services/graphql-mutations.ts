import { gql } from '@apollo/client';

const mutations = {
  addEvent: gql`
    mutation Mutation($programId: ID!, $slotId: ID!, $presenterName: String!, $from: Date!, $to: Date!) {
      addEvent(programId: $programId, slotId: $slotId, presenterName: $presenterName, from: $from, to: $to) {
        _id
      }
    }
  `,
  addSlot: gql`
    mutation Mutation($programId: ID!, $slotId: ID!, $presenterName: String!, $from: Date!, $to: Date!) {
      addEvent(programId: $programId, slotId: $slotId, presenterName: $presenterName, from: $from, to: $to) {
        _id
        todo
      }
    }
  `,
  deleteEvent: gql`
    mutation DeleteEvent($_id: String!) {
      deleteEvent(_id: $_id) {
        acknowledged
        deletedCount
      }
    }
  `,
};

export default mutations;
