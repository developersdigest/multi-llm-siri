# The "Siri of Everything"

This project, aptly named the "Siri of Everything," is a voice recognition and response system. It utilizes a variety of advanced language models like GPT-3.5, GPT-4, and Perplexity to process and respond to voice inputs, akin to having a universal Siri capable of understanding and interacting using multiple AI technologies.

## Features

- Advanced voice recognition capabilities.
- Seamless integration with various language models including GPT-3.5, GPT-4, Mistral, Mixtral, Llama2 and others.
- Dynamic and intelligent response generation with audio output.
- User-friendly interface with toggleable recording states for interaction control.

## Setup and Installation

### Dependencies

This project requires:

- Node.js
- OpenAI API
- Perplexity API
- Langchain OpenAI
- Ollama

### Environment Variables

Before running the project, configure your API keys in the `.env` file:

# OpenAI API Key
# Get from https://platform.openai.com/account/api-keys
OPENAI_API_KEY=""

# Perplexity API Key
# Get from https://docs.perplexity.ai/docs/getting-started
PERPLEXITY_API_KEY=""

### Installation

To install the necessary packages, run:

bun install/npm install

### Running the Project

Start the development server:

npm run dev

## Usage

Interact with the system using voice commands. The system will capture your speech, process it using the selected AI model, and respond both textually and audibly.

## Contributing

Contributions to enhance the "Siri of Everything" are welcome. Whether it's adding new features, improving existing ones, or fixing bugs, your input is valuable.

Enjoy using the "Siri of Everything" to explore the capabilities of modern AI language models through voice interactions!
## Acknowledgements

Initial setup for basic web voice recognition was inspired by the work found at [sambowenhughes/voice-recording-with-nextjs](https://github.com/sambowenhughes/voice-recording-with-nextjs). A big thank you to them! Don't forget to give them a star and follow on GitHub for their amazing contribution.

## Connect and Support

I'm the developer behind Developers Digest. If you find my work helpful or enjoy what I do, consider supporting me. Here are a few ways you can do that:

- **Patreon**: Support me on Patreon at [patreon.com/DevelopersDigest](https://www.patreon.com/DevelopersDigest)
- **Buy Me A Coffee**: You can buy me a coffee at [buymeacoffee.com/developersdigest](https://www.buymeacoffee.com/developersdigest)
- **Website**: Check out my website at [developersdigest.tech](https://developersdigest.tech)
- **Github**: Follow me on GitHub at [github.com/developersdigest](https://github.com/developersdigest)
- **Twitter**: Follow me on Twitter at [twitter.com/dev__digest](https://twitter.com/dev__digest)

Your support is greatly appreciated and helps me continue to develop and maintain free, open-source projects.
