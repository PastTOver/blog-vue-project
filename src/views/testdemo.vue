<template>
    <div>
        <input type="checkbox" id="option1" value="option1" v-model="selectedOptions" />
        <label for="option1">选项1</label>

        <input type="checkbox" id="option2" value="option2" v-model="selectedOptions" />
        <label for="option2">选项2</label>

        <button @click="checkSelection">检查选择</button>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            selectedOptions: [] // 绑定选中的复选框值
        };
    },
    methods: {
        checkSelection() {
            if (this.selectedOptions.includes('option1')) {
                console.log('选项1被选中');
            }
            if (this.selectedOptions.includes('option2')) {
                console.log('选项2被选中');
            }
            if (this.selectedOptions.length === 0) {
                console.log('没有选中任何选项');
            }
        }
    }
};
</script>
  