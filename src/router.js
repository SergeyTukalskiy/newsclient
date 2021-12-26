import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './views/App';
import Loader from "./views/Loader";
import RssList from "./views/RssList";
import RssEdit from "./views/RssEdit";
import SourceList from "./views/SourceList";
import SourceLoader from "./views/SourceLoader";
import CategoryList from "./views/CategoryList";
import CategoryLoader from "./views/CategoryLoader";

Vue.use(VueRouter);
export default new VueRouter({
	mode: 'history',
	routes: [
		{ path: "/", name: "loader", component: Loader },
		{ path: "/app", component: App, children: [
				{ path: "/", name: "app", component: RssList },
				{ path: "/:id", name: "edit", component: RssEdit }
		]},
		{ path: "/source", name: "source", component: SourceList},
		{ path: "/sourceLoader", name: "sourceLoader", component: SourceLoader},
		{ path: "/category", name: "category", component: CategoryList},
		{ path: "/categoryLoader", name: "categoryLoader", component: CategoryLoader}
	]
});
