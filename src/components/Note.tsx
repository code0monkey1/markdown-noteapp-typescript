import { Grid, Typography } from "@mui/material";
import { NoteData } from "../types";


const Note=({note}:{note:NoteData})=>{

  return <div style={{border:"1px solid #1976d1", height:"20vh", overflow:"scroll",scrollbarGutter:"auto",borderRadius:"0.5rem",padding:"2rem"}}>
      <Typography variant="h5"> {note.title} </Typography>
      <Grid container>
        {note.tags.map(tag =>
        <Grid item  style={{borderRadius:"0.5rem",backgroundColor:"#1976d1", color:"white" ,width:'fit-content',padding:"0.5rem",margin:"0.5rem"}}>{tag.label}</Grid>)}
      </Grid>
  </div>
}

export default Note;