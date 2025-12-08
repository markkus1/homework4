<template>
  <div class="add-page">
    <div class="card">
      <h2>Add Post</h2>

      <div class="form-row">
        <label>Body</label>
        <input 
          v-model="content" 
          type="text" 
          placeholder="body"
          class="input-box"
        />
      </div>

      <button class="add-btn" @click="submitPost">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPost",

  data() {
    return {
      content: "",
    };
  },

  methods: {
    async submitPost() {
      if (!this.content.trim()) {
        alert("Body cannot be empty");
        return;
      }

      await fetch("http://localhost:3000/posts", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: this.content,
          author: "User",               // your backend expects this
          date: new Date().toISOString() // give today’s date
        }),
      });

      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.add-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
}

.card {
  background: #f7f7e6;
  padding: 2rem 3rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
  width: 350px;
}

.form-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  gap: 1rem;
}

label {
  font-weight: bold;
}

.input-box {
  padding: 0.4rem 1rem;
  border-radius: 15px;
  border: 1px solid #ccc;
  width: 150px;
}

.add-btn {
  margin-top: 1rem;
  background: #679fff;
  color: white;
  padding: 0.5rem 2rem;
  border-radius: 15px;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.add-btn:hover {
  background: #5a8fe6;
}
</style>
