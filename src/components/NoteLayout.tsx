import { Button, Grid, Typography } from "@mui/material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { NoteWithTags } from '../types';
import { useNote } from "./FullNote";

const NoteLayout=()=>{

  const note =useNote()
  const navigateTo=useNavigate()
  console.log("The note is",note)
  
  return(
    <>
        <Grid container>
          
           <Grid container item xs={12} style={{margin:"2rem"}}>
             <Grid item xs={8} style={{textAlign:'start',fontFamily:"nunito",width:"100%"}}>
           <Typography variant="h2" style={{fontFamily:"Nunito"}}>{note.title}</Typography>
          </Grid>
          <Grid item container xs={4} spacing={2} justifyContent={'flex-end'} >
              <Grid item>
                <Button variant='contained' onClick={()=>navigateTo(`/${note.id}/edit`)}>
                  Edit
                </Button>
              </Grid>
              <Grid item> 
               <Button variant='outlined' color="error">Delete </Button> 
              </Grid>
                <Grid item> 
                  <Button variant='outlined' color="success" onClick={()=>{
                    navigateTo('/note-list')
                  }}>Back </Button> 
                </Grid>
          </Grid>
          
        </Grid>


        <Grid item xs={12}
            style={{border:"0.1rem lightblue solid",padding:"2rem",borderRadius:"1rem",textAlign:'left'}} >
                <Typography variant="body1">
                  <ReactMarkdown>
                    {note.content}
                  </ReactMarkdown>
                </Typography>
            </Grid>


        </Grid>
    </>
  )
}

export default NoteLayout