<script setup lang="ts">
	const loadComponent = async() =>{

	}

	loadComponent()
</script>

<template>
<v-container class="text-center align-center">
	<v-card max-width="600px" class="ml-2">
		<v-card-title>修改密码</v-card-title>
		<v-container class="text-center align-center">
			<p><v-text-field label="输入原始密码"></v-text-field></p>
			<p><v-text-field label="输入新密码"></v-text-field></p>
			<p><v-text-field label="确认新密码"></v-text-field></p>
			<v-btn class="bg-info">提交</v-btn>
		</v-container>
	</v-card>
</v-container>
</template>

<style scoped>

</style>