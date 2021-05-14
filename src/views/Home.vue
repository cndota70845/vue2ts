
<template>
  <div class="home">
    <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu :theme="menu.theme" :mode="menu.mode" :default-selected-keys="menu.selected" @select="menuSelect">
        <a-menu-item key="HTML">
          <a-icon type="video-camera" />
          <span>HTML</span>
        </a-menu-item>
        <a-sub-menu :key="item" v-for="item in ['background','#fff','padding']">
          <span slot="title"><a-icon type="appstore" /><span>{{item}}</span></span>
          <a-menu-item :key="`${item}components`">
            Option 3
          </a-menu-item>
        </a-sub-menu>
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
  public menu = {
    data:MENU.floatMenu(menu),
    theme:'dark',
    mode:'vertical',
    selected:[]
  };
  public collapsed = false;

  get routerName () :string{
    return (this as ILooseObject).$route.name;
  }

  defaultSelected (val :string) {
    this.menu.selected = [val];
  }

  @Watch('routerName')
  routerNameChange(newVal :string) {
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
