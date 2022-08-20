import { useQuery } from '@apollo/client';
import React from 'react';
import './app.css';
import { Page } from './components/page';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import queries from './services/graphql-queries';
import { TextField } from '@mui/material';

const Home = (props: {}) => {
  // const { loading, error, data, refetch } = useQuery(GET_DOG_PHOTO, {
  //   variables: { breed },
  // });
  
  const { loading, error, data } = useQuery(queries.onAt);
  const [from, setFrom] = React.useState<Date|null>(new Date(Date.now()));
  
  return (
    <Page padding='1em'>
      <DesktopDatePicker
        label="Date"
        inputFormat="dddd DD/MM/yyyy"
        value={from}
        onChange={(value:Date|null) => setFrom(value)}
        renderInput={(params:any) => <TextField variant='standard' {...params} />}
      />
      {error && 
        <>
          <h5>Error:</h5>
          <pre>
            {JSON.stringify(error, null, 2)}
          </pre>
        </>
      }
      <br />
      <div>
        {loading ? 'Loading...' : data &&
          <>
            <h5>Data:</h5>
            <pre>
              {JSON.stringify(data, null, 2)}
            </pre>
          </>
        }
      </div>
    </Page>
  );
}

export default Home;
