import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    children: [
      {
        id: 'home',
        title: 'Home',
        translate: 'NAV.SAMPLE.TITLE',
        type: 'item',
        icon: 'home',
        url: '/app/home',
      },
      {
        id: 'admin',
        title: 'Administrador',
        type: 'collapsable',
        icon: 'admin_panel_settings',
        children: [
          {
            id: 'contas',
            title: 'Contas',
            type: 'item',
            url: '/app/account/accounts',
          },
        ],
      },
    ],
  },
];
