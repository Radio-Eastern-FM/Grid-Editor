import React from 'react'
import { Button, Card, CardContent, Modal, useTheme, Typography, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { EventDocument, slotToStrings } from '../models';
import mutations from '../services/graphql-mutations';

const ModalCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  min-width: 20em;
  min-height: 20em;
  padding: 2em;
  border: 2px solid ${({theme}) => theme.palette?.divider};
`;

const EventDetailsModal = (props: { selectedEvent:EventDocument | null, setSelectedEvent: Function, refresh: Function}) => {
  const theme = useTheme();
  const {selectedEvent, setSelectedEvent} = props;
  
  const [deleteEvent, deleteEventResult] = useMutation(mutations.deleteEvent);
  
  const [isDeletePending, setIsDeletePending] = React.useState(false);
  
  React.useEffect(() => {
    // Reset mutation after delete canceled, defocused, or confirmed.
    if(!isDeletePending){
      deleteEventResult.reset();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeletePending, props, props.refresh]);
  React.useEffect(() => {
    if(!deleteEventResult.loading){
      if(deleteEventResult.data){
        setIsDeletePending(false);
        setSelectedEvent(false);
        console.log(deleteEventResult.data);
        props.refresh();
      }
      else if(deleteEventResult.error){
        console.error(`Error when deleting event`, deleteEventResult.error);
      }
    }
  }, [deleteEventResult.data, deleteEventResult.error, deleteEventResult.loading, props, setSelectedEvent]);
  
  return (
    <>{selectedEvent && 
      <Modal open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
        <ModalCard theme={theme} variant="outlined">
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom={true}>
              <em>{selectedEvent.program?.title}</em> with {selectedEvent.presenterName}
            </Typography>
            <Typography variant="caption">
              {slotToStrings(selectedEvent.slot).day}&apos;s at&nbsp;
              {slotToStrings(selectedEvent.slot).time}
            </Typography>
            <br />
            <Typography>
              {selectedEvent.program?.description}
            </Typography>
            <Button color="error" onClick={() => {
              setIsDeletePending(true);
            }}>
              Delete Event
            </Button>
            <Dialog
              open={isDeletePending}
              onClose={() => setIsDeletePending(false)}
            >
              <DialogTitle>
                {"Are you sure you want to delete this event?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You won't be able to reverse this action.
                </DialogContentText>
                {deleteEventResult.error &&
                  <DialogContentText>
                    <Typography color="error" variant="caption">
                      {deleteEventResult.error.message}
                      <br />
                    </Typography>
                  </DialogContentText>
                }
                {selectedEvent._id}
              </DialogContent>
              <DialogActions>
                <Button autoFocus color="info" onClick={() => setIsDeletePending(false)}>
                  Cancel
                </Button>
                <Button color="error" onClick={() => {
                  deleteEvent({variables: { _id: selectedEvent._id } });
                }}>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </ModalCard>
      </Modal>
      }
    </>
  )
}
export default EventDetailsModal;
