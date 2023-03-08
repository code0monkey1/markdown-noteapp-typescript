import { Grid, Typography } from "@mui/material";
import { SimplifiedNote } from "../types";

const Note=({title,tags,id}:SimplifiedNote)=>{

  return <div style={{border:"1px solid #1976d1", height:"20vh", overflow:"scroll",scrollbarGutter:"auto",borderRadius:"0.5rem",padding:"2rem",backgroundColor:"#e7f0fe"}}>
      <Typography variant="h5"> {title} </Typography>
      <Grid container>
        {tags.map(tag =>
        <Grid item  style={{borderRadius:"0.5rem",backgroundColor:"#1976d1", color:"white" ,width:'fit-content',padding:"0.5rem",margin:"0.5rem"}}>{tag.label}</Grid>)}
      </Grid>
  </div>
}

export default Note;