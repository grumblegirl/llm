const { GoogleGenerativeAI } = require('@google/generative-ai')
require('dotenv').config()
const fs = require('fs')

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

function fileToGenerativePart(path, mimeType){
    return{
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString('base64'),
            mimeType
        }
    }
}

async function run() {
    const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"})
    const prompt = "What's different between these pictures?"
    const impageParts = [
        fileToGenerativePart("panda1.png", "image/png"),
        fileToGenerativePart("panda2.png", "image/png"),
    ]
    const result = await model.generateContent([prompt, ...impageParts])
    console.log(result.response.text())
}

run()