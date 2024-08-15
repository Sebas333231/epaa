import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(bodyParser.json());


const readData = () => {
    try {
        const data = fs.readFileSync("./db.json", "utf8");
        return JSON.parse(data);
    }catch(e) {
        console.error("Error reading data:", e);
    }
}

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data))
    }catch(e) {
        console.error("Error reading data:", e);
    }
}

app.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

app.get('/data', (req, res) => {
    const data = readData();
    res.json(data.books);
})


app.get("/data/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const book = data.books.find(book => book.id === id);
    res.json(book);
})

app.post('/data', (req, res) => {
    const data = readData();
    const body = req.body;
    const { name } = req.body;
    const userExists = data.books.find(book => book.name === name)
    if (userExists) {
        console.log("El nombre del libro ya existe")
        return res.status(400).json({ message: "El nombre del libro ya existe" });
    }else{
        const newBook = {
            id: data.books.length + 1,
            ...body,
        };
        data.books.push(newBook);
        writeData(data);
        res.json(newBook);
    }
})

app.put('/data/:id', (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex(book => book.id === id);
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
    }
    writeData(data);
    res.json({message: "El libro fue editado exitosamente"});
})

app.delete('/data/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex(book => book.id === id);
    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json({message: "El libro fue eliminado exitosamente"});
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});