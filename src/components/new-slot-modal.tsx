import React from 'react'
import { List, Button, Card, CardContent, Divider, ListItem, Modal, TextField, useTheme, Typography, Autocomplete, Grid } from '@mui/material';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { days, SlotDocument } from '../models';
import { TimePicker } from '@mui/x-date-pickers';
import mutations from '../services/graphql-mutations';
import moment from 'moment';

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
  day: number
  start: Date,
  end: Date,
}

const defaultFormInput = {
  day: 0,
  start: new Date(),
  end: new Date(),
} as IFormInput;


const NewSlotModal = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const [addSlot, addSlotResult] = useMutation(mutations.addSlot);
  
  const [formInput, setFormInput] = React.useReducer(
    (state: IFormInput, newState: IFormInput) => ({ ...state, ...newState }), defaultFormInput
  );
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newSlot: SlotDocument = {
      day: formInput.day,
      hourStart: new Date(formInput.start).getHours(),
      minuteStart: new Date(formInput.start).getMinutes(),
      hourEnd: new Date(formInput.end).getHours(),
      minuteEnd: new Date(formInput.end).getMinutes(),
    }
    
    console.log(newSlot);
    
    addSlot({variables: {...newSlot}});
  };
  
  
  React.useEffect(() => {
    if(!addSlotResult.loading === true && addSlotResult.data){
      console.log(addSlotResult?.data);
      setIsOpen(false);
      setFormInput(defaultFormInput);
    }
  }, [addSlotResult.data, addSlotResult.loading]);
  
  const timeDiff = (start: Date, end: Date) => {
    const from = moment(start);
    const to = moment(end);
    
    return `${to.diff(from, 'hours')}h ${to.diff(from, 'minutes')}m`;
  }
  
  return(
    <>
      <Button variant='contained' onClick={() => setIsOpen(true)}>
        New Slot
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalCard theme={theme} variant="outlined">
          <CardContent>
            <Typography variant="h3">
              Create new slot
            </Typography>
            <form onSubmit={handleSubmit}>
              <List>
                {/* <ListItem>
                  <ListItemText primary="Presenter Name" />
                  <TextField
                    variant='standard'
                    name='presenterName'
                    value={formInput.presenterName}
                    required={true}
                    onChange={handleInput}
                  />
                </ListItem>
                */}
                <ListItem>
                  <Autocomplete
                    fullWidth={true}
                    options={[0, 1, 2, 3, 4, 5, 6]}
                    value={formInput.day}
                    getOptionLabel={(option: number) => days[option]}
                    onChange={(e: any, newValue: number|null) => setFormInput({
                      ...formInput,
                      day: newValue ?? formInput.day,
                    })}
                    renderInput={(params) => 
                      <TextField
                        variant='standard'
                        required={true}
                        label="Day"
                        {...params}
                      />}
                  />
                </ListItem>
                <ListItem>
                  <TimePicker
                    label="Start Time"
                    inputFormat="H:mm"
                    value={formInput.start}
                    onChange={(newValue: Date | null) => {
                      setFormInput({
                        ...formInput,
                        start: newValue ?? formInput.start
                      })
                    }}
                    renderInput={(params: any) => <TextField {...params} />}
                  />
                </ListItem>
                <ListItem>
                  <TimePicker
                    label="End Time"
                    inputFormat="H:mm"
                    value={formInput.end}
                    onChange={(newValue: Date | null) => {
                      setFormInput({
                        ...formInput,
                        end: newValue ?? formInput.end
                      })
                    }}
                    renderInput={(params: any) => <TextField {...params} />}
                  />
                </ListItem>
                {/* 
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
                </ListItem> */}
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
                      disabled={addSlotResult.loading === true}
                      type="submit"
                      >
                      {addSlotResult.loading ? 'Creating Slot...' : 'Create'}
                    </Button>
                  </Grid>
                  </Grid>
                </ListItem>
              </List>
            </form>
            {formInput.end && formInput.start && formInput.end > formInput.start &&
              <Typography variant="caption">
                Length: {timeDiff(formInput.end, formInput.end)}
                <br />
              </Typography>
            }
            <Typography color="error" variant="caption">
              {addSlotResult.error && addSlotResult.error.message}
              <br />
              {formInput.end <= formInput.start && "Dates must occur sequentially"}
            </Typography>
          </CardContent>
        </ModalCard>
      </Modal>
    </>
  )
}
export default NewSlotModal;
