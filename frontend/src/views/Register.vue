<template>
  <div>
    <div class="card card-container">
      <h1>Inscription</h1>
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
        alt="profile-img"
      />
      <form v-on:submit.prevent="onSubmit" class="registerForm">
        <!-- Username -->
        <div class="form-group">
          <div v-if="error" style="color: crimson" class="error">{{ error }}</div>
          <label class="label" for="input-username">test</label>
          <input
            name="username"
            type="pseudo"
            id="input-username"
            placeholder="Nom d'utilisateur"
            maxlength="15"
            autofocus
            required
            v-model="username"
          />
        </div>

        <!-- Email -->
        <div class="form-group">
          <label class="label" for="input-email">test</label>
          <input
            name="email"
            type="text"
            id="input-email"
            placeholder="Adresse e-mail"
            maxlength="25"
            required
            v-model="email"
          />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label class="label" for="input-password">test</label>
          <input
            name="password"
            type="password"
            id="input-password"
            placeholder="Mot de passe"
            maxlength="25"
            required
            v-model="password"
          />
        </div>

        <!-- Bouton Inscription -->
        <div class="form-group">
          <button class="btn-block" @click="signup">Inscription</button>
        </div>

        <!-- Redirection vers Connexion -->
        <p>
          Vous avez déjà un compte ?
          <a class="link-to" href="/login">Se connecter</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import authservice from "../services/authservice";
export default {
  name: "Register",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async signup() {
      if(this.username=="" || this.email=="" || this.password==""){ // Message d'erreur renseigner un champ
        return false;
      }
      try {
        const response = await authservice.signup({
          email: this.email,
          password: this.password,
          username: this.username,
        });
        const res = response.data.token;
        const parsed = JSON.stringify(res);
        localStorage.setItem("res", parsed);
        console.log(response);
        this.$router.push({ name: "Login" }); // Push vers Login
      } catch (error) {
        console.log(error.response.data);
        this.error=error.response.data[0].message;
      }
    },
  },
};
</script>

<style>
</style>