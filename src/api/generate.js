import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: PerformanceObserverEntryList.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
console.log("generate.js");
export default async function (req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAi API key not configured",
            }
        });
    }
    return;

    const promptSet = req.body;

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(promptSet),
            temperature: 0.2,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}

function generatePrompt(promptSet) {

    const prompt = `Produce ${promptSet.numberOfWord} words that rhymes with ${promptSet.baseWord}.
The type of rhyme is ${promptSet.typeOfRhyme}.
return the response in the format below:
1. word1
1. definition of word1
2. word2
2. definition of word2
...

for example:
1. Snapple
1.A brand of flavored tea and juice beverages.
2.Grapple
2.To engage in a struggle or wrestle with someone or something.`
    return prompt;
  }