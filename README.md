# Used Car Dealership — Final Project (CSE 340: Web Backend Development <Spring 2026>)

## Project Description

This is a full-stack, server-side rendered used car dealership web application
built with Node.js, Express, EJS, and PostgreSQL. Guests can browse the
vehicle inventory by category, view detailed vehicle listings with photos and
specs, read and write reviews, and submit maintenance service requests.
Registered customers can track the status of their service requests, while
employees and the dealership owner manage inventory, categories, reviews,
service requests, and customer inquiries through dedicated dashboards.

## Database Schema

![ER Diagram](docs/erd.png)

The database consists of 7 tables: 
`users`, `categories`, `vehicles`, `vehicle_images`, `reviews`, `service_requests`, `contact_messages`

Key relationships:
- `categories` → `vehicles` 
  (`ON DELETE SET NULL`, so vehicles remain in inventory if a category is removed)
- `vehicles` → `vehicle_images`
  (`ON DELETE CASCADE`, so orphaned images are cleaned up when a vehicle is deleted)
- `users` / `vehicles` → `reviews` (`ON DELETE CASCADE`)
- `users` → `service_requests` (`ON DELETE CASCADE`); 
  `vehicles` → `service_requests` (`ON DELETE SET NULL`, so a customer's service history is
  preserved even if the vehicle is removed later from inventory)
- `contact_messages` is independent, since the contact form doesn't require
  login

## User Roles

| **Role** | Capabilities |

| **Customer** | Browse vehicles, leave/edit/delete their own reviews, submit service requests, view their own service request history and status |
| **Employee** | Everything a customer can do, + edit vehicle details, moderate/delete reviews, update service request status and add notes, view and reply to contact messages |
| **Owner** | Everything an employee can do, + add/delete vehicle categories, add/delete vehicles from inventory, create employee accounts |

## Test Account Credentials

| Role | Email |

| Owner | owner@test.com |
| Employee | employee@test.com |
| Customer | customer@test.com |

Password for all test accounts: `P@$$w0rd!`

## Known Limitations

- There is no pagination on vehicle listing pages; all vehicles in a category
  are shown on a single page.
- Employee and owner accounts cannot be edited or removed from the owner
  dashboard once created.
- On render site, login is not working, even though it is working in local environment.

## Live Deployment

- Live site: https://cse340-final-project-gonda.onrender.com
- GitHub repository: https://github.com/honamig/cse340-final-project-gonda
