<template>
  <div class="post-page">
    <div class="card">
      <h2>A Post</h2>

      <div class="form-row">
        <label>Body</label>
        <input
          v-model="content"
          type="text"
          placeholder="body"
          class="input-box"
        />
      </div>

      <div class="button-row">
        <button class="action-btn" @click="updatePost">Update</button>
        <button class="action-btn" @click="deletePost">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostPage",

  data() {
    return {
      content: "",
    };
  },

  async mounted() {
    const id = this.$route.params.id;
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        credentials: "include",
      });
      if (response.ok) {
        const post = await response.json();
        this.content = post.content;
      }
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  },

  methods: {
    async updatePost() {
      const id = this.$route.params.id;
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: this.content }),
      });
      this.$router.push("/");
    },

    async deletePost() {
      const id = this.$route.params.id;
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.post-page {
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

.button-row {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.action-btn {
  background: #679fff;
  color: white;
  padding: 0.5rem 2rem;
  border-radius: 15px;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.action-btn:hover {
  background: #5a8fe6;
}
</style>
