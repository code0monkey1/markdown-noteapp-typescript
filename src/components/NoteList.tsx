
import { Button, FormControl, Grid, Link, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactSelect from 'react-select';
import { NoteData, Tag } from '../types';
import Note from './Note';
type NotesProps={
  notes:NoteData[],
  availableTags:Tag[]
}

function NotesList({notes,availableTags}:NotesProps) {
    
  const titleRef = useRef()

  const navigateTo=useNavigate()

  const [selectedTags,setSelectedTags] = useState<Tag[]>([])

  console.log("The notes are ",notes)
  console.log("Available tags are ",availableTags)
  return (
    <>
      <Grid container >
        <Grid container item xs={12}  style={{padding:"2rem"}}>
          <Grid item xs={6} style={{textAlign:'start',fontFamily:"nunito"}}>
           <Typography variant="h2" style={{fontFamily:"monospace"}}>NOTES</Typography>
          </Grid>
          <Grid item container xs={6} spacing={2} justifyContent={'flex-end'} >
              <Grid item><Button variant='contained' onClick={()=>{navigateTo("/new")}}>Crate</Button></Grid>
              <Grid item> <Button variant='outlined'>Edit Tags </Button> </Grid>
          </Grid>
        </Grid>
       <Grid item container xs={12} spacing={4} justifyContent={'center'} >
            <Grid item xs={6}>
                <FormControl style={{width:'100%'}}>
                  <TextField type='text' inputRef={titleRef} style={{justifySelf:"stretch"}}  placeholder='Title' id="my-input" aria-describedby="my-helper-text" />
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
              {notes.map(note => <Grid key={note.title} item xs={6} ><Note note={note}/></Grid>)}
            </Grid>
        </Grid> 
      </Grid>
      

    </>
  )
}

export default NotesList