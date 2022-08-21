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
  `,
  events: gql`
    query Query($to: Date, $from: Date) {
      getSlotEvents(to: $to, from: $from) {
        _id
        program {
          title
          description
          _id
        }
        slot {
          minuteEnd
          minuteStart
          hourEnd
          hourStart
          day
          _id
        }
        presenterName
        from
        to
      }
    }
  `,
  programs: gql`
    query Query {
      programs {
        _id
        title
        description
      }
    }
  `,
  slots: gql`
    query Query {
      slots {
        _id
        day
        hourStart
        hourEnd
        minuteStart
        minuteEnd
      }
    }
  `,
};

export default queries;
