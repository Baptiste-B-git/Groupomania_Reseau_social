<template>
  <div>
    <h2 class="subtitle">Exprimez-vous...</h2>
    <div class="card">
      <label class="label" for="post-field">post</label>
      <textarea
        id="post-field"
        placeholder="Quoi de neuf ?"
        v-model="content"
      ></textarea
      ><br />

      <label class="label" for="input-image">image</label>
      <input
        type="file"
        name="image"
        id="input-image"
        ref="image"
        class="custom-file-input"
        v-on:change="handleFileUpload()"/>
      <button class="button" @click="post">Publier !</button>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";

export default {
  name: "Post",
  emits: ["postAdded"],
  data() {
    return {
      image: "",
      UserId: null,
      content: "",
      token: "",
      error: null,
    };
  },

  beforeMount() {
    this.getId();
  },

  methods: {
    // Gère le téléchargement de l'image
    handleFileUpload() {
      this.image = this.$refs.image.files[0];
    },

    async getId() {
      const token = JSON.parse(localStorage.getItem("res"));
      const id = VueJwtDecode.decode(token).userId;
      this.token = token;
      this.UserId = id;
    },
    async post() {
      if (this.content == "") {
        alert("Veuillez renseigner un post");
        return;
      }
      const token = JSON.parse(localStorage.getItem("res"));

      // append() ajoute une nouvelle valeur dans l'objet FormData
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("UserId", this.UserId);
      formData.append("content", this.content);
        try {
        const response = await axios.post(
          "http://localhost:5000/api/post",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.subtitle {
  color: white;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}
#post-field {
  width: 100%;
  border-radius: 8px;
  padding: 12px 0 0 12px;
}

textarea:focus {
  outline: none !important;
  border-color: #719ece;
  box-shadow: 0 0 10px #719ece;
}

input{
  max-width: 100%;
  width: 300px;
  margin-top: 12px;
  background: #eeeeee;
  border-radius: 10px;
  padding: 10px;
}
.label{
   position:absolute;
   left:-10000px;
   top:auto;
   width:1px;
   height:1px;
   overflow:hidden;
}
.bloc-btn {
  display: flex;
  flex-direction: row;
}
.button {
  min-width: 100px;
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
  margin-right: 20px;
  background-color: #06729c;
  color: white;
}

button:hover {
  outline: none !important;
  border-color: #719ece;
  box-shadow: 0 0 10px #719ece;
}

.picture-profile {
  width: 50px;
  height: 50px;
  background: rgb(187, 187, 187);
}
.user-name {
  text-align: left;
}
.post-img {
  max-width: auto;
  height: 300px;
  margin: 0 auto;
  border: 1px solid black;
  box-sizing: border-box;
  background: rgb(187, 187, 187);
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>