import { Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { SimplifiedNote } from '../types';

const Note = ({tags,id,title}:SimplifiedNote) => {
  return (
    <Link to={`/${id}`} style={{textDecoration:'none'}}  >
      <Card sx={{
         '&:hover': {
         boxShadow: 24,
        },
      }} style={{height:"10rem" ,border:"#1976d1 solid 2px",backgroundColor:'#e7f0fe',padding:"2rem"}} elevation={4}>
        <Typography variant="h5" >{title}</Typography>
        <Grid container>{
          tags.map(tag =>
              <Grid key={tag.id} item  
              style={{borderRadius:"0.5rem",backgroundColor:"#1976d1", color:"white" ,width:'fit-content',padding:"0.5rem",margin:"0.5rem"}}>{tag.label}
              </Grid>)
              }
          </Grid>
        </Card>
      </Link>
  )
}

export default Note