<template>
    <nav class="navbar">
        <div class="container">
            <router-link to="/" class="logo">
                <img src="../assets/logo.png" alt="Invoice Generator Logo">
                <span class="logo-text">SwiftInvoice</span>
            </router-link>    
            <div class="nav-links">
                <router-link to="/">Home</router-link>
                <router-link to="/createinvoice">Create Invoice</router-link>
                <router-link to="/invoicehistory">Invoice History</router-link>
            </div>
            <button class="mobile-menu-btn" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <div class="mobile-menu" :class="{ 'active': isMenuOpen }">
            <router-link to="/" @click="toggleMenu">Home</router-link>
            <router-link to="/createinvoice" @click="toggleMenu">Create Invoice</router-link>
            <router-link to="/invoicehistory" @click="toggleMenu">Invoice History</router-link>

        </div>
    </nav>
</template>

<script>
    export default{
        name: 'NavBar',
        data() {
            return{
                isMenuOpen: false
            }
        },
        methods: {
            toggleMenu() {
                this.isMenuOpen = !this.isMenuOpen
            }
        }
    }
</script>

<style scoped>
    .navbar{
        background-color: var(--dark-color);
        color: white;
        padding: 15px 0;
        position: sticky;
        top: 0;
        z-index: 100;
    }

    .navbar .container{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo img{
        height: 40px;
        width: auto;
        object-fit: contain;
        margin-top: 4px;
    }

    .logo-text {
      font-size: 1.8rem;
      font-weight: bold;
      color: white;
      padding-left: 1px;
    }

    .nav-links {
        display: flex;
        gap: 20px;
    }

   .nav-links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
   }

   .nav-links a:hover{
    color: var(--primary-color);
   }
  
   .nav-links a.router-link-exact-active {
    color: var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
  }
  
  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    flex-direction: column;
    justify-content: space-between;
    height: 24px;
    width: 30px;
    padding: 0;
  }
  
  .mobile-menu-btn span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: white;
    transition: all 0.3s ease;
  }
  
  .mobile-menu {
    display: none;
    flex-direction: column;
    background-color: var(--dark-color);
    padding: 10px 0;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    transform: translateY(-150%);
    transition: transform 0.3s ease;
    z-index: 99;
  }
  
  .mobile-menu.active {
    transform: translateY(0);
  }
  
  .mobile-menu a {
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    transition: background-color 0.3s ease;
  }
  
  .mobile-menu a:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
    
    .mobile-menu-btn {
      display: flex;
    }
    
    .mobile-menu {
      display: flex;
    }
  }
  
</style>