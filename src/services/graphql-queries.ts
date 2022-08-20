import { gql } from '@apollo/client';

const queries = {
  onAt: gql`
    query Query{
      onAt {
        _id
        program {
          title
          description
          _id
        }
        slot {
          _id
          day
          hourStart
          hourEnd
          minuteStart
          minuteEnd
        }
        presenterName
        from
        to
      }
    }
  `
};

export default queries;
