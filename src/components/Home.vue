<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse ? '64px' : '200px' ">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id +'' " v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index=" '/'+subItem.path" v-for="subItem in item.children"
            :key="subItem.id" @click="saveNavState('/'+subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
        
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return{
      menulist:[],
      iconsObj:{
        '125':'el-icon-s-custom',
        '103':'el-icon-info',
        '101':'el-icon-s-goods',
        '102':'el-icon-coin',
        '145':'el-icon-s-order'
      },
      // 默认不折叠
      isCollapse:false,
      // 被激活的地址
      activePath:''
    }
  },
  created(){
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push("/login")
    },
    //获取所有菜单
    async getMenuList(){
      const {data:res} = await this.$http.get('menus')
      // console.log(res)
      if(res.meta.status !== 200) return this.$message.error(this.meta.msg)
      this.menulist = res.data
    },
    //点击按钮，切换菜单的折叠与展开
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  },
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  align-items: center;
  // img {
  //   width: 60px;
  //   height: 60px;
  // }
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 12px;
    }
  }
}

.el-aside {
  background-color: #545c64;
  color: #333;
  .el-menu{
    border-right: none;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.toggle-button{
  background: #4a5064;
  font-size: 10px;;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2rem;
  cursor: pointer;
}
</style>