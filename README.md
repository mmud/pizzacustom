
# CustomPizza

CustomPizza is an interactive online platform that allows users to create and order personalized pizzas. The platform provides a seamless experience for selecting toppings, sauces, crust types, and sizes, ensuring customer satisfaction.

---

## 🌟 Features
- **Custom Pizza Creation**: Users can build their pizzas with a variety of options for toppings, sauces, and crusts.
- **Interactive User Experience**: Real-time updates to the price and preview of the selected pizza.
- **Order Management**: Allows users to place, track, and manage orders.
- **Shopping Cart**: A detailed shopping cart for reviewing and managing orders before checkout.
- **Payment Gateway Integration**: Secure payment processing using Stripe.
- **AI-Powered Recommendations**: Personalized pizza recommendations using an AI model.
- **Dashboard for Orders**: A comprehensive dashboard for users to view and manage their orders.
- **Caching with Redis**: Faster performance with Redis caching for frequently accessed data.
- **Logging with Morgan & Winston**: Track requests and store structured logs.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## 🛠️ Technologies Used
- **Frontend**: HTML, CSS, JavaScript, React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Caching**: Redis
- **AI Model**: Python, Flask, Scikit-learn
- **Payment Integration**: Stripe API
- **Logging**: Morgan, Winston

---

## 🚀 Installation and Setup

### Prerequisites
- Node.js and npm installed
- MongoDB installed or access to a MongoDB Atlas cluster
- Windows users: Install Docker for Redis setup

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/mmud/pizzacustom.git
   ```

2. Set up the **Frontend**:
   - Navigate to the frontend folder:
     ```bash
     cd pizzacustom/frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```

3. Set up the **Backend**:
   - Open a new terminal and navigate to the backend folder:
     ```bash
     cd pizzacustom/backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Set up environment variables:
     - Create a `.env` file in the backend directory.
     - Add the following variables:
       ```
        NODE_ENV = development
        PORT = 3500
        MONGO_URL = mongodb://localhost:27017/pizza
        JWT_SECRET = secretpassword

        FRONTURL = "http://localhost:3000"
        AI_URL ="http://localhost:5000"
        HOST= smtp.gmail.com
        SERVICE= gmail
        EMAIL_PORT= 587
        SECURE= true
        EMAIL_FROM= 
        EMAIL_PASSWORD = 
        STRIPE_SECRET_KEY=stripesecretkey
       ```
   - Start the backend server:
     ```bash
     npm start
     ```


4. **Redis** Setup Instructions

## Windows Users:
1. Install Docker Desktop from https://www.docker.com/products/docker-desktop.
2. Start Docker Desktop.
3. Run Redis container:
   ```bash
   docker run -d --name redis-server -p 6379:6379 redis
   ```

## Linux/Mac Users:
- Install Redis directly using your package manager OR use Docker as above.


5. Set up the **AI Recommendation Server**:
   - Open another terminal and navigate to the AI model folder:
     ```bash
     cd pizzacustom/"recommendation ai model"
     ```
   - Install required Python libraries:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the AI server:
     ```bash
     python model_api.py
     ```

6. Access the platform:
- Open your browser and go to `http://localhost:3000`.

---

# Logging Details

## Morgan
- Logs HTTP requests in the console for easy debugging.

## Winston
- Stores structured logs in:
  - logs/combined.log: All logs for analysis.
  - logs/error.log: Only error logs for debugging.


---

## 🖥️ Screenshots

### Home Page
![Pizza Builder](images/home.png)

### Recommendations
![Pizza Builder](images/recommendations.png)

### Login Page
![Pizza Builder](images/login.png)

### Create the Pizza
![Pizza Builder](images/create1.png)
![Pizza Builder](images/create2.png)

### Shopping Cart
![Pizza Builder](images/shoppingcart.png)
![Pizza Builder](images/checkout.png)
![Pizza Builder](images/paymentsuccess.png)
![Pizza Builder](images/paymentfailed.png)
![Pizza Builder](images/myorders.png)

### Dashboard
![Pizza Builder](images/dashboard.png)
![Pizza Builder](images/dashboard2.png)
---

## 📈 Achievements
- Enhanced customer engagement with a user-friendly pizza customization interface.
- Improved order processing efficiency through seamless backend integration.
- Implemented a secure payment gateway using Stripe for hassle-free transactions.
- Developed an AI-powered recommendation system for personalized user experiences.
- Provided users with an intuitive dashboard for managing their orders.

---

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.