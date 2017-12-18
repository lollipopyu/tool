import store from '../store'
import {
  stringify,
  deepCopy,
  getCookie,
  unset
} from '../util/assist'
import {
  currentUid,
  walkSoul,
  refreshInitScript
} from '../helper/soul_helper'
import{
  dev
}from '@/config/env.js'
import Vue from 'vue'
import {save} from '@/service/getData'

function addPage() {
  if(!this.opModel.name){
    return void this.$Message.warning('name can\'t be empty')
  }
  let soul = deepCopy(store.getters['dragModule/soul'])
  refreshInitScript(soul)
  walkSoul(soul,soul=>{
    for(let key in soul.model){
     if(soul.model[key].dontSave){
        soul.model[key].value = []
     }
    }
  })
  soul.maxUid = currentUid()
  this.opModel.pageSoul = stringify(soul)
  this.opModel.appId = this.appId
  console.log('opModel',this.opModel)
  // this.$http.post(dev+'/insert', this.opModel).then(res => {
  //   if (res.data.code === 10000) {
  //     this.pageSoulId = this.opModel.id = res.data.data.id
  //     window.location.href += '?pageSoulId=' +  this.pageSoulId
  //     this.$Message.success('saved')
  //   }
  // })
  	// this.axios.post(dev+'insert').then(res => {
  	//     console.log(res);
   //  }).catch(function(err){
   //        console.log(err);
   //  });
   // unset('csrfToken');
   // this.axios.defaults.headers.post['Content-Type'] = 'application/json';
   // this.axios.post(dev+'insert', "{a:1}")
   //   .then(function (response) {
   //     console.log(response);
   //   })
   //   .catch(function (error) {
   //     console.log(error);
   //   });
   save(this.opModel);

}

export {
  addPage
}
