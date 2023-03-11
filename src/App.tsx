import { Container } from "@mui/material";
import { useMemo } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { EditNote } from './components/EditNote';
import { FullNote } from "./components/FullNote";
import NewNote from "./components/NewNote";
import NoteLayout from "./components/NoteLayout";
import NoteList from "./components/NoteList";
import useLocalStorage from "./hooks/useLocalStorage";
import { NoteData, RawNote, Tag } from "./types";

function App() {

  const [notes,setNotes]=useLocalStorage<RawNote[]>("NOTES",[])
  const [tags,setTags]=useLocalStorage<Tag[]>("TAGS",[])
  const navigateTo = useNavigate();
 
  const notesWithTags  =  useMemo(()=>notes.map(note => {return {...note, tags:tags.filter( tag => note.tagIds.includes(tag.id))}}),[notes,tags])

  const onCreateNote = ({tags ,...data}:NoteData)=>{
     
        setNotes(prevNotes => prevNotes.concat({...data, id:uuid(),tagIds:tags.map(t =>t.id)}) )

  }

  const onEditNote = (editedNote:RawNote)=>{

    setNotes(prevNotes => prevNotes.map( note => note.id ===editedNote.id?editedNote:note))
    
  }

  const deleteNote=(id:string)=>{
   console.log("note id to be deleted: " + id)

     setNotes(prevNotes => prevNotes.filter( note => note.id !==id))

    navigateTo('/note-list')
  }

    const addTag=(tag:Tag)=>{
       
      setTags(tags=>  tags.concat(tag))
  }

  const deleteTag=(id:string)=>{
     setTags(tags=> tags.filter( tag =>  id!==tag.id))

     // delete the tags from the notes too
     setNotes(notes=> notes.map( note => { return {...note,tagIds:note.tagIds.filter( tagId => tagId!==id)}} ))
     
  }
  
  const editTag=(editedTag:Tag)=>{
      console.log("Tag to be edited: " + JSON.stringify(editedTag,null,2))
    setTags(tags=> tags.map( tag => tag.id===editedTag.id?editedTag:tag))
    
  }
  
  return (
    <div >
      <Container style={{textAlign:"center"}}>
          <Routes>
              
              <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags}/>}/>
              <Route path ="/" element={<NoteList notes={notesWithTags} availableTags={tags} deleteTag={deleteTag} editTag={editTag}/>}/>
               <Route path="/:id" element={<FullNote notes={notesWithTags}/>} > // nested routes follow..
                 
                  //this will show if we navigate to id path
                  <Route index  element={<NoteLayout deleteNote={deleteNote}/>}/> 
                  // this will show if we navigate to id/edit path
                  <Route path="edit" element={<EditNote onAddTag={addTag} onSubmit={onEditNote} availableTags={tags}/>}/>
                   
              </Route>
              // will bring back Home page if path not found     
              <Route path="*" element={<Navigate  to='/'/>} /> 
          </Routes>
       </Container>
    </div>
  )
}

export default App
