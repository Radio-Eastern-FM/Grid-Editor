import { CircularProgress } from '@mui/material';
import React from 'react'

const WithLoadingIndicator = (props: {children: any, loading: boolean}) => 
  props.loading ? <CircularProgress/> : props.children;

export default WithLoadingIndicator
