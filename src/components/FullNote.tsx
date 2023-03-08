import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { NoteWithTags } from '../types';

export const FullNote=({notes}:{notes:NoteWithTags[]})=>{

    const {id} = useParams()

    const note = notes.find( note => note.id === id)

    if(!note) return <Navigate to="/" replace/>

  return <Outlet context={note}/>
}

export const useNote=()=>{
    return useOutletContext<NoteWithTags>()
}