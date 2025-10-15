
<div align="center">
  <img 
  src="https://github.com/user-attachments/assets/61cb3c12-601a-4dc7-980b-3f94f96bb8a1" 
  alt="Python Prep Cover Image" 
  width="100%" 
  style="border-radius: 12px; max-width: 900px;"
/>

  <h1>Python Prep: Your Interactive AI-Powered Learning Platform</h1>
  <p>
    <strong>A comprehensive, step-by-step guide to mastering Python. Featuring a structured curriculum, interactive quizzes, and AI-powered assistance.</strong>
  </p>
  <p>
    <!-- Placeholder for badges -->
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
    <img src="https://img.shields.io/github/stars/yehia-mohammed-developer/Python-Prep?style=social" alt="GitHub Stars">
  </p>
  <p>
<a href="https://python-prep.netlify.app/" target="_blank"><strong>View Live Demo »</strong></a>
  </p>
</div>

---

## A Note From The Author

This project was designed and developed by **Yehia Mohammed**, a software developer with over a decade of experience in building innovative and robust technological solutions. "Python Prep" is the culmination of years of hands-on software development experience, created with the goal of bridging the gap between theoretical knowledge and practical application in learning the Python language.

*<p align="center"><a href="https://www.linkedin.com/in/yehia-mohammed-1518a1222/" target="_blank">Connect with Yehia Mohammed on LinkedIn</a></p>*

---

## 🎯 Core Philosophy: The "Why"

Throughout my career, I've mentored many aspiring developers who struggled to transition from learning Python's syntax to building real-world projects. The "tutorial hell" is a real phenomenon. "Python Prep" was engineered to be the bridge that takes a learner from foundational concepts to professional application.

Our philosophy is built on three pillars:

1.  **Integrated Learning Environment**: Start coding immediately. We eliminated the setup friction by embedding a full Python environment directly in the browser.
2.  **Practical, Real-World Curriculum**: The lessons are designed to mirror the actual challenges and use cases a developer encounters daily.
3.  **Intelligent, Contextual Support**: Leveraging cutting-edge AI, the platform provides instant code explanations and adapts to your learning pace, ensuring you truly understand complex concepts.

---

## 🔥 Key Features

- **📚 Comprehensive Curriculum**: 30 meticulously crafted lessons divided into three levels (Beginner, Intermediate, Advanced) to take you from zero to hero.
- **‍💻 Interactive Code Playground**: Experiment with and execute Python code directly in the browser for every lesson, powered by **Pyodide (WebAssembly)**.
- **✨ AI-Powered Code Explanation**: Don't understand a line of code? Click the "Explain Code" button to get a detailed, line-by-line explanation from our AI assistant.
- **🌐 Learn in Your Language**: A seamless, intuitive user interface with full support for both English and Arabic (i18n).
- **🚀 Personalized Learning Pace**: The AI dynamically adjusts the lesson difficulty and flow based on your quiz performance and interaction, creating a truly bespoke learning journey.
- **✅ Interactive Quizzes**: Solidify your understanding with multiple-choice questions at the end of each lesson to test your knowledge.
- **🌓 Light & Dark Modes**: Study in comfort, day or night, with theme toggling.
- **📱 Fully Responsive**: Learn on the go from any device—desktop, tablet, or mobile.

---

## 🛠️ Tech Stack & Architectural Decisions

This project was built with modern, scalable, and maintainable technologies. The choice of each component was deliberate, reflecting a senior-level architectural approach.

| Category                | Technology                               | Rationale                                                                                                                                                             |
| ----------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend Framework**  | **Next.js (React)**                      | Chosen for its powerful features like Server-Side Rendering (SSR) and Static Site Generation (SSG), file-based routing, and image optimization for a fast user experience. |
| **Language**            | **TypeScript**                           | Essential for building a large-scale application. It ensures type safety, improves developer experience through autocompletion, and makes the codebase more robust.      |
| **Styling**             | **Tailwind CSS**                         | A utility-first CSS framework that allows for rapid UI development without leaving the HTML. Paired with `shadcn/ui` for beautiful, accessible components.             |
| **In-Browser Python**   | **Pyodide (WebAssembly)**                | The core of our interactive experience. It runs the full CPython interpreter in the browser, enabling code execution without any server-side overhead.               |
| **AI & Generative UI**  | **Google AI (Gemini) via Genkit**        | Gemini provides the intelligence for our "Code Explanation" and "Personalized Pacing" features. Genkit streamlines the development and deployment of these AI flows.    |
| **Internationalization**| **`next-intl`**                          | Provides a clean and robust solution for i18n in Next.js, allowing for easy management of translations and locale-aware routing.                                     |
| **Deployment**          | **Firebase Hosting**                     | Offers a global CDN, SSL by default, and seamless integration with the Google Cloud ecosystem, ensuring fast, secure, and reliable delivery of the application.         |
| **State Management**    | **React Hooks & Context API**            | For managing local and global state in a clean, declarative way without the need for external libraries for most use cases.                                           |

---

## 📚 Curriculum Sneak Peek

Here’s a glimpse into the practical knowledge you will gain.

### Lesson: Data Structures - Lists vs. Tuples

> To store a collection of items, you often need a sequence data type. The most common in Python is the **list**. A list is an ordered, **mutable** collection of items. This mutability means you can change its contents after creation. Lists are defined with `[]`.
>
> A **tuple** is another ordered collection, but it is **immutable**. Once a tuple is created, you cannot add, remove, or change its elements. Tuples are defined with `()`. You might use a tuple for data that shouldn't change, like `(x, y)` coordinates.

```python
# A mutable list
fruits = ["apple", "banana", "cherry"]
fruits.append("orange") # This is allowed
print(f"My fruits are: {fruits}")

# An immutable tuple
point = (10, 20)
# point[0] = 15 # This would raise a TypeError!
print(f"My coordinate point is: {point}")
```

### Lesson: Advanced Topics - Generator Expressions

> Generator expressions offer a memory-efficient way to create iterators. Unlike list comprehensions, which create the entire list in memory at once, generators produce items one by one as they are needed. This is known as lazy evaluation.
>
> This makes generator expressions ideal when you are iterating over the results only once, especially with very large datasets. You get the benefit of lazy evaluation without having to write a full generator function.

```python
import sys

# List comprehension (creates a full list in memory)
list_comp = [i for i in range(1000)]

# Generator expression (creates a generator object, uses very little memory)
gen_exp = (i for i in range(1000))

print("Memory Usage:")
print(f"List Comprehension: {sys.getsizeof(list_comp)} bytes")
print(f"Generator Expression: {sys.getsizeof(gen_exp)} bytes")

# We can still iterate over the generator expression
sum_of_squares = sum(x*x for x in range(10))
print(f"\nSum of squares from generator: {sum_of_squares}")
```

---

## 🤖 AI-Powered Features Deep Dive

Our integration with the **Google Gemini** model is what makes the learning experience truly unique. We use two primary AI flows managed by **Genkit**:

1.  **`explain-code`**: When a user submits a piece of Python code, this flow receives it, analyzes it for syntax and logic, and returns a detailed, step-by-step explanation of what the code does, its purpose, and the role of each component. This turns confusing code into a learning opportunity.

2.  **`personalize-lesson-pacing`**: After a user completes a quiz, their answers are sent to this flow. The AI assesses their performance to identify areas of weakness or strength. Based on this analysis, it can recommend that the user review the current lesson, move on to the next, or even revisit a prerequisite topic, ensuring a solid foundation before advancing.

---

## 📁 Project Structure

The project follows a standard Next.js `app` directory structure, organized for scalability and clarity.

```
/
├── public/                 # Static assets (images, fonts)
├── src/
│   ├── ai/                 # Genkit AI flows (e.g., explain-code)
│   ├── app/                # Next.js App Router
│   │   ├── [lang]/         # Locale-based routes
│   │   │   ├── learn/      # Main learning interface layout and pages
│   │   │   └── page.tsx    # Home page
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Reusable React components (UI, layout)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Helper functions, curriculum data, utils
│   └── locales/            # i18n translation files (en.json, ar.json)
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/yehia-mohammed-developer/Python-Prep.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd Python-Prep
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <em>Developed with ❤️ by <a href="https://www.linkedin.com/in/yehia-mohammed-1518a1222/" target="_blank">Yehia Mohammed</a></em>
</p>
