import { Button, Divider, IconButton, List, ListItem, ListItemText, ListSubheader, Switch, TextField, Typography } from "@mui/material";
import { useNavigate} from "react-router-dom";
import { ArrowBack } from '@mui/icons-material';
import { useFlags } from "../settings/flags-provider";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Page } from "../components/page";

const SettingsList = styled(List)`
  min-width: 40vw;
  margin: auto!important;
`;

const Settings = (props: { children: React.ReactElement }) => {
  let navigate = useNavigate();
  let { getFlags, setFlags } = useFlags();
  
  const [isDarkMode, setIsDarkMode] = useState(getFlags().theme === "dark");
  const [API_URI, setAPI_URI] = useState(getFlags().API_URI);
  
  const [isPendingChanges, setIsPendingChanges] = useState(false);
  
  useEffect(() => {
    setIsPendingChanges(
      isDarkMode !== (getFlags().theme === "dark") ||
      API_URI !== getFlags().API_URI
    );
  }, [getFlags, isDarkMode, API_URI]);
  
  return (
    <Page>
      <br />
      <Typography
        variant="h1"
        component="div"
        align="center"
      >
        Settings
      </Typography>
      <SettingsList sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <IconButton
          onClick={() => navigate(-1)}
          color="primary"
          aria-label="Back to previous page"
        >
          <ArrowBack />
        </IconButton>
        <ListSubheader>URL's</ListSubheader>
        <ListItem>
          <ListItemText primary="API URL Endpoint" />
          <TextField
            variant='standard'
            value={API_URI}
            onChange={(e) => setAPI_URI(e.target.value)}
          />
        </ListItem>
        <Divider />
        <ListSubheader>Theming</ListSubheader>
        <ListItem>
          <ListItemText primary="Use dark mode" />
          <Switch
            edge="end"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
            inputProps={{
              "aria-labelledby": "switch-list-label-dark-mode",
            }}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Save setttings to this computer" />
          <Button
            variant="contained"
            onClick={() => {
              let flags = getFlags();
              flags.theme = isDarkMode ? "dark" : "light";
              flags.API_URI = API_URI;
              setFlags(flags);
              navigate(0);
            }}
            disabled={!isPendingChanges}
          >
            Save
          </Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="Reset to default settings" />
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              localStorage.removeItem("flags");
              navigate(0);
            }}
          >
            Reset
          </Button>
        </ListItem>
      </SettingsList>
    </Page>
  );
};

export default Settings;
