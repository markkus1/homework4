<template>
  <div id="app">
    <header class="header">
      <nav>
        <router-link to="/">Home</router-link> |
        <!-- <router-link to="/signup">SignUp</router-link> | -->
        <!-- <router-link to="/login">LogIn</router-link> | -->
        <router-link to="/about">Contacts</router-link>
      </nav>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer>
      <p>&copy; 2025 GroupA. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  background: #cfcbcb;
  padding: 20px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-bottom: 1px solid #ddd;
}

main.main-content {
  flex: 1;  /* takes all available space so footer sticks to bottom */
}

footer {
  background: #cfcbcb;
  color: #2c3e50;
  text-align: center;
  padding: 10px 0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
