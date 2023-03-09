import { Box, Button, Card, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { NoteWithTags } from '../types';
import { useNote } from "./FullNote";

const NoteLayout=({deleteNote}:{deleteNote(id: string): void})=>{
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const note =useNote()
  const navigateTo=useNavigate()
  console.log("The note is",note)
  

  const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};
  return(
    <>
        <Grid container>
          
           <Grid container item xs={12} style={{margin:"2rem"}}>
             <Grid item container xs={8} style={{textAlign:'start',fontFamily:"nunito",width:"100%"}}>
              <Grid item xs={12}>
               <Typography variant="h3" style={{fontFamily:"nunito",}}>{note.title}</Typography> 
              </Grid>
            <Grid item xs={12} >  
              <Grid container item >{
                  note.tags.map(tag =>
                    <Card  style={{borderRadius:"0.5rem",backgroundColor:"#1976d1", color:"white" ,width:'fit-content',padding:"0.5rem",margin:"0.5rem"}}>
                      <Grid key={tag.id} item >{tag.label}
                      </Grid>
                    </Card>
                    )
                  }
            </Grid>
          
          </Grid>   
              </Grid>
            <Grid item container xs={4} spacing={2} justifyContent={'flex-end'} >
              <Grid item>
                <Button variant='contained' onClick={()=>navigateTo(`/${note.id}/edit`)}>
                  Edit
                </Button>
              </Grid>
              <Grid item> 
               <Button variant='outlined' color="error" onClick={handleOpen}>Delete </Button>        
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 400 }}>
                  <h2 id="parent-modal-title">Warning !!</h2>
                  <p id="parent-modal-description">
                   Are You Sure You Want To Permanently Delete This Note ?
                  </p>
                  <Button  onClick={()=>deleteNote(note.id)} variant="contained" color={'error'}>Delete This  Note</Button>
                </Box>
              </Modal>
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