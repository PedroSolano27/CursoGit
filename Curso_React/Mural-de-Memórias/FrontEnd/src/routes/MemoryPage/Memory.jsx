// Página de memória
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Memory.css";
import memoryFetch from "../../axios-config";
import useToast from "../../hook/useToast.jsx";

function Memory() {
  const [memory, setMemory] = useState([]);
  const [comments, setComments] = useState([]);
  const [inputs, setInputs] = useState({});

  const { id } = useParams();
  const toast = useToast;

  useEffect(()=>{                               // Carrega a memória apenas uma vez
    async function getMemory() {
      const response = await memoryFetch.get(`/memories/${id}`);
      setMemory(response.data);
      setComments(response.data.comments);
    }

    getMemory();
  },[id]);

  function handleChange(e){                     // Gerencia as mudanças de valor
    setInputs({...inputs, [e.target.id]: e.target.value});
  }

  async function addComment(e) {                // Adiciona um comentário
    e.preventDefault();
    
    try {

      const response = await memoryFetch.patch(`/memories/${id}/comment/`, inputs);
      const lastComment = response.data.memory.comments.pop()
      setComments((comments)=> [...comments, lastComment]);
      
      setInputs({name: "", text: ""});

      toast(response.data.msg);

    } catch (error) { toast(error.response.data.msg, "error"); }
  }

  return (
    <section id="memory-page">
      <h2>Detalhes da memória "{memory.title}"</h2>

      <section id="memory-container">
        <img src={`${memoryFetch.defaults.baseURL}${memory.src}`} alt={memory.title} />
        <h3>{memory.title}</h3>
        <p>{memory.description}</p>
      </section>

      <section id="comment-form">
        <h3>Envie seu comentário:</h3>
        <form onSubmit={(e)=>addComment(e)}>

          <section className="form-control">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" placeholder="Escreva seu nome"
              onChange={(e)=>handleChange(e)} value={inputs.name || ""}
            />
          </section>

          <section className="form-control">
            <label htmlFor="text">Comentário:</label>
            <textarea id="text" placeholder="Escreva seu comentário..."
              onChange={(e)=>handleChange(e)} value={inputs.text || ""}
            />
          </section>

          <input type="submit" className="btn" value="Adicionar"/>
        </form>
      </section>

      <section id="comments-container">
        <h3>Comentários ({comments.length})</h3>
        {comments.length === 0 && <p>Nenhum comentário...</p>}
        {comments.length > 0 && comments.map((comment)=>(
          <section className="comment" key={comment._id} >
            <p className="comment-name" >{comment.name}</p>
            <p className="comment-text">{comment.text}</p>
          </section>
        ))}
      </section>

    </section>
  );
}

export default Memory;