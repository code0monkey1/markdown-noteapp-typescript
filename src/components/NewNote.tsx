
import { Typography } from '@mui/material';
import { NewNoteProps } from '../types';
import { NoteForm } from './NoteForm';

const NewNote=({onSubmit,onAddTag,availableTags}:NewNoteProps) =>{
  
  return (
    <>
    <Typography variant="h3" style={{fontFamily:"Nunito",margin:"3rem"}}>CREATE NEW NOTE</Typography>
    <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
  )
}

export default NewNote