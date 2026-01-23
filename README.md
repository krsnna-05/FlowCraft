# FlowCraft

**FlowCraft** is an **AI-assisted visual flowchart generator** that converts natural language prompts into **editable flowcharts** on an infinite canvas.
The system emphasizes **human-in-the-loop design**, where AI assists in structuring diagrams while users retain full control over editing and refinement.

---

## ✨ Key Idea

Creating flowcharts manually is time-consuming, especially during early planning and ideation.
FlowCraft speeds up this process by:

- Generating an initial flowchart from a text prompt
- Allowing users to iteratively refine the diagram by editing the prompt
- Providing a simple, distraction-free visual editor

---

## 🚀 Features

### Core Flowchart Editor

- Infinite canvas with pan & zoom (library-based)
- Single node type: **rectangle**
- Add, move, connect, and delete nodes
- Edit text inside nodes
- Arrow-based connections between nodes

### AI-Assisted Flowchart Generation

- Natural language prompt input
- AI converts prompt into a structured flowchart representation
- AI outputs **structured JSON**, not free-form text
- Generated flowchart is rendered directly on the canvas
- Users can manually edit any AI-generated result

### Prompt Editing & Refinement

- Edit the original prompt at any time
- Regenerate the flowchart from the updated prompt
- Iterative refinement (human-in-the-loop AI interaction)

### Export

- Export canvas as an image (PNG / SVG)

---

## 🏗️ System Design (High Level)

- **Frontend:** Visual canvas and flowchart editor (library-based)
- **AI Layer:** Local LLM (via Ollama) for prompt → flowchart generation
- **Data Model:** Structured JSON representation of flowcharts
- **Design Principle:**

  > AI assists, the system validates, and the user controls.

---

## 🎓 Academic Framing

FlowCraft is designed as an **academic mini-project** that demonstrates:

- Practical use of Generative AI
- Structured AI output handling
- Visual system design
- Prompt engineering and refinement
- Clear scope control and system boundaries

---

## 🧪 Example Usage

**Prompt:**

```
Create a user login process with email verification
```

**Result:**

- AI generates a sequence of rectangular nodes
- Nodes are connected in logical order
- User can edit node text, rearrange steps, or refine the prompt

---

## ⏱️ Project Scope & Timeline

- **Target build time:** ~4 weeks
- **Maximum limit:** 6 weeks (buffer)
- Focused on learning and demonstrating core concepts

---
