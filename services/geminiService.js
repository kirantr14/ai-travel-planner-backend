const {GoogleGenAI} = require('@google/genai')

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

const generateTripPlan = async (
  destination,
  days,
  budgetType,
  interests
) => {
  const prompt = `
Generate a travel plan for:

Destination: ${destination}
Days: ${days}
Budget: ${budgetType}

Interests:
${interests.join(', ')}

Return ONLY valid JSON.

Format:

{
  "itinerary":[
    {
      "day":1,
      "activities":[
        "activity 1",
        "activity 2"
      ]
    }
  ],
  "budgetEstimate":{
    "flights":"",
    "accommodation":"",
    "food":"",
    "activities":"",
    "total":""
  },
  "hotels":[
    {
      "name":"",
      "type":""
    }
  ]
}
`
    console.log('Calling Gemini...')

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  })

  console.log('Gemini finished')

  let text = response.text

    text = text.replace(/```json/g, '')
    text = text.replace(/```/g, '')
    text = text.trim()

    return JSON.parse(text)
}

module.exports = {
  generateTripPlan,
}