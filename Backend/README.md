Set-Content README.md @'
# BuildGram — Backend REST API Engine

BuildGram is a robust, clean, and highly scalable in-memory REST API engine built from scratch using the Go programming language and the Gin Web Framework. It simulates the core backend architectural workflows of a social media platform like Instagram, handling high-level entities such as Users, Content Posts, and Social Engagements (Likes and Comments) inside a single executable file.

---

## 🛠️ Technology Stack & Dependencies
- **Language Core:** Go (Golang) version 1.18+
- **Routing Engine:** Gin-Gonic HTTP Web Framework (`github.com/gin-gonic/gin`)
- **Concurrency Management:** Native synchronization primitives (`sync.Mutex`)

---

## 💻 Step-by-Step Execution Guide (How to Run)

Follow these exact steps to set up and start the application server on your local machine:

### Step 1: Open the Project Directory
Open your terminal/command prompt and navigate inside your project directory:
```bash
cd buildgram-api