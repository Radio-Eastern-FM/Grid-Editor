import React from 'react'
import { List, Button, Card, CardContent, Divider, ListItem, ListItemText, Modal, TextField, useTheme, Typography, Autocomplete, Grid } from '@mui/material';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import queries from '../services/graphql-queries';
import { EventDocument, ProgramDocument, SlotDocument, slotToString } from '../models';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import mutations from '../services/graphql-mutations';

const ModalCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  min-width: 20em;
  max-width: 60em;
  min-height: 20em;
  padding: 2em;
  border: 2px solid ${({theme}) => theme.palette?.divider};
`;

interface IFormInput {
  presenterName: string,
  slot: SlotDocument|null
  program: ProgramDocument|null
  from: Date,
  to: Date,
  
}

const defaultFormInput = {
  presenterName: "",
  from: new Date(),
  slot: null,
  program: null,
  to: new Date()
} as IFormInput;


const NewEventModal = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const programs = useQuery(queries.programs);
  const slots = useQuery(queries.slots);
  
  const [addEvent, addEventResult] = useMutation(mutations.addEvent);
  
  const [formInput, setFormInput] = React.useReducer(
    (state: IFormInput, newState: IFormInput) => ({ ...state, ...newState }), defaultFormInput
  );
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newEvent: EventDocument = {
      programId: formInput.program?._id ?? '',
      slotId: formInput.slot?._id ?? '',
      presenterName: formInput.presenterName,
      from: formInput.from,
      to: formInput.to
    }
    addEvent({variables: {...newEvent}});
  };
  
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target?.name;
    const newValue = e.target?.value;
    setFormInput({
      ...formInput,
      [name]: newValue
    } as IFormInput);
  }
  
  React.useEffect(() => {
    if(!addEventResult.loading === true && addEventResult.data){
      console.log(addEventResult?.data);
      setIsOpen(false);
      setFormInput(defaultFormInput);
    }
  }, [addEventResult.data, addEventResult.loading]);
  
  return(
    <>
      <Button variant='contained' onClick={() => setIsOpen(true)}>
        New Event
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalCard theme={theme} variant="outlined">
          <CardContent>
            <Typography variant="h3">
              Create new event
            </Typography>
            <form onSubmit={handleSubmit}>
              <List>
                <ListItem>
                  <ListItemText primary="Presenter Name" />
                  <TextField
                    variant='standard'
                    name='presenterName'
                    value={formInput.presenterName}
                    required={true}
                    onChange={handleInput}
                  />
                </ListItem>
                <ListItem>
                  <Autocomplete
                    fullWidth={true}
                    options={programs?.data?.programs.map((program: ProgramDocument) => 
                      ({label: program.title, _id: program._id})) ?? []} 
                    value={formInput.program}
                    onChange={(e: any, newValue: ProgramDocument|null) => setFormInput({
                      ...formInput,
                      program: newValue ?? formInput.program
                    })}
                    renderInput={(params) => 
                      <TextField
                        variant='standard'
                        required={true}
                        label="Program"
                        {...params}
                      />}
                  />
                </ListItem>
                <ListItem>
                  <Autocomplete
                    fullWidth={true}
                    options={slots?.data?.slots ?? []} 
                    value={formInput.slot}
                    getOptionLabel={(option: SlotDocument) => slotToString(option)}
                    onChange={(e: any, newValue: SlotDocument|null) => setFormInput({
                      ...formInput,
                      slot: newValue ?? formInput.slot
                    })}
                    renderInput={(params) => 
                      <TextField
                        variant='standard'
                        required={true}
                        label="Slot"
                        {...params}
                      />}
                  />
                </ListItem>
                <ListItem>
                  <DesktopDatePicker
                    label="Start"
                    inputFormat="DD/MM/yyyy"
                    value={formInput.from}
                    onChange={(newValue) => setFormInput({
                      ...formInput,
                      'from': newValue ?? formInput.from
                    })}
                    renderInput={(params:any) => <TextField fullWidth={true} required={true} variant='standard' {...params} />}
                  />
                  <Divider orientation="vertical" flexItem sx={{mx: 3}}/>
                  <DesktopDatePicker
                    label="End"
                    inputFormat="DD/MM/yyyy"
                    value={formInput.to}
                    onChange={(newValue) => setFormInput({
                      ...formInput,
                      'to': newValue ?? formInput.to
                    })}
                    renderInput={(params:any) => <TextField fullWidth={true} required={true} variant='standard' {...params} />}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setIsOpen(false)
                        setFormInput(defaultFormInput);
                      }}
                      color="error"
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      disabled={addEventResult.loading === true}
                      type="submit"
                    >
                      {addEventResult.loading ? 'Creating Event...' : 'Create'}
                    </Button>
                  </Grid>
                  </Grid>
                </ListItem>
              </List>
            </form>
            {addEventResult.error &&
              <Typography color="error" variant="caption">
                {addEventResult.error.message}
              </Typography>
            }
          </CardContent>
        </ModalCard>
      </Modal>
    </>
  )
}
export default NewEventModal;
