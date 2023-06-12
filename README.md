# Check24 GenDev Challenge Submission: UrlaubGPT - Your AI Assisted Holiday Planner 🤖🌊

## Live Demo

Try it out at [check24-holiday-challenge.b-n.cc](https://check24-holiday-challenge.b-n.cc/).

## Introduction

In this README, I will explain my concept, approach, the design choices I made and the optimizations I've implemented. I'll also discuss my ideas for future enhancements.

## Core Idea

With the current development of large language models (LLMs), the way we interact with digital systems will drastically evolve. With this in mind, I have designed an travel platform with an AI-travel-agent, UrlaubGPT, aiming to merge human-like interactions with the common controls of modern travel platform. The platform leverages ChatGPT to handle text input, making search input not only more flexible but also interactive.

## User Experience

The user interface of UrlaubGPT is designed to be minimal yet powerful. The landing page of the platform presents a single search bar, which invites the user to input their holiday preferences in a conversational manner. The user might type in something like, "A kitesurf holiday in europe with my children," or "A trip to Mallorca with my wife anytime in September." The LLM then interprets this input, auto-adjusting the search filters on the portal, and responds to the user by providing additional destination suggestions, asking follow-up questions, and so on. The user is then directed to the results page, where they can either adjust the filters manually or chat with the AI for more tips and to refine their search. The chat window can be hidden to allow a full-screen view of the results.

## Design

Inspired by Check24's corporate design, UrlaubGPT's design emphasizes simple, functional aesthetics. The platform uses square offer cards to prioritize images, providing visual appeal and enabling more offers to be displayed simultaneously.

## Tech Stack

UrlaubGPT is built with a robust and modern tech stack, aiming for speed of development, efficiency, and scalability:

- **Database: Azure MySQL**: A fully managed relational database service, Azure MySQL provides a scalable database solution, ensuring secure data management. Its ability to handle large volumes of data and flexible scaling options make it ideal for the application.

- **Large Language Model: ChatGPT**: ChatGPT is used as the underlying LLM for handling and interpreting user input. Using ChatGPT allowed for quicker development times than hosting an open-source model, due to the reduced need for setup, fine-tuning and maintenance.

- **Application**: The application is built using the [T3 Stack](https://create.t3.gg/), comprising several modern technologies designed for optimal performance and development efficiency:
  - **Next.js**: A React-based framework for building scalable, high-performance web applications. Next.js provides powerful features like server-side rendering and static site generation, which help to optimize the performance and user experience of the application.
  - **TypeScript**: TypeScript, a statically-typed superset of JavaScript, allows me to write more reliable, maintainable code. The benefits of static typing, such as improved autocomplete, refactoring, and error-checking capabilities, have greatly contributed to the robustness of the codebase.
  - **Prisma**: Prisma is a simple, typesafe ORM (Object-Relational Mapping) tool that simplifies database access and manipulation. Prisma enables us to interact with the MySQL database using TypeScript, promoting better code maintainability and reducing the risk of runtime errors.
  - **Tailwind CSS**: A utility-first CSS framework that allows me to create custom designs with ease. Tailwind CSS greatly simplifies the process of writing CSS, making it easier to maintain a consistent design throughout the application.
  - **tRPC**: An RPC framework built for TypeScript developers, tRPC allows me to build and consume fully typesafe APIs without having to deal with schemas or code generation. It integrates well with Next.js and TypeScript, enabling me to create reliable and efficient data communication paths within the application.

## Current Optimizations

Several optimizations have been implemented to enhance the system's performance and reliability:

- Fallback mechanism for wrong LLM outputs: JSON responses are parsed and checked against the expected schema. In case of a mismatch, the response is sent back to the LLM with the required schema. If the LLM fails to generate a response that adheres to the schema again, a default error message is displayed to the user.
- Database Indexing: Optimized database indexing ensures quick data retrieval, contributing to the application's overall responsiveness.
- Session-based chat: User chat history is stored in a session, maintaining chat persistence across page refreshes without requiring user accounts.
- Split result pages: To optimize data loading, the results are divided across multiple pages, allowing efficient retrieval and display of database results.

## Future Optimizations and Improvements

While the current system performs quite well, I have identified a number of potential improvements and optimizations for future development:

- Migrating to a fine-tuned version of an open-source LLM (such as Facebook's LLaMA) hosted with a German cloud provider. This would not only reduce costs but also improve data privacy in compliance with GDPR regulations.
- Implementing a websocket connection between the server and client, enabling real-time streaming of LLM responses (i.e. the answer appears word by word) and enhancing the user's sense of interaction. The user would also get to start reading the response right away and would not experience any waiting time (assuming that the LLM would output the words faster than the user reads)
- Integrating the Google Maps API: This could allow more advanced, location-based queries such as "beach holidays within a 500 km radius".
- Adding airport code mappings: Implementing a mapping system between city names and IATA codes to enable additional validity checks and enhance search accuracy
- Introducing sorting options: Allowing users to sort search results based on their preferences would significantly improve the platform's usability.

## How to Run the Project Locally

- Clone the repository:

```bash
git clone https://github.com/benheckmann/check24-gendev-challenge.git
```

- Add a `.env` file following `.env.example` in the root directory of the project.

```bash
cp .env.example .env
```

- Replace the placeholders in `.env` with your MySQL connection string and OpenAI API key. The expected database tables are specified in the file `schema.prisma` and follow the provided challenge data. Note: the current table names are newoffers and newhotels and can also be changed in `schema.prisma`.

```
# Prisma
DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
# OpenAI
OPENAI_API_KEY=key
```

- Install dependencies & run the project:

```bash
yarn install
yarn dev
```

- You can alternatively build & run the project's docker image:

```
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -e DATABASE_URL="database_url_goes_here" -e OPENAI_API_KEY="key_goes_here" ct3a-docker
```

## Conclusion

I believe that my solution for the Check24 GenDev Holiday Challenge is not only a robust and efficient holiday comparison service but also a small step towards the future of human-computer interaction in the travel industry. It offers an immersive user experience, combines powerful technology with a sleek design, and most importantly, brings us closer to the day when planning a holiday is as simple as having a conversation. I'm proud of what I've built and excited about the skills I've learned along the way. I hope you enjoy using UrlaubGPT as much as I enjoyed building it!
