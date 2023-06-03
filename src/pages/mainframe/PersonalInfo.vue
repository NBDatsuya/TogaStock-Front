<script setup lang="ts">
import PersonalInfo from "../../components/PersonalInfo.vue";
import ChangePwd from "../../components/ChangePwd.vue";
</script>

<template>
    <v-container>
        <v-row>
            <v-col class="pa-0">
                <v-container>
                    <personal-info density="1"></personal-info>
                </v-container>
            </v-col>
            <v-col class="pa-0">
                <v-container>
                    <change-pwd></change-pwd>
                </v-container>
            </v-col>
        </v-row>


    </v-container>
</template>

<style scoped>

</style>