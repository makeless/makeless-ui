import Vue from 'vue';
import Saas from './ts/saas';
import Router from './ts/router/basic/router';

const saas = new Saas(
    new Router(),
);

new Vue(saas.vue());
