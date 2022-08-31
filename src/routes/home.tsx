import { useLazyQuery } from '@apollo/client';
import React from 'react';
import { Page } from '../components/page';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import queries from '../services/graphql-queries';
import { Button, TextField } from '@mui/material';
import WithLoadingIndicator from '../components/with-loading-indicator';
import Grid from '../components/grid';

const Home = (props: {}) => {
  const [getOnAt, onAt] = useLazyQuery(queries.onAt);
  const [from, setFrom] = React.useState<Date|null>(new Date(Date.now()));
  
  React.useEffect(() => {
    getOnAt();
  }, [getOnAt]);
  
  return (
    <Page padding='1em'>
      <Button disabled={onAt.loading} variant="contained" color='info' onClick={() => getOnAt()}>
        {onAt.loading ? 'Loading...' : 'Refresh'}
      </Button>
      <br />
      <br />
      <DesktopDatePicker
        label="Date"
        inputFormat="dddd DD/MM/yyyy"
        value={from}
        onChange={(value:Date|null) => setFrom(value)}
        renderInput={(params:any) => <TextField variant='standard' {...params} />}
      />
      <Grid />
    </Page>
  );
}

export default Home;
