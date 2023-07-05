import "dotenv/config"
import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

console.log(process.env.OPENAI_API_KEY)
const app = express();

app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send('api calisiyor')
});
app.post('/create-image', async (req, res) => {
    try {
        const response = await openai.createImage({
            prompt: req.body.inputValue,
            n: 1,
            size: "512x512",
        });

        const data = response.data.data;
        if (data && Array.isArray(data) && data.length > 0) {
            const parsedResults = data.map(item => item.url);
            res.send(parsedResults);
        } else {
            throw new Error("Invalid response data");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});







app.listen(3001, () => console.log("3001 portu dinleniyor"))
