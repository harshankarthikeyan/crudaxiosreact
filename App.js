import Axios from 'axios';
import {useState,useEffect}from 'react';


const App = () => {
  const [user,setuser]=useState([]);
  const [name,setName]=useState("");
  const [trigger,setTrigger]=useState(false);
  var id=user.length+1;
  const Get=async()=>{
    const response = await Axios.get('https://jsonplaceholder.typicode.com/users');
    setuser(response.data);

  }
  useEffect(()=>{
    Get();
  },[]);

const post = ()=>{
   Axios.post('https://jsonplaceholder.typicode.com/users',{id:id++,name:name}).then(response1=>
 setuser([...user,response1.data])).then(()=>setTrigger(!trigger));

}
const delete1 = async (id) => {
  await Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  setuser(user.filter(item => item.id !== id)); 
}
const update1 = async (id, newName) => {
  await Axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, { name: newName });
  setuser(user.map(item => {
    if (item.id === id) {
      return { ...item, name: newName };
    }
    return item;
  }));
}

return(
  <div>
    {
      user.map((data,i) =>{
        return(
          <div key={i}>{
            <li>
            {data.name}
            {data.id}      
          <button onClick={(e)=>delete1(data.id)}>Delete</button>
          <button onClick={(e)=>update1(data.id,prompt("Enter new name"))}>Update</button>
            </li>
          }
          </div>
        )
      })
    }
    <input type="text" className=" name" value={name}  onChange ={(e)=>setName(e.target.value)}></input>
    <button onClick={post}
    >post</button>

  </div>
  );
}

export default App;