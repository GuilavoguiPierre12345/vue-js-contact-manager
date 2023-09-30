<template>
  <div v-if="!loading && errorMessage" class="container mt-3">
    <div class="row">
      <div class="col">
        <div class="h3 text-success fw-bold">View contact</div>
        <p class="fst-italic">
          Bienvenue dans notre entreprise ! Nous sommes ravis de t'accueillir
          parmi nous et nous voulons que tu saches à quel point tu es précieux
          pour notre équipe. Voici quelques mots d'encouragement pour t'aider à
          démarrer avec confiance :
        </p>
      </div>
    </div>
  </div>

  <!-- affichage du spinner -->
  <div v-if="loading" class="">
        <div class="container">
            <div class="row">
                <div class="col">
                    <spinner-component/>
                </div>
            </div>
        </div>
    </div>

    <!-- affichage du message d'erreur -->
    <div v-if="!loading && errorMessage" class="">
        <div class="container">
            <div class="row">
                <div class="col">
                    <p class="text-danger fw-bold">{{ errorMessage }}</p>
                </div>
            </div>
        </div>
    </div>

  <div class="container mt-3">
    <div class="row align-items-center">
      <div class="col-md-4">
        <img class="contact-img-big" :src="contact.photo" alt="" />
      </div>
      <div class="col-md-6">
        <ul class="list-group">
          <li class="list-group-item">
            Name : <span class="fw-bold"> {{ contact.name }}</span>
          </li>
          <li class="list-group-item">
            Group : <span class="fw-bold"> {{ group.name }}</span>
          </li>
          <li class="list-group-item">
            Mobile Number : <span class="fw-bold"> {{ contact.mobile }}</span>
          </li>
          <li class="list-group-item">
            Company : <span class="fw-bold"> {{ contact.company }}</span>
          </li>
          <li class="list-group-item">
            Email : <span class="fw-bold"> {{ contact.email }}</span>
          </li>
          <li class="list-group-item">
            Title : <span class="fw-bold"> {{ contact.title }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="row mt-3">
        <div class="col-md-2">
          <router-link to="/" class="btn btn-outline-success">
            <i class="fa fa-arrow-alt-circle-left"></i>
            back</router-link>
        </div>
    </div>
  </div>
</template>

<script>
import ContactService from '../services/ContactService.js';


export default {
  name: "ViewContactVue",
  data() {
    return {
        contactId : this.$route.params.contactId,
        loading : false,
        contact : {},
        errorMessage : null,
        group : {}
    }
  },

  async created(){
    try {
        this.loading = true;
        let response = await ContactService.getContact(this.contactId);
        let groupResponse = await ContactService.getGroup(response.data);
        this.group = groupResponse.data;
        this.contact = response.data;
        this.loading = false;

    } catch (error) {
        this.errorMessage = error;
        this.loading = false;
        console.log(error);
    }
  },


};
</script>

<style></style>
