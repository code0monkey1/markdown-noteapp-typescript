
import { NoteData } from '../types';
import { NoteForm } from './NoteForm';

export interface NewNoteProps{
  onSubmit: (note: NoteData) => void
}
const NewNote=(props:NewNoteProps) =>{
  
  return (
    <>
    <h1 style={{margin:"4rem"}}>{`NewNote`}</h1>
    <NoteForm onSubmit={props.onSubmit}/>
    </>
  )
}

export default NewNote