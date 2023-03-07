import { Container } from "@mui/material";
import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import NewNote from "./components/NewNote";
import useLocalStorage from "./hooks/useLocalStorage";
import { NoteData, RawNote, Tag } from "./types";

function App() {

  const [notes,setNotes]=useLocalStorage<RawNote[]>("NOTES",[])
  const [tags,setTags]=useLocalStorage<Tag[]>("TAGS",[])
 
  const notesWithTags  =  useMemo(()=>notes.map(note => {return {...note, tags:tags.filter( tag => note.tagIds.includes(tag.id))}}),[notes,tags])

  const onCreateNote = ({tags ,...data}:NoteData)=>{
     
        setNotes(prevNotes => prevNotes.concat({...data, id:uuid(),tagIds:tags.map(t =>t.id)}) )

  }
  
  return (
    <div >
      <Container style={{textAlign:"center"}}>
          <Routes>
              <Route path="/" element={<h1>Home</h1>}/>
              <Route path="/new" element={<NewNote onSubmit={onCreateNote}/>}/>
            
              <Route path="/:id" >   // nested routes follow..
                 
                  //this will show if we navigate to id path
                  <Route index element={<h1>Show</h1>}/> 
                  // this will show if we navigate to id/edit path
                  <Route path="edit" element={<h1>Edit</h1>}/>
                   
              </Route>
              // will bring back Home page if path not found     
              <Route path="*" element={<Navigate  to='/'/>} /> 
          </Routes>
       </Container>
    </div>
  )
}

export default App
