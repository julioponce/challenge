const Layout = () => import('@/components/Layout/Layout.vue')
const People = () => import('@/components/pages/People/People.vue')
const Species = () => import('@/components/pages/Species/Species.vue')

const routes = [
  {
    path: '/',
    redirect: '/people',
    component: Layout,
    name: 'home',
    children: [
      {
        path: 'people',
        component: People,
        name: 'people',
        meta: {}
      },
      {
        path: 'species',
        component: Species,
        name: 'species',
        meta: {}
      }
    ]
  }, {
    path: '*',
    component: People
  }
]

export default routes
