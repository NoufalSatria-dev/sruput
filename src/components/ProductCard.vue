<script setup>
import {money} from '../services/storage';
import {computed,ref,watch} from 'vue';
const props=defineProps({product:Object,selectable:Boolean});
defineEmits(['select']);
const failed=ref(false); watch(()=>props.product.image,()=>failed.value=false);
const imageUrl=computed(()=>props.product.image ? ( /^https?:|^data:/.test(props.product.image)?props.product.image:import.meta.env.BASE_URL+props.product.image.replace(/^\//,'')) : '');
</script>
<template><article class="product"><div class="product-photo"><img v-if="imageUrl&&!failed" :src="imageUrl" :alt="product.name" @error="failed=true"><span v-else class="photo-fallback">{{product.name}}</span></div><div class="product-info"><h3>{{product.name}}</h3><p class="muted">{{product.variant}}</p><div class="spread"><strong>{{money(product.price)}}</strong><button v-if="selectable" class="add-product" type="button" :aria-label="'Tambah '+product.name+' '+product.variant" @click="$emit('select',product)">+</button></div></div></article></template>
