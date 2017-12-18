<style lang="scss" scoped>
	// .sideBar{
	// 	ul{
	// 		font-size: 0;
	// 	}
	// 	ul li{
	// 		font-size: 12px;
	// 		display: inline-block;
	// 		border-radius: 4px;
	// 		background-color: #dddee1;
	// 		padding: 2px;
	// 		margin: 5px 0 0 5px;
	// 	}
	// }
	.action_bar {
		line-height: 3.5;
		height: 50px;
		width: 100%;
	}
	.index-layout-nav{
		width: 800px;
		margin: 0 auto;
	}
</style>
<template>
	<div class="add-page">
		<Menu class="action_bar" @on-select="action" mode="horizontal" theme="dark" active-name="1">
			<div class="index-layout-nav">
				<MenuItem name="4">
					<Icon type="code"></Icon>
					code
				</MenuItem>
				<MenuItem name="5">
					<Icon type="wrench"></Icon>
					layout
				</MenuItem>
				<MenuItem v-if="!opModel.createBy ||  me.username === opModel.createBy" name="6">
					<Icon type="document-text"></Icon>
					save
				</MenuItem>
			</div>
		</Menu>

		<Row>
			<i-col span="3">
				<transition name="index-soul-control-class-fade">
				<div>
					<Collapse v-model="open" :key="classIndex" v-for="(controlClass, classIndex) in controlClazzes">
						<Panel :name="classIndex+1+''">
						{{controlClass.name}}
							<p slot="content" class="index-layout-content__class">
								<Control
								v-for="(control,controlIndex) in controlClass.controls"
								:controlConfig="control"
								:key="controlIndex">
									<div slot="preview">
										<MenuItem
										:name="classIndex + '-' + controlIndex">{{control.name}}
										</MenuItem>
									</div>
								</Control>
							</p>
						</Panel>
					</Collapse>
				</div>
				</transition>
			</i-col>
			<i-col :span="17" class="middle" :class="{'is-preview':isPreview}">
				<RenderDev v-if="!showCode" :soul="soul"></RenderDev>
				<pre contenteditable="true" v-else v-highlightjs="vueCode" class="code" id="code"><code></code>
				</pre>
			</i-col>
			<i-col span="4">
				<ModelEditor
				:pageName="opModel.name"
				:editSoul="editSoul">
				</ModelEditor>
			</i-col>
		</Row>

		<Modal
		  :mask-closable="false"
		  v-model="showConfirmPageNameModal"
		  title="confirmPageName"
		  @on-ok="okPageName">
		  <i-form :label-width="100">
		    <FormItem label="PageName">
		      <i-input v-model="opModel.name" @keyup.13.native="okPageName"></i-input>
		    </FormItem>
		  </i-form>
		</Modal>

		<Modal
		  style="width: 600px"
		  :mask-closable="false"
		  v-model="showEditScriptModal"
		  title="script">
		  <div slot="footer">
		  </div>
		  <CodeEditor
		    :editorStyle="editorStyle"
		    :code="editControlSoul.scriptString"
		    @save="saveCode">
		  </CodeEditor>
		</Modal>

		<div class="rightClickMenu" :style="rightClickMenu.style">
		  <Dropdown trigger="custom" visible>
		    <DropdownMenu slot="list">
		      <DropdownItem @click.native="editControl">editScript</DropdownItem>
		      <DropdownItem @click.native="deleteControl">delete</DropdownItem>
		    </DropdownMenu>
		  </Dropdown>
		</div>
		
	</div>
	
</template>
<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	import mock from '@/mock/data.js'
	import {getControlList} from  '@/resource/develop_resource'
	import {makeControl} from '@/helper/code_helper'
	import{init, saveSoul}from '@/core/assemble'
	import {findSoulByUidDown} from '@/helper/soul_helper'
	import {
	  addPage
	} from '@/resource/assemble_resource'
	export default{
		data(){
			return{
				open: '1',
				opModel: {},
				pageSoulId: '',
				appId: '',
				isPreview: true,
				showConfirmPageNameModal: false,
				showEditScriptModal: false,
				editControlSoul: {scriptString: ''},
				editorStyle: {height: '400px'}
			}
		},
		async mounted(){
			//实例化数据
			// this.items = [{r:"Row",c:"Col",d:"Card"},{i:"Input",s:"Select",r:"Radio",c:"Checkbox",d:"DatePicker",t:"TimePicker",i:"InputNumber",f:"Form",b:"Button"},{t:"Table",p:"Page"}];
			// this.titles = ["Layout","Form","View"];
			
			// await可以保证getControlClazzes请求执行完再继续执行
			this.pageSoulId = this.$route.query.pageSoulId
			await this.getControlClazzes();
			console.log(1111111111)

			this.appId = this.$route.query.appId

			this.axios.get('http://192.168.1.100:7001/show').then(res => {
			    console.log(res);
		    }).catch(function(err){
		        console.log(err);
		    });

			//call的用法
			getControlList.call(this,(data) => {

				let draggableControls = []

				console.log("所有的组件的数据",data);

				// draggableControls是存入重组后的组件数组
				data.forEach(origin => {
				  let control = makeControl(origin.code);

				  console.log("拆分重组后的组件数据",control);

				  control.clazzId = origin.clazzId

				  draggableControls.push(control)
				})

				//classify draggableControls
				//分类，给layout下5个组件，form下11个组件...
				let map = {}
				draggableControls.forEach(item => {
				  if (!map[item.clazzId]) {
				    map[item.clazzId] = []
				  }

				  map[item.clazzId].push(item)
				});
				console.log('map',map);

				/**
				 *controlClazzes这个是获取layout、form标题的数据源,
				 *给controlClazzes数组中的每一个对象添加controls属性
				*/
				let vm = this;
				console.log(111, this.controlClazzes);
				this.controlClazzes.forEach(clazz => {
				  let controls = map[clazz.id]
				   
				  if (controls) {
				  	//给clazz对象添加属性controls
				  	//值是数组(如layout下有5个)
				    // clazz.controls = controls
				    // set可以触发视图
				    vm.$set(clazz, 'controls', controls);
				  }
				})
				
				//store draggableControls
				this.setDraggableControls(draggableControls);

				if (!this.pageSoulId) {
					//when add new page
					init(draggableControls)
					saveSoul()
				}

				this.setShowCode(false)
			});		
		},
		computed: {
			...mapGetters('dragModule', ['editSoul','controlClazzes','rightClickMenu','showCode','soul', 'vueCode'])
		},
		methods: {
			...mapMutations('dragModule', ['setDraggableControls', 'setShowCode', 'clear']),
			...mapActions('dragModule', ['getControlClazzes']),
			deleteControl(){
				console.log(1111111)
			  this.editControlSoul = findSoulByUidDown(this.rightClickMenu.uid, this.soul)
			  let pSoul = findSoulByUidDown(this.editControlSoul.pid, this.soul);
			  if (pSoul) {
			    let index = pSoul.children.indexOf(this.editControlSoul);
			    pSoul.children.splice(index, 1)
			  }
			  this.clear()
			  saveSoul()
			},
			editControl(){
			  this.editControlSoul = findSoulByUidDown(this.rightClickMenu.uid, this.soul)
			  this.editControlSoul.scriptString = this.editControlSoul.script.toString()
			  this.clear()
			  this.showEditScriptModal = true
			},
			saveCode(code){
			  this.editControlSoul.scriptString = code
			  this.editControlSoul.script = eval('(function () { \r\n return ' + code + '})()')
			  this.showEditScriptModal = false
			  reset(this.editControlSoul)
			},
			okPageName(){
			  addPage.call(this)
			},
			action(a){
				if (a === '4') {
					this.setShowCode(true)

				} else if (a === '5') {
					this.setShowCode(false)

				} else if (a === '6') {
					//save changes of page
					if (!this.opModel.id) {
					this.showConfirmPageNameModal = true
					} else {
					updatePage.call(this)
					}

				}
			}
		},

	}
</script>
<style scoped>
	.rightClickMenu {
	  display: none;
	  z-index: 10001;
	  position: fixed;
	}
</style>