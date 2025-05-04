<template>
    <form @submit.prevent="handleSubmit" class="invoice-form">
        <div class="form-section">
        <h2>Bill From</h2>
        <div class="form-group">
          <label for="businessName">Business Name</label>
          <input type="text" id="businessName" v-model="formData.businessName" required>
        </div>
        <div class="form-group">
          <label for="businessAddress">Address</label>
          <textarea id="businessAddress" v-model="formData.businessAddress" required></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="businessEmail">Email</label>
            <input type="email" id="businessEmail" v-model="formData.businessEmail" required>
          </div>
          <div class="form-group">
            <label for="businessPhone">Phone</label>
            <input type="tel" id="businessPhone" v-model="formData.businessPhone" required>
          </div>
        </div>
      </div>
  
      <div class="form-section">
        <h2>Bill To</h2>
        <div class="form-group">
          <label for="clientName">Client Name</label>
          <input type="text" id="clientName" v-model="formData.clientName" required>
        </div>
        <div class="form-group">
          <label for="clientAddress">Client Address</label>
          <textarea id="clientAddress" v-model="formData.clientAddress" required></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="clientEmail">Client Email</label>
            <input type="email" id="clientEmail" v-model="formData.clientEmail" required>
          </div>
          <div class="form-group">
            <label for="clientPhone">Client Phone</label>
            <input type="tel" id="clientPhone" v-model="formData.clientPhone" required>
          </div>
        </div>
      </div>
  
      <div class="form-section">
        <h2>Invoice Details</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="invoiceNumber">Invoice Number</label>
            <input type="text" id="invoiceNumber" v-model="formData.invoiceNumber" required>
          </div>
          <div class="form-group">
            <label for="invoiceDate">Date</label>
            <input type="date" id="invoiceDate" v-model="formData.invoiceDate" required>
          </div>
          <div class="form-group">
            <label for="dueDate">Due Date</label>
            <input type="date" id="dueDate" v-model="formData.dueDate" required>
          </div>
        </div>
      </div>
  
      <div class="form-section">
        <h2>Items</h2>
        <div class="items-list">
          <div class="item-header">
            <span>Description</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Total</span>
            <span>Action</span>
          </div>
          <div class="item-row" v-for="(item, index) in formData.items" :key="index">
            <input type="text" v-model="item.description" required>
            <input type="number" v-model="item.quantity" min="1" @change="calculateItemTotal(index)" required>
            <input type="number" v-model="item.price" min="0" step="0.01" @change="calculateItemTotal(index)" required>
            <span class="item-total">${{ (item.quantity * item.price).toFixed(2) }}</span>
            <button type="button" class="btn btn-danger" @click="removeItem(index)">Remove</button>
          </div>
          <button type="button" class="btn btn-primary add-item-btn" @click="addItem">Add Item</button>
        </div>
      </div>
  
      <div class="form-section">
        <h2>Summary</h2>
        <div class="summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="form-group">
            <label for="taxRate">Tax Rate (%)</label>
            <input type="number" id="taxRate" v-model="formData.taxRate" min="0" max="100" step="0.01" @change="calculateTotal">
          </div>
          <div class="summary-row">
            <span>Tax:</span>
            <span>${{ taxAmount.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Total:</span>
            <span>${{ totalAmount.toFixed(2) }}</span>
          </div>
        </div>
      </div>
  
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Save Invoice</button>
        <button type="button" class="btn btn-danger" @click="resetForm">Reset</button>
      </div>
    </form>
</template>

<script>
    export default{
        name:'InvoiceForm',
        props: {
            initialData: {
                type: Object,
                default: () => ({
                    businessName: '',
                    businessAddress: '',
                    businessEmail: '',
                    businessPhone: '',
                    clientName: '',
                    clientAddress: '',
                    clientEmail: '',
                    clientPhone: '',
                    invoiceNumber: '',
                    invoiceDate: new Date().toISOString().split('T')[0],
                    dueDate: '',
                    items: [
                        { description: 'Item', quantity: 1, price: 0 }
                    ],
                    taxRate: 0,
                    notes: ''
                })
            }
        },
        data() {
      return {
        formData: JSON.parse(JSON.stringify(this.initialData))
      }
    },
    computed: {
      subtotal() {
        return this.formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
      },
      taxAmount() {
        return this.subtotal * (this.formData.taxRate / 100)
      },
      totalAmount() {
        return this.subtotal + this.taxAmount
      }
    },
    methods: {
      addItem() {
        this.formData.items.push({ description: '', quantity: 1, price: 0 })
      },
      removeItem(index) {
        if (this.formData.items.length > 1) {
          this.formData.items.splice(index, 1)
        }
      },
      calculateItemTotal() {
        // This is handled by the computed properties
      },
      calculateTotal() {
        // This is handled by the computed properties
      },
      resetForm() {
        this.formData = JSON.parse(JSON.stringify(this.initialData))
      },
      handleSubmit() {
        const invoiceData = {
          ...this.formData,
          subtotal: this.subtotal,
          taxAmount: this.taxAmount,
          totalAmount: this.totalAmount,
          createdAt: new Date().toISOString()
        }
        this.$emit('submit', invoiceData)
      }
    }
} 
</script>

<style scoped>
    .invoice-form {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    animation: fadeIn 0.5s ease;
  }
  
  .form-section {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  
  .form-section h2 {
    margin-bottom: 20px;
    color: var(--dark-color);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s ease;
  }
  
  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    border-color: var(--primary-color);
    outline: none;
  }
  
  .form-group textarea {
    min-height: 80px;
    resize: vertical;
  }
  
  .form-row {
    display: flex;
    gap: 20px;
  }
  
  .form-row .form-group {
    flex: 1;
  }
  
  .items-list {
    margin-top: 20px;
  }
  
  .item-header {
    display: flex;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    font-weight: 500;
    margin-bottom: 10px;
  }
  
  .item-header span {
    flex: 1;
  }
  
  .item-header span:last-child {
    flex: 0.5;
  }
  
  .item-row {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .item-row input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .item-total {
    flex: 1;
    text-align: right;
    padding-right: 10px;
  }
  
  .add-item-btn {
    margin-top: 10px;
  }
  
  .summary {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 4px;
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 16px;
  }
  
  .summary-row span:last-child {
    font-weight: 500;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 30px;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .form-row {
      flex-direction: column;
      gap: 15px;
    }
    
    .item-header {
      display: none;
    }
    
    .item-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
      padding: 15px;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-bottom: 15px;
    }
    
    .item-row input {
      width: 100%;
    }
    
    .item-total {
      text-align: left;
      padding-right: 0;
      margin: 5px 0;
    }
    
    .form-actions {
      justify-content: center;
    }
    
    .form-actions button {
      width: 100%;
    }
  }
</style>