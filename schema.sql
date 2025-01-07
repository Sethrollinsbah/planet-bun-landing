-- Companies table
CREATE TABLE companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL
);

-- Clients table
CREATE TABLE clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    contact_person TEXT,
    email TEXT
);

-- Invoices table
CREATE TABLE invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL,
    due_date TEXT NOT NULL,
    company_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    payment_method TEXT,
    payment_reference TEXT,
    status TEXT NOT NULL,
    total REAL NOT NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Invoice items table
CREATE TABLE invoice_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);

-- Create indexes for better performance
CREATE INDEX idx_invoices_number ON invoices(number);
CREATE INDEX idx_invoice_items_invoice ON invoice_items(invoice_id);
