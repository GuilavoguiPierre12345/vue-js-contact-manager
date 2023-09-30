<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <div class="h3 text-success fw-bold">Add contact</div>
        <p class="fst-italic">
          Bienvenue dans notre entreprise ! Nous sommes ravis de t'accueillir
          parmi nous et nous voulons que tu saches à quel point tu es précieux
          pour notre équipe. Voici quelques mots d'encouragement pour t'aider à
          démarrer avec confiance :
        </p>
        <p class="fst-italic">
          Bienvenue dans la famille ! Tu fais désormais partie de notre équipe,
          et nous sommes là pour t'appuyer à chaque étape de ton parcours. Nous
          croyons en toi. Nous t'avons choisi parmi de nombreux candidats car
          nous avons confiance en tes compétences et en ton potentiel. Crois en
          toi comme nous croyons en toi. N'hésite pas à poser des questions. Il
          n'y a pas de question idiote ici. Nous sommes là pour t'aider à
          apprendre et à grandir, donc n'hésite pas à demander si tu as besoin
          d'aide ou de clarification. Chaque jour est une opportunité
          d'apprendre. Chaque défi que tu relèves est une occasion d'acquérir de
          nouvelles compétences et de progresser. Ne crains pas les défis,
          embrasse-les. Ton opinion compte. Nous apprécions ta perspective
          fraîche et tes idées. Ne sous-estime jamais la valeur de ta voix dans
          notre entreprise. L'échec fait partie du chemin vers la réussite. Ne
          te décourage pas en cas d'échec. Apprends de chaque expérience et
          utilise-la comme un tremplin vers le succès.
        </p>
      </div>
    </div>
  </div>

  <div class="container mt-3">
    <form name="form" @submit.prevent="sibmitCreate()" method="POST" enctype="multipart/form-data">
    <div class="row">
            <div class="col-md-4">
                    <div class="mb-3">
                        <input v-model="newContact.name" type="text" name="name" placeholder="Your name" class="form-control form-control-lg" id="">
                    </div>
                    <div class="mb-3">
                        <input v-model="newContact.photo" type="text" name="name" placeholder="Photo URL" class="form-control form-control-lg" id="">
                    </div>
                    <div class="mb-3">
                        <input v-model="newContact.email" type="email" name="name" placeholder="Your email address" class="form-control form-control-lg" id="">
                    </div>
                    <div class="mb-3">
                    <select v-if="groupsId.length>0" v-model="newContact.groupId" name="groupe" class="form-select" id="">
                        <option value="" disabled selected>Select Group</option>
                        <option v-for="(group, i) in groupsId" :key="i" :value="group.id">{{ group.name }}</option>
                    </select>
                    </div>
            </div>
            <div class="col-md-4">
                    <div class="mb-3">
                        <input v-model="newContact.mobile" type="number" name="phone" placeholder="Your phone number" class="form-control form-control-lg" id="">
                    </div>
                    <div class="mb-3">
                        <input v-model="newContact.company" type="text" name="company" placeholder="Your company name" class="form-control form-control-lg" id="">
                    </div>
                    <div class="mb-3">
                        <input v-model="newContact.title" type="text" name="tile" placeholder="Your title in company" class="form-control form-control-lg" id="">
                    </div>
                    <div class="mb-3">
                        <input type="submit" class="btn  btn-outline-primary w-75" value="Create" id="">
                    </div>
            </div>
            <div class="col-md-4">
                <img :src="newContact.photo" class="contact-img" alt="">
            </div>
        </div>
    </form>
   
  </div>
</template>

<script>
import ContactService from '../services/ContactService.js';
import {ref} from 'vue';

export default {
  name: "AddContactVue",
  data(){
    return {
        groupsId : Array,
        newContact : ref({
            "name": "",
            "company":"",
            "email": "",
            "title":"",
            "mobile": "",
            "photo":"",
            "groupId": ""
        })
    }
  },

  async created(){

    let response = await ContactService.getAllsGroups();
    this.groupsId = response.data;
  }
  ,
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
            let response = await ContactService.createContact(this.newContact);
            console.log("ok");
            if(response) {
                console.log("ok");
                return this.$router.push("/");
            }else{
                console.log("error");
                return this.$router.push("/contact/add");
            }

        } catch (error) {
            console.log(error);
        }
    }
  },

}
</script>


<style>

</style>
