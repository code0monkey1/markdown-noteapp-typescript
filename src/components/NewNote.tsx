
import { NoteData, Tag } from '../types';
import { NoteForm } from './NoteForm';

export interface NewNoteProps{
  onSubmit: (note: NoteData) => void,
  onAddTag:(tag:Tag) => void,
  availableTags: Tag[]
}
const NewNote=({onSubmit,onAddTag,availableTags}:NewNoteProps) =>{
  
  return (
    <>
    <h1 style={{margin:"4rem"}}>{`NewNote`}</h1>
    <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
  )
}

export default NewNote