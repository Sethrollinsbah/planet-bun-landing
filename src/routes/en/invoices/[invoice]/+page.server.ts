import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform, locals }) => {
  const invoiceId = params.invoice;

  try {
    // Get D1 database from platform context
    const db = platform?.env.DB;

    if (!db) {
      throw error(500, {
        message: 'Database connection not available'
      });
    }

    // Get the main invoice data
    const invoice = await db
      .prepare(
        `SELECT 
                    i.id,
                    i.number,
                    i.created_at,
                    i.due_date,
                    i.payment_method,
                    i.payment_reference,
                    i.status,
                    i.total,
                    c.name as company_name,
                    c.address as company_address,
                    c.city as company_city,
                    cl.name as client_name,
                    cl.contact_person as client_contact,
                    cl.email as client_email
                FROM invoices i
                LEFT JOIN companies c ON i.company_id = c.id
                LEFT JOIN clients cl ON i.client_id = cl.id
                WHERE i.id = ?`
      )
      .bind(invoiceId)
      .first();

    if (!invoice) {
      throw error(404, {
        message: 'Invoice not found'
      });
    }

    // Get invoice items in a separate query
    const items = await db
      .prepare(
        `SELECT description, amount
                FROM invoice_items
                WHERE invoice_id = ?`
      )
      .bind(invoiceId)
      .all();

    // Return formatted data to the page
    return {
      invoice: {
        id: invoice.id,
        number: invoice.number,
        created: invoice.created_at,
        dueDate: invoice.due_date,
        company: {
          name: invoice.company_name,
          address: invoice.company_address,
          city: invoice.company_city
        },
        client: {
          name: invoice.client_name,
          contactPerson: invoice.client_contact,
          email: invoice.client_email
        },
        payment: {
          method: invoice.payment_method,
          reference: invoice.payment_reference
        },
        items: items.results.map((item) => ({
          description: item.description,
          amount: item.amount
        })),
        status: invoice.status,
        total: invoice.total
      }
    };
  } catch (e) {
    console.error('Error fetching invoice:', e);

    if (e.status) {
      throw e;
    }

    throw error(500, {
      message: 'Error retrieving invoice'
    });
  }
};
