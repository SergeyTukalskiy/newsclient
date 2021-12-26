<template>
	<div class="panel panel-primary" style="margin-top: 10px">
		<div class="panel-heading">Редактирование новости</div>
		<div class="panel-body">
			<form @submit="handleSubmit">
				<div class="form-group">
					<label for="inputCategory">Категория</label>
					<select class="form-control" id="inputCategory" v-model="category">
						<option v-for="(category, key) in categoriesToDisplay" :value="category.id">{{ category.name }}</option>
					</select>
				</div>
				<div class="form-group">
					<label for="inputTitle">Заголовок</label>
					<input type="text" class="form-control" id="inputTitle" v-model="title">
				</div>
				<div class="form-group">
					<label for="inputDescription">Описание</label>
					<input type="text" class="form-control" id="inputDescription" v-model="description">
				</div>
				<div class="form-group">
					<label for="inputImageUrl">Ссылка</label>
					<input type="url" class="form-control" id="inputImageUrl" v-model="imageUrl">
				</div>
				<div class="form-group">
					<label for="inputSource">Источник</label>
					<select class="form-control" id="inputSource" v-model="sourceId">
						<option type="number" v-for="(source, key) in sourcesToDisplay" :value="source.id">{{ source.name }}</option>
					</select>
				</div>
				<div class="form-group">
					<label for="inputPlace">ID места</label>
<!--					TODO место в эдите-->
					<input type="number" class="form-control" id="inputPlace" v-model="place">
				</div>
				<div class="form-group">
					<label for="inputLanguage">Язык</label>
					<select class="form-control" id="inputLanguage" v-model="language">
						<option v-for="(language, key) in languages" :value="key">{{ language }}</option>
					</select>
				</div>
				<div class="form-group">
					<label for="inputDate">Дата и время</label>
					<input type="date" class="form-control" id="inputDate" v-model="visibleDate">
					<input type="time" class="form-control" id="inputTime" v-model="visibleTime">
				</div>
				<button type="reset" @click="initialize">Кнобка</button>
				<button type="submit" class="btn btn-primary pull-right">Сохранить</button>
			</form>
		</div>
	</div>
</template>

<script>
	import { sources } from "../config";
	import { languages } from "../config";
	import { categories } from "../config";
	import { formatInputDate, formatInputTime } from "../utils";
	import {mapActions} from "vuex";
	import api from "../api";

	export default {
		data() {
			const now = new Date(Date.now());
			return {
				id: parseInt(this.$route.params.id),
				title: "",
				description: "",
				imageUrl: "",
				language: 1,
				place: 1,
				sourceId: 1,
				category: 1,
				visibleDate: formatInputDate(now),
				visibleTime: formatInputTime(now),
				sourcesToDisplay: [],
				categoriesToDisplay: []
			};
		},
		created() {
			this.initialize();
			if (this.id !== 0 && this.rssItem) {
				const date = new Date(this.rssItem.date);
				this.title = this.rssItem.title;
				this.imageUrl = this.rssItem.imageUrl;
				this.language = this.rssItem.language;
				this.description = this.rssItem.description;
				this.place = this.rssItem.place;
				this.source = this.rssItem.sourceId;
				this.category = this.rssItem.category;
				this.visibleDate = formatInputDate(date);
				this.visibleTime = formatInputTime(date);
			}
		},
		methods: {
			initialize(context) {
				api.source.getAll().then(response => (this.sourcesToDisplay = response.data));
				api.category.getAll().then(response => (this.categoriesToDisplay = response.data))
			},
			async handleSubmit(e) {
				e.preventDefault();
				const item = {
					title: this.title,
					imageUrl: this.imageUrl,
					source: this.source,
					date: this.date,
					language: this.language,
					description: this.description,
					place: this.place,
					category: this.category
				};
				console.log(item.source)
				if (this.id !== 0) {
					item.id = this.id;
					await this.editItem(item);
				} else {
					await this.addItem(item);
				}
				await this.$router.push({name: "app"});
			},
			...mapActions([
				'addItem',
				'editItem'
			])
		},
		computed: {
			date() { return `${this.visibleDate}T${this.visibleTime}:00+03:00`; },
			sources() { return sources; },
			languages() { return languages },
			categories() { return categories },
			rssItem() {
				return this.id !== 0 ?
					this.$store.state.rssItems.find(item => item.id === this.id):
					null;
			}
		}
	}
</script>
