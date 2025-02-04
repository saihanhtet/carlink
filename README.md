# UsedCarPortal

UsedCarPortal is a Laravel-based web application designed for buying and selling used cars. This README provides instructions for setting up the project, running migrations, and installing necessary dependencies.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- PHP (>= 8.1)
- Composer
- Laravel (>= 10)
- MySQL or PostgreSQL (for database)
- Node.js & npm
- Laravel Breeze & Sanctum (for authentication)

## Installation Steps

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/UsedCarPortal.git
cd UsedCarPortal
```

### 2. Install PHP Dependencies
```sh
composer install
```

### 3. Create Environment File
Copy the `.env.example` file and configure your environment settings:
```sh
cp .env.example .env
```
Update database credentials in `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=used_car_portal
DB_USERNAME=root
DB_PASSWORD=yourpassword
```

### 4. Generate Application Key
```sh
php artisan key:generate
```

### 5. Run Database Migrations
```sh
php artisan migrate --seed
```
(This will create tables and seed initial data.)

### 6. Install NPM Dependencies
```sh
npm install
```

### 7. Build Frontend Assets
```sh
npm run dev  # For development
npm run build  # For production
```

### 8. Serve the Application
```sh
php artisan serve
```
This will start the application at `http://127.0.0.1:8000`.

## Authentication Setup
Ensure Laravel Breeze and Sanctum are installed for authentication:
```sh
php artisan breeze:install
php artisan migrate
```

## Running Tests
To execute tests using Pest:
```sh
php artisan test
```

## Deployment
For production deployment:
```sh
php artisan config:cache
php artisan route:cache
php artisan view:cache
npm run build
```
Ensure your server meets Laravel's deployment requirements and uses a queue system for background jobs.

## Contributing
Feel free to fork this repository and contribute by submitting pull requests.

## License
This project is licensed under the MIT License.
---
#### Sample Data
10 unique cars showcasing diverse specifications:

| **Car Brand**  | **Car Model**     | **Mileage** | **Registered Year** | **Price**   | **Fuel**    | **Transmission** | **Seats** | **Engine**   | **Description**                               | **Status**     |
|-----------------|-------------------|-------------|----------------------|-------------|-------------|------------------|-----------|--------------|-------------------------------------------------|----------------|
| Toyota         | Corolla Altis     | 30,000 km   | 2021                 | $20,000     | Petrol      | Automatic        | 5         | 1.8L         | Reliable sedan with excellent fuel economy.    | Available      |
| Honda          | Civic Type R      | 12,000 km   | 2022                 | $38,000     | Petrol      | Manual           | 5         | 2.0L Turbo   | Sporty hatchback with cutting-edge design.      | Available      |
| Tesla          | Model 3           | 10,000 km   | 2023                 | $50,000     | Electric    | Automatic        | 5         | Electric     | Affordable electric car with autopilot.        | Available      |
| Ford           | Mustang GT        | 25,000 km   | 2020                 | $45,000     | Petrol      | Automatic        | 4         | 5.0L V8      | Iconic muscle car with thrilling performance.   | Available      |
| BMW            | X5 xDrive40i      | 35,000 km   | 2021                 | $60,000     | Petrol      | Automatic        | 5         | 3.0L Turbo   | Luxury SUV with powerful engine and comfort.    | Sold           |
| Hyundai        | Tucson            | 18,000 km   | 2022                 | $28,000     | Diesel      | Automatic        | 5         | 2.0L Diesel  | Versatile SUV ideal for families.              | Available      |
| Mercedes-Benz  | C-Class C300      | 20,000 km   | 2021                 | $55,000     | Petrol      | Automatic        | 5         | 2.0L Turbo   | Luxury sedan with elegant design and features.  | Reserved       |
| Jeep           | Wrangler Rubicon  | 40,000 km   | 2019                 | $48,000     | Petrol      | Manual           | 5         | 3.6L V6      | Rugged off-roader for adventure enthusiasts.    | Available      |
| Audi           | Q7                | 22,000 km   | 2022                 | $70,000     | Diesel      | Automatic        | 7         | 3.0L Diesel  | Premium 7-seater SUV with cutting-edge tech.    | Available      |
| Nissan         | Leaf              | 15,000 km   | 2022                 | $25,000     | Electric    | Automatic        | 5         | Electric     | Affordable EV with excellent range and comfort. | Available      |

---
