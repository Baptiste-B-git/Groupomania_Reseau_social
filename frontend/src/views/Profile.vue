<template>
  <div>
    <Header />
    <div class="card">
      <h2>Profil</h2>
      <div>
        <h3 class="name-user"> {{ user.username }}</h3>
        <p class="email">{{user.email}}</p>
      </div>
      <button class="btn-delete" @click="deleteAccount">
        Supprimer mon compte
      </button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";

export default {
  name: "Profile",
  components: {
    Header,
  },
  data(){
    return{
      error: null,
      user: "",
      username: "",
      email: "",
    }
  },
    beforeMount() {
    this.check();
    this.getId();
  },
  methods:{
    check() {
      const token = JSON.parse(localStorage.getItem("res"));
      if (!token) {
        this.$router.push({ name: "Login" });
      } else {
        const id = VueJwtDecode.decode(token).userId;
        this.id = id;
      }
    },

    async getId() {
      const token = JSON.parse(localStorage.getItem("res"));
      const id = VueJwtDecode.decode(token).userId;
      this.id = id;
      try {
        const res = await fetch(`http://localhost:5000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await res.json();
        this.user = user;
        this.username = user.username;
        this.email = user.email;
      } catch (error) {
        console.log(error);
      }
    },

// Supprimer le compte utilisateur
    async deleteAccount() {
      const token = JSON.parse(localStorage.getItem("res"));
      const id = VueJwtDecode.decode(token).userId;
      try {
        await axios.delete(`http://localhost:5000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.$router.push({ name: "Login" });
        localStorage.clear();
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style scoped>
h2{
  padding-bottom: 10px;
  border-bottom: solid 1px black;
}
.card {
  margin-top: 50px;
  text-align: center;
  max-width: 300px;
}
.name-user {
  font-weight: 800;
  font-size: 1.5rem;
}
.email {
  text-align: center;
  margin-bottom: 5px;
  font-size: 1.2em;
}
.btn-delete {
  min-width: 200px;
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
  background-color: #247b9e;
  color: white;
  font-weight: bold;
}
</style>
