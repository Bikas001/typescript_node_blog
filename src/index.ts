import http from 'http';
import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import cors, {CorsRequest} from 'cors'
import mongoose from 'mongoose';

const url : string = `mongodb+srv://vcbikash123:Bikas9697@cluster0.luzuk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app : Express  = express();
app.use(cors);
app.use(express.json())

interface Note {
    id: number,
    content: string,
    date: string,
    important: boolean
};

let notes : Array<Note> = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]

app.get('/', (req: Request, res : Response)=> {
    res.send('<h2>Test test</h2>');
})

app.get('/api/notes', (req: Request, res: Response) => {
    res.end(JSON.stringify(notes))
})

app.get('/api/notes/:id', (request: Request, response: Response)=> {
    const id = +request.params.id 
    const note = notes.find(note => note.id === id);
    if(note){
         response.end(JSON.stringify(note))
    }else{
        response.status(404).end()
    }

})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)