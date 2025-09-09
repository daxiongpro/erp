export default {
  path: '/inspection',
  name: 'inspection',
  component: () => import('@/layouts/BaseLayout'),
  redirect: '/inspection/inspection_create',
  children: [
    {
      path: 'inspection_create',
      meta: { title: '验货派发', permission: 'inspection_create' },
      component: () => import('@/views/inspection/inspectionCreate/index'),
    },

  ],
}