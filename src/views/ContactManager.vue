<template>
    <div v-if="!loading" class="container mt-3">
        <div class="row">
        <div class="col">
            <p class="h3 text-success fw-bold fs-2">
            Contact Manager
            <router-link to="/contact/add" class="btn btn-success btn-sm ms-2">
                <i class="fa fa-plus-circle mx-1"></i>
                <span> New contact</span>
            </router-link>
            </p>
            <p class="fst-italic fs-5">
            La gestion de personnel est un domaine crucial au sein de toute
            organisation. Elle englobe un ensemble de processus et de pratiques
            visant à optimiser l'efficacité, la productivité et le bien-être des
            employés. Cette discipline s'articule autour de plusieurs aspects
            essentiels : Recrutement et sélection : La gestion de personnel
            commence par l'identification des besoins en personnel, la publication
            d'offres d'emploi, la recherche de candidats qualifiés, et finalement,
            le processus de sélection pour trouver les meilleurs talents pour
            l'entreprise. Intégration : Une fois embauchés, les nouveaux employés
            doivent être correctement accueillis et intégrés à l'entreprise. Cela
            comprend la formation, la remise de ressources essentielles, et la
            création d'un environnement propice à leur réussite.
            </p>

            <form action="" class="">
            <div class="row">
                <div class="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12">
                <div class="row">
                    <div
                    class="col-xxl-10 col-xl-8 col-lg-10 col-md-10 col-sm-12 my-1"
                    >
                    <input
                        type="text"
                        class="form-control form-control-lg"
                        placeholder="Search name"
                    />
                    </div>
                    <div
                    class="col-xxl-2 col-xl-4 col-lg-2 col-md-2 col-sm-12 my-1"
                    >
                    <input
                        type="submit"
                        class="btn btn-outline-dark btn-lg"
                        value="search"
                    />
                    </div>
                </div>
                </div>
            </div>
            </form>
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


    <div class="container mt-3" v-if="contacts.length>0">
        <div class="row">
        <div v-for="(contact,i) in contacts" :key="i" class="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12">
            <div
            class="card bg-success-subtle list-group-item-success my-2 shadow-lg"
            >
            <div class="card-body">
                <div class="row align-items-center">
                <div
                    class="col-xxl-4 col-xl-4 col-lg-3 col-md-3 col-sm-6 order-sm-1"
                >
                    <!-- image section -->
                    <img class="contact-img" :src="contact.photo" alt="" />
                </div>
                <div
                    class="col-xxl-7 col-xl-7 col-lg-8 col-md-8 col-sm-12 order-sm-3"
                >
                    <!-- information section -->
                    <ul class="list-group">
                    <li class="list-group-item">
                        Name : <span class="fw-bold"> {{ contact.name }}</span>
                    </li>
                    <li class="list-group-item">
                        Email : <span class="fw-bold"> {{contact.email}}</span>
                    </li>
                    <li class="list-group-item">
                        Mobile Number : <span class="fw-bold"> {{ contact.mobile }}</span>
                    </li>
                    </ul>
                </div>
                <div
                    class="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-6 order-sm-2 d-flex flex-column align-items-center d-sm-flex flex-row"
                >
                    <!-- actions section -->
                    <router-link
                    :to="`/contact/view/${contact.id}`"
                    class="btn btn-outline-warning my-1"
                    >
                    <i class="fa fa-eye"></i>
                    </router-link>
                    <router-link
                    :to="`/contact/edit/${contact.id}`"
                    class="btn btn-outline-primary"
                    >
                    <i class="fa fa-pen my-1"></i>
                    </router-link>
                    <button @click="deleteContact(contact.id)" class="btn btn-outline-danger my-1">
                    <i class="fa fa-trash"></i>
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>


<script>
    import SpinnerComponent from '@/components/SpinnerComponent.vue';
    import ContactService from '../services/ContactService.js';
    import {ref} from 'vue';

    export default {
  components: { SpinnerComponent },
    name: "ContactManagerVue",
    data() {
        return {
            loading: ref(false),
            contacts :ref( []),
            errorMessage: null
        }
    },

    async created() {
        try {
            this.loading = true;
            let response = await ContactService.getAllContacts();
            this.contacts = response.data;
            this.loading = false;
        } catch (error) {
            this.errorMessage = error;
            this.loading = false;
        }  
    },

    methods :{
        // definitions des methodes du component
        async deleteContact(contactId){
            try {
                let response = await ContactService.deleteContact(contactId);
                if(response){
                    alert("Suppression effectuer avec success");
                    
                    let res = await ContactService.getAllContacts();
                    this.contacts = res.data;
                    
                    this.$router.push("/")
                }
            } catch (error) {
                alert("Erreur de suppression : " + error);
                console.log(error);
                this.$router.push("/")
            }
        }
    }
    


};
</script>

<style></style>
