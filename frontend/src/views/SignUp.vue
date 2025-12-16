<template>
  <div class="page-layout">
    <div class="signup-wrapper">
      <form class="signup-box" @submit.prevent="SignUp">
        <div class="form-row">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="Email" required />
        </div>

        <div class="form-row">
          <label>Password</label>
          <input type="password" v-model="password" placeholder="Password" required />
        </div>

        <button class="signup-btn" type="submit">SignUp</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    SignUp() {
      const data = {
        email: this.email,
        password: this.password,
      };

      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then(async (response) => {
      const result = await response.json();
      if (!response.ok) {
        // Show backend error to user
        alert(result.message || "Signup failed");
        return;
      }
      console.log(result);
      this.$router.push("/");
      })
      .catch((e) => {
        console.log("error", e);
        alert("Network error, please try again");
      });
    },
  },
};
</script>

<style scoped>
.page-layout {
  display: flex;
  flex-direction: column;
}

.signup-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 80px 0;
}

.signup-box {
  background: #f7f7e6;
  padding: 3rem 3.5rem;     
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  max-width: 450px;          
  width: 100%;              
  gap: 1.5rem;              
  box-shadow: 0 4px 20px rgba(0,0,0,0.1); 
}

.form-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.form-row label {
  width: 80px;
  font-weight: bold;
  font-size: 14px;
}

.form-row input {
  padding: 0.5rem 1rem;
  border-radius: 15px;
  border: 1px solid #ccc;
  background: white;
  font-size: 14px;
  width: 260px; 
}

.signup-btn {
  padding: 0.5rem 2rem;
  background: #679fff;
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  align-self: center;
  margin-top: 0.5rem;
}

.signup-btn:hover {
  background: #5a8fe6;
}
</style>
