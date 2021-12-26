<template>
	<div class="panel panel-primary" style="margin-top: 10px">
		<div class="panel-heading" style="text-align: center;font-size: 20px">Список источников</div>
		<div class="panel-body">
<!--			<router-link role="button" class="btn btn-lg btn-block btn-default" :to="{name: 'edit', params: {id: 0}}">-->
<!--				Добавить-->
<!--			</router-link>-->
		</div>
		<table class="table table-striped">
			<thead>
			<tr>
				<th>№</th>
				<th style="width: 40%">Название</th>
				<th style="width: 40%">Ссылка</th>
				<th style="width: 20px"></th>
				<th style="width: 20px"></th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(item, index) in sources" :key="index">
				<td>{{index + 1}}</td>
				<td> {{item.name}} </td>
				<td>{{ item.link }}</td>
				<td><router-link role="button" class="btn btn-sm btn-link" :to="{name: 'edit', params: {id: item.id}}">
					<span class="glyphicon glyphicon-pencil"></span>
				</router-link></td>
				<td><button type="button" class="btn btn-sm btn-link" @click="handleRemoveClick($event, item.id)">
					<span class="glyphicon glyphicon-remove"></span>
				</button></td>
			</tr>
			</tbody>
		</table>
		<tr>
			<th>
				<router-link role="button" class="btn btn-lg btn-block btn-default" :to="{name: 'app', params: {id: 0}}">
					Новости
				</router-link>
			</th>
		</tr>
	</div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
	methods: {
		async handleRemoveClick(e, id) {
			await this.removeSource(id);
		},
		...mapActions([
			'removeSource'
		])
	},
	computed: {
		...mapState({
			sources: state => state.sources
		})
	}
}
</script>

