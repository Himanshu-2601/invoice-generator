<template>
    <div class="home">
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1>Simple, Fast Invoice Generator</h1>
            <p>Create professional invoices in minutes. Save time and get paid faster with our easy-to-use invoice generator.</p>
            <router-link to="/createinvoice" class="btn btn-primary">Create Invoice Now</router-link>
          </div>
          <div class="hero-image">
            <img src="../assets/hero-image.jpg" alt="Invoice Generator">
          </div>
        </div>
      </section>
  
      <section class="features">
        <div class="container">
          <h2>Why Choose Our Invoice Generator?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3>Quick Creation</h3>
              <p>Generate invoices in under a minute with our streamlined process.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💼</div>
              <h3>Professional</h3>
              <p>Create polished, professional invoices that impress your clients.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Works perfectly on all devices - desktop, tablet, and mobile.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView'
  }
  </script>

<style scoped>
.home {
  flex: 1;
}

.hero {
  background-color: var(--primary-color);
  color: white;
  padding: 60px 0;
}

.hero .container {
  display: flex;
  align-items: center;
  gap: 40px;
}

.hero-content {
  flex: 1;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 600px;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: float 3s ease-in-out infinite;
}

.features {
  padding: 60px 0;
  background-color: white;
}

.features h2 {
  text-align: center;
  margin-bottom: 40px;
  color: var(--dark-color);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.feature-card {
  background-color: var(--light-color);
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.feature-card h3 {
  margin-bottom: 15px;
  color: var(--dark-color);
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@media (max-width: 992px) {
  .hero .container {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-content p {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-content p {
    font-size: 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>