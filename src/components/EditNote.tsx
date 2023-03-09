import { FormEvent, useEffect, useRef, useState } from 'react';

import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Box, Button, FormControl, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { v4 as uuid } from 'uuid';
import { RawNote, Tag } from '../types';
import { useNote } from './FullNote';
export interface NoteFormProps {
  onAddTag:(tag:Tag) => void
  onSubmit:(note: RawNote)=>void;
  availableTags:Tag[]
}

export function EditNote({onSubmit,onAddTag,availableTags}:NoteFormProps) {
  const note = useNote()

  const titleRef=useRef<HTMLInputElement>(null)
  const  contentRef = useRef<HTMLInputElement>(null)
  const [selectedTags,setSelectedTags] = useState<Tag[]>(note.tags)
  const navigateTo = useNavigate();

    const onNewTagCreation=(label:string) => {

    const newTag ={id:uuid() , label}
    onAddTag(newTag)
    setSelectedTags(tags => tags.concat(newTag))
    
  }
  
  const onEditSubmit=(event: FormEvent)=>{
   event.preventDefault();
     
   const values ={
     ...note,
    title:titleRef.current?.value!,
    content:contentRef.current?.value!,
    tagIds:selectedTags.map(tag => tag.id) ,
   }

   console.log("Values to be submitted", JSON.stringify(values,null,2))
   onSubmit(values)

   navigateTo('..')
  }
  

  return<>

   <Typography variant='h2'style={{fontFamily:"Nunito"}}>Edit Note</Typography>
    <Grid container spacing={2} direction={'column'} style={{border:"2px solid black",padding:"2rem",borderRadius:"2rem",marginTop:"2rem"}}>
      
      <Box component={"form"} noValidate sx={{m:3}}>
        <Grid item container xs={12} spacing={4} justifyContent={'center'} >
            <Grid item xs={6}>
                <FormControl style={{width:'100%'}}>
                  <TextField type='text' inputRef={titleRef} style={{justifySelf:"stretch"}}  placeholder='Title' id="my-input" aria-describedby="my-helper-text" defaultValue={note.title} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl style={{width:"100%",paddingTop:"0.8rem"}}> 
                {/* Create React Select Expects an object label and value attributes*/}
                <CreatableReactSelect 
                
                value={selectedTags.map(tag=>{ return {label:tag.label,value:tag.id} }) } 
                onCreateOption={onNewTagCreation}
                
                onChange={(tags)=>{ 
                 
                  setSelectedTags(tags.map(tag=>{ 
                  return {label:tag.label,id:tag.value} }))}
                }
                 
                  options={availableTags?.map(tag=>{ return {label:tag.label,value:tag.id}}
                    
                    )}
                  
                id="my-multi" 
                isMulti 
                placeholder="Tags"/>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl style={{width:"100%",paddingTop:"0.8rem"}}>              
                    <TextareaAutosize    
                      ref={contentRef}    
                      aria-label="minimum height"
                      minRows={20}
                      placeholder="Content"
                      style={{padding:"1rem"}}
                      defaultValue={note.content}
                    />
                </FormControl>
            </Grid>
            <Grid item container xs={12} spacing={4} justifyContent={'center'}>
                
              <Grid item>
                <Button variant='contained' type="submit" onClick={onEditSubmit}>Submit</Button>
              </Grid> 
          
              <Grid item>
                  <Link to=".."> {/*takes you to the page you were previously on*/}
                    <Button variant='outlined'>Cancel</Button> 
                  </Link>
              </Grid>

            </Grid>
        </Grid>
        
     </Box>
      </Grid>
     </>
  
}
