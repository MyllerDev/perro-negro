CREATE DATABASE IF NOT EXISTS perro_negro
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE perro_negro;

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    description TEXT,

    price DECIMAL(10,2) NOT NULL,

    stock INT NOT NULL DEFAULT 0,

    image_url TEXT,

    category VARCHAR(100),

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    phone VARCHAR(30) NOT NULL,

    email VARCHAR(150),

    address VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,

    customer_id INT NOT NULL,

    total DECIMAL(10,2) NOT NULL,

    status ENUM(
        'PENDING',
        'PAID',
        'REJECTED',
        'CANCELLED'
    ) DEFAULT 'PENDING',

    payment_method VARCHAR(50),

    payment_transaction_id VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
        REFERENCES customers(id)
);


CREATE TABLE sale_details (
    id INT AUTO_INCREMENT PRIMARY KEY,

    sale_id INT NOT NULL,

    product_id INT NOT NULL,

    product_name VARCHAR(150) NOT NULL,

    quantity INT NOT NULL,

    unit_price DECIMAL(10,2) NOT NULL,

    subtotal DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (sale_id)
        REFERENCES sales(id),

    FOREIGN KEY (product_id)
        REFERENCES products(id)
);


CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,

    sale_id INT NOT NULL,

    provider VARCHAR(50) NOT NULL,

    transaction_id VARCHAR(255),

    amount DECIMAL(10,2) NOT NULL,

    status ENUM(
        'PENDING',
        'APPROVED',
        'DECLINED',
        'ERROR'
    ) DEFAULT 'PENDING',

    response_message TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (sale_id)
        REFERENCES sales(id)
);

INSERT INTO products
(
    name,
    description,
    price,
    stock,
    image_url,
    category
)
VALUES
(
    'Granizado Clásico',
    'Refrescante granizado con el sabor que prefieras.',
    10000,
    20,
    'https://res.cloudinary.com/l4ptc7q2/image/upload/v1784348799/images_a0jydn.jpg',
    'Granizados'
),
(
    'Michelada Especial',
    'Una combinación especial para disfrutar con amigos.',
    15000,
    15,
    NULL,
    'Micheladas'
),
(
    'Cóctel Perro Negro',
    'Una mezcla especial con el estilo de Perro Negro.',
    18000,
    10,
    NULL,
    'Cócteles'
);