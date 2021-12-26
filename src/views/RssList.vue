<template>
	<div class="panel panel-primary" style="margin-top: 10px">
		<div class="panel-heading" style="text-align: center;font-size: 20px">Список новостей</div>
		<div class="panel-body">

		</div>
		<table class="table table-striped">
			<thead>
			<tr>
				<th>№</th>
				<th style="width: 15%">Заголовок</th>
				<th style="width: 20%">Описание</th>
				<th style="width: 10%" href="sourceLoader">Источник</th>
				<th style="width: 10%">Язык</th>
				<th style="width: 10%">Категория</th>
				<th style="width: 10%">Место</th>
				<th>Дата</th>
				<th style="width: 20px"></th>
				<th style="width: 20px"></th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(item, index) in rssItems" :key="index">
				<td>{{index + 1}}</td>
				<td><a :href="item.imageUrl" target="_blank">{{ item.title }}</a></td>
				<td> {{item.description}} </td>
				<td>{{ item.source.name }}</td>
				<td>{{ item.language.name }}</td>
				<td>{{ item.category.name }}</td>
				<td>{{ item.place.city }}</td>
				<td>{{ formatDate(new Date(item.date)) }}</td>
				<td><router-link role="button" class="btn btn-sm btn-link" :to="{name: 'edit', params: {id: item.id}}">
					<span class="glyphicon glyphicon-pencil"></span>
				</router-link></td>
				<td><button type="button" class="btn btn-sm btn-link" @click="handleRemoveClick($event, item.id)">
					<span class="glyphicon glyphicon-remove"></span>
				</button></td>
			</tr>
			</tbody>
		</table>
		<div></div>
		<div>
			<tr>
				<th>
					<router-link role="button" class="btn btn-lg btn-block btn-default" :to="{name: 'edit', params: {id: 0}}">
						Добавить
					</router-link>
				</th>
				<th width="80%"></th>
				<th align="right">
					<router-link role="button" class="btn btn-lg btn-block btn-default" :to="{name: 'sourceLoader', params: {id: 0}}">
					Источники
				</router-link>
				</th>
				<th>
					<router-link role="button" class="btn btn-lg btn-block btn-default" :to="{name: 'categoryLoader', params: {id: 0}}">
						Категории
					</router-link>
				</th>

			</tr>
		</div>
	</div>

</template>

<script>
	import { sources } from "../config";
	import { languages } from "../config";
	import { categories } from "../config";	import { formatDate } from "../utils";
	import {mapActions, mapState} from 'vuex';

	export default {
		methods: {
			formatDate,
			async handleRemoveClick(e, id) {
				await this.removeItem(id);
			},
			...mapActions([
				'removeItem'
			])
		},
		computed: {
			sources: () => sources,
			...mapState({
				rssItems: state => state.rssItems
			}),
			languages: () => languages,
			categories: () => categories
		}
	}
</script>

<style></style>
