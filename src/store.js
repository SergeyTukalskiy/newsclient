import Vue from 'vue';
import Vuex from 'vuex';
import RssApi from './api';
import SourceApi from './api'
import CategoryApi from './api'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		rssItems: [],
		sources: [],
		categories: [],
		alertText: ""
	},
	getters: {

	},
	mutations: {
		'SET_RSS_ITEMS'(state, rssItems) {
			state.rssItems = rssItems;
		},
		'SET_ALERT_TEXT'(state, alertText) {
			state.alertText = alertText;
		},
		'ADD_RSS_ITEM'(state, rssItem) {
			state.rssItems.push(rssItem);
		},
		'EDIT_RSS_ITEM'(state, rssItem) {
			const item = state.rssItems.find(item => item.id === rssItem.id);
			Object.assign(item, rssItem);
		},
		'REMOVE_RSS_ITEM'(state, rssItem) {
			const index = state.rssItems.findIndex(item => item.id === rssItem.id);
			state.rssItems.splice(index, 1);
		},
		'SET_SOURCES'(state, sources) {
			state.sources = sources;
		},
		'ADD_SOURCE'(state, source) {
			state.sources.push(source);
		},
		'EDIT_SOURCE'(state, source) {
			const item = state.sources.find(item => item.id === source.id);
			Object.assign(item, source);
		},
		'REMOVE_SOURCE'(state, source) {
			const index = state.sources.findIndex(item => item.id === source.id);
			state.sources.splice(index, 1);
		},
		'SET_CATEGORY'(state, categories) {
			state.categories = categories;
		},
		'ADD_CATEGORY'(state, category) {
			state.categories.push(category);
		},
		'EDIT_CATEGORY'(state, category) {
			const item = state.categories.find(item => item.id === category.id);
			Object.assign(item, category);
		},
		'REMOVE_CATEGORY'(state, category) {
			const index = state.categories.findIndex(item => item.id === category.id);
			state.categories.splice(index, 1);
		}
	},
	actions: {
		async initialize(context) {
			try {
				const response = await RssApi.rssItem.getAll();
				context.commit('SET_RSS_ITEMS', response.data );
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
			}
		},
		async addItem(context, item) {
			try {
				const response = await RssApi.rssItem.add(item);
				context.commit('ADD_RSS_ITEM', response.data );
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
			}
		},
		async editItem(context, item) {
			try {
				const response = await RssApi.rssItem.edit(item.id, item);
				context.commit('EDIT_RSS_ITEM', response.data );
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
			}
		},
		async removeItem(context, id) {
			try {
				const response = await RssApi.rssItem.delete(id);
				context.commit('REMOVE_RSS_ITEM', response.data );
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
			}
		},async initializeSource(context) {
			try {
				const response = await SourceApi.source.getAll();
				context.commit('SET_SOURCES', response.data );
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
			}
		},
		async addSource(context, item) {
			try {
				const response = await SourceApi.source.add(item);
				context.commit('ADD_SOURCE', response.data );
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
			}
		},
		async editSource(context, item) {
			try {
				const response = await SourceApi.source.edit(item.id, item);
				context.commit('EDIT_SOURCE', response.data );
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
			}
		},
		async removeSource(context, id) {
			try {
				const response = await SourceApi.source.delete(id);
				context.commit('REMOVE_SOURCE', response.data );
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
			}
		},
		async initializeCategories(context) {
			try {
				const response = await CategoryApi.category.getAll();
				context.commit('SET_CATEGORIES', response.data );
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
			}
		},
		async addCategory(context, item) {
			try {
				const response = await CategoryApi.category.add(item);
				context.commit('ADD_CATEGORY', response.data );
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
			}
		},
		async editCategory(context, item) {
			try {
				const response = await CategoryApi.category.edit(item.id, item);
				context.commit('EDIT_CATEGORY', response.data );
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
			}
		},
		async removeCategory(context, id) {
			try {
				const response = await CategoryApi.category.delete(id);
				context.commit('REMOVE_CATEGORY', response.data );
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
			}
		}
	}
});
