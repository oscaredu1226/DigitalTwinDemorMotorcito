import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/digital-twin/presentation/digital-twin.routes').then(
        (m) => m.DIGITAL_TWIN_ROUTES,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
