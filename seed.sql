-- Insert sample companies
INSERT INTO companies (id, name, address, city) VALUES
  (1, 'Tech Solutions Inc.', '123 Tech Avenue', 'San Francisco, CA 94105'),
  (2, 'Creative Design Co.', '456 Design Street', 'Austin, TX 78701'),
  (3, 'Digital Services LLC', '789 Digital Road', 'New York, NY 10013');

-- Insert sample clients
INSERT INTO clients (id, name, contact_person, email) VALUES
  (1, 'Acme Corp', 'John Smith', 'john.smith@acme.com'),
  (2, 'Quantum Industries', 'Sarah Johnson', 'sarah.j@quantum.co'),
  (3, 'Global Dynamics', 'Mike Wilson', 'mike.w@globaldynamics.com'),
  (4, 'Innovative Startups', 'Lisa Brown', 'lisa@innovative.io');

-- Insert sample invoices
INSERT INTO invoices (id, number, created_at, due_date, company_id, client_id, payment_method, payment_reference, status, total) VALUES
  (1, 'INV-2024-001', '2024-01-01', '2024-01-31', 1, 1, 'Bank Transfer', 'BT-20240101', 'PAID', 1500.00),
  (2, 'INV-2024-002', '2024-01-05', '2024-02-04', 1, 2, 'Credit Card', 'CC-20240105', 'PENDING', 2750.00),
  (3, 'INV-2024-003', '2024-01-10', '2024-02-09', 2, 3, 'Check', 'CHK-2024010', 'PAID', 3200.00),
  (4, 'INV-2024-004', '2024-01-15', '2024-02-14', 3, 4, 'PayPal', 'PP-20240115', 'OVERDUE', 1800.00),
  (5, 'INV-2024-005', '2024-01-20', '2024-02-19', 2, 1, 'Bank Transfer', 'BT-20240120', 'DRAFT', 2100.00);

-- Insert sample invoice items
INSERT INTO invoice_items (invoice_id, description, amount) VALUES
  -- Items for INV-2024-001
  (1, 'Website Development - Basic Package', 1000.00),
  (1, 'SEO Optimization', 300.00),
  (1, 'Content Writing (5 pages)', 200.00),

  -- Items for INV-2024-002
  (2, 'Custom Software Development', 2000.00),
  (2, 'Database Setup', 500.00),
  (2, 'User Training Session', 250.00),

  -- Items for INV-2024-003
  (3, 'Brand Identity Design', 1500.00),
  (3, 'Logo Design Package', 1000.00),
  (3, 'Business Card Design', 400.00),
  (3, 'Social Media Templates', 300.00),

  -- Items for INV-2024-004
  (4, 'Monthly Maintenance Package', 800.00),
  (4, 'Cloud Hosting (Annual)', 600.00),
  (4, 'SSL Certificate', 400.00),

  -- Items for INV-2024-005
  (5, 'E-commerce Integration', 1200.00),
  (5, 'Payment Gateway Setup', 400.00),
  (5, 'Product Import Service', 500.00);

-- Verify data integrity (these should match the totals in invoices table)
SELECT 
  i.id as invoice_id,
  i.number,
  i.total as invoice_total,
  SUM(items.amount) as calculated_total
FROM invoices i
JOIN invoice_items items ON i.id = items.invoice_id
GROUP BY i.id
HAVING invoice_total != calculated_total;
