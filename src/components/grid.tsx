import React from 'react'
import { Button, Card, CardActions, CardContent, Typography, Grid, Divider } from '@mui/material';
import { days, EventDocument, slotToStrings } from '../models';
import { useLazyQuery } from '@apollo/client';
import queries from '../services/graphql-queries';
import WithLoadingIndicator from './with-loading-indicator';
import EventDetailsModal from './event-details-modal';
import RefreshIcon from '@mui/icons-material/Refresh';

const SlotGrid = () => {
  const [getSlots, slots] = useLazyQuery(queries.events);
  const [selectedEvent, setSelectedEvent] = React.useState<EventDocument | null>(null);
  
  const refresh = () => {
    getSlots();
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => refresh(), []);
  
  const events = slots.data?.getSlotEvents;
  
  return(
    <div>
      <Button disabled={slots.loading === true} onClick={() => refresh()}>
        <RefreshIcon color={slots.loading === true ? 'disabled' : 'primary'}/>
      </Button>
      <WithLoadingIndicator loading={slots.loading}>
        {slots.error ?
          <>
            <h5>Error:</h5>
            <pre>
              {JSON.stringify(slots.error, null, 2)}
            </pre>
          </>
          : events &&
          <Grid container columns={7}>
            {[0, 1, 2, 3, 4, 5, 6].map((day, key) =>
              <Grid container item direction='column' key={key} xs>
                <Grid item key={key}>
                  <Typography variant="h5" textAlign='center'>
                    {days[day]}
                  </Typography>
                  <Divider sx={{m:1}}/>
                </Grid>
                {events.map((event: EventDocument, key: number) => event.slot?.day === day && (
                  <Grid item key={key}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6">
                          {event.program?.title}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom={true}>
                          {event.presenterName}
                        </Typography>
                        <Typography variant="body2">
                          {slotToStrings(event.slot).time}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" variant="outlined" fullWidth={true} onClick={() => setSelectedEvent(event)}>
                          Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              }
              </Grid>
            )}
          </Grid>
        }
        <EventDetailsModal
          refresh={() => refresh()}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      </WithLoadingIndicator>
    </div>
  )
}
export default SlotGrid;
