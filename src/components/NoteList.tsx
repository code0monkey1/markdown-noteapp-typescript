
import { Box, Button, FormControl, Grid, Link, Modal, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactSelect from 'react-select';
import { NoteWithTags, Tag } from '../types';
import Note from './Note';

type NotesProps={
  notes:NoteWithTags[],
  availableTags:Tag[],
  deleteTag:(tag:string) =>void
}

function NotesList({notes,availableTags,deleteTag}:NotesProps) {


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
    
  const navigateTo=useNavigate()

  const [selectedTags,setSelectedTags] = useState<Tag[]>([])

  const [title,setTitle] =useState<string>('')

  console.log("The notes are ",notes)
  console.log("Selected tags are ",selectedTags)
  console.log("The title is ",title)

  console.log("available tags",availableTags)

   const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  

 const filteredNotes =useMemo(()=>notes.filter(note=> {
          
        //filter by name 
        return (  (title==='' || note.content.toLowerCase().includes(title.toLowerCase())) 
        &&  //filter by tag id
        (selectedTags.length===0 || selectedTags.every(tag=> 
          note.tags.some(noteTag => noteTag.id===tag.id))   
          )
          )
 
 }),[title,selectedTags,notes])



  return (
    <>
      <Grid container >
        <Grid container item xs={12}  style={{padding:"2rem"}}>
          <Grid item xs={6} style={{textAlign:'start',fontFamily:"nunito"}}>
           <Typography variant="h2" style={{fontFamily:"monospace"}}>NOTES</Typography>
          </Grid>
          <Grid item container xs={6} spacing={2} justifyContent={'flex-end'} >
              <Grid item><Button variant='contained' onClick={()=>{navigateTo("/new")}}>Create Note</Button></Grid>
              <Grid item> 
              
              <Button onClick={handleOpen} variant='outlined'>Edit Tags </Button> 
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
        <Box sx={{ ...style, width: 400 }}>
          <ul>
            {availableTags.map(tag => <Grid container justifyContent={'space-between'}  key={tag.id}>
              <Grid xs={6} item > 
                <Button style={{width:"100%"}}>{ tag.label}</Button> 
              </Grid>
              <Grid item xs={6} > 
                <Button 
                 onClick={() =>deleteTag(tag.id)}
                 style={{margin:"0.5rem"}} 
                 variant='outlined' 
                 color={'error'}>
                  {`   Delete Tag`}
                </Button>
              </Grid>
               </Grid>)
               }
          </ul>
          
        </Box>
      </Modal>
              </Grid>
          </Grid>
        </Grid>
       <Grid item container xs={12} spacing={4} justifyContent={'center'} >
            <Grid item xs={6}>
                <FormControl style={{width:'100%'}}>
                  <TextField type='text' value={title} onChange={({target})=>{setTitle(target.value)}} style={{justifySelf:"stretch"}}  placeholder='Title' id="my-input" aria-describedby="my-helper-text" />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl style={{width:"100%",paddingTop:"0.8rem"}}> 
                {/* Create React Select Expects an object label and value attributes*/}
                <ReactSelect
                 
                 value={selectedTags.map(tag=>{ return {label:tag.label,value:tag.id} }) } 
    
                onChange={(tags)=>{ setSelectedTags(tags.map(tag=>{ 
                  return {label:tag.label,id:tag.value} }))}}

                  options={availableTags.map(tag=>{ return {label:tag.label,value:tag.id}})}
                  
                id="my-multi" 
                isMulti 
                placeholder="Tags"/>
              </FormControl>
            </Grid> 
            <Grid container item spacing={2}>
              {filteredNotes.map(note =>
               <Grid key={note.title} item xs={6} >
                 <Note {...note}/>
               </Grid>)
                }
            </Grid>
        </Grid> 
      </Grid>
      

    </>
  )
}

export default NotesList