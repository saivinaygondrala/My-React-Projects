import {useState} from 'react'
import Axios from 'axios'
interface bluprint{
data:{
    avatar_url:"#",
    login:"",
    followers:"",
    following:"",
    public_repos:"",
    html_url:"",
}
}
export default function ProfileCard(){
    const [data,setData]=useState<bluprint>();
  const [username,setUsername]=useState("");
  const [dataStatus,setStatus]=useState(false);
  const [visibility,setVisibility]=useState(false);
const fetchData= async()=>{
setVisibility(false);

    if(username.length==0){
        alert("Enter the username ");
        
        return false;
    }
    try{
  const res=await Axios.get(`https://api.github.com/users/${username}`)
setData(res);
setVisibility(true);
console.log(res)
setStatus(false)
    }
    catch(error){
        setStatus(true)
    }
}
    return (
        <div className='main-container'>
             <div className='input-container'>
                <input type="text" placeholder='Enter Github Username' onChange={(e)=>setUsername(e.target.value)}/>
                <button onClick={fetchData}>Fetch</button>
             </div>
            {visibility && !dataStatus && <div className="data-container">
                <img src={data?.data?.avatar_url} alt="github avatar" />
                <div className="data-container-data">
                    <h1>{data?.data?.login}</h1>
                    <h4>{data?.data?.followers} Followers</h4>
                    <h4>{data?.data?.following} Following</h4>
                    <h4>{data?.data?.public_repos} Repos</h4>
                    <p>{data?.data?.html_url}</p>
                </div>
             </div>}
             {dataStatus && <div ><h3>User Not found</h3></div>}
    </div>)
}