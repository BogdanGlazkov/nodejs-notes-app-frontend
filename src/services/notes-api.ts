import { NoteModel, NoteInput } from "../models/noteModel";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMesssage = errorBody.error;
    throw Error(errorMesssage);
  }
}

export async function fetchNotes(): Promise<NoteModel[]> {
  const response = await fetchData("/api/notes", { method: "GET" });
  return response.json();
}

export async function createNote(note: NoteInput): Promise<NoteModel> {
  const response = await fetchData("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}
