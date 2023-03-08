export interface Tag {
  label:string;
  id:string;
}

export interface SimplifiedNote{
  id:string;
  tags:Tag[];
  title:string;
}

export interface NoteWithTags{
 tags: Tag[];
  id: string;
  title: string;
  content: string;
  tagIds: string[];
}
export type Note={
  id:string;
}&NoteData

export type RawNote={
  id:string;
}&RawNoteData

export interface RawNoteData{
  title:string;
  content:string;
  tagIds:string[];
}


export interface NoteData{
  title:string;
  content:string;
  tags:Tag[]
}


export interface NoteFormProps {
  onAddTag:(tag:Tag) => void
  onSubmit:(note: NoteData)=>void;
  availableTags:Tag[]
}
{/* Create React Select Expects an object label and value attributes*/}
export interface Tag {
  label:string;
  id:string;
}

export interface TagValue{
  label:string;
  value:number
}

export interface NewNoteProps{
  onSubmit: (note: NoteData) => void,
  onAddTag:(tag:Tag) => void,
  availableTags: Tag[]
}