const fs = require("fs");
const Memory = require ("../models/Memory.js");

function removeImage(memory) {
    fs.unlink(`public/${memory.src}`, (error)=> {
        if(error) {
            console.log(error);
            return;
        }
        console.log("Imagem excluída do servidor");
    })
}

async function createMemory(req, res) {
    try {
        
        const {title, description} = req.body;
        const src = `images/${req.file.filename}`;

        if(!title || !description) {
            return res.status(400).json({msg: "Por favor, preencha todos os campos."});
        }

        const newMemory = new Memory({ title, description, src });
        await newMemory.save();
        res.json({msg: "Memória criada com sucesso", newMemory});

    } catch (error) { 
        console.log(error.message);
        res.status(500).send("Ocorreu um erro...");
    }
}

async function getMemories(req, res) {
    try {
        
        const memories = await Memory.find();
        res.json(memories);

    } catch (error) { 
        console.log(error.message);
        res.status(500).send("Ocorreu um erro...");
    }
}

async function getMemory(req, res) {
    try {
        
        const memory = await Memory.findById(req.params.id);
        if(!memory){ return res.status(404).json({msg: "Memória não encontrada"}) }
        res.json(memory);
        
    } catch (error) { 
        console.log(error.message);
        res.status(500).send("Ocorreu um erro...");
    }
}

async function deleteMemory(req, res) {
    try {
        
        const memory = await Memory.findByIdAndDelete(req.params.id);
        if(!memory){ return res.status(404).json({msg: "Memória não encontrada"}) }
        removeImage(memory);
        res.json({msg: "Memória deletada com sucesso", memory});
        
    } catch (error) { 
        console.log(error.message);
        res.status(500).send("Ocorreu um erro...");
    }
}

async function updateMemory(req, res) {
    try {
        
        const {title, description} = req.body;
        let src = null;
        if(req.file){ src = `images/${req.file.filename}`; }

        const memory = await Memory.findById(req.params.id);
        if(!memory){ return res.status(404).json({msg: "Memória não encontrada"}) }
        if(src){ removeImage(memory) }

        const updatedData = {}
        if(title) { updatedData.title = title; }
        if(description) { updatedData.description = description; }
        if(src) { updatedData.src = src; }

        const updatedMemory = await Memory.findByIdAndUpdate(req.params.id, updatedData, {new: true});
        res.json({msg: "Memória atualizada com sucesso", updatedMemory});

        
    } catch (error) { 
        console.log(error.message);
        res.status(500).send("Ocorreu um erro...");
    }
}

async function toggleFavorite(req, res) {
    try {
        
        const memory = await Memory.findById(req.params.id);
        if(!memory){ return res.status(404).json({msg: "Memória não encontrada"}) }
        
        memory.favorite = !memory.favorite;
        await memory.save();
        res.json({msg: "Memória favoritada com sucesso", memory});
        
    } catch (error) { 
        console.log(error.message);
        res.status(500).send("Ocorreu um erro...");
    }
}

async function addComment(req, res) {
    try {
        const {name, text} = req.body
        if(!name || !text) {
            return res.status(400).json({msg: "Por favor, preencha todos os campos."});
        }

        const comment = {name, text}

        const memory = await Memory.findById(req.params.id);
        if(!memory){ return res.status(404).json({msg: "Memória não encontrada"}) }
        
        memory.comments.push(comment);
        await memory.save();
        res.json({msg: "Comentário adicionado com sucesso", memory});
        
    } catch (error) { 
        console.log(error.message);
        res.status(500).send("Ocorreu um erro...");
    }
}

module.exports = {
    createMemory, getMemories, getMemory, deleteMemory, updateMemory, 
    toggleFavorite,
    addComment,
};