INSERT INTO dealership.categories (name, description) VALUES
('Trucks', 'Heavy-duty pickup trucks for work and towing.'),
('Vans', 'Cargo and passenger vans for business or family use.'),
('Cars', 'Sedans and compact cars for everyday driving.'),
('SUVs', 'Sport utility vehicles with extra space and capability.');

INSERT INTO dealership.vehicles (category_id, make, model, year, price, mileage, description) VALUES
((SELECT category_id FROM dealership.categories WHERE name = 'Trucks'), 'Ford', 'F-150', 2021, 27400.00, 32000, 'Well-maintained work truck with tow package.'),
((SELECT category_id FROM dealership.categories WHERE name = 'Trucks'), 'Chevrolet', 'Silverado', 2019, 23800.00, 45000, 'Reliable full-size pickup, single owner.'),
((SELECT category_id FROM dealership.categories WHERE name = 'Vans'), 'Honda', 'Odyssey', 2020, 26500.00, 28000, 'Spacious family van with third-row seating.'),
((SELECT category_id FROM dealership.categories WHERE name = 'Vans'), 'Ram', 'ProMaster', 2018, 19800.00, 60000, 'Cargo van, ideal for small business use.'),
((SELECT category_id FROM dealership.categories WHERE name = 'Cars'), 'Honda', 'Civic', 2019, 18900.00, 30500, 'Fuel-efficient commuter car in great condition.'),
((SELECT category_id FROM dealership.categories WHERE name = 'Cars'), 'Toyota', 'Camry', 2020, 21200.00, 22000, 'Comfortable sedan with low mileage.'),
((SELECT category_id FROM dealership.categories WHERE name = 'SUVs'), 'Toyota', 'RAV4', 2021, 28900.00, 15000, 'Nearly new SUV with all-wheel drive.'),
((SELECT category_id FROM dealership.categories WHERE name = 'SUVs'), 'Jeep', 'Grand Cherokee', 2018, 22500.00, 50000, 'Powerful SUV with leather interior.');

INSERT INTO dealership.vehicle_images (vehicle_id, image_url, is_primary) VALUES
((SELECT vehicle_id FROM dealership.vehicles WHERE make = 'Ford' AND model = 'F-150'), 'https://placehold.co/800x600?text=Ford+F-150+1', TRUE),
((SELECT vehicle_id FROM dealership.vehicles WHERE make = 'Ford' AND model = 'F-150'), 'https://placehold.co/800x600?text=Ford+F-150+2', FALSE),
((SELECT vehicle_id FROM dealership.vehicles WHERE make = 'Chevrolet' AND model = 'Silverado'), 'https://placehold.co/800x600?text=Chevrolet+Silverado', TRUE),
((SELECT vehicle_id FROM dealership.vehicles WHERE make = 'Honda' AND model = 'Odyssey'), 'https://placehold.co/800x600?text=Honda+Odyssey', TRUE),
((SELECT vehicle_id FROM dealership.vehicles WHERE make = 'Ram' AND model = 'ProMaster'), 'https://placehold.co/800x600?text=Ram+ProMaster', TRUE),
((SELECT vehicle_id FROM dealership.vehicles WHERE make = 'Honda' AND model = 'Civic'), 'https://placehold.co/800x600?text=Honda+Civic+1', TRUE),
((SELECT vehicle_id FROM dealership.vehicles WHERE make = 'Honda' AND model = 'Civic'), 'https://placehold.co/800x600?text=Honda+Civic+2', FALSE),
((SELECT vehicle_id FROM dealership.vehicles WHERE make = 'Toyota' AND model = 'Camry'), 'https://placehold.co/800x600?text=Toyota+Camry', TRUE),
((SELECT vehicle_id FROM dealership.vehicles WHERE make = 'Toyota' AND model = 'RAV4'), 'https://placehold.co/800x600?text=Toyota+RAV4', TRUE),
((SELECT vehicle_id FROM dealership.vehicles WHERE make = 'Jeep' AND model = 'Grand Cherokee'), 'https://placehold.co/800x600?text=Jeep+Grand+Cherokee', TRUE);