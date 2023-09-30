<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <div class="h3 text-success fw-bold">Edit contact</div>
        <p class="fst-italic">
          Bienvenue dans notre entreprise ! Nous sommes ravis de t'accueillir
          parmi nous et nous voulons que tu saches à quel point tu es précieux
          pour notre équipe. Voici quelques mots d'encouragement pour t'aider à
          démarrer avec confiance :
        </p>
      </div>
    </div>
  </div>

  <div class="container mt-3">
    <form
      name="form"
      @submit.prevent="sibmitCreate()"
      method="POST"
      enctype="multipart/form-data"
    >
      <div class="row">
        <div class="col-md-4">
          <div class="mb-3">
            <input
              v-model="newContact.name"
              type="text"
              name="name"
              placeholder="Your name"
              class="form-control form-control-lg"
              id=""
            />
          </div>
          <div class="mb-3">
            <input
              v-model="newContact.photo"
              type="text"
              name="name"
              placeholder="Photo URL"
              class="form-control form-control-lg"
              id=""
            />
          </div>
          <div class="mb-3">
            <input
              v-model="newContact.email"
              type="email"
              name="name"
              placeholder="Your email address"
              class="form-control form-control-lg"
              id=""
            />
          </div>
          <div class="mb-3">
            <select
              v-if="groupsId.length > 0"
              v-model="newContact.groupId"
              name="groupe"
              class="form-select"
              id=""
            >
              <option value="" disabled selected>Select Group</option>
              <option v-for="(group, i) in groupsId" :key="i" :value="group.id">
                {{ group.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="mb-3">
            <input
              v-model="newContact.mobile"
              type="number"
              name="phone"
              placeholder="Your phone number"
              class="form-control form-control-lg"
              id=""
            />
          </div>
          <div class="mb-3">
            <input
              v-model="newContact.company"
              type="text"
              name="company"
              placeholder="Your company name"
              class="form-control form-control-lg"
              id=""
            />
          </div>
          <div class="mb-3">
            <input
              v-model="newContact.title"
              type="text"
              name="tile"
              placeholder="Your title in company"
              class="form-control form-control-lg"
              id=""
            />
          </div>
          <div class="mb-3">
            <input
              type="submit"
              class="btn btn-outline-primary w-75"
              value="Edit"
              id=""
            />
          </div>
        </div>
        <div class="col-md-4">
          <img :src="newContact.photo" class="contact-img" alt="" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ContactService from "../services/ContactService.js";
import { ref } from "vue";

export default {
  name: "EditContactVue",

  data() {
    return {
      groupsId: Array,
      newContact: ref({
        name: "",
        company: "",
        email: "",
        title: "",
        mobile: "",
        photo: "",
        groupId: "",
      }),

      oldContactId : null,
      oldContact : {},
    };
  },

  async created() {
    let response = await ContactService.getAllsGroups();
    this.groupsId = response.data;

    // old contact information
    this.oldContactId = this.$route.params.contactId;
     let oldResponse = await ContactService.getContact(this.oldContactId);
     this.oldContact = oldResponse.data;
     this.newContact = this.oldContact;
  },

  methods: {
    
    
    
    sibmitCreate : async function(){
        if (this.newContact.name==="") {
           alert("veuillez remplir le champ name");
           return 0;
        }
        if (this.newContact.email==="") {
           alert("veuillez remplir le champ email");
           return 0;
        }
        if (this.newContact.mobile==="") {
           alert("veuillez remplir le champ mobile");
           return 0;
        }

        try {
            let response = await ContactService.updateContact(this.newContact,this.oldContactId)
            if(response) {
                return this.$router.push("/");
            }else{
                return this.$router.push("/contact/edit/${this.oldContactId}");
            }

        } catch (error) {
            
            console.log(error);
        }
    }
  },

};
</script>

<style></style>
