# Python Prep - The Interactive Python Learning Platform

<div align="center">
<img src="https://raw.githubusercontent.com/yehia-mohammed-developer/Python-Prep/main/public/PythonPrep-Readme-Cover.png" alt="Python Prep Cover Image" style="border-radius: 12px;"/>
</div>

<p align="center">
<strong>Your comprehensive, step-by-step guide to mastering Python. Structured lessons, interactive quizzes, and AI-powered feedback.</strong>
</p>

<p align="center">
<a href="https://python-prep.web.app/" target="_blank"><strong>Live Project Demo »</strong></a>
</p>

<p align="center">
<em>Designed by <a href="https://www.linkedin.com/in/yehia-mohammed-1518a1222/" target="_blank">Engineer Yehia Mohamed</a></em>
</p>

---

## 🌟 Key Features

- **📚 Integrated Curriculum:** 30 lessons divided into three levels (Beginner, Intermediate, Advanced) to take you from scratch to proficiency.
- **‍💻 Interactive Code Arena:** Experiment and run Python code directly in the browser for each lesson using **Pyodide**.
- **✨ AI Explanation:** Don't understand a specific line? Click the "Explain the Code" button for a detailed and simplified explanation from the **Google Gemini** model.
- **🧠 Interactive Quizzes:** Test your knowledge at the end of each lesson with a short quiz to reinforce concepts.
- **📊 Progress Tracking:** The site monitors your progress and saves the lessons you've completed in your browser.
- **📄 Content Downloading:** Download the entire course content as a Markdown file to keep and access at any time.
- **🎨 Modern and Responsive Design:** A modern and attractive user interface that works seamlessly across all devices.

---

## 🛠️ Technologies Used

- **Framework:** [Next.js](https://nextjs.org/) - (App Router)
- **Programming Language:** [TypeScript](https://www.typescriptlang.org/)
- **Design:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library (UI):** [ShadCN/UI](https://ui.shadcn.com/)
- **Artificial Intelligence:** [Google Genkit](https://firebase.google.com/docs/genkit) (with Gemini model)
- **Run Python in Browser:** [Pyodide](https://pyodide.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📄 Project Pages and Components

### 1. Home Page (`/`)

- **Purpose:** This is the welcome and marketing page for the project.
- **Content:**
- **Hero Section:** An attractive title and description of the platform with a button to start the learning journey.
- **Why Python? Section:** Three cards highlighting the benefits of the Python language.
- **What You Will Learn:** An overview of the curriculum content, divided by levels (Beginner, Intermediate, Advanced).
- **Final CTA Section:** A final invitation for the user to begin learning.
- **Footer:** Contains copyrights and a link to the designer.

### 2. Learning Page (`/learn`)

- **Purpose:** This is the main focus of the learning experience.
- **Structure:** Divided into two main sections:

#### a. Sidebar
- **Function:** Provides navigation between lessons and displays user progress.
- **Components:**
- **Progress Bar:** Displays the percentage of completed lessons.
- **Lesson List:** Organized in an accordion by level (Beginner, Intermediate, Advanced) with distinct icons for each level.
- **Lesson Status:** A 'CheckCircle2' icon appears next to completed lessons.
- **Download Course Button:** Allows the user to download the entire curriculum.

#### b. Lesson View (LessonView)
- **Function:** Displays the content of the selected lesson.
- **Components:**
- **Lesson Title and Description.**
- **Lesson Content Card:** A detailed explanation of the theoretical concepts.
- **CodeRunner Card:**
- A text editor for writing and editing Python code.
- "Run Code" button to execute the code using Pyodide and view the output.
- "Explain Code" button that calls Genkit and Gemini AI to provide a detailed explanation of the written code.
- **Quiz Card:**
- Multiple-choice questions to test the user's understanding of the lesson.
- When 75% of the questions are answered correctly, the lesson is marked as complete.
- The final score is displayed and the user is allowed to retry or move on to the next lesson.

---

## 🚀 How to Run the Project Locally

Follow these steps to set up and run a copy of the project on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later).
- The npm or yarn package manager.
- An API key from **Google AI Studio** to use AI features.

### Setup Steps

1. **Clone the Repository:**
```bash
git clone https://github.com/yehia-mohammed-developer/Python-Prep.git
cd Python-Prep
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Set Environment Variables:**
- Create a new file in the project root named `.env`.
- Open [Google AI Studio](https://aistudio.google.com/app/apikey) and get your API key.
- Add the key to the `.env` file as follows:
```
GEMINI_API_KEY=Put_your_API_key_here
```

4. **Launch the development server:**
```bash
npm run dev
```
5. **Open a browser:**
Open [http://localhost:9002](http://localhost:9002) to see the application running.

---

### 🧠 Integration with AI (Genkit)

- **Genkit** is used to organize and manage AI model calls.
- The file `src/ai/flows/explain-code.ts` contains the logic (Flow) that defines how the application interacts with the Gemini model to explain the code.
- The Flow passes user-written code into a specially designed prompt that asks the model to act as an expert Python teacher and provide a simplified explanation.
- GEM key
