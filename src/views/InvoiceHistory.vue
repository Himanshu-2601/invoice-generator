<template>
    <div class="invoice-history">
      <div class="container">
        <h1>Invoice History</h1>
        
        <div class="search-filter">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search invoices..." 
            @input="filterInvoices"
          >
        </div>
        
        <div v-if="filteredInvoices.length > 0" class="invoices-list">
          <div class="invoice-card" v-for="invoice in filteredInvoices" :key="invoice.id">
            <div class="invoice-header">
              <h3>Invoice #{{ invoice.invoiceNumber }}</h3>
              <span class="invoice-date">{{ formatDate(invoice.invoiceDate) }}</span>
            </div>
            <div class="invoice-details">
              <div>
                <strong>Client:</strong> {{ invoice.clientName }}
              </div>
              <div>
                <strong>Total:</strong> ${{ (invoice.totalAmount || 0).toFixed(2) }}
              </div>
              <div>
                <strong>Status:</strong> 
                <span :class="getStatusClass(invoice.dueDate)">{{ getStatus(invoice.dueDate) }}</span>
              </div>
            </div>
            <div class="invoice-actions">
              <router-link 
                :to="`/editinvoice/${invoice.id}`"
                class="btn btn-primary"
              >
                Edit
              </router-link>
              <button 
                @click="downloadInvoice(invoice)" 
                class="btn btn-primary"
              >
                Download
              </button>
              <button 
                @click="deleteInvoice(invoice.id)" 
                class="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        
        <div v-else class="no-invoices">
          <p>No invoices found.</p>
          <router-link to="/createinvoice" class="btn btn-primary">Create Your First Invoice</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  import html2pdf from 'html2pdf.js';

  export default {
    name: 'InvoiceHistory',
    data() {
      return {
        invoices: [],
        searchQuery: '',
        filteredInvoices: []
      }
    },
    created() {
      this.loadInvoices()
    },
    methods: {
      loadInvoices() {
          const rawInvoices = JSON.parse(localStorage.getItem('invoices')) || []

  // Filter out any null, undefined, or incomplete invoices
          const validInvoices = rawInvoices.filter(invoice =>
             invoice && invoice.id && invoice.invoiceNumber && invoice.invoiceDate && invoice.clientName
          )

          this.invoices = validInvoices
          this.filteredInvoices = [...validInvoices].reverse() // Show newest first
      },
      filterInvoices() {
        if (!this.searchQuery) {
          this.filteredInvoices = [...this.invoices].reverse()
          return
        }
        
        const query = this.searchQuery.toLowerCase()
        this.filteredInvoices = this.invoices
          .filter(invoice => 
            invoice.clientName.toLowerCase().includes(query) ||
            invoice.invoiceNumber.toLowerCase().includes(query) ||
            invoice.totalAmount.toString().includes(query)
          )
          .reverse()
      },
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
      },
      getStatus(dueDate) {
        const today = new Date()
        const due = new Date(dueDate)
        
        if (due < today) {
          return 'Overdue'
        } else if (due.toDateString() === today.toDateString()) {
          return 'Due Today'
        } else {
          return 'Pending'
        }
      },
      getStatusClass(dueDate) {
        const status = this.getStatus(dueDate)
        return {
          'status-overdue': status === 'Overdue',
          'status-due': status === 'Due Today',
          'status-pending': status === 'Pending'
        }
      },
      downloadInvoice(invoice) {
        // In a real app, you would generate a PDF here
        const element = document.createElement('div')
        element.innerHTML = this.generateInvoiceHTML(invoice)
        document.body.appendChild(element)

        const opt = {
          margin: 10,
          filename: `invoice_${invoice.invoiceNumber}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }
        
        html2pdf()
        .from(element)
        .set(opt)
        .save()
        .then(() => {
          // Clean up
          document.body.removeChild(element)
        })

        alert(`Downloading invoice #${invoice.invoiceNumber}`)
      },

      generateInvoiceHTML(invoice) {
      return `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <h1 style="text-align: center; color: #333;">INVOICE</h1>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
            <div>
              <h3>From:</h3>
              <p>${invoice.businessName || 'Your Business Name'}</p>
              <p>${invoice.businessAddress || 'Your Business Address'}</p>
              <p>${invoice.businessEmail || ''} ${invoice.businessPhone || ''}</p>
            </div>
            
            <div style="text-align: right;">
              <h3>To:</h3>
              <p>${invoice.clientName}</p>
              <p>${invoice.clientAddress}</p>
              <p>${invoice.clientEmail || ''} ${invoice.clientPhone || ''}</p>
            </div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p><strong>Invoice #:</strong> ${invoice.invoiceNumber}</p>
            <p><strong>Date:</strong> ${this.formatDate(invoice.invoiceDate)}</p>
            <p><strong>Due Date:</strong> ${this.formatDate(invoice.dueDate)}</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Qty</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Price</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.items.map(item => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.description}</td>
                  <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.quantity}</td>
                  <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${item.price.toFixed(2)}</td>
                  <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div style="text-align: right;">
            <p><strong>Subtotal:</strong> $${invoice.subtotal?.toFixed(2) || '0.00'}</p>
            <p><strong>Tax (${invoice.taxRate || 0}%):</strong> $${invoice.taxAmount?.toFixed(2) || '0.00'}</p>
            <p><strong>Total:</strong> $${invoice.totalAmount?.toFixed(2) || '0.00'}</p>
          </div>
          
          <div style="margin-top: 40px; font-size: 0.9em; color: #666;">
            <p>Thank you for your business!</p>
          </div>
        </div>
      `
      },

      deleteInvoice(id) {
        if (confirm('Are you sure you want to delete this invoice?')) {
          const invoices = JSON.parse(localStorage.getItem('invoices') || '[]')
          const updatedInvoices = invoices.filter(invoice => invoice.id !== id)
          localStorage.setItem('invoices', JSON.stringify(updatedInvoices))
          this.loadInvoices()
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .invoice-history {
    padding: 40px 0;
  }
  
  .invoice-history h1 {
    margin-bottom: 30px;
    color: var(--dark-color);
    text-align: center;
  }
  
  .search-filter {
    margin-bottom: 30px;
  }
  
  .search-filter input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .invoices-list {
    display: grid;
    gap: 20px;
  }
  
  .invoice-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .invoice-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
  
  .invoice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .invoice-date {
    color: #666;
    font-size: 0.9rem;
  }
  
  .invoice-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .status-overdue {
    color: var(--danger-color);
    font-weight: 500;
  }
  
  .status-due {
    color: var(--warning-color);
    font-weight: 500;
  }
  
  .status-pending {
    color: var(--success-color);
    font-weight: 500;
  }
  
  .invoice-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
  
  .no-invoices {
    text-align: center;
    padding: 50px 0;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .no-invoices p {
    margin-bottom: 20px;
    font-size: 1.1rem;
    color: #666;
  }
  
  @media (max-width: 768px) {
    .invoice-details {
      grid-template-columns: 1fr;
    }
    
    .invoice-actions {
      flex-direction: column;
    }
    
    .invoice-actions .btn {
      width: 100%;
      text-align: center;
    }
    
  }
  </style>