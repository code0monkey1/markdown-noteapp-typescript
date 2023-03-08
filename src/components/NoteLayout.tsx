import { Grid, Typography } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import { NoteWithTags } from '../types';
import { useNote } from "./FullNote";


const NoteLayout=()=>{

  const note =useNote()
  
  console.log("The note is",note)
  
  return(
    <>
        <Grid>
          
           <Grid item>
               <Typography variant="h4">
                {note.title}
               </Typography>
           </Grid>


            <Grid item 
            style={{border:"0.2rem lightblue solid",padding:"2rem"}}
         
            >
                <Typography variant="body1">
                  {note.content}
                </Typography>
            </Grid>

            <Grid item>

           </Grid>

        </Grid>
    </>
  )
}

export default NoteLayout