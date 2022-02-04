<template>
  <table>
    <tbody>
    <tr>
      <th style="text-align: center;" v-for="item in columns" :key="item">
        {{ item }}
      </th>
    </tr>
    <tr v-for="(item,index) in rows" :key="index">
      <td :title="_item" v-for="(_item,_index) in item" :key="_index">{{ _item }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    },
  },
  name: "table"
}
</script>

<style scoped>
table {
  width: 100%;
  height: 100%;
}

tr {
  display: flex;
  height: 2.7778vh;
  align-items: center;
}

tr th {
  flex:1;
  color: #1DCEFF;
  font-size: 0.729vw;
  padding: 0 2px;
}

tr td {
  cursor: pointer;
  text-align: center;
  flex: 1;
  color: #FFFFFF;
  font-size: 0.729vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 2px;
}
</style>
