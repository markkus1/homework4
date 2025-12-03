<template>
  <div>
    <div class="container">
      <div class="Lsidebar">
      </div>
      <!-- Posts Section -->
      <div class="posts">
        <button v-if="authResult" @click="Logout" class="center">Logout</button>

        <div v-if="loading" class="loading">Loading posts...</div>

        <div v-else>
          <div class="post" v-for="post in posts" :key="post.id">
            <div class="post-header">
              <span class="author">{{ post.author }}</span>
              <span class="date">{{ formatDate(post.date) }}</span>
            </div>
            <p class="post-text">{{ post.content }}</p>
          </div>
        </div>

        <div class="button-row" v-if="authResult">
          <button @click="Logout" class="center">Logout</button>
          <button @click="Logout" class="center">Logout</button>
        </div>
      </div>

      <div class="Rsidebar">
      </div>

    </div>
  </div>
</template>

<script>
import auth from "../auth";

export default {
  name: "HomeView",
  data() {
    return {
      posts: [],
      authResult: auth.authenticated(),
      loading: false,
    };
  },
  methods: {
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then(() => this.$router.push("/login"))
        .catch((e) => console.log("Logout error:", e));
    },

    async fetchPosts() {
      try {
        this.loading = true;
        const response = await fetch("http://localhost:3000/posts", {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch posts");
        this.posts = await response.json();
      } catch (err) {
        console.error("Error fetching posts:", err.message);
      } finally {
        this.loading = false;
      }
    },

    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },

  mounted() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
  margin: 10px;
}

/* Sidebars */
.Lsidebar,
.Rsidebar {
  background: #f4f4f4;
  padding: 10px;
  border-radius: 8px;
  flex: 0 0 200px;
}

.button-row {
  display: flex;
  gap: 200px;       /* space between buttons */
  justify-content: center; /* center the row */
}

/* Posts Section */
.posts {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-items: stretch;
}


/* Post styling */
.post {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 0 4px #aaa;
  margin: 1rem auto;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.author {
  font-weight: bold;
}

.date {
  font-size: 0.8rem;
  color: gray;
  margin-left: auto;
}

.post-text {
  margin: 0.5rem 0;
}

.loading {
  text-align: center;
  color: gray;
  padding: 1rem;
}

.center {
  align-self: center;
  padding: 0.5rem 2rem;
  background: #679fff;
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  margin: 0.5rem 0;
}
</style>
