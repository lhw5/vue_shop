<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

     <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col>
          <el-button type="primary">添加参数</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table  border stripe>
        <!-- 索引列 -->
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column prop="cat_name" label="参数名称">
        </el-table-column>
        <el-table-column label="操作">
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
  
}
</script>

<style lang="less">
  
</style>