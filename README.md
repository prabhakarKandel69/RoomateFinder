# 🏠 RoommateFinder Application

The hassle of finding appropriate roommates as per one's preferences is eliminated. In-person meetups and social media linkups are eliminated, allowing people to find the best person according to their lifestyle choices.

---

## 🚀 Features

- [ ] Preference-based matching: Users are required to define their preferences in roommates and are given recommendations as per their chosen preferences (drinking preference, smoking, pets...).
- [ ] Filters: If the recommendations seem undesirable, users can filter based on their specific preferences and sort out their roommates.
- [ ] Chatting: Upon match, two users may choose to communicate. This is implemented via WebSockets.

---

## 🛠️ Tech Stack

- **Backend**: Django, DRF (Django REST Framework)  
- **Frontend**: React  
- **Database**: SQLite  
- **Auth**: JWT (JSON Web Token)

---

## 🧪 Getting Started

### 📁 Clone the Repository

```bash
git clone https://github.com/prabhakarKandel69/RoomateFinder.git
cd RoomateFinder

# Create virtual environment (optional)
python -m venv env

# Activate environment
# On Windows
env\Scripts\activate

# On Mac/Linux
source env/bin/activate


# Install dependencies
pip install -r requirements.txt

```


## 🚀 Running the Project

### Prerequisites

- Docker installed (for Redis)
- Python environment set up (see Setup & Installation)
- NPM(Node package manager)

### Start Redis Server with Docker

```bash
docker pull redis
docker run -p 6379:6379 redis
```
### ASGI server with Uvicorn (HTTP + WebSocket endpoint) runs on port 8000

```bash
python -m uvicorn RoommateFinder.asgi:application --host 0.0.0.0 --port 8000
```

### Frontend - React

```bash
cd frontend/react
npm install
npm run
```

### 👨‍💻 Author
Prabhakar Kandel – @prabhakarKandel69

### Acknowledgements
Sangam Poudel - @PoudelSangam - React Frontend





