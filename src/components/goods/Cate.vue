<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="catelist" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column prop="cat_name" label="分类名称">
        </el-table-column>
        <el-table-column prop="children[0].cat_name" label="商品小类">
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeCateById(scope.row.cat_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      queryInfo:{
        type:3,
        pagenum:1,
        pagesize:5
      },
      //商品分类数据
      catelist:[],
      total:0
    }
  },
  created(){
    this.getCateList()
  },
  methods:{
    async getCateList(){
      const {data:res} = await this.$http.get('categories',{param:this.queryInfo})
      if(res.meta.status !== 200){
        return this.$message.error('获取商品分类失败！')
      }
      this.catelist = res.data
      this.total = res.data.length
      // console.log(res)
    },
    async removeCateById(id){
      //弹框询问用户是否删除数据
      const confirmResult = await this.$confirm('此操作将永久删除该商品分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err);          
        if(confirmResult !== 'confirm'){
          return this.$message.info('已取消删除')
        }
        const {data:res} = await this.$http.delete('categories/'+id)
        if(res.meta.status !==200){
          return this.$message.error('删除商品分类失败！')
        }
        this.$message.success('删除商品分类成功！')
        this.getCateList()
    }
  }
}

</script>
<style lang="less">
  
</style>