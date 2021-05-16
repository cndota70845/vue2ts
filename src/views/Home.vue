
<template>
  <div class="home">
    <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu 
        :theme="menu.theme" 
        :mode="menu.mode" 
        :default-selected-keys="[menu.selected]"
        :defaultOpenKeys="menu.defaultOpenKeys"
        @select="menuSelect"
      >
        <template v-for="item in menu.data">
          <template v-if="!item.hasOwnProperty('parent')">
            <a-menu-item :key="item.key" v-if="!item.idx.includes('sub')">
              <a-icon :type="item.icon" />
              <span>{{item.name}}</span>
            </a-menu-item>
            <a-sub-menu :key="item.key" :title="item.name" v-else>
              <template v-for="element in menu.data">
                <a-menu-item :key="element.key" v-if="element.parent && item.key === element.parent">
                  <a-icon :type="element.icon" />
                  <span>{{element.name}}</span>
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
  </div>
</template>

<script lang="ts">
import { Vue,Component,Watch } from 'vue-property-decorator';
import menu from '../menu';
import MENU from '../methods/Menu';

interface ILooseObject {
  [key: string]: any
}

@Component({})
export default class Home extends Vue {
  get routerName () :string{
    return (this as ILooseObject).$route.name;
  }

  public menu = {
    data:MENU.floatMenu(menu),
    theme:'dark',
    mode:'inline',
    selected:'',
    defaultOpenKeys:['']
  };
  public collapsed = false;

  defaultSelected (val :string) :void{
    this.menu.selected = val;
    this.menu.data.forEach(item => {
      if (item.parent && item.key === val) {
        this.menu.defaultOpenKeys.push(item.parent);
        this.menu.defaultOpenKeys.splice(0,1);
      }
    });
  }

  @Watch('routerName')
  routerNameChange(newVal :string) :void{
    this.defaultSelected(newVal);
  }

  created () :void{
    if (this.routerName && this.routerName!=='Home') {
      this.defaultSelected(this.routerName);
    }
  }
  menuSelect () :void{
    let path = arguments[0].keyPath.join('');
    (this as ILooseObject).$router.push(path);
  }
}
</script>
<style lang="less" scoped>
  @import '../assets/less/home.less';
</style>
