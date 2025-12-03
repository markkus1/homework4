<template>
  <div class="page-layout">
    <div class="login-wrapper">
      <form class="login-box" @submit.prevent="LogIn">

        <div class="form-row">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="Email" required />
        </div>

        <div class="form-row">
          <label>Password</label>
          <input type="password" v-model="password" placeholder="Password" required />
        </div>

        <div class="btn-row">
          <button class="login-btn" type="submit">LogIn</button>
          <button class="signup-btn" @click.prevent="$router.push('/signup')">Signup</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    LogIn() {
      const data = {
        email: this.email,
        password: this.password,
      };

      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          location.assign("/");
        })
        .catch((e) => {
          console.log("error", e);
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

/* Positions the login box */
.login-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 80px;
}

/* Form box style (same as signup) */
.login-box {
  background: #f7f7e6;
  padding: 3rem 3.5rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
  gap: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 0.5rem;
  color: #333;
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

/* Buttons row */
.btn-row {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

/* Login button */
.login-btn {
  padding: 0.5rem 2rem;
  background: #679fff;
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
}

/* Signup button */
.signup-btn {
  padding: 0.5rem 2rem;
  background: #679fff;
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
}

.login-btn:hover {
  background: #5a8fe6;
}

.signup-btn:hover {
  background: #5a8fe6;
}
</style>
