CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK(role IN ('owner', 'employee', 'customer')),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE dealership.categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE dealership.vehicles (
    vehicle_id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES dealership.categories(category_id) ON DELETE SET NULL,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year SMALLINT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    mileage INTEGER,
    description TEXT,
    availability_status VARCHAR(20) NOT NULL DEFAULT 'available',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE dealership.vehicle_images (
    image_id SERIAL PRIMARY KEY,
    vehicle_id INTEGER NOT NULL REFERENCES dealership.vehicles(vehicle_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE dealership.reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES dealership.users(user_id) ON DELETE CASCADE,
    vehicle_id INTEGER NOT NULL REFERENCES dealership.vehicles(vehicle_id) ON DELETE CASCADE,
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    is_flagged BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE dealership.service_requests (
    request_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES dealership.users(user_id) ON DELETE CASCADE,
    vehicle_id INTEGER REFERENCES dealership.vehicles(vehicle_id) ON DELETE SET NULL,
    service_type VARCHAR(50) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'in_progress', 'completed')),
    employee_notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE dealership.contact_messages (
    message_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'replied', 'closed')),
    reply_text TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);