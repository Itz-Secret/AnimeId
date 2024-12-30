import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
const app = express();
const port = 3000;
app.use(express.static("public"));
// API_URL="https://api.jikan.moe/v4/anime/"
// {id}/characters

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.render("index.ejs",{name:null,img:null,anime:null,about:null})
});
  
  app.post("/post",async(req,res)=>{
    const id=req.body.ID
    try {
        const result=await axios.get("https://api.jikan.moe/v4/characters/"+id+"/anime")
        const cresult=await axios.get("https://api.jikan.moe/v4/characters/"+id)
        const character=cresult.data
        const title=result.data
        res.render("index.ejs",{name:character.data.name,img:character.data.images.jpg.image_url,anime:title.data[0].anime.title,about:character.data.about})
    } catch (error) {
        console.error("Error fetching data:", error.message); // For debugging
        res.render("index.ejs", { name: null,img:null,anime:null,about:null }); // Passing default/empty data    
        }

    // res.render("index.ejs")
})
app.listen(port,()=>{
    console.log(`server running on port: ${port}`)
    console.log(`http://localhost:${port}`)
    
})